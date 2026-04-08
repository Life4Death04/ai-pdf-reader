/**
 * Error Classification Utility
 * 
 * Maps errors to machine-readable error codes for better debugging
 * and error analytics.
 */

/**
 * Standard error codes used throughout the application.
 */
export enum ErrorCode {
  // PDF Processing Errors
  PDF_PARSE_FAILED = "PDF_PARSE_FAILED",
  PDF_ENCRYPTED = "PDF_ENCRYPTED",
  PDF_CORRUPTED = "PDF_CORRUPTED",
  PDF_NO_TEXT = "PDF_NO_TEXT",
  
  // File System Errors
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  FILE_READ_ERROR = "FILE_READ_ERROR",
  
  // AI/LLM Errors
  OLLAMA_UNAVAILABLE = "OLLAMA_UNAVAILABLE",
  OLLAMA_TIMEOUT = "OLLAMA_TIMEOUT",
  OLLAMA_MODEL_ERROR = "OLLAMA_MODEL_ERROR",
  
  // TTS Errors
  TTS_SERVICE_UNAVAILABLE = "TTS_SERVICE_UNAVAILABLE",
  TTS_GENERATION_FAILED = "TTS_GENERATION_FAILED",
  
  // Database Errors
  DATABASE_ERROR = "DATABASE_ERROR",
  
  // Network Errors
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT = "TIMEOUT",
  
  // Generic Errors
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
}

/**
 * Classifies an error into a machine-readable error code.
 * 
 * @param error - The error to classify
 * @returns ErrorCode enum value
 * 
 * @example
 * try {
 *   await extractPDF(buffer);
 * } catch (error) {
 *   const code = classifyError(error);
 *   // code might be ErrorCode.PDF_PARSE_FAILED
 * }
 */
export function classifyError(error: unknown): ErrorCode {
  if (!(error instanceof Error)) {
    return ErrorCode.UNKNOWN_ERROR;
  }

  const message = error.message.toLowerCase();
  const errorName = error.name.toLowerCase();

  // PDF-related errors
  if (message.includes("pdf") || message.includes("unpdf")) {
    if (message.includes("encrypt") || message.includes("password")) {
      return ErrorCode.PDF_ENCRYPTED;
    }
    if (message.includes("corrupt") || message.includes("invalid")) {
      return ErrorCode.PDF_CORRUPTED;
    }
    if (message.includes("no text") || message.includes("empty")) {
      return ErrorCode.PDF_NO_TEXT;
    }
    return ErrorCode.PDF_PARSE_FAILED;
  }

  // File system errors
  if (message.includes("enoent") || message.includes("no such file")) {
    return ErrorCode.FILE_NOT_FOUND;
  }
  if (message.includes("eacces") || message.includes("permission")) {
    return ErrorCode.FILE_READ_ERROR;
  }

  // Ollama/LLM errors
  if (message.includes("ollama")) {
    if (message.includes("timeout") || message.includes("timed out")) {
      return ErrorCode.OLLAMA_TIMEOUT;
    }
    if (message.includes("unavailable") || message.includes("connection refused")) {
      return ErrorCode.OLLAMA_UNAVAILABLE;
    }
    if (message.includes("model")) {
      return ErrorCode.OLLAMA_MODEL_ERROR;
    }
    return ErrorCode.OLLAMA_UNAVAILABLE;
  }

  // TTS errors
  if (message.includes("tts") || message.includes("piper")) {
    if (message.includes("unavailable") || message.includes("connection")) {
      return ErrorCode.TTS_SERVICE_UNAVAILABLE;
    }
    return ErrorCode.TTS_GENERATION_FAILED;
  }

  // Database errors
  if (message.includes("prisma") || message.includes("database") || message.includes("sql")) {
    return ErrorCode.DATABASE_ERROR;
  }

  // Network/timeout errors
  if (message.includes("timeout") || message.includes("timed out")) {
    return ErrorCode.TIMEOUT;
  }
  if (
    message.includes("network") || 
    message.includes("fetch failed") ||
    message.includes("econnrefused") ||
    errorName.includes("fetcherror")
  ) {
    return ErrorCode.NETWORK_ERROR;
  }

  // Validation errors
  if (message.includes("validation") || message.includes("invalid")) {
    return ErrorCode.VALIDATION_ERROR;
  }

  // Default
  return ErrorCode.UNKNOWN_ERROR;
}

/**
 * Gets a user-friendly error message based on error code.
 * 
 * @param code - The error code
 * @returns Human-readable error message
 */
export function getErrorMessage(code: ErrorCode): string {
  const messages: Record<ErrorCode, string> = {
    [ErrorCode.PDF_PARSE_FAILED]: "Failed to parse PDF file. The file may be corrupted or in an unsupported format.",
    [ErrorCode.PDF_ENCRYPTED]: "This PDF is password-protected. Please upload an unencrypted version.",
    [ErrorCode.PDF_CORRUPTED]: "The PDF file appears to be corrupted and cannot be read.",
    [ErrorCode.PDF_NO_TEXT]: "This PDF contains no extractable text. It may be a scanned image.",
    [ErrorCode.FILE_NOT_FOUND]: "The uploaded file could not be found on the server.",
    [ErrorCode.FILE_READ_ERROR]: "Unable to read the file due to permission issues.",
    [ErrorCode.OLLAMA_UNAVAILABLE]: "AI service (Ollama) is currently unavailable. Please try again later.",
    [ErrorCode.OLLAMA_TIMEOUT]: "AI processing timed out. The text may be too long or the service is overloaded.",
    [ErrorCode.OLLAMA_MODEL_ERROR]: "AI model encountered an error during processing.",
    [ErrorCode.TTS_SERVICE_UNAVAILABLE]: "Text-to-speech service is currently unavailable.",
    [ErrorCode.TTS_GENERATION_FAILED]: "Failed to generate audio from text.",
    [ErrorCode.DATABASE_ERROR]: "A database error occurred while processing your request.",
    [ErrorCode.NETWORK_ERROR]: "Network error occurred while communicating with external services.",
    [ErrorCode.TIMEOUT]: "The operation timed out. Please try again.",
    [ErrorCode.VALIDATION_ERROR]: "Invalid input data provided.",
    [ErrorCode.UNKNOWN_ERROR]: "An unexpected error occurred. Please try again.",
  };

  return messages[code] || messages[ErrorCode.UNKNOWN_ERROR];
}

/**
 * Creates a structured error object with code and message.
 * 
 * @param error - The original error
 * @returns Object with errorCode and errorMessage
 */
export function createErrorDetails(error: unknown): {
  errorCode: string;
  errorMessage: string;
} {
  const code = classifyError(error);
  const originalMessage = error instanceof Error ? error.message : String(error);
  
  // Use user-friendly message for known error types, otherwise use original
  const message = code !== ErrorCode.UNKNOWN_ERROR 
    ? getErrorMessage(code)
    : originalMessage;

  return {
    errorCode: code,
    errorMessage: message,
  };
}
