import fs from "fs/promises";
import { prisma } from "@/lib/prisma/prisma";
import { extractTextFromPDF } from "@/lib/pdf/extract";
import { chunkTextWithFiltering } from "@/lib/chunker/chunk";
import { rewriteChunk, checkOllamaHealth, warmupModel } from "@/lib/ai/rewrite";
import { DocumentStatus } from "../../generated/prisma";
import { asyncPoolWithProgress } from "@/lib/utils/asyncPool";
import { createErrorDetails } from "@/lib/utils/errorClassifier";

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

    await prisma.document.update({
      where: { id: documentId },
      data: {
        extractedText: text,
        pageCount,
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

    // ── Step 5: Mark as READY ──────────────────────────────────────────────
    // Document is now immediately usable! Users can start listening to original text.
    await prisma.document.update({
      where: { id: documentId },
      data: { status: DocumentStatus.READY },
    });

    console.log(
      `[process] ✅ Document ${documentId} READY — ${chunks.length} chunks, ${pageCount} pages`
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
    concurrency?: number;
  } = {}
): Promise<void> {
  const { mode = "audiobook", concurrency = 3 } = options;

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

    // ── Step 4: Rewrite chunks in parallel ────────────────────────────────
    console.log(`[rewrite] Starting parallel rewrite (concurrency: ${concurrency})...\n`);

    let completed = 0;
    const total = chunks.length;
    const startTime = Date.now();

    await asyncPoolWithProgress(
      concurrency,
      chunks,
      async (chunk, index) => {
        // Skip already rewritten chunks
        if (chunk.processed) {
          console.log(`[rewrite] Chunk ${index + 1}/${total} already rewritten, skipping`);
          return;
        }

        try {
          // Rewrite the chunk
          const rewritten = await rewriteChunk(chunk.text, {
            mode,
            skipShort: true,
          });

          // Save rewritten version to database
          await prisma.textChunk.update({
            where: { id: chunk.id },
            data: { processed: rewritten },
          });

          console.log(`[rewrite] ✅ Chunk ${index + 1}/${total} rewritten and saved`);
        } catch (error) {
          console.error(`[rewrite] ❌ Failed to rewrite chunk ${index + 1}/${total}:`, error);
          // Continue with other chunks - don't fail the whole batch
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
