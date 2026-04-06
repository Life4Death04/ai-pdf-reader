import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma/prisma";
import { processDocument, rewriteDocumentChunks } from "@/lib/pdf/process";
import { ensureUploadDir, getUploadDir, buildFilePath } from "@/lib/utils/utils";

const MAX_FILE_SIZE_BYTES =
  parseInt(process.env.MAX_FILE_SIZE_MB ?? "50", 10) * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // ── Parse multipart form data (native Web API in Next.js App Router) ──
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // ── Validate file type ─────────────────────────────────────────────────
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are accepted" },
        { status: 415 }
      );
    }

    // ── Validate file size ─────────────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size is ${process.env.MAX_FILE_SIZE_MB ?? 50}MB`,
        },
        { status: 413 }
      );
    }

    // ── Read file into buffer ──────────────────────────────────────────────
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ── Save file to disk ──────────────────────────────────────────────────
    await ensureUploadDir();
    const uploadDir = getUploadDir();
    // Store as UUID to prevent path traversal and filename collisions
    const storedFileName = `${uuidv4()}.pdf`;
    const filePath = buildFilePath(uploadDir, storedFileName);
    await fs.writeFile(filePath, buffer);

    // ── Derive a clean document title from the original filename ───────────
    const title = path
      .basename(file.name, ".pdf")
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // ── Get or create the default user (no auth yet — Phase will add this) ─
    const user = await getOrCreateDefaultUser();

    // ── Create Document record in DB (status: UPLOADED) ───────────────────
    const document = await prisma.document.create({
      data: {
        title,
        fileName: file.name,
        fileUrl: filePath, // absolute path on disk
        fileSize: file.size,
        userId: user.id,
      },
    });

    // ── Fire-and-forget background processing ─────────────────────────────
    // We do NOT await this. The response is sent immediately and processing
    // continues in the background, updating document.status as it progresses.
    // 
    // Two-phase processing:
    // 1. FAST PATH: Extract + Chunk → Document becomes READY (2-5 seconds)
    // 2. SLOW PATH (optional): AI rewrite chunks in background (30-60 minutes)
    void (async () => {
      try {
        // Phase 1: Fast path - extract and chunk
        await processDocument(document.id);
        
        // Phase 2: Slow path - optionally rewrite chunks
        if (process.env.ENABLE_AI_REWRITE === "true") {
          console.log(`[upload] Document ${document.id} is READY. Starting AI rewrite in background...`);
          await rewriteDocumentChunks(document.id, {
            mode: "audiobook",
            concurrency: 3, // Process 3 chunks at once
          });
        }
      } catch (error) {
        console.error(`[upload] Background processing failed for ${document.id}:`, error);
      }
    })();

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

// ─────────────────────────────────────────────
// Default user (placeholder until auth is added)
// ─────────────────────────────────────────────

/**
 * For a personal single-user app, we create one "default" user on first use.
 * This will be replaced by real session-based auth in a later phase.
 * The email is read from the environment to allow easy customization.
 */
async function getOrCreateDefaultUser() {
  const email = process.env.DEFAULT_USER_EMAIL ?? "default@localhost";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;

  return prisma.user.create({
    data: { email },
  });
}
