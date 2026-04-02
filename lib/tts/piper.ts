import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

// ─────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────

const PIPER_URL = process.env.TTS_SERVICE_URL ?? "http://localhost:5050";
const AUDIO_CACHE_DIR =
  process.env.AUDIO_CACHE_DIR ?? "./public/audio-cache";

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

export interface TTSOptions {
  text: string;
  voice?: string;
  speed?: number;
  chunkId?: string; // Optional: for cache key naming
}

export interface TTSResult {
  audioBuffer: Buffer;
  cached: boolean;
  duration?: number; // seconds (if we can parse WAV header)
}

/**
 * Generates audio from text using Piper TTS service.
 * Caches results on disk to avoid re-generating the same audio.
 *
 * @param options - Text and optional TTS parameters
 * @returns Audio buffer and metadata
 */
export async function generateAudio(
  options: TTSOptions
): Promise<TTSResult> {
  const { text, voice, speed, chunkId } = options;

  // ── Step 1: Check cache ────────────────────────────────────────────────
  const cacheKey = generateCacheKey(text, voice, speed);
  const cachePath = path.join(AUDIO_CACHE_DIR, `${cacheKey}.wav`);

  try {
    const cachedBuffer = await fs.readFile(cachePath);
    console.log(`[TTS] Cache hit: ${chunkId ?? cacheKey.slice(0, 8)}`);
    return {
      audioBuffer: cachedBuffer,
      cached: true,
    };
  } catch {
    // Cache miss — proceed to generation
  }

  // ── Step 2: Call Piper HTTP service ────────────────────────────────────
  console.log(
    `[TTS] Generating audio for ${chunkId ?? `text (${text.length} chars)`}...`
  );

  const requestBody = {
    text,
    ...(voice && { voice }),
    ...(speed && { length_scale: 1 / speed }), // Piper uses inverse of speed
  };

  const response = await fetch(PIPER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Piper TTS failed (${response.status}): ${errorText}`
    );
  }

  // ── Step 3: Read audio buffer ─────────────────────────────────────────
  const audioBuffer = Buffer.from(await response.arrayBuffer());

  // ── Step 4: Cache the result ──────────────────────────────────────────
  await ensureCacheDir();
  await fs.writeFile(cachePath, audioBuffer);

  console.log(
    `[TTS] Generated & cached: ${chunkId ?? cacheKey.slice(0, 8)} (${(audioBuffer.length / 1024).toFixed(1)}KB)`
  );

  return {
    audioBuffer,
    cached: false,
  };
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/**
 * Generates a deterministic cache key from TTS parameters.
 * Same text + voice + speed = same key = reuse cached audio.
 */
function generateCacheKey(
  text: string,
  voice?: string,
  speed?: number
): string {
  const normalized = `${text}|${voice ?? "default"}|${speed ?? 1.0}`;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

/**
 * Ensures the audio cache directory exists.
 */
async function ensureCacheDir(): Promise<void> {
  await fs.mkdir(AUDIO_CACHE_DIR, { recursive: true });
}

/**
 * Clears all cached audio files.
 * Useful for testing or if cache grows too large.
 */
export async function clearAudioCache(): Promise<number> {
  try {
    const files = await fs.readdir(AUDIO_CACHE_DIR);
    const wavFiles = files.filter((f) => f.endsWith(".wav"));

    await Promise.all(
      wavFiles.map((f) => fs.unlink(path.join(AUDIO_CACHE_DIR, f)))
    );

    console.log(`[TTS] Cleared ${wavFiles.length} cached audio files`);
    return wavFiles.length;
  } catch (error) {
    console.error("[TTS] Failed to clear cache:", error);
    return 0;
  }
}
