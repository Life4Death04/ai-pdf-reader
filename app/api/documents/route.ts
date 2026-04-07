import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getUserByEmail } from "@/lib/services/userService";
import { getUserDocuments } from "@/lib/services/documentService";
import { withErrorHandler } from "@/lib/errors/errorHandler";

// GET /api/documents
// Returns all documents for the default user, newest first.
export const GET = withErrorHandler(async (request: NextRequest) => {
  const email = process.env.DEFAULT_USER_EMAIL ?? "default@localhost";

  const user = await getUserByEmail(email, prisma);
  if (!user) {
    return NextResponse.json({ data: [] });
  }

  const documents = await getUserDocuments(user.id, prisma);

  return NextResponse.json({ data: documents });
});
