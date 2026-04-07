import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getOrCreateDefaultUser } from "@/lib/services/userService";
import {
  validateFile,
  saveFileToDisk,
  createDocumentRecord,
} from "@/lib/services/uploadService";
import { runBackgroundProcessing } from "@/lib/services/processingService";

export async function POST(request: NextRequest) {
  try {
    // ── Parse multipart form data (native Web API in Next.js App Router) ──
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // ── Validate file ──────────────────────────────────────────────────────
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.statusCode }
      );
    }

    // ── Save file to disk ──────────────────────────────────────────────────
    const fileInfo = await saveFileToDisk(file);

    // ── Get or create the default user (no auth yet — Phase will add this) ─
    const email = process.env.DEFAULT_USER_EMAIL ?? "default@localhost";
    const user = await getOrCreateDefaultUser(email, prisma);

    // ── Create Document record in DB (status: UPLOADED) ───────────────────
    const document = await createDocumentRecord(
      {
        title: fileInfo.cleanTitle,
        fileName: file.name,
        fileUrl: fileInfo.filePath,
        fileSize: file.size,
        userId: user.id,
      },
      prisma
    );

    // ── Fire-and-forget background processing ─────────────────────────────
    // We do NOT await this. The response is sent immediately and processing
    // continues in the background, updating document.status as it progresses.
    void runBackgroundProcessing(document.id);

    return NextResponse.json(
      {
        data: {
          documentId: document.id,
          title: document.title,
          status: document.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[upload] Error:", error);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
