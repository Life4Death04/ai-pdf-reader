/**
 * Monitoring API Endpoints
 * 
 * Internal endpoints for monitoring and debugging (should be protected in production).
 */

import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/errors/errorHandler";
import { getRateLimitStats } from "@/lib/security/rateLimit";
import { getAuditLog, getAuditStats } from "@/lib/monitoring/audit";
import { ForbiddenError } from "@/lib/errors/AppError";

/**
 * Check if monitoring endpoints should be accessible.
 * In production, these should require authentication.
 */
function checkMonitoringAccess() {
  const allowMonitoring = process.env.ENABLE_MONITORING === "true";
  const isDevelopment = process.env.NODE_ENV === "development";

  if (!allowMonitoring && !isDevelopment) {
    throw new ForbiddenError("Monitoring endpoints are disabled in production");
  }
}

/**
 * GET /api/monitoring/health
 * Health check endpoint.
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV,
  });
});
