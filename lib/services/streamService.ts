/**
 * Stream Service - Business logic for audio streaming
 * 
 * Handles audio streaming operations including:
 * - Document and chunk loading
 * - Audio generation orchestration
 * - Stream management
 */

import type { PrismaClient, Document, TextChunk } from "../../generated/prisma";
import { DocumentStatus, type ProcessingMode } from "../../types";
import { generateAudio } from "../tts/piper";
import {
  createWAVHeader,
  stripWAVHeader,
  generateSilence,
  estimateAudioDuration,
  calculateAudioSize,
} from "../tts/wav-utils";

export interface DocumentWithChunks extends Document {
  chunks: TextChunk[];
}

export interface StreamValidationResult {
  valid: boolean;
  error?: string;
  statusCode?: number;
  document?: DocumentWithChunks;
}

/**
 * Validate processing mode parameter.
 * 
 * @param mode - Processing mode string
 * @returns True if valid mode
 */
export function isValidProcessingMode(mode: string): mode is ProcessingMode {
  return ["FULL_TEXT", "SUMMARY", "PODCAST"].includes(mode.toUpperCase());
}

/**
 * Load document with chunks for streaming.
 * 
 * @param documentId - Document ID
 * @param mode - Processing mode
 * @param prisma - Prisma client instance
 * @returns Validation result with document or error
 */
export async function loadDocumentForStreaming(
  documentId: string,
  mode: ProcessingMode,
  prisma: PrismaClient
): Promise<StreamValidationResult> {
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
    return {
      valid: false,
      error: "Document not found",
      statusCode: 404,
    };
  }

  if (document.status !== DocumentStatus.READY) {
    return {
      valid: false,
      error: `Document not ready (status: ${document.status})`,
      statusCode: 400,
    };
  }

  if (document.chunks.length === 0) {
    return {
      valid: false,
      error: "No chunks found for this document and mode",
      statusCode: 404,
    };
  }

  return {
    valid: true,
    document: document as DocumentWithChunks,
  };
}

/**
 * Create streaming WAV header based on chunks.
 * 
 * @param chunks - Document chunks
 * @returns WAV header buffer
 */
export function createStreamHeader(chunks: TextChunk[]): Buffer {
  const totalText = chunks.map((c) => c.text).join(" ").length;
  const estimatedDuration = estimateAudioDuration(totalText);
  const estimatedSize = calculateAudioSize(estimatedDuration);
  
  return createWAVHeader(estimatedSize);
}

export interface ChunkStreamResult {
  pcmData?: Buffer;
  cached?: boolean;
  error?: Error;
  usedSilence?: boolean;
}

/**
 * Process a single chunk for streaming.
 * 
 * Generates audio via TTS or falls back to silence on error.
 * 
 * @param chunk - Chunk to process
 * @param documentId - Document ID for logging
 * @param index - Chunk index for progress reporting
 * @returns Processing result with PCM data or silence
 */
export async function processChunkForStream(
  chunk: TextChunk,
  documentId: string,
  index: number
): Promise<ChunkStreamResult> {
  const chunkId = `${documentId}#${chunk.index}`;

  try {
    // Generate audio for this chunk
    const result = await generateAudio({
      text: chunk.text,
      chunkId: chunkId,
      chunkIndex: index,
    });

    // Strip WAV header (we already sent the master header)
    const pcmData = stripWAVHeader(result.audioBuffer);

    return {
      pcmData,
      cached: result.cached,
    };
  } catch (error) {
    // TTS failed — return silence as fallback
    const chunkDuration = estimateAudioDuration(chunk.text.length);
    const silenceBuffer = generateSilence(chunkDuration);

    return {
      pcmData: silenceBuffer,
      error: error instanceof Error ? error : new Error(String(error)),
      usedSilence: true,
    };
  }
}

/**
 * Create headers for streaming response.
 * 
 * @param documentId - Document ID
 * @param mode - Processing mode
 * @param totalChunks - Total number of chunks
 * @returns HTTP headers object
 */
export function createStreamHeaders(
  documentId: string,
  mode: ProcessingMode,
  totalChunks: number
): Record<string, string> {
  return {
    "Content-Type": "audio/wav",
    "X-Document-Id": documentId,
    "X-Processing-Mode": mode,
    "X-Total-Chunks": totalChunks.toString(),
    "Cache-Control": "no-cache",
  };
}
