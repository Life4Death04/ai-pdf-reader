import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getOrCreateDefaultUser } from "@/lib/services/userService";
import {
  validateFile,
  saveFileToDisk,
  createDocumentRecord,
} from "@/lib/services/uploadService";
import { runBackgroundProcessing } from "@/lib/services/processingService";
import { withErrorHandler, assertValid } from "@/lib/errors/errorHandler";
import {
  ValidationError,
  UnsupportedMediaTypeError,
  PayloadTooLargeError,
} from "@/lib/errors/AppError";

export const POST = withErrorHandler(async (request: NextRequest) => {
  // ── Parse multipart form data (native Web API in Next.js App Router) ──
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    throw new ValidationError("No file provided");
  }

  // ── Validate file ──────────────────────────────────────────────────────
  const validation = validateFile(file);
  if (!validation.valid) {
    // Map validation to proper error types
    if (validation.statusCode === 415) {
      throw new UnsupportedMediaTypeError(validation.error);
    }
    if (validation.statusCode === 413) {
      throw new PayloadTooLargeError(validation.error);
    }
    throw new ValidationError(validation.error ?? "File validation failed");
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
});
