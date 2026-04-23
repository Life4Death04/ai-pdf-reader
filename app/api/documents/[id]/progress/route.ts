import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getUserByEmail } from "@/lib/services/userService";
import { withErrorHandler } from "@/lib/errors/errorHandler";
import { rateLimiters } from "@/lib/security/rateLimit";
import { withRequestLogging } from "@/lib/monitoring/requestLogger";

// GET /api/documents/[id]/progress
// Returns the saved playback position for the current user, or null.
export const GET = withRequestLogging(
  withErrorHandler(
    async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
      await rateLimiters.relaxed(request);

      const { id } = await params;
      const email = process.env.DEFAULT_USER_EMAIL ?? "default@localhost";
      const user = await getUserByEmail(email, prisma);

      if (!user) {
        return NextResponse.json({ data: null });
      }

      const progress = await prisma.playbackProgress.findUnique({
        where: { userId_documentId: { userId: user.id, documentId: id } },
        select: { time: true, chunkIndex: true, mode: true },
      });

      return NextResponse.json({ data: progress });
    }
  )
);

// PUT /api/documents/[id]/progress
// Upserts the playback position for the current user.
export const PUT = withRequestLogging(
  withErrorHandler(
    async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
      await rateLimiters.relaxed(request);

      const { id } = await params;
      const { time, chunkIndex, mode = "FULL_TEXT" } = await request.json();

      const email = process.env.DEFAULT_USER_EMAIL ?? "default@localhost";
      const user = await getUserByEmail(email, prisma);

      if (!user) {
        return NextResponse.json({ data: null });
      }

      const progress = await prisma.playbackProgress.upsert({
        where: { userId_documentId: { userId: user.id, documentId: id } },
        create: { userId: user.id, documentId: id, time, chunkIndex, mode },
        update: { time, chunkIndex, mode },
        select: { time: true, chunkIndex: true, mode: true },
      });

      return NextResponse.json({ data: progress });
    }
  )
);
