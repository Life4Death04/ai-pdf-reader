import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

// GET /api/documents
// Returns all documents for the default user, newest first.
export async function GET() {
  const email = process.env.DEFAULT_USER_EMAIL ?? "default@localhost";

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ data: [] });
  }

  const documents = await prisma.document.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      fileName: true,
      fileSize: true,
      pageCount: true,
      status: true,
      createdAt: true,
      errorMessage: true,
      errorCode: true,
      failedAt: true,
      _count: { select: { chunks: true } },
    },
  });

  return NextResponse.json({ data: documents });
}
