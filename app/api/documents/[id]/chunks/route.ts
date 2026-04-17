import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { withErrorHandler } from "@/lib/errors/errorHandler";
import { rateLimiters } from "@/lib/security/rateLimit";
import { withRequestLogging } from "@/lib/monitoring/requestLogger";

export const GET = withRequestLogging(
  withErrorHandler(
    async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
      await rateLimiters.relaxed(_request);

      const { id } = await params;

      const chunks = await prisma.textChunk.findMany({
        where: { documentId: id, mode: "FULL_TEXT" },
        select: { index: true, text: true, processed: true },
        orderBy: { index: "asc" },
      });

      return NextResponse.json({ data: { chunks } });
    }
  )
);
