import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { withErrorHandler, assertValid } from "@/lib/errors/errorHandler";
import { NotFoundError } from "@/lib/errors/AppError";
import { rateLimiters } from "@/lib/security/rateLimit";
import { withRequestLogging } from "@/lib/monitoring/requestLogger";

/**
 * GET /api/audio?docId={id}
 *
 * Returns all audio chunks for a document, ordered by index.
 * Each chunk includes its S3 URL for direct playback and optional duration.
 *
 * Used by the frontend AudioPlayer to load chunk-based audio from S3
 * instead of streaming a single concatenated WAV from the backend.
 */
export const GET = withRequestLogging(
  withErrorHandler(async (request: NextRequest) => {
    await rateLimiters.standard(request);

    const { searchParams } = request.nextUrl;
    const docId = searchParams.get("docId");

    assertValid(docId, "Missing docId parameter");

    // Verify document exists
    const document = await prisma.document.findUnique({
      where: { id: docId },
      select: { id: true, status: true, title: true },
    });

    if (!document) {
      throw new NotFoundError("Document not found");
    }

    // Fetch audio chunks ordered by index
    const audioChunks = await prisma.audioChunk.findMany({
      where: { documentId: docId },
      orderBy: { chunkIndex: "asc" },
      select: {
        id: true,
        chunkIndex: true,
        s3Url: true,
        duration: true,
      },
    });

    return NextResponse.json({
      data: {
        documentId: docId,
        totalChunks: audioChunks.length,
        chunks: audioChunks,
      },
    });
  })
);
