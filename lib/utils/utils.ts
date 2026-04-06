import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import path from "path";
import fs from "fs/promises";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─────────────────────────────────────────────
// File storage helpers
// ─────────────────────────────────────────────

/**
 * Gets the upload directory path from environment or uses default.
 */
export function getUploadDir(): string {
  return path.resolve(process.cwd(), process.env.UPLOAD_DIR ?? "uploads");
}

/**
 * Builds a file path by joining the upload directory and filename.
 * @param uploadDir - The base upload directory
 * @param fileName - The filename to join
 */
export function buildFilePath(uploadDir: string, fileName: string): string {
  return path.join(uploadDir, fileName);
}

/**
 * Ensures the upload directory exists. Called once at startup or on first upload.
 */
export async function ensureUploadDir(): Promise<void> {
  const dir = getUploadDir();
  await fs.mkdir(dir, { recursive: true });
}
