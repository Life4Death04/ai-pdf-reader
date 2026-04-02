import { NextRequest, NextResponse } from "next/server";
import { generateAudio } from "@/lib/tts/piper";

/**
 * POST /api/tts
 *
 * Generates audio from text using Piper TTS service.
 *
 * Request body:
 *   {
 *     "text": "Text to speak",
 *     "voice": "en_US-lessac-medium" (optional),
 *     "speed": 1.0 (optional, 0.5–2.0)
 *   }
 *
 * Response:
 *   - Success: WAV audio file (Content-Type: audio/wav)
 *   - Error: JSON with error message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voice, speed } = body;

    // ── Validation ─────────────────────────────────────────────────────────
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'text' field" },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: "Text too long (max 5000 characters per request)" },
        { status: 400 }
      );
    }

    // ── Generate audio ─────────────────────────────────────────────────────
    const result = await generateAudio({
      text,
      voice,
      speed: speed ? parseFloat(speed) : undefined,
    });

    // ── Return audio file ──────────────────────────────────────────────────
    // Convert Buffer to Uint8Array for NextResponse compatibility
    const audioData = new Uint8Array(result.audioBuffer);
    
    return new NextResponse(audioData, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "X-TTS-Cached": result.cached ? "true" : "false",
        "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
      },
    });
  } catch (error) {
    console.error("[api/tts] Error:", error);

    const message =
      error instanceof Error ? error.message : "TTS generation failed";

    return NextResponse.json(
      {
        error: message,
        details:
          "Make sure Piper HTTP server is running on the configured port",
      },
      { status: 500 }
    );
  }
}
