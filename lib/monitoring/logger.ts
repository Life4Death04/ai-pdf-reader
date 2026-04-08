/**
 * Structured Logging Utility
 * 
 * Provides consistent logging across the application with:
 * - JSON structured logs
 * - Log levels
 * - Request tracking
 * - Performance metrics
 */

import pino from "pino";

/**
 * Create logger instance with environment-aware configuration.
 */
export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

/**
 * Logger for API requests.
 */
export const apiLogger = logger.child({ module: "api" });

/**
 * Logger for background jobs.
 */
export const jobLogger = logger.child({ module: "job" });

/**
 * Logger for security events.
 */
export const securityLogger = logger.child({ module: "security" });

/**
 * Logger for database operations.
 */
export const dbLogger = logger.child({ module: "database" });

/**
 * Log API request.
 */
export function logRequest(params: {
  method: string;
  path: string;
  userId?: string;
  ip?: string;
  duration?: number;
  status?: number;
}) {
  apiLogger.info(params, "API Request");
}

/**
 * Log API error.
 */
export function logError(params: {
  method: string;
  path: string;
  error: Error;
  userId?: string;
  ip?: string;
  status?: number;
}) {
  apiLogger.error(
    {
      ...params,
      error: {
        message: params.error.message,
        stack: params.error.stack,
        name: params.error.name,
      },
    },
    "API Error"
  );
}

/**
 * Log security event (potential attack, suspicious activity).
 */
export function logSecurityEvent(params: {
  event: string;
  severity: "low" | "medium" | "high" | "critical";
  ip?: string;
  userId?: string;
  details?: Record<string, unknown>;
}) {
  securityLogger.warn(params, `Security Event: ${params.event}`);
}

/**
 * Log performance metric.
 */
export function logPerformance(params: {
  operation: string;
  duration: number;
  success: boolean;
  metadata?: Record<string, unknown>;
}) {
  if (params.duration > 5000) {
    // Log slow operations as warnings
    apiLogger.warn(params, `Slow operation: ${params.operation}`);
  } else {
    apiLogger.debug(params, `Performance: ${params.operation}`);
  }
}

/**
 * Create a performance tracker for timing operations.
 */
export function createPerformanceTracker(operation: string) {
  const start = Date.now();

  return {
    end: (metadata?: Record<string, unknown>) => {
      const duration = Date.now() - start;
      logPerformance({
        operation,
        duration,
        success: true,
        metadata,
      });
      return duration;
    },
    endWithError: (error: Error, metadata?: Record<string, unknown>) => {
      const duration = Date.now() - start;
      logPerformance({
        operation,
        duration,
        success: false,
        metadata: { ...metadata, error: error.message },
      });
      return duration;
    },
  };
}
