import { NextRequest, NextResponse } from "next/server";
import { clearAudioCache, getAudioCacheSize } from "@/lib/tts/piper";

/**
 * GET /api/cache/stats
 * Returns statistics about the audio cache.
 */
export async function GET() {
  try {
    const stats = await getAudioCacheSize();

    return NextResponse.json({
      data: stats,
      warning:
        stats.totalMB > 1000
          ? "Cache size exceeds 1GB. Consider clearing old files."
          : null,
    });
  } catch (error) {
    console.error("[cache/stats] Error:", error);
    return NextResponse.json(
      { error: "Failed to get cache stats" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cache/clear
 * Clears all cached audio files.
 * Use with caution - this will force regeneration of all audio!
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const confirm = searchParams.get("confirm");

    // Require confirmation to prevent accidental deletion
    if (confirm !== "true") {
      return NextResponse.json(
        {
          error: "Confirmation required",
          hint: "Add ?confirm=true to the URL to clear cache",
        },
        { status: 400 }
      );
    }

    const deletedCount = await clearAudioCache();

    return NextResponse.json({
      message: "Cache cleared successfully",
      deletedFiles: deletedCount,
    });
  } catch (error) {
    console.error("[cache/clear] Error:", error);
    return NextResponse.json(
      { error: "Failed to clear cache" },
      { status: 500 }
    );
  }
}
