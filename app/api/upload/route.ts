import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { getOrCreateDefaultUser } from "@/lib/services/userService";
import {
  validateFile,
  saveFileToDisk,
  createDocumentRecord,
} from "@/lib/services/uploadService";
import { runBackgroundProcessing, getProcessingConfig } from "@/lib/services/processingService";
import { withErrorHandler, assertValid } from "@/lib/errors/errorHandler";
import {
  ValidationError,
  UnsupportedMediaTypeError,
  PayloadTooLargeError,
} from "@/lib/errors/AppError";
import { rateLimiters, getClientIp } from "@/lib/security/rateLimit";
import { validatePdfFile } from "@/lib/security/fileValidation";
import { logAudit } from "@/lib/monitoring/audit";
import { withRequestLogging } from "@/lib/monitoring/requestLogger";

export const POST = withRequestLogging(
  withErrorHandler(async (request: NextRequest) => {
    // ── Rate limiting (3 uploads per 5 minutes per IP) ──
    await rateLimiters.upload(request);

    // ── Parse multipart form data (native Web API in Next.js App Router) ──
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      throw new ValidationError("No file provided");
    }

    // ── Advanced file validation (magic bytes, size, type) ──
    await validatePdfFile(file);



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
    const enableAiRewrite = formData.get("enableAiRewrite") === "true";
    void runBackgroundProcessing(document.id, {
      ...getProcessingConfig(),
      enableAiRewrite,
    });

    // ── Audit log ──────────────────────────────────────────────────────────
    logAudit({
      action: "document.upload",
      userId: user.id,
      ip: getClientIp(request),
      resourceId: document.id,
      resourceType: "document",
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        title: document.title,
      },
      success: true,
    });

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
  })
);
