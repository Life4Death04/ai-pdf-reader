import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { rewriteDocumentChunks } from "@/lib/pdf/process";
import { getProcessingConfig } from "@/lib/services/processingService";
import { withErrorHandler, assertFound } from "@/lib/errors/errorHandler";
import { rateLimiters } from "@/lib/security/rateLimit";
import { withRequestLogging } from "@/lib/monitoring/requestLogger";

export const POST = withRequestLogging(
  withErrorHandler(
    async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
      await rateLimiters.standard(request);

      const { id } = await params;

      const document = await prisma.document.findUnique({
        where: { id },
        select: { id: true, status: true },
      });

      assertFound(document, "Document not found", { documentId: id });

      const { rewriteMode, aiConcurrency } = getProcessingConfig();

      void rewriteDocumentChunks(id, {
        mode: rewriteMode,
        concurrency: aiConcurrency,
      });

      return NextResponse.json(
        { data: { documentId: id, status: "rewriting" } },
        { status: 202 }
      );
    }
  )
);
