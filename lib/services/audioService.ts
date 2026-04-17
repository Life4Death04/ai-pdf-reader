/**
 * Audio Service - Orchestrates TTS generation, S3 upload, and DB persistence
 *
 * Handles the full lifecycle of audio chunks:
 * - Generate audio via Piper TTS
 * - Upload to S3
 * - Store metadata in DB (AudioChunk)
 * - Deduplication (skip if already exists)
 * - Cleanup on document deletion
 */

import { prisma } from "../prisma/prisma";
import type { AudioChunk } from "../../generated/prisma";
import { ChunkStatus } from "../../generated/prisma";
import { generateAudio } from "../tts/piper";
import { parseWavDuration } from "../tts/wav-utils";
import { uploadAudioToS3, deleteDocumentAudioFromS3 } from "../storage/s3";
import { updateDocumentProgress } from "./documentService";

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

/**
 * Generate audio for a single chunk and store in S3.
 * Skips generation if an AudioChunk already exists (deduplication).
 *
 * @param params.documentId - Document ID
 * @param params.chunkIndex - Chunk index (0-based)
 * @param params.text - Text content to convert to audio
 * @returns The existing or newly created AudioChunk record
 */
export async function generateAndStoreChunkAudio(params: {
  documentId: string;
  chunkIndex: number;
  text: string;
}): Promise<AudioChunk> {
  const { documentId, chunkIndex, text } = params;

  // Deduplication: check if audio already exists for this chunk
  const existing = await prisma.audioChunk.findUnique({
    where: { documentId_chunkIndex: { documentId, chunkIndex } },
  });

  if (existing) {
    console.log(
      `[audioService] Chunk ${chunkIndex} of ${documentId} already exists, skipping`
    );
    // Ensure the TextChunk reflects DONE even on a re-run
    await prisma.textChunk.updateMany({
      where: { documentId, index: chunkIndex, mode: "FULL_TEXT" },
      data: { status: ChunkStatus.DONE },
    });
    await updateDocumentProgress(documentId, prisma);
    return existing;
  }

  // Mark chunk as generating so the frontend can show progress
  await prisma.textChunk.updateMany({
    where: { documentId, index: chunkIndex, mode: "FULL_TEXT" },
    data: { status: ChunkStatus.GENERATING_AUDIO },
  });

  // Generate audio via TTS
  const ttsResult = await generateAudio({
    text,
    chunkId: `${documentId}#${chunkIndex}`,
    chunkIndex,
  });

  // Parse actual duration from WAV buffer
  const duration = parseWavDuration(ttsResult.audioBuffer);

  // Upload to S3
  const { s3Key, s3Url } = await uploadAudioToS3({
    buffer: ttsResult.audioBuffer,
    documentId,
    chunkIndex,
  });

  // Persist metadata in DB
  const audioChunk = await prisma.audioChunk.create({
    data: {
      documentId,
      chunkIndex,
      s3Key,
      s3Url,
      duration,
    },
  });

  // Mark chunk DONE and update document-level progress/status
  await prisma.textChunk.updateMany({
    where: { documentId, index: chunkIndex, mode: "FULL_TEXT" },
    data: { status: ChunkStatus.DONE },
  });
  await updateDocumentProgress(documentId, prisma);

  console.log(
    `[audioService] Stored chunk ${chunkIndex} of ${documentId} (${duration.toFixed(1)}s, ${(ttsResult.audioBuffer.length / 1024).toFixed(1)}KB)`
  );

  return audioChunk;
}

/**
 * Generate and store audio for all chunks of a document.
 * Processes sequentially to avoid overwhelming the TTS service.
 * Errors on individual chunks are logged but don't abort the batch.
 *
 * @param documentId - Document ID to generate audio for
 */
export async function generateAllChunkAudio(
  documentId: string
): Promise<void> {
  const chunks = await prisma.textChunk.findMany({
    where: { documentId, mode: "FULL_TEXT" },
    orderBy: { index: "asc" },
    select: { index: true, text: true, processed: true },
  });

  if (chunks.length === 0) {
    console.log(
      `[audioService] No chunks found for document ${documentId}, skipping audio generation`
    );
    return;
  }

  console.log(
    `[audioService] Starting audio generation for ${chunks.length} chunks of document ${documentId}`
  );

  let successCount = 0;

  for (const chunk of chunks) {
    try {
      // Use AI-rewritten text if available, otherwise original
      const text = chunk.processed ?? chunk.text;

      await generateAndStoreChunkAudio({
        documentId,
        chunkIndex: chunk.index,
        text,
      });

      successCount++;
      console.log(
        `[audioService] Progress: ${successCount}/${chunks.length} chunks for document ${documentId}`
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[audioService] Failed to generate audio for chunk ${chunk.index} of ${documentId}: ${message}`
      );
      // Mark the chunk as ERROR so the frontend can reflect the failure
      await prisma.textChunk.updateMany({
        where: { documentId, index: chunk.index, mode: "FULL_TEXT" },
        data: { status: ChunkStatus.ERROR },
      }).catch(() => {});
      await updateDocumentProgress(documentId, prisma);
      // Continue with next chunk — don't abort the batch
    }
  }

  console.log(
    `[audioService] Completed: ${successCount}/${chunks.length} chunks for document ${documentId}`
  );

  // Update document.audioDuration with the sum of actual chunk durations.
  // This overwrites the rough text-based estimate written during processDocument(),
  // which runs before any audio exists and can be 20–30% off.
  try {
    const audioChunks = await prisma.audioChunk.findMany({
      where: { documentId },
      select: { duration: true },
    });

    const totalDuration = audioChunks.reduce(
      (sum, c) => sum + (c.duration ?? 0),
      0
    );

    if (totalDuration > 0) {
      await prisma.document.update({
        where: { id: documentId },
        data: { audioDuration: totalDuration },
      });
      console.log(
        `[audioService] Updated document ${documentId} audioDuration: ${totalDuration.toFixed(1)}s (${(totalDuration / 60).toFixed(2)} min)`
      );
    }
  } catch (error) {
    console.error(
      `[audioService] Failed to update audioDuration for ${documentId}:`,
      error
    );
  }
}

/**
 * Get all audio chunks for a document, ordered by index.
 *
 * @param documentId - Document ID
 * @returns Array of AudioChunk records
 */
export async function getAudioChunksForDocument(
  documentId: string
): Promise<AudioChunk[]> {
  return prisma.audioChunk.findMany({
    where: { documentId },
    orderBy: { chunkIndex: "asc" },
  });
}

/**
 * Delete all audio for a document from S3 and the database.
 *
 * @param documentId - Document ID
 * @returns Number of audio chunks deleted
 */
export async function deleteDocumentAudio(
  documentId: string
): Promise<number> {
  const audioChunks = await prisma.audioChunk.findMany({
    where: { documentId },
    select: { s3Key: true },
  });

  if (audioChunks.length === 0) return 0;

  // Delete from S3
  const keys = audioChunks.map((c) => c.s3Key);
  await deleteDocumentAudioFromS3(keys);

  // Delete DB records
  const { count } = await prisma.audioChunk.deleteMany({
    where: { documentId },
  });

  console.log(
    `[audioService] Deleted ${count} audio chunks for document ${documentId}`
  );

  return count;
}
