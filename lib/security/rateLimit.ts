/**
 * Rate Limiting Middleware
 * 
 * Implements in-memory rate limiting to protect against abuse.
 * For production with multiple servers, consider using Redis.
 */

import { NextRequest, NextResponse } from "next/server";
import { TooManyRequestsError } from "../errors/AppError";
import { logSecurityEvent } from "../monitoring/logger";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

/**
 * In-memory store for rate limit tracking.
 * Maps: key -> { count, resetAt }
 */
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Clean up expired entries every 5 minutes.
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /**
   * Maximum requests per window.
   */
  maxRequests: number;

  /**
   * Window duration in seconds.
   */
  windowSeconds: number;

  /**
   * Custom key generator (defaults to IP address).
   */
  keyGenerator?: (request: NextRequest) => string;

  /**
   * Skip rate limiting for certain conditions.
   */
  skip?: (request: NextRequest) => boolean;
}

/**
 * Get client IP address from request.
 */
export function getClientIp(request: NextRequest): string {
  // Check common proxy headers
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to unknown if no IP headers present
  return "unknown";
}

/**
 * Rate limit middleware factory.
 * 
 * Usage:
 * ```ts
 * const limiter = createRateLimiter({ maxRequests: 10, windowSeconds: 60 });
 * 
 * export const POST = withErrorHandler(async (request) => {
 *   await limiter(request); // Throws TooManyRequestsError if exceeded
 *   // ... rest of handler
 * });
 * ```
 */
export function createRateLimiter(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<void> => {
    // Skip if configured
    if (config.skip && config.skip(request)) {
      return;
    }

    // Generate key (default: IP address)
    const key = config.keyGenerator
      ? config.keyGenerator(request)
      : getClientIp(request);

    const now = Date.now();
    const windowMs = config.windowSeconds * 1000;

    // Get or create entry
    let entry = rateLimitStore.get(key);

    // Reset if window expired
    if (!entry || entry.resetAt < now) {
      entry = {
        count: 0,
        resetAt: now + windowMs,
      };
      rateLimitStore.set(key, entry);
    }

    // Increment counter
    entry.count++;

    // Check if limit exceeded
    if (entry.count > config.maxRequests) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);

      // Log security event
      logSecurityEvent({
        event: "rate_limit_exceeded",
        severity: "medium",
        ip: key,
        details: {
          count: entry.count,
          limit: config.maxRequests,
          window: config.windowSeconds,
          path: request.nextUrl.pathname,
        },
      });

      throw new TooManyRequestsError(
        `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
        {
          retryAfter,
          limit: config.maxRequests,
          window: config.windowSeconds,
        }
      );
    }

    // Add rate limit headers (informational)
    const remaining = config.maxRequests - entry.count;
    const resetAt = Math.ceil(entry.resetAt / 1000);

    // Note: These headers will be visible if you add them to response
    // For now, we just track them - you'd need to modify withErrorHandler
    // to add these headers to successful responses
  };
}

/**
 * Pre-configured rate limiters for common use cases.
 */
export const rateLimiters = {
  /**
   * Strict limiter for expensive operations (10 requests/minute).
   */
  strict: createRateLimiter({
    maxRequests: 10,
    windowSeconds: 60,
  }),

  /**
   * Standard limiter for regular API endpoints (60 requests/minute).
   */
  standard: createRateLimiter({
    maxRequests: 60,
    windowSeconds: 60,
  }),

  /**
   * Relaxed limiter for read-heavy endpoints (300 requests/minute).
   */
  relaxed: createRateLimiter({
    maxRequests: 300,
    windowSeconds: 60,
  }),

  /**
   * Upload limiter (3 uploads per 5 minutes per IP).
   */
  upload: createRateLimiter({
    maxRequests: 3,
    windowSeconds: 300,
  }),
};

/**
 * Get rate limit stats for monitoring.
 */
export function getRateLimitStats() {
  return {
    totalKeys: rateLimitStore.size,
    entries: Array.from(rateLimitStore.entries()).map(([key, entry]) => ({
      key,
      count: entry.count,
      resetAt: new Date(entry.resetAt).toISOString(),
    })),
  };
}
