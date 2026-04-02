import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";

// GET /api/documents/[id]
// Returns document status and metadata. Used by the frontend to poll
// for processing completion after upload.
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const document = await prisma.document.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      fileName: true,
      fileSize: true,
      pageCount: true,
      status: true,
      createdAt: true,
      _count: { select: { chunks: true } },
    },
  });

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  return NextResponse.json({ data: document });
}
