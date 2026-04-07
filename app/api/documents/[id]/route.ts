import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import {
  getDocumentById,
  deleteDocumentWithCleanup,
} from "@/lib/services/documentService";
import { withErrorHandler, assertFound } from "@/lib/errors/errorHandler";
import { NotFoundError } from "@/lib/errors/AppError";

// GET /api/documents/[id]
// Returns document status and metadata. Used by the frontend to poll
// for processing completion after upload.
export const GET = withErrorHandler(
  async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const document = await getDocumentById(id, prisma);
    assertFound(document, "Document not found", { documentId: id });

    return NextResponse.json({ data: document });
  }
);

// DELETE /api/documents/[id]
// Deletes a document and all associated resources:
// - Database record (chunks cascade automatically via Prisma schema)
// - PDF file from disk
// - Cached audio files
export const DELETE = withErrorHandler(
  async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const result = await deleteDocumentWithCleanup(id, prisma);
    assertFound(result, "Document not found", { documentId: id });

    return NextResponse.json({
      message: "Document deleted successfully",
      deleted: {
        document: result.documentId,
        chunks: result.chunksDeleted,
        audioFiles: result.audioFilesDeleted,
        pdfFile: result.pdfPath,
      },
    });
  }
);
