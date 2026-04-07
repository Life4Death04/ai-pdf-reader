import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import {
  getDocumentById,
  deleteDocumentWithCleanup,
} from "@/lib/services/documentService";

// GET /api/documents/[id]
// Returns document status and metadata. Used by the frontend to poll
// for processing completion after upload.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const document = await getDocumentById(id, prisma);

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

    const result = await deleteDocumentWithCleanup(id, prisma);

    if (!result) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Document deleted successfully",
      deleted: {
        document: result.documentId,
        chunks: result.chunksDeleted,
        audioFiles: result.audioFilesDeleted,
        pdfFile: result.pdfPath,
      },
    });
  } catch (error) {
    console.error("[delete] Error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to delete document";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
