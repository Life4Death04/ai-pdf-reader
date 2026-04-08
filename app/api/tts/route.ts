import { NextRequest, NextResponse } from "next/server";
import { generateAudio } from "@/lib/tts/piper";
import { withErrorHandler, assertValid } from "@/lib/errors/errorHandler";
import { ValidationError } from "@/lib/errors/AppError";
import { rateLimiters } from "@/lib/security/rateLimit";
import { withRequestLogging } from "@/lib/monitoring/requestLogger";
import { z } from "zod";

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
export const POST = withRequestLogging(
  withErrorHandler(async (request: NextRequest) => {
    await rateLimiters.standard(request);

    const body = await request.json();
    const { text, voice, speed } = body;

    // ── Validation ─────────────────────────────────────────────────────────
    assertValid(text && typeof text === "string", "Missing or invalid 'text' field");

    if (text.length > 5000) {
      throw new ValidationError("Text too long (max 5000 characters per request)");
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
  })
);
