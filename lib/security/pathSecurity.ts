/**
 * Path Security Utilities
 * 
 * Prevents path traversal attacks and ensures safe file operations.
 */

import path from "path";
import { ForbiddenError } from "../errors/AppError";
import { logSecurityEvent } from "../monitoring/logger";

/**
 * Validate that a path is within allowed directory.
 * Prevents path traversal attacks (../, symlinks, etc.)
 */
export function validatePathSafety(
  targetPath: string,
  allowedDirectory: string
): void {
  // Resolve to absolute paths
  const resolvedTarget = path.resolve(targetPath);
  const resolvedAllowed = path.resolve(allowedDirectory);

  // Check if target is within allowed directory
  if (!resolvedTarget.startsWith(resolvedAllowed + path.sep) && 
      resolvedTarget !== resolvedAllowed) {
    logSecurityEvent({
      event: "path_traversal_attempt",
      severity: "high",
      details: {
        targetPath,
        allowedDirectory,
        resolvedTarget,
        resolvedAllowed,
      },
    });

    throw new ForbiddenError("Access denied: Path traversal attempt detected");
  }
}

/**
 * Sanitize path component (remove dangerous sequences).
 */
export function sanitizePath(pathComponent: string): string {
  return pathComponent
    .replace(/\.\./g, "") // Remove parent directory references
    .replace(/[\/\\]/g, "") // Remove path separators
    .replace(/^\.+/, "") // Remove leading dots
    .trim();
}

/**
 * Check if a filename is safe.
 */
export function isSafeFilename(filename: string): boolean {
  // Check for null bytes
  if (filename.includes("\0")) {
    return false;
  }

  // Check for directory traversal
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return false;
  }

  // Check for hidden files (optional - depends on requirements)
  if (filename.startsWith(".")) {
    return false;
  }

  // Check for overly long filenames
  if (filename.length > 255) {
    return false;
  }

  return true;
}

/**
 * Validate and resolve file path safely.
 */
export function resolveFilePath(
  baseDir: string,
  filename: string
): string {
  // Sanitize filename
  const safeFilename = sanitizePath(filename);

  if (!isSafeFilename(safeFilename)) {
    throw new ForbiddenError("Invalid filename");
  }

  // Build full path
  const fullPath = path.join(baseDir, safeFilename);

  // Validate it's within base directory
  validatePathSafety(fullPath, baseDir);

  return fullPath;
}
