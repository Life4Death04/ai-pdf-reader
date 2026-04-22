import fs from "fs/promises";
import { prisma } from "@/lib/prisma/prisma";
import { extractTextFromPDF } from "@/lib/pdf/extract";
import { chunkTextWithFiltering } from "@/lib/chunker/chunk";
import { rewriteChunk, checkOllamaHealth, warmupModel } from "@/lib/ai/rewrite";
import { DocumentStatus } from "../../generated/prisma";
import { updateDocumentProgress } from "@/lib/services/documentService";
import { generateAndStoreChunkAudio } from "@/lib/services/audioService";
import { asyncPoolWithProgress } from "@/lib/utils/asyncPool";
import { createErrorDetails } from "@/lib/utils/errorClassifier";
import { detectLanguage } from "@/lib/utils/detectLanguage";

/**
 * FAST PATH: Processes a document through extraction and chunking only.
 *   UPLOADED → EXTRACTING → CHUNKING → READY (or ERROR on failure)
 *
 * This function:
 * 1. Extracts text from PDF (2-5 seconds)
 * 2. Chunks the text (instant)
 * 3. Saves chunks to database
 * 4. Marks document as READY
 *
 * AI rewriting is handled separately by rewriteDocumentChunks() to avoid
 * blocking document availability for 30-60 minutes.
 *
 * Why run it in the background (fire-and-forget)?
 * - PDF extraction on a large document can take 5–30 seconds.
 * - Returning a response immediately gives the user instant feedback.
 * - On a VPS (long-running Node.js process), the async work continues
 *   after the HTTP response is sent.
 */
export async function processDocument(documentId: string): Promise<void> {
  try {
    // ── Step 1: Load the document record ──────────────────────────────────
    const doc = await prisma.document.findUniqueOrThrow({
      where: { id: documentId },
    });
    console.log(doc, "doc");

    // ── Step 2: Extract text from PDF ─────────────────────────────────────
    console.log(
      await prisma.document.update({
      where: { id: documentId },
      data: { status: DocumentStatus.EXTRACTING },
    })
    );

    const fileBuffer = await fs.readFile(doc.fileUrl);
    const { text, pageCount } = await extractTextFromPDF(fileBuffer);
    console.log(`[process] Extracted text from document ${documentId}: ${text.length} chars, ${pageCount} pages`);

    const detectedLanguage = detectLanguage(text);
    console.log(`[process] Detected language: ${detectedLanguage}`);

    await prisma.document.update({
      where: { id: documentId },
      data: {
        extractedText: text,
        pageCount,
        language: detectedLanguage,
        status: DocumentStatus.CHUNKING,
      },
    });

    // ── Step 3: Chunk the text ─────────────────────────────────────────────
    // Uses page-level filtering to remove ToC, Index, References, etc.
    const chunks = chunkTextWithFiltering(text);

    console.log(`[process] Generated ${chunks.length} chunks for document ${documentId}`);

    // ── Step 4: Save Chunks to Database ───────────────────────────────────
    // Save ORIGINAL text chunks (rewriting happens separately if enabled)
    // Batch-insert all chunks. We use createMany for efficiency — one round
    // trip instead of N inserts. skipDuplicates protects against retries.
    await prisma.textChunk.createMany({
      data: chunks.map((chunk) => ({
        documentId,
        index: chunk.index,
        text: chunk.text,
        tokenCount: chunk.tokenCount,
      })),
      skipDuplicates: true,
    });

    // ── Step 5: Record chunk count — status stays CHUNKING until audio exists ─
    // READY is only set by audioService once all AudioChunks are generated.
    // totalChunks lets the player know how many chunks to expect.
    await prisma.document.update({
      where: { id: documentId },
      data: { totalChunks: chunks.length, processedChunks: 0 },
    });

    console.log(
      `[process] ✅ Document ${documentId} chunked — ${chunks.length} chunks, ${pageCount} pages. Audio generation will drive status.`
    );

    console.log(
      `[process] Processing completed in fast path. AI rewriting can be triggered separately if enabled.`
    );
  } catch (error) {
    console.error(`[process] Failed to process document ${documentId}:`, error);

    // Classify error and get details
    const { errorCode, errorMessage } = createErrorDetails(error);
    
    console.error(`[process] Error classified as: ${errorCode}`);
    console.error(`[process] User-facing message: ${errorMessage}`);

    // Update document with error details
    await prisma.document
      .update({
        where: { id: documentId },
        data: { 
          status: DocumentStatus.ERROR,
          errorMessage,
          errorCode,
          failedAt: new Date(),
        },
      })
      .catch((dbError) => {
        // If we can't even update the database, log it but don't throw
        console.error(`[process] Failed to update error status in database:`, dbError);
      });
  }
}

/**
 * SLOW PATH: Rewrites all chunks of a document for better audiobook narration.
 * 
 * This function runs INDEPENDENTLY from processDocument() and does not block
 * document availability. It:
 * 1. Loads all chunks for the document
 * 2. Rewrites them in parallel (3 at a time) using Ollama
 * 3. Updates the 'processed' field with rewritten text
 * 
 * Users can listen to original text immediately, and rewritten versions appear
 * gradually as they're processed. On subsequent playback in AUDIOBOOK mode,
 * the rewritten versions will be used.
 * 
 * @param documentId - ID of the document to rewrite
 * @param options - Configuration options
 */
export async function rewriteDocumentChunks(
  documentId: string,
  options: {
    mode?: "audiobook" | "formal";
    language?: "en" | "es";
    concurrency?: number;
  } = {}
): Promise<void> {
  // concurrency=1: process chunks one at a time so each gets the full OLLAMA_TIMEOUT
  // for actual inference, not queue wait time. Ollama (and most local LLM servers)
  // are single-threaded — concurrency>1 brings no throughput gain and causes
  // the 2nd+ simultaneous requests to time out before Ollama even starts them.
  //
  // If you upgrade to a parallel-capable backend (vLLM, llama.cpp --parallel,
  // or a hosted API), bump this via the AI_CONCURRENCY env var to match
  // the server's actual parallel capacity (e.g. AI_CONCURRENCY=4 for 4 workers).
  const { mode = "audiobook", language = "en", concurrency = 1 } = options;

  try {
    console.log("\n" + "=".repeat(70));
    console.log(`🎙️  STARTING AI REWRITE FOR DOCUMENT ${documentId}`);
    console.log("=".repeat(70));

    // ── Step 1: Check Ollama availability ─────────────────────────────────
    console.log("[rewrite] Checking Ollama health...");
    const ollamaHealthy = await checkOllamaHealth();

    if (!ollamaHealthy) {
      console.log("[rewrite] ⚠️  Ollama not available - aborting rewrite");
      return;
    }

    console.log("[rewrite] ✅ Ollama is healthy");

    // ── Step 2: Load chunks ───────────────────────────────────────────────
    const chunks = await prisma.textChunk.findMany({
      where: { documentId },
      orderBy: { index: "asc" },
    });

    console.log(`[rewrite] Loaded ${chunks.length} chunks`);

    if (chunks.length === 0) {
      console.log("[rewrite] No chunks found - nothing to rewrite");
      return;
    }

    // ── Step 3: Warmup model ──────────────────────────────────────────────
    console.log("[rewrite] Warming up Ollama model...");
    await warmupModel();
    console.log("[rewrite] ✅ Model warmed up");

    // Mark the document as REWRITING so the UI can show the activity badge.
    // Audio is already generated at this point, so playability is unaffected
    // — the DocumentCard derives playability from processedChunks/totalChunks.
    await prisma.document.update({
      where: { id: documentId },
      data: { status: DocumentStatus.REWRITING },
    });

    // ── Step 4: Rewrite chunks in parallel ────────────────────────────────
    console.log(`[rewrite] Starting parallel rewrite (concurrency: ${concurrency})...\n`);

    let completed = 0;
    const total = chunks.length;
    const startTime = Date.now();

    await asyncPoolWithProgress(
      concurrency,
      chunks,
      async (chunk, index) => {
        let textForAudio = chunk.processed ?? chunk.text;

        // Rewrite step — skip if already done
        if (chunk.processed) {
          console.log(`[rewrite] Chunk ${index + 1}/${total} already rewritten, proceeding to audio`);
        } else {
          try {
            const rewritten = await rewriteChunk(chunk.text, { mode, language, skipShort: true });
            await prisma.textChunk.update({
              where: { id: chunk.id },
              data: { processed: rewritten },
            });
            textForAudio = rewritten;
            console.log(`[rewrite] ✅ Chunk ${index + 1}/${total} rewritten`);
          } catch (rewriteError) {
            console.error(`[rewrite] ❌ Rewrite failed for chunk ${index + 1}/${total}, using original:`, rewriteError);
            // textForAudio stays as chunk.text — audio still gets generated
          }
        }

        // Audio step — runs immediately after rewrite, independent of other chunks
        try {
          await generateAndStoreChunkAudio({
            documentId,
            chunkIndex: chunk.index,
            text: textForAudio,
            language,
          });
          console.log(`[rewrite] ✅ Chunk ${index + 1}/${total} audio generated and uploaded`);
        } catch (audioError) {
          console.error(`[rewrite] ❌ Audio generation failed for chunk ${index + 1}/${total}:`, audioError);
          // generateAndStoreChunkAudio already marks the TextChunk as ERROR
        }
      },
      (completed, total) => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
        const percent = ((completed / total) * 100).toFixed(1);
        
        if (completed % 5 === 0 || completed === total) {
          console.log(
            `\n[rewrite] 📊 Progress: ${completed}/${total} (${percent}%) - ${elapsed}s elapsed\n`
          );
        }
      }
    );

    // ── Step 5: Complete ──────────────────────────────────────────────────
    const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);

    // Derive status from actual chunk states rather than hardcoding READY.
    // If called before audio generation, TextChunks are PENDING → GENERATING.
    // If called after audio generation, TextChunks are DONE → READY.
    await updateDocumentProgress(documentId, prisma);

    console.log("\n" + "=".repeat(70));
    console.log(`🎉 REWRITE COMPLETE FOR DOCUMENT ${documentId}`);
    console.log(`   Duration: ${duration} minutes`);
    console.log(`   Chunks processed: ${total}`);
    console.log("=".repeat(70) + "\n");
  } catch (error) {
    console.error(`[rewrite] Failed to rewrite document ${documentId}:`, error);
    // Don't throw - this is a background task
  }
}
