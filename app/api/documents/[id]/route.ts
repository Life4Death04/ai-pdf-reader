import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { clearDocumentAudioCache } from "@/lib/tts/piper";
import fs from "fs/promises";

// GET /api/documents/[id]
// Returns document status and metadata. Used by the frontend to poll
// for processing completion after upload.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      fileName: true,
      fileSize: true,
      pageCount: true,
      status: true,
      createdAt: true,
      _count: { select: { chunks: true } },
    },
  });

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  return NextResponse.json({ data: document });
}

// DELETE /api/documents/[id]
// Deletes a document and all associated resources:
// - Database record (chunks cascade automatically via Prisma schema)
// - PDF file from disk
// - Cached audio files
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // ── Step 1: Load document with chunks ─────────────────────────────────
    const document = await prisma.document.findUnique({
      where: { id },
      include: { chunks: { select: { text: true } } },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // ── Step 2: Delete cached audio files ─────────────────────────────────
    const chunkTexts = document.chunks.map((c) => c.text);
    const deletedAudioFiles = await clearDocumentAudioCache(chunkTexts);

    console.log(
      `[delete] Cleared ${deletedAudioFiles} audio cache files for document ${id}`
    );

    // ── Step 3: Delete PDF file from disk ─────────────────────────────────
    try {
      await fs.unlink(document.fileUrl);
      console.log(`[delete] Deleted PDF file: ${document.fileUrl}`);
    } catch (error) {
      console.warn(
        `[delete] Failed to delete PDF file (may not exist): ${document.fileUrl}`,
        error
      );
      // Don't fail the whole deletion if file doesn't exist
    }

    // ── Step 4: Delete document from database ─────────────────────────────
    // This also cascades to delete all chunks (via Prisma schema)
    await prisma.document.delete({ where: { id } });

    console.log(
      `[delete] Deleted document ${id} (${document.chunks.length} chunks, ${deletedAudioFiles} audio files)`
    );

    return NextResponse.json({
      message: "Document deleted successfully",
      deleted: {
        document: id,
        chunks: document.chunks.length,
        audioFiles: deletedAudioFiles,
        pdfFile: document.fileUrl,
      },
    });
  } catch (error) {
    console.error("[delete] Error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to delete document";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
