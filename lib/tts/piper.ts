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
  retries?: number; // Number of retry attempts on failure (default: 3)
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
  const { text, voice, speed, chunkId, retries = 3 } = options;

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

  // ── Step 2: Call Piper HTTP service (with retry logic) ────────────────
  console.log(
    `[TTS] Generating audio for ${chunkId ?? `text (${text.length} chars)`}...`
  );

  const requestBody = {
    text,
    ...(voice && { voice }),
    ...(speed && { length_scale: 1 / speed }), // Piper uses inverse of speed
  };

  // Retry with exponential backoff on failure
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
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

      // ── Step 3: Read audio buffer ───────────────────────────────────────
      const audioBuffer = Buffer.from(await response.arrayBuffer());

      // ── Step 4: Cache the result ────────────────────────────────────────
      await ensureCacheDir();
      await fs.writeFile(cachePath, audioBuffer);

      console.log(
        `[TTS] Generated & cached: ${chunkId ?? cacheKey.slice(0, 8)} (${(audioBuffer.length / 1024).toFixed(1)}KB)${attempt > 1 ? ` [retry ${attempt - 1}]` : ""}`
      );

      return {
        audioBuffer,
        cached: false,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt < retries) {
        // Exponential backoff: 500ms, 1000ms, 2000ms
        const delayMs = 500 * Math.pow(2, attempt - 1);
        console.warn(
          `[TTS] Attempt ${attempt}/${retries} failed for ${chunkId ?? "chunk"}, retrying in ${delayMs}ms...`
        );
        await sleep(delayMs);
      }
    }
  }

  // All retries failed
  console.error(
    `[TTS] Failed after ${retries} attempts for ${chunkId ?? "chunk"}:`,
    lastError
  );
  throw lastError!;
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

/**
 * Helper: Sleep for a given duration.
 * Used for exponential backoff in retry logic.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
