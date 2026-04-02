import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { generateAudio } from "@/lib/tts/piper";
import {
  createWAVHeader,
  stripWAVHeader,
  generateSilence,
  estimateAudioDuration,
  calculateAudioSize,
} from "@/lib/tts/wav-utils";
import { DocumentStatus, ProcessingMode } from "@/types";

/**
 * GET /api/stream?documentId={id}&mode={FULL_TEXT|SUMMARY|PODCAST}
 *
 * Streams audio for an entire document, chunk by chunk.
 *
 * Flow:
 * 1. Load document + chunks from database
 * 2. Send WAV header with estimated size
 * 3. For each chunk (in order):
 *    - Generate/retrieve audio via TTS (with retry)
 *    - Strip individual WAV headers
 *    - Send PCM data immediately
 *    - On failure: insert silence as fallback
 * 4. Close stream
 *
 * Response:
 *   - Content-Type: audio/wav
 *   - Transfer-Encoding: chunked (streaming)
 *   - Body: Complete WAV file (single header + concatenated PCM data)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const documentId = searchParams.get("documentId");
    const modeParam = searchParams.get("mode") || "FULL_TEXT";

    // ── Validation ─────────────────────────────────────────────────────────
    if (!documentId) {
      return NextResponse.json(
        { error: "Missing documentId parameter" },
        { status: 400 }
      );
    }

    const mode = modeParam.toUpperCase() as ProcessingMode;
    if (!["FULL_TEXT", "SUMMARY", "PODCAST"].includes(mode)) {
      return NextResponse.json(
        {
          error: "Invalid mode. Must be FULL_TEXT, SUMMARY, or PODCAST",
        },
        { status: 400 }
      );
    }

    // ── Load document and chunks ───────────────────────────────────────────
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: {
        chunks: {
          where: { mode },
          orderBy: { index: "asc" },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    if (document.status !== DocumentStatus.READY) {
      return NextResponse.json(
        {
          error: `Document not ready (status: ${document.status})`,
          status: document.status,
        },
        { status: 400 }
      );
    }

    if (document.chunks.length === 0) {
      return NextResponse.json(
        {
          error: "No chunks found for this document and mode",
          hint: "Document may need reprocessing for this mode",
        },
        { status: 404 }
      );
    }

    console.log(
      `[stream] Starting stream for doc ${documentId} (${document.chunks.length} chunks, mode: ${mode})`
    );

    // ── Create streaming response ──────────────────────────────────────────
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Step 1: Estimate total audio size and send WAV header
          const totalText = document.chunks
            .map((c) => c.text)
            .join(" ")
            .length;
          const estimatedDuration = estimateAudioDuration(totalText);
          const estimatedSize = calculateAudioSize(estimatedDuration);
          const wavHeader = createWAVHeader(estimatedSize);

          controller.enqueue(new Uint8Array(wavHeader));

          console.log(
            `[stream] WAV header sent (estimated: ${estimatedDuration}s, ${(estimatedSize / 1024 / 1024).toFixed(2)}MB)`
          );

          // Step 2: Stream each chunk's audio
          for (let i = 0; i < document.chunks.length; i++) {
            const chunk = document.chunks[i];
            const chunkId = `${documentId}#${chunk.index}`;

            try {
              console.log(
                `[stream] Processing chunk ${i + 1}/${document.chunks.length} (${chunkId})`
              );

              // Generate audio with retry logic (3 attempts with backoff)
              const result = await generateAudio({
                text: chunk.text,
                chunkId: chunkId,
                retries: 3,
              });

              // Strip WAV header (we already sent the master header)
              const pcmData = stripWAVHeader(result.audioBuffer);

              // Send PCM data immediately
              controller.enqueue(new Uint8Array(pcmData));

              console.log(
                `[stream] Chunk ${i + 1}/${document.chunks.length} sent (${(pcmData.length / 1024).toFixed(1)}KB, cached: ${result.cached})`
              );
            } catch (error) {
              // All retries failed — insert silence as fallback
              console.error(
                `[stream] Chunk ${i + 1}/${document.chunks.length} failed after retries:`,
                error
              );

              // Estimate chunk duration based on text length
              const chunkDuration = estimateAudioDuration(chunk.text.length);
              const silenceBuffer = generateSilence(chunkDuration);

              controller.enqueue(new Uint8Array(silenceBuffer));

              console.warn(
                `[stream] Inserted ${chunkDuration}s of silence for failed chunk ${chunkId}`
              );

              // TODO: Send progress event to frontend so it can show retry UI
              // This could be done via Server-Sent Events or a separate polling endpoint
            }
          }

          // Step 3: Close the stream
          controller.close();
          console.log(
            `[stream] Stream complete for document ${documentId}`
          );
        } catch (error) {
          console.error("[stream] Stream error:", error);
          controller.error(error);
        }
      },
    });

    // Return streaming response
    return new Response(stream, {
      headers: {
        "Content-Type": "audio/wav",
        "X-Document-Id": documentId,
        "X-Processing-Mode": mode,
        "X-Total-Chunks": document.chunks.length.toString(),
        "Cache-Control": "no-cache", // Don't cache the full stream (individual chunks are cached)
        // Note: Content-Length is omitted — this signals chunked transfer encoding
      },
    });
  } catch (error) {
    console.error("[stream] Error:", error);

    const message =
      error instanceof Error ? error.message : "Streaming failed";

    return NextResponse.json(
      {
        error: message,
        details: "Check server logs for more information",
      },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// Future Enhancement: Progress Tracking
// ─────────────────────────────────────────────

/**
 * TODO: Add real-time progress updates for the frontend.
 *
 * Approach 1: Server-Sent Events (SSE)
 * Create a separate endpoint: GET /api/stream/progress?documentId={id}
 *
 * ```typescript
 * export async function GET(request: NextRequest) {
 *   const encoder = new TextEncoder();
 *   const stream = new ReadableStream({
 *     start(controller) {
 *       // Send progress events
 *       controller.enqueue(encoder.encode(`data: ${JSON.stringify({
 *         type: 'chunk_processing',
 *         chunk: 5,
 *         total: 50,
 *         retrying: false
 *       })}\n\n`));
 *     }
 *   });
 *
 *   return new Response(stream, {
 *     headers: {
 *       'Content-Type': 'text/event-stream',
 *       'Cache-Control': 'no-cache',
 *       'Connection': 'keep-alive'
 *     }
 *   });
 * }
 * ```
 *
 * Frontend usage:
 * ```typescript
 * const eventSource = new EventSource('/api/stream/progress?documentId=abc');
 * eventSource.onmessage = (e) => {
 *   const data = JSON.parse(e.data);
 *   if (data.retrying) {
 *     showRetryUI(data.chunk);
 *   }
 * };
 * ```
 *
 * Approach 2: Polling
 * Store progress in Redis/DB, frontend polls GET /api/progress/{documentId}
 * Simpler but less real-time.
 */
