import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma/prisma";
import { extractTextFromPDF } from "@/lib/pdf/extract";
import { chunkText } from "@/lib/chunker/chunk";
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
    const chunks = chunkText(text);

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

    // ── Step 4: Mark as ready ──────────────────────────────────────────────
    await prisma.document.update({
      where: { id: documentId },
      data: { status: DocumentStatus.READY },
    });

    console.log(
      `[process] Document ${documentId} ready — ${chunks.length} chunks, ${pageCount} pages`
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
