import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import type { ProcessingMode } from "@/types";
import {
  isValidProcessingMode,
  loadDocumentForStreaming,
  createStreamHeader,
  processChunkForStream,
  createStreamHeaders,
} from "@/lib/services/streamService";
import { withErrorHandler, assertValid } from "@/lib/errors/errorHandler";
import { ValidationError, NotFoundError } from "@/lib/errors/AppError";

/**
 * GET /api/stream?documentId={id}&mode={FULL_TEXT|SUMMARY|PODCAST}
 *
 * Streams audio for an entire document, chunk by chunk.
 *
 * Flow:
 * 1. Load document + chunks from database
 * 2. Send WAV header with estimated size
 * 3. For first 2 chunks only:
 *    - Generate/retrieve audio via TTS
 *    - Strip individual WAV headers
 *    - Send PCM data immediately
 *    - On failure: insert silence as fallback
 * 4. For remaining chunks: insert silence
 * 5. Close stream
 *
 * Response:
 *   - Content-Type: audio/wav
 *   - Transfer-Encoding: chunked (streaming)
 *   - Body: Complete WAV file (single header + concatenated PCM data)
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const documentId = searchParams.get("documentId");
  const modeParam = searchParams.get("mode") || "FULL_TEXT";

  // ── Validation ─────────────────────────────────────────────────────────
  assertValid(documentId, "Missing documentId parameter");

  if (!isValidProcessingMode(modeParam)) {
    throw new ValidationError(
      "Invalid mode. Must be FULL_TEXT, SUMMARY, or PODCAST"
    );
  }

  const mode = modeParam.toUpperCase() as ProcessingMode;

  // ── Load document and chunks ───────────────────────────────────────────
  const validation = await loadDocumentForStreaming(documentId, mode, prisma);

  if (!validation.valid || !validation.document) {
    if (validation.statusCode === 404) {
      throw new NotFoundError(validation.error);
    }
    throw new ValidationError(validation.error ?? "Failed to load document");
  }

  const document = validation.document;

  console.log(
    `[stream] Starting stream for doc ${documentId} (${document.chunks.length} chunks, mode: ${mode})`
  );

    // ── Create streaming response ──────────────────────────────────────────
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Step 1: Send WAV header
          const wavHeader = createStreamHeader(document.chunks);
          controller.enqueue(new Uint8Array(wavHeader));

          console.log(`[stream] WAV header sent`);

          // Step 2: Stream each chunk's audio
          for (let i = 0; i < document.chunks.length; i++) {
            // Check if client disconnected before processing next chunk
            if (request.signal?.aborted) {
              console.log(
                `[stream] ⚠️  Client disconnected at chunk ${i + 1}/${document.chunks.length}. Stopping stream.`
              );
              controller.close();
              return;
            }

            const chunk = document.chunks[i];
            const result = await processChunkForStream(
              chunk,
              documentId,
              i
            );

            // Send PCM data (may fail if client disconnected)
            try {
              if (result.pcmData) {
                controller.enqueue(new Uint8Array(result.pcmData));
              }
            } catch (enqueueError) {
              console.log(
                `[stream] Failed to enqueue chunk ${i + 1} - client likely disconnected`
              );
              controller.close();
              return;
            }

            // Log result
            if (result.error) {
              console.error(
                `[stream] Chunk ${i + 1}/${document.chunks.length} TTS failed:`,
                result.error
              );
              console.warn(
                `[stream] Inserted silence for failed chunk ${documentId}#${chunk.index}`
              );
            } else {
              console.log(
                `[stream] Chunk ${i + 1}/${document.chunks.length} sent (${((result.pcmData?.length ?? 0) / 1024).toFixed(1)}KB, cached: ${result.cached ?? false})`
              );
            }
          }

          // Step 3: Close the stream
          controller.close();
          console.log(
            `[stream] ✅ Stream completed successfully for document ${documentId} (${document.chunks.length} chunks)`
          );
        } catch (error) {
          console.error("[stream] Stream error:", error);
          controller.error(error);
        }
      },
    });

  // Return streaming response
  return new Response(stream, {
    headers: createStreamHeaders(documentId, mode, document.chunks.length),
  });
});

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
