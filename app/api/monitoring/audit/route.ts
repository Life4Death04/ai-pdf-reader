/**
 * Audit Log Endpoint
 */

import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/errors/errorHandler";
import { getAuditLog, getAuditStats } from "@/lib/monitoring/audit";
import { ForbiddenError } from "@/lib/errors/AppError";

export const GET = withErrorHandler(async (request: NextRequest) => {
  // Only allow in development or if explicitly enabled
  if (process.env.NODE_ENV !== "development" && process.env.ENABLE_MONITORING !== "true") {
    throw new ForbiddenError("Monitoring endpoints are disabled");
  }

  const { searchParams } = request.nextUrl;
  const action = searchParams.get("action") || undefined;
  const userId = searchParams.get("userId") || undefined;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit")!, 10)
    : 100;

  const logs = getAuditLog({ action: action as any, userId, limit });
  const stats = getAuditStats();

  return NextResponse.json({
    data: {
      logs,
      stats,
    },
    timestamp: new Date().toISOString(),
  });
});
