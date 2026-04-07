/**
 * Upload Service - Business logic for file uploads
 * 
 * Handles file upload operations including:
 * - File validation (type, size)
 * - File storage
 * - Document creation
 */

import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { PrismaClient, Document } from "../../generated/prisma";
import { ensureUploadDir, getUploadDir, buildFilePath } from "../utils/utils";

const MAX_FILE_SIZE_BYTES =
  parseInt(process.env.MAX_FILE_SIZE_MB ?? "50", 10) * 1024 * 1024;

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  statusCode?: number;
}

export interface SavedFileInfo {
  storedFileName: string;
  filePath: string;
  cleanTitle: string;
}

/**
 * Validate uploaded file for type and size.
 * 
 * @param file - Uploaded file
 * @returns Validation result with error details if invalid
 */
export function validateFile(file: File): FileValidationResult {
  // Check file type
  if (file.type !== "application/pdf") {
    return {
      valid: false,
      error: "Only PDF files are accepted",
      statusCode: 415,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${process.env.MAX_FILE_SIZE_MB ?? 50}MB`,
      statusCode: 413,
    };
  }

  return { valid: true };
}

/**
 * Save uploaded file to disk with UUID filename.
 * 
 * Prevents path traversal and filename collisions by using UUID.
 * 
 * @param file - Uploaded file
 * @returns File info including path and clean title
 */
export async function saveFileToDisk(file: File): Promise<SavedFileInfo> {
  // Read file into buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Ensure upload directory exists
  await ensureUploadDir();
  const uploadDir = getUploadDir();

  // Generate UUID filename
  const storedFileName = `${uuidv4()}.pdf`;
  const filePath = buildFilePath(uploadDir, storedFileName);

  // Write to disk
  await fs.writeFile(filePath, buffer);

  // Derive clean title from original filename
  const cleanTitle = path
    .basename(file.name, ".pdf")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    storedFileName,
    filePath,
    cleanTitle,
  };
}

/**
 * Create document record in database.
 * 
 * @param params - Document creation parameters
 * @param prisma - Prisma client instance
 * @returns Created document
 */
export async function createDocumentRecord(
  params: {
    title: string;
    fileName: string;
    fileUrl: string;
    fileSize: number;
    userId: string;
  },
  prisma: PrismaClient
): Promise<Document> {
  return prisma.document.create({
    data: {
      title: params.title,
      fileName: params.fileName,
      fileUrl: params.fileUrl,
      fileSize: params.fileSize,
      userId: params.userId,
    },
  });
}

/**
 * Delete file from disk.
 * 
 * @param filePath - Absolute path to file
 */
export async function deleteFileFromDisk(filePath: string): Promise<void> {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`[uploadService] Failed to delete file ${filePath}:`, error);
    // Don't throw - file deletion is best-effort
  }
}
