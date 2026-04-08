/**
 * Rate Limit Stats Endpoint
 */

import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/errors/errorHandler";
import { getRateLimitStats } from "@/lib/security/rateLimit";
import { ForbiddenError } from "@/lib/errors/AppError";

export const GET = withErrorHandler(async (request: NextRequest) => {
  // Only allow in development or if explicitly enabled
  if (process.env.NODE_ENV !== "development" && process.env.ENABLE_MONITORING !== "true") {
    throw new ForbiddenError("Monitoring endpoints are disabled");
  }

  const stats = getRateLimitStats();

  return NextResponse.json({
    data: stats,
    timestamp: new Date().toISOString(),
  });
});
