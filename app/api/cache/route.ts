import { NextRequest, NextResponse } from "next/server";
import { clearAudioCache, getAudioCacheSize } from "@/lib/tts/piper";
import { withErrorHandler, assertValid } from "@/lib/errors/errorHandler";
import { rateLimiters, getClientIp } from "@/lib/security/rateLimit";
import { logAudit } from "@/lib/monitoring/audit";
import { withRequestLogging } from "@/lib/monitoring/requestLogger";

/**
 * GET /api/cache/stats
 * Returns statistics about the audio cache.
 */
export const GET = withRequestLogging(
  withErrorHandler(async (request: NextRequest) => {
    await rateLimiters.relaxed(request);

    const stats = await getAudioCacheSize();

    return NextResponse.json({
      data: stats,
      warning:
        stats.totalMB > 1000
          ? "Cache size exceeds 1GB. Consider clearing old files."
          : null,
    });
  })
);

/**
 * DELETE /api/cache/clear
 * Clears all cached audio files.
 * Use with caution - this will force regeneration of all audio!
 */
export const DELETE = withRequestLogging(
  withErrorHandler(async (request: NextRequest) => {
    await rateLimiters.strict(request);

    const { searchParams } = request.nextUrl;
    const confirm = searchParams.get("confirm");

    // Require confirmation to prevent accidental deletion
    assertValid(
      confirm === "true",
      "Confirmation required. Add ?confirm=true to the URL to clear cache"
    );

    const deletedCount = await clearAudioCache();

    // ── Audit log ──────────────────────────────────────────────────────────
    logAudit({
      action: "cache.clear",
      ip: getClientIp(request),
      metadata: { deletedCount },
      success: true,
    });

    return NextResponse.json({
      message: "Cache cleared successfully",
      deletedFiles: deletedCount,
    });
  })
);
