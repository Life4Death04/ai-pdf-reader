/**
 * Document Service - Business logic for document operations
 * 
 * This service handles all document-related operations including:
 * - Creating documents
 * - Retrieving documents
 * - Deleting documents
 * - Document processing orchestration
 */

import type { PrismaClient } from "../../generated/prisma";
import type { Document } from "../../generated/prisma";
import { clearDocumentAudioCache } from "../tts/piper";
import { deleteFileFromDisk } from "./uploadService";

/**
 * Get all documents for a user, ordered by most recent first.
 * 
 * @param userId - The user's ID
 * @param prisma - Prisma client instance
 * @returns Array of documents with chunk counts
 */
export async function getUserDocuments(
  userId: string,
  prisma: PrismaClient
): Promise<Array<Document & { _count: { chunks: number } }>> {
  return prisma.document.findMany({
    where: { userId },
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
  }) as Promise<Array<Document & { _count: { chunks: number } }>>;
}

/**
 * Get a single document by ID with metadata.
 * 
 * @param documentId - The document's ID
 * @param prisma - Prisma client instance
 * @returns Document with chunk count or null if not found
 */
export async function getDocumentById(
  documentId: string,
  prisma: PrismaClient
): Promise<(Document & { _count: { chunks: number } }) | null> {
  return prisma.document.findUnique({
    where: { id: documentId },
    select: {
      id: true,
      title: true,
      fileName: true,
      fileSize: true,
      pageCount: true,
      status: true,
      audioDuration: true,
      createdAt: true,
      errorMessage: true,
      errorCode: true,
      failedAt: true,
      _count: { select: { chunks: true } },
    },
  }) as Promise<(Document & { _count: { chunks: number } }) | null>;
}

/**
 * Get a document with all its chunks for streaming.
 * 
 * @param documentId - The document's ID
 * @param mode - Processing mode (FULL_TEXT, SUMMARY, PODCAST)
 * @param prisma - Prisma client instance
 * @returns Document with chunks or null if not found
 */
export async function getDocumentWithChunks(
  documentId: string,
  mode: string,
  prisma: PrismaClient
) {
  return prisma.document.findUnique({
    where: { id: documentId },
    include: {
      chunks: {
        where: { mode: mode as any },
        orderBy: { index: "asc" },
      },
    },
  });
}

/**
 * Delete a document and return associated chunk texts for cache cleanup.
 * 
 * @param documentId - The document's ID
 * @param prisma - Prisma client instance
 * @returns Object with document info and chunk texts, or null if not found
 */
export async function deleteDocument(
  documentId: string,
  prisma: PrismaClient
): Promise<{
  document: Document;
  chunkTexts: string[];
} | null> {
  // Load document with chunks first
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { chunks: { select: { text: true } } },
  });

  if (!document) {
    return null;
  }

  // Extract chunk texts for cache cleanup
  const chunkTexts = document.chunks.map((c) => c.text);

  // Delete document (chunks cascade automatically)
  await prisma.document.delete({ where: { id: documentId } });

  return {
    document: document as Document,
    chunkTexts,
  };
}

/**
 * Create a document record in the database.
 * 
 * @param data - Document creation data
 * @param prisma - Prisma client instance
 * @returns Created document
 */
export async function createDocument(
  data: {
    title: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    userId: string;
  },
  prisma: PrismaClient
): Promise<Document> {
  return prisma.document.create({ data });
}

export interface DocumentDeletionResult {
  documentId: string;
  chunksDeleted: number;
  audioFilesDeleted: number;
  pdfPath: string;
}

/**
 * Delete document with full cleanup (PDF file, audio cache, database record).
 * 
 * Performs cleanup in this order:
 * 1. Load document with chunks
 * 2. Clear audio cache files
 * 3. Delete PDF file from disk
 * 4. Delete database record (chunks cascade)
 * 
 * @param documentId - Document ID to delete
 * @param prisma - Prisma client instance
 * @returns Deletion result or null if document not found
 */
export async function deleteDocumentWithCleanup(
  documentId: string,
  prisma: PrismaClient
): Promise<DocumentDeletionResult | null> {
  // Load document with chunks
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { chunks: { select: { text: true } } },
  });

  if (!document) {
    return null;
  }

  // Clear audio cache files
  const chunkTexts = document.chunks.map((c) => c.text);
  const deletedAudioFiles = await clearDocumentAudioCache(chunkTexts);

  console.log(
    `[documentService] Cleared ${deletedAudioFiles} audio cache files for document ${documentId}`
  );

  // Delete audio from S3
  try {
    const { deleteDocumentAudio } = await import("./audioService");
    const s3Deleted = await deleteDocumentAudio(documentId);
    console.log(
      `[documentService] Deleted ${s3Deleted} S3 audio files for document ${documentId}`
    );
  } catch (s3Error) {
    console.error(
      `[documentService] S3 cleanup failed (non-critical):`,
      s3Error
    );
  }

  // Delete PDF file from disk
  await deleteFileFromDisk(document.fileUrl);
  console.log(`[documentService] Deleted PDF file: ${document.fileUrl}`);

  // Delete document from database (chunks cascade)
  await prisma.document.delete({ where: { id: documentId } });

  console.log(
    `[documentService] Deleted document ${documentId} (${document.chunks.length} chunks, ${deletedAudioFiles} audio files)`
  );

  return {
    documentId,
    chunksDeleted: document.chunks.length,
    audioFilesDeleted: deletedAudioFiles,
    pdfPath: document.fileUrl,
  };
}

/**
 * Calculate and update the total audio duration for a document.
 * Uses chunk audio durations if available, otherwise estimates from text length.
 * 
 * @param documentId - Document ID to calculate duration for
 * @param mode - Processing mode (FULL_TEXT, SUMMARY, PODCAST)
 * @param prisma - Prisma client instance
 * @returns Calculated duration in seconds or null if document not found
 */
export async function calculateDocumentDuration(
  documentId: string,
  mode: string,
  prisma: PrismaClient
): Promise<number | null> {
  const { estimateAudioDuration } = await import("../tts/wav-utils");
  
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: {
      chunks: {
        where: { mode: mode as any },
        orderBy: { index: "asc" },
      },
    },
  });

  if (!document) {
    return null;
  }

  // Try to calculate from actual chunk durations first
  const hasAllDurations = document.chunks.every(chunk => chunk.audioDuration != null);
  
  let totalDuration: number;
  
  if (hasAllDurations && document.chunks.length > 0) {
    // Sum up actual chunk durations
    totalDuration = document.chunks.reduce(
      (sum, chunk) => sum + (chunk.audioDuration || 0),
      0
    );
  } else if (document.extractedText) {
    // Estimate from text length
    totalDuration = estimateAudioDuration(document.extractedText.length);
  } else {
    // Fallback: estimate from all chunk texts
    const totalTextLength = document.chunks.reduce(
      (sum, chunk) => sum + chunk.text.length,
      0
    );
    totalDuration = estimateAudioDuration(totalTextLength);
  }

  // Update document with calculated duration
  await prisma.document.update({
    where: { id: documentId },
    data: { audioDuration: totalDuration },
  });

  return totalDuration;
}

