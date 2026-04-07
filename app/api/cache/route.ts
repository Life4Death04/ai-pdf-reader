import { NextRequest, NextResponse } from "next/server";
import { clearAudioCache, getAudioCacheSize } from "@/lib/tts/piper";
import { withErrorHandler, assertValid } from "@/lib/errors/errorHandler";

/**
 * GET /api/cache/stats
 * Returns statistics about the audio cache.
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  const stats = await getAudioCacheSize();

  return NextResponse.json({
    data: stats,
    warning:
      stats.totalMB > 1000
        ? "Cache size exceeds 1GB. Consider clearing old files."
        : null,
  });
});

/**
 * DELETE /api/cache/clear
 * Clears all cached audio files.
 * Use with caution - this will force regeneration of all audio!
 */
export const DELETE = withErrorHandler(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const confirm = searchParams.get("confirm");

  // Require confirmation to prevent accidental deletion
  assertValid(
    confirm === "true",
    "Confirmation required. Add ?confirm=true to the URL to clear cache"
  );

  const deletedCount = await clearAudioCache();

  return NextResponse.json({
    message: "Cache cleared successfully",
    deletedFiles: deletedCount,
  });
});
