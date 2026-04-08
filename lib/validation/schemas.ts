/**
 * Validation Schemas
 * 
 * Zod schemas for validating API inputs.
 * Provides type-safe validation with helpful error messages.
 */

import { z } from "zod";

/**
 * File upload validation schema.
 */
export const uploadFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are accepted",
    })
    .refine(
      (file) => {
        const maxSize = parseInt(process.env.MAX_FILE_SIZE_MB ?? "50", 10) * 1024 * 1024;
        return file.size <= maxSize;
      },
      {
        message: `File size must not exceed ${process.env.MAX_FILE_SIZE_MB ?? "50"}MB`,
      }
    )
    .refine((file) => file.size > 0, {
      message: "File cannot be empty",
    }),
});

/**
 * Document ID validation schema.
 */
export const documentIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: "Invalid document ID format" })
    .min(1, { message: "Document ID is required" }),
});

/**
 * Stream request validation schema.
 */
export const streamRequestSchema = z.object({
  documentId: z.string().uuid({ message: "Invalid document ID format" }),
  mode: z.enum(["FULL_TEXT", "SUMMARY", "PODCAST"], {
    message: "Mode must be FULL_TEXT, SUMMARY, or PODCAST",
  }),
});

/**
 * TTS request validation schema.
 */
export const ttsRequestSchema = z.object({
  text: z
    .string()
    .min(1, { message: "Text is required" })
    .max(5000, { message: "Text must not exceed 5000 characters" }),
  voice: z.string().optional(),
  speed: z
    .number()
    .min(0.5, { message: "Speed must be between 0.5 and 2.0" })
    .max(2.0, { message: "Speed must be between 0.5 and 2.0" })
    .optional(),
});

/**
 * Cache clear validation schema.
 */
export const cacheClearSchema = z.object({
  confirm: z.literal("true", {
    message: "Confirmation required. Add ?confirm=true to the URL",
  }),
});

/**
 * Pagination schema.
 */
export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1, { message: "Page must be at least 1" })
    .default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1, { message: "Limit must be at least 1" })
    .max(100, { message: "Limit must not exceed 100" })
    .default(20),
});

/**
 * Helper function to validate and parse data.
 * Throws ValidationError if validation fails.
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Safe validation that returns result with errors.
 */
export function validateSafe<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Format Zod errors for user-friendly display.
 */
export function formatZodErrors(error: z.ZodError): string {
  return error.issues.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ");
}
