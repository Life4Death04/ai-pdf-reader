import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import {
  getDocumentById,
  deleteDocumentWithCleanup,
} from "@/lib/services/documentService";
import { withErrorHandler, assertFound } from "@/lib/errors/errorHandler";
import { NotFoundError } from "@/lib/errors/AppError";
import { rateLimiters, getClientIp } from "@/lib/security/rateLimit";
import { logAudit } from "@/lib/monitoring/audit";
import { withRequestLogging } from "@/lib/monitoring/requestLogger";

// GET /api/documents/[id]
// Returns document status and metadata. Used by the frontend to poll
// for processing completion after upload.
export const GET = withRequestLogging(
  withErrorHandler(
    async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
      // ── Rate limiting ───────────────────────────────────────────────────────
      await rateLimiters.relaxed(_request);

      const { id } = await params;

      const document = await getDocumentById(id, prisma);
      assertFound(document, "Document not found", { documentId: id });

      return NextResponse.json({ data: document });
    }
  )
);

// DELETE /api/documents/[id]
// Deletes a document and all associated resources:
// - Database record (chunks cascade automatically via Prisma schema)
// - PDF file from disk
// - Cached audio files
export const DELETE = withRequestLogging(
  withErrorHandler(
    async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
      // ── Rate limiting ───────────────────────────────────────────────────────
      await rateLimiters.standard(request);

      const { id } = await params;

      const result = await deleteDocumentWithCleanup(id, prisma);
      assertFound(result, "Document not found", { documentId: id });

      // ── Audit log ──────────────────────────────────────────────────────────
      logAudit({
        action: "document.delete",
        ip: getClientIp(request),
        resourceId: result.documentId,
        resourceType: "document",
        metadata: {
          chunksDeleted: result.chunksDeleted,
          audioFilesDeleted: result.audioFilesDeleted,
        },
        success: true,
      });

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
  )
);
