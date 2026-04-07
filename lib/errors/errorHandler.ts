/**
 * Error Handling Middleware
 * 
 * Provides a Higher-Order Function (HOF) wrapper for API routes that:
 * - Catches all errors (both sync and async)
 * - Converts AppError instances to proper JSON responses
 * - Handles unexpected errors gracefully
 * - Logs errors for debugging
 * - Prevents sensitive information leakage
 */

import { NextRequest, NextResponse } from "next/server";
import { AppError } from "./AppError";

/**
 * Type for Next.js API route handlers.
 * Supports both simple handlers and those with params.
 */
type RouteHandler<TParams = void> = TParams extends void
  ? (request: NextRequest) => Promise<Response | NextResponse>
  : (
      request: NextRequest,
      context: { params: Promise<TParams> }
    ) => Promise<Response | NextResponse>;

/**
 * Higher-Order Function that wraps API route handlers with error handling.
 * 
 * Usage:
 * ```ts
 * export const GET = withErrorHandler(async (request) => {
 *   throw new NotFoundError("Document not found");
 * });
 * 
 * export const POST = withErrorHandler(async (request, { params }) => {
 *   const { id } = await params;
 *   // ... handler logic
 * });
 * ```
 * 
 * @param handler - The API route handler function
 * @returns Wrapped handler with error handling
 */
export function withErrorHandler<TParams = void>(
  handler: RouteHandler<TParams>
): RouteHandler<TParams> {
  return (async (request: NextRequest, context?: { params: Promise<TParams> }) => {
    try {
      // Call the wrapped handler
      if (context) {
        return await (handler as RouteHandler<TParams>)(request, context);
      } else {
        return await (handler as RouteHandler<void>)(request);
      }
    } catch (error) {
      return handleError(error);
    }
  }) as RouteHandler<TParams>;
}

/**
 * Convert an error into a proper JSON response.
 * 
 * @param error - The error to handle
 * @returns JSON error response
 */
function handleError(error: unknown): NextResponse {
  // Handle known application errors
  if (error instanceof AppError) {
    console.error(`[AppError] ${error.statusCode} - ${error.message}`, {
      context: error.context,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        error: error.message,
        ...(error.context && { details: error.context }),
      },
      { status: error.statusCode }
    );
  }

  // Handle unknown errors
  console.error("[UnexpectedError]", error);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === "development";
  const message = isDevelopment && error instanceof Error
    ? error.message
    : "An unexpected error occurred";

  return NextResponse.json(
    {
      error: message,
      ...(isDevelopment && error instanceof Error && { stack: error.stack }),
    },
    { status: 500 }
  );
}

/**
 * Utility to convert standard validation checks into ValidationError throws.
 * 
 * Usage:
 * ```ts
 * assertValid(documentId, "Missing documentId parameter");
 * assertValid(file instanceof File, "No file provided");
 * ```
 * 
 * @param condition - Condition to check
 * @param message - Error message if condition is false
 * @param context - Optional context for debugging
 */
export function assertValid(
  condition: unknown,
  message: string,
  context?: Record<string, unknown>
): asserts condition {
  if (!condition) {
    throw new AppError(message, 400, true, context);
  }
}

/**
 * Utility to throw NotFoundError if resource is null/undefined.
 * 
 * Usage:
 * ```ts
 * const document = await getDocument(id);
 * assertFound(document, "Document not found");
 * // TypeScript now knows document is not null
 * ```
 * 
 * @param resource - Resource to check
 * @param message - Error message if not found
 * @param context - Optional context for debugging
 */
export function assertFound<T>(
  resource: T | null | undefined,
  message: string = "Resource not found",
  context?: Record<string, unknown>
): asserts resource is T {
  if (resource === null || resource === undefined) {
    throw new AppError(message, 404, true, context);
  }
}
