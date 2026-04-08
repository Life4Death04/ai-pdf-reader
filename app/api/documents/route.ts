import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getUserByEmail } from "@/lib/services/userService";
import { getUserDocuments } from "@/lib/services/documentService";
import { withErrorHandler } from "@/lib/errors/errorHandler";
import { rateLimiters } from "@/lib/security/rateLimit";
import { withRequestLogging } from "@/lib/monitoring/requestLogger";

// GET /api/documents
// Returns all documents for the default user, newest first.
export const GET = withRequestLogging(
  withErrorHandler(async (request: NextRequest) => {
    // ── Rate limiting ───────────────────────────────────────────────────────
    await rateLimiters.relaxed(request);

    const email = process.env.DEFAULT_USER_EMAIL ?? "default@localhost";

    const user = await getUserByEmail(email, prisma);
    if (!user) {
      return NextResponse.json({ data: [] });
    }

    const documents = await getUserDocuments(user.id, prisma);

    return NextResponse.json({ data: documents });
  })
);
