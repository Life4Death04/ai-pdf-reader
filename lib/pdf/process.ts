import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma/prisma";
import { extractTextFromPDF } from "@/lib/pdf/extract";
import { chunkTextWithFiltering } from "@/lib/chunker/chunk";
import { rewriteChunk, checkOllamaHealth, warmupModel } from "@/lib/ai/rewrite";
import { DocumentStatus } from "../../generated/prisma";

/**
 * Processes a document through the full pipeline:
 *   UPLOADED → EXTRACTING → CHUNKING → READY (or ERROR on failure)
 *
 * This function runs asynchronously after the upload response is sent.
 * It updates the document status in the DB at each step so the frontend
 * can poll and show progress.
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

    console.log(`[process] Generated ${chunks.length} chunks`);

    // ── Step 4: AI Rewrite Chunks (Optional) ──────────────────────────────
    // Transforms chunks into natural audiobook-style narration
    // This step is OPTIONAL - controlled by environment variable
    const shouldRewrite = process.env.ENABLE_AI_REWRITE === "true";
    let finalChunks = chunks;

    if (shouldRewrite) {
      console.log("[process] AI rewrite enabled - checking Ollama health...");
      
      const ollamaHealthy = await checkOllamaHealth();
      
      if (ollamaHealthy) {
        console.log("[process] Ollama healthy - starting rewrite process...");
        
        // Update status to show we're rewriting
        await prisma.document.update({
          where: { id: documentId },
          data: { status: DocumentStatus.CHUNKING }, // We'll use CHUNKING status for rewriting too
        });

        // ── Warmup: Pre-load model into memory ──────────────────────────────
        console.log("[process] Warming up model...");
        await warmupModel();

        // Rewrite each chunk sequentially
        const rewrittenTexts: string[] = [];
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          console.log(`\n[process] Rewriting chunk ${i + 1}/${chunks.length} (${chunk.text.length} chars)`);
          
          const rewritten = await rewriteChunk(chunk.text, {
            mode: "podcast", // Default mode - can be made configurable later
            skipShort: true,
          });
          
          rewrittenTexts.push(rewritten);
          
          // Log progress every 10 chunks
          if ((i + 1) % 10 === 0) {
            console.log(`[process] Progress: ${i + 1}/${chunks.length} chunks rewritten`);
          }
        }

        // Replace chunk texts with rewritten versions
        finalChunks = chunks.map((chunk, index) => ({
          ...chunk,
          text: rewrittenTexts[index],
          // Recalculate token count for rewritten text
          tokenCount: Math.ceil(rewrittenTexts[index].length / 4),
        }));

        console.log(`\n[process] ✅ All chunks rewritten successfully`);
      } else {
        console.log("[process] ⚠️  Ollama not available - skipping rewrite, using original chunks");
      }
    } else {
      console.log("[process] AI rewrite disabled (set ENABLE_AI_REWRITE=true to enable)");
    }

    // ── Step 5: Save Chunks to Database ───────────────────────────────────
    // Batch-insert all chunks. We use createMany for efficiency — one round
    // trip instead of N inserts. skipDuplicates protects against retries.
    await prisma.textChunk.createMany({
      data: finalChunks.map((chunk) => ({
        documentId,
        index: chunk.index,
        text: chunk.text,
        tokenCount: chunk.tokenCount,
      })),
      skipDuplicates: true,
    });

    // ── Step 6: Mark as ready ──────────────────────────────────────────────
    await prisma.document.update({
      where: { id: documentId },
      data: { status: DocumentStatus.READY },
    });

    console.log(
      `[process] Document ${documentId} ready — ${finalChunks.length} chunks, ${pageCount} pages`
    );
  } catch (error) {
    console.error(`[process] Failed to process document ${documentId}:`, error);

    // Best-effort status update — don't throw (we're in a fire-and-forget context)
    await prisma.document
      .update({
        where: { id: documentId },
        data: { status: DocumentStatus.ERROR },
      })
      .catch(() => {});
  }
}

// ─────────────────────────────────────────────
// File storage helpers (used by the upload route)
// ─────────────────────────────────────────────

export function getUploadDir(): string {
  return path.resolve(process.cwd(), process.env.UPLOAD_DIR ?? "uploads");
}

export function buildFilePath(uploadDir: string, fileName: string): string {
  return path.join(uploadDir, fileName);
}

/**
 * Ensures the upload directory exists. Called once at startup or on first upload.
 */
export async function ensureUploadDir(): Promise<void> {
  const dir = getUploadDir();
  await fs.mkdir(dir, { recursive: true });
}
