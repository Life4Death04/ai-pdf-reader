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
  chunkIndex?: number; // Chunk index (0-based) for limiting TTS generation
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
 * Note: TTS is only applied to the first 2 chunks of each document.
 *
 * @param options - Text and optional TTS parameters
 * @returns Audio buffer and metadata
 */
export async function generateAudio(
  options: TTSOptions
): Promise<TTSResult> {
  const { text, voice, speed, chunkId } = options;

  console.log(`[TTS] Starting audio generation for chunk: ${chunkId ?? "unnamed"}`);
  console.log(`[TTS] Text length: ${text.length} characters`);
  console.log(`[TTS] Voice: ${voice ?? "default"}, Speed: ${speed ?? 1.0}`);

  // ── Step 1: Check cache ────────────────────────────────────────────────
  const cacheKey = generateCacheKey(text, voice, speed);
  const cachePath = path.join(AUDIO_CACHE_DIR, `${cacheKey}.wav`);

  console.log(`[TTS] Cache key: ${cacheKey.slice(0, 16)}...`);
  console.log(`[TTS] Checking cache at: ${cachePath}`);

  try {
    const cachedBuffer = await fs.readFile(cachePath);
    console.log(`[TTS] ✓ Cache hit for chunk: ${chunkId ?? cacheKey.slice(0, 8)}`);
    console.log(`[TTS] Cached file size: ${(cachedBuffer.length / 1024).toFixed(1)}KB`);
    return {
      audioBuffer: cachedBuffer,
      cached: true,
    };
  } catch {
    console.log(`[TTS] Cache miss - will generate new audio`);
  }

  // ── Step 2: Call Piper HTTP service ────────────────────────────────────
  console.log(`[TTS] Generating audio for chunk: ${chunkId ?? `text (${text.length} chars)`}`);
  console.log(`[TTS] TTS service URL: ${PIPER_URL}`);

  const requestBody = {
    text,
    ...(voice && { voice }),
    ...(speed && { length_scale: 1 / speed }), // Piper uses inverse of speed
  };

  console.log(`[TTS] Request body:`, JSON.stringify(requestBody, null, 2));

  try {
    console.log(`[TTS] Sending request to Piper service...`);
    const requestStart = Date.now();
    
    const response = await fetch(PIPER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const requestDuration = Date.now() - requestStart;
    console.log(`[TTS] Request completed in ${requestDuration}ms with status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[TTS] ✗ Piper TTS error response:`, errorText);
      throw new Error(
        `Piper TTS failed (${response.status}): ${errorText}`
      );
    }

    // ── Step 3: Read audio buffer ───────────────────────────────────────
    console.log(`[TTS] Reading audio buffer from response...`);
    const audioBuffer = Buffer.from(await response.arrayBuffer());
    console.log(`[TTS] Audio buffer received: ${(audioBuffer.length / 1024).toFixed(1)}KB`);

    // ── Step 4: Cache the result ────────────────────────────────────────
    console.log(`[TTS] Caching audio to: ${cachePath}`);
    await ensureCacheDir();
    await fs.writeFile(cachePath, audioBuffer);
    console.log(`[TTS] ✓ Audio cached successfully`);

    console.log(
      `[TTS] ✓ Generated & cached: ${chunkId ?? cacheKey.slice(0, 8)} (${(audioBuffer.length / 1024).toFixed(1)}KB)`
    );

    return {
      audioBuffer,
      cached: false,
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error(`[TTS] ✗ Failed to generate audio:`, err.message);
    throw err;
  }
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

/**
 * Clears cached audio for a specific document by deleting files matching
 * chunks from that document.
 * 
 * This should be called when a document is deleted to free up disk space.
 * 
 * @param chunkTexts - Array of chunk texts from the document
 * @returns Number of files deleted
 */
export async function clearDocumentAudioCache(
  chunkTexts: string[]
): Promise<number> {
  try {
    let deletedCount = 0;

    for (const text of chunkTexts) {
      const cacheKey = generateCacheKey(text);
      const cachePath = path.join(AUDIO_CACHE_DIR, `${cacheKey}.wav`);

      try {
        await fs.unlink(cachePath);
        deletedCount++;
      } catch {
        // File doesn't exist or already deleted - ignore
      }
    }

    console.log(
      `[TTS] Cleared ${deletedCount}/${chunkTexts.length} cached audio files for document`
    );
    return deletedCount;
  } catch (error) {
    console.error("[TTS] Failed to clear document audio cache:", error);
    return 0;
  }
}

/**
 * Gets the total size of the audio cache directory.
 * 
 * @returns Size in bytes
 */
export async function getAudioCacheSize(): Promise<{
  totalFiles: number;
  totalBytes: number;
  totalMB: number;
}> {
  try {
    const files = await fs.readdir(AUDIO_CACHE_DIR);
    const wavFiles = files.filter((f) => f.endsWith(".wav"));

    let totalBytes = 0;
    for (const file of wavFiles) {
      const stats = await fs.stat(path.join(AUDIO_CACHE_DIR, file));
      totalBytes += stats.size;
    }

    return {
      totalFiles: wavFiles.length,
      totalBytes,
      totalMB: parseFloat((totalBytes / 1024 / 1024).toFixed(2)),
    };
  } catch (error) {
    console.error("[TTS] Failed to get cache size:", error);
    return { totalFiles: 0, totalBytes: 0, totalMB: 0 };
  }
}
