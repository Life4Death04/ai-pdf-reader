/**
 * File Validation Utilities
 * 
 * Advanced file validation beyond basic mime type checking.
 * Includes magic byte verification to prevent file type spoofing.
 */

import { UnsupportedMediaTypeError } from "../errors/AppError";
import { logSecurityEvent } from "../monitoring/logger";

/**
 * Magic bytes (file signatures) for supported file types.
 */
const FILE_SIGNATURES: Record<string, number[][]> = {
  "application/pdf": [
    [0x25, 0x50, 0x44, 0x46], // %PDF
  ],
};

/**
 * Read magic bytes from a file.
 */
async function readMagicBytes(file: File, length: number = 4): Promise<number[]> {
  const arrayBuffer = await file.slice(0, length).arrayBuffer();
  return Array.from(new Uint8Array(arrayBuffer));
}

/**
 * Verify file matches expected magic bytes.
 */
async function verifyMagicBytes(file: File, expectedType: string): Promise<boolean> {
  const signatures = FILE_SIGNATURES[expectedType];
  if (!signatures) {
    return true; // No signature defined, skip check
  }

  const maxLength = Math.max(...signatures.map((sig) => sig.length));
  const actualBytes = await readMagicBytes(file, maxLength);

  // Check if any signature matches
  return signatures.some((signature) => {
    return signature.every((byte, index) => actualBytes[index] === byte);
  });
}

/**
 * Sanitize filename to prevent path traversal attacks.
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and dangerous characters
  return filename
    .replace(/[\/\\]/g, "") // Remove path separators
    .replace(/\.\./g, "") // Remove parent directory references
    .replace(/[<>:"|?*\x00-\x1F]/g, "") // Remove invalid filename characters
    .trim();
}

/**
 * Validate file extension matches expected type.
 */
function validateExtension(filename: string, expectedType: string): boolean {
  const ext = filename.toLowerCase().split(".").pop();

  const extensionMap: Record<string, string[]> = {
    "application/pdf": ["pdf"],
  };

  const validExtensions = extensionMap[expectedType];
  if (!validExtensions) {
    return true; // No extension requirement
  }

  return ext ? validExtensions.includes(ext) : false;
}

/**
 * Comprehensive file validation.
 * 
 * Checks:
 * - File exists
 * - MIME type
 * - File extension
 * - Magic bytes (file signature)
 * - File size
 * - Filename safety
 */
export async function validateUploadedFile(
  file: File | null | undefined,
  options: {
    maxSizeBytes: number;
    allowedTypes: string[];
    checkMagicBytes?: boolean;
  }
): Promise<{ valid: true } | { valid: false; error: string }> {
  // Check file exists
  if (!file) {
    return { valid: false, error: "No file provided" };
  }

  // Check file is not empty
  if (file.size === 0) {
    return { valid: false, error: "File is empty" };
  }

  // Check file size
  if (file.size > options.maxSizeBytes) {
    const maxMB = Math.round(options.maxSizeBytes / (1024 * 1024));
    return {
      valid: false,
      error: `File too large. Maximum size is ${maxMB}MB`,
    };
  }

  // Check MIME type
  if (!options.allowedTypes.includes(file.type)) {
    logSecurityEvent({
      event: "invalid_file_type_upload_attempt",
      severity: "low",
      details: {
        fileName: sanitizeFilename(file.name),
        providedType: file.type,
        allowedTypes: options.allowedTypes,
      },
    });

    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${options.allowedTypes.join(", ")}`,
    };
  }

  // Check filename extension
  if (!validateExtension(file.name, file.type)) {
    logSecurityEvent({
      event: "file_extension_mismatch",
      severity: "medium",
      details: {
        fileName: sanitizeFilename(file.name),
        mimeType: file.type,
      },
    });

    return {
      valid: false,
      error: "File extension does not match file type",
    };
  }

  // Check magic bytes (file signature)
  if (options.checkMagicBytes !== false) {
    const magicBytesValid = await verifyMagicBytes(file, file.type);
    if (!magicBytesValid) {
      logSecurityEvent({
        event: "file_signature_mismatch",
        severity: "high",
        details: {
          fileName: sanitizeFilename(file.name),
          mimeType: file.type,
          message: "File content does not match declared type (possible spoofing)",
        },
      });

      return {
        valid: false,
        error: "File content does not match file type. Possible file spoofing detected.",
      };
    }
  }

  // Check filename for dangerous patterns
  const sanitized = sanitizeFilename(file.name);
  if (sanitized !== file.name) {
    logSecurityEvent({
      event: "dangerous_filename_detected",
      severity: "medium",
      details: {
        originalFilename: file.name,
        sanitizedFilename: sanitized,
      },
    });

    return {
      valid: false,
      error: "Filename contains invalid characters",
    };
  }

  return { valid: true };
}

/**
 * Validate PDF file specifically.
 * Convenience wrapper with PDF-specific validations.
 */
export async function validatePdfFile(file: File | null | undefined): Promise<void> {
  const maxSizeBytes = parseInt(process.env.MAX_FILE_SIZE_MB ?? "50", 10) * 1024 * 1024;

  const result = await validateUploadedFile(file, {
    maxSizeBytes,
    allowedTypes: ["application/pdf"],
    checkMagicBytes: true,
  });

  if (!result.valid) {
    throw new UnsupportedMediaTypeError(result.error);
  }
}
