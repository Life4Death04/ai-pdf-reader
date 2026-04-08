/**
 * Request Logging Middleware
 * 
 * Logs all API requests with timing, status, and errors.
 */

import { NextRequest, NextResponse } from "next/server";
import { apiLogger, createPerformanceTracker } from "./logger";
import { getClientIp } from "../security/rateLimit";
import { AppError } from "../errors/AppError";

/**
 * Extract useful request information for logging.
 */
function extractRequestInfo(request: NextRequest) {
  return {
    method: request.method,
    path: request.nextUrl.pathname,
    query: Object.fromEntries(request.nextUrl.searchParams),
    ip: getClientIp(request),
    userAgent: request.headers.get("user-agent") ?? undefined,
    referer: request.headers.get("referer") ?? undefined,
  };
}

/**
 * Middleware to log all requests.
 * 
 * Usage:
 * ```ts
 * export const GET = withRequestLogging(
 *   withErrorHandler(async (request) => {
 *     // Your handler
 *   })
 * );
 * ```
 */
export function withRequestLogging<T extends (...args: any[]) => Promise<Response | NextResponse>>(
  handler: T
): T {
  return (async (...args: any[]) => {
    const request = args[0] as NextRequest;
    const tracker = createPerformanceTracker(`${request.method} ${request.nextUrl.pathname}`);
    const requestInfo = extractRequestInfo(request);

    try {
      // Call the handler
      const response = await handler(...args);

      // Log successful request
      const duration = tracker.end({
        status: response.status,
        ...requestInfo,
      });

      apiLogger.info(
        {
          ...requestInfo,
          status: response.status,
          duration,
        },
        "Request completed"
      );

      return response;
    } catch (error) {
      // Log error
      const duration = tracker.endWithError(error as Error);

      const status = error instanceof AppError ? error.statusCode : 500;

      apiLogger.error(
        {
          ...requestInfo,
          status,
          duration,
          error: {
            message: error instanceof Error ? error.message : String(error),
            name: error instanceof Error ? error.name : "Error",
            stack: error instanceof Error ? error.stack : undefined,
          },
        },
        "Request failed"
      );

      throw error;
    }
  }) as T;
}

/**
 * Log request without wrapping (for manual use).
 */
export function logRequestManual(
  request: NextRequest,
  response: NextResponse,
  duration: number
) {
  const requestInfo = extractRequestInfo(request);

  apiLogger.info(
    {
      ...requestInfo,
      status: response.status,
      duration,
    },
    "Request completed"
  );
}
