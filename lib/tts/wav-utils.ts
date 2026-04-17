/**
 * WAV file utilities for streaming audio.
 * Handles WAV header manipulation and concatenation.
 */

// ─────────────────────────────────────────────
// WAV File Format Constants
// ─────────────────────────────────────────────

const WAV_HEADER_SIZE = 44;

// Standard Piper output format
const SAMPLE_RATE = 22050;
const BITS_PER_SAMPLE = 16;
const NUM_CHANNELS = 1; // Mono

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

/**
 * Creates a WAV file header for streaming.
 * 
 * @param dataSize - Total audio data size in bytes (can be estimated)
 * @returns Buffer containing WAV header
 */
export function createWAVHeader(dataSize: number): Buffer {
  const header = Buffer.alloc(WAV_HEADER_SIZE);
  
  // RIFF chunk descriptor
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4); // File size - 8
  header.write("WAVE", 8);
  
  // fmt sub-chunk
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20); // AudioFormat (1 = PCM)
  header.writeUInt16LE(NUM_CHANNELS, 22); // NumChannels
  header.writeUInt32LE(SAMPLE_RATE, 24); // SampleRate
  header.writeUInt32LE(SAMPLE_RATE * NUM_CHANNELS * (BITS_PER_SAMPLE / 8), 28); // ByteRate
  header.writeUInt16LE(NUM_CHANNELS * (BITS_PER_SAMPLE / 8), 32); // BlockAlign
  header.writeUInt16LE(BITS_PER_SAMPLE, 34); // BitsPerSample
  
  // data sub-chunk
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40); // Subchunk2Size
  
  return header;
}

/**
 * Strips the WAV header from an audio buffer, leaving only PCM data.
 * Used when concatenating multiple WAV files into a single stream.
 * 
 * @param wavBuffer - Complete WAV file buffer
 * @returns PCM audio data without header
 */
export function stripWAVHeader(wavBuffer: Buffer): Buffer {
  // WAV files always have 44-byte header for standard PCM format
  return wavBuffer.subarray(WAV_HEADER_SIZE);
}

/**
 * Generates a buffer of silence (zeros) in PCM format.
 * Used as fallback when TTS generation fails.
 * 
 * @param durationSeconds - Duration of silence to generate
 * @returns PCM audio data (no WAV header) containing silence
 */
export function generateSilence(durationSeconds: number): Buffer {
  const bytesPerSecond = SAMPLE_RATE * NUM_CHANNELS * (BITS_PER_SAMPLE / 8);
  const dataSize = Math.floor(bytesPerSecond * durationSeconds);
  
  // Allocate buffer filled with zeros (silence in PCM)
  return Buffer.alloc(dataSize);
}

/**
 * Estimates total audio duration from text length.
 * Used to pre-calculate the WAV header size.
 * 
 * Rule of thumb: ~150 words per minute reading speed
 * Average word length: 5 characters
 * 
 * @param textLength - Total character count
 * @returns Estimated duration in seconds
 */
export function estimateAudioDuration(textLength: number): number {
  const wordsPerMinute = 150;
  const avgWordLength = 5;
  const estimatedWords = textLength / avgWordLength;
  const minutes = estimatedWords / wordsPerMinute;
  return Math.ceil(minutes * 60);
}

/**
 * Calculates audio data size from duration.
 * 
 * @param durationSeconds - Duration in seconds
 * @returns Size in bytes
 */
export function calculateAudioSize(durationSeconds: number): number {
  const bytesPerSecond = SAMPLE_RATE * NUM_CHANNELS * (BITS_PER_SAMPLE / 8);
  return bytesPerSecond * durationSeconds;
}

/**
 * Parses the actual audio duration from a WAV buffer's header.
 * Reads ByteRate and data sub-chunk size directly from the header,
 * rather than relying on hardcoded constants, so it works correctly
 * regardless of the voice model's sample rate or channel count.
 *
 * WAV header layout (standard PCM):
 *   Offset 28: ByteRate  = SampleRate × NumChannels × BitsPerSample/8 (uint32 LE)
 *   Offset 40: DataSize  = number of audio data bytes (uint32 LE)
 *
 * @param wavBuffer - Complete WAV file buffer (must include 44-byte header)
 * @returns Duration in seconds
 */
export function parseWavDuration(wavBuffer: Buffer): number {
  const byteRate = wavBuffer.readUInt32LE(28); // bytes per second
  const dataSize = wavBuffer.readUInt32LE(40); // total audio data bytes
  return dataSize / byteRate;
}

// ─────────────────────────────────────────────
// Future: MP3 Conversion Support
// ─────────────────────────────────────────────

/**
 * TODO: Add MP3 streaming support for better compression.
 * 
 * Benefits of MP3 over WAV:
 * - 90% smaller file size (better for mobile)
 * - Native streaming support (no header issues)
 * - Better browser compatibility
 * 
 * Implementation approach:
 * 1. Install ffmpeg: `sudo apt install ffmpeg`
 * 2. Add node package: `npm install fluent-ffmpeg @types/fluent-ffmpeg`
 * 3. Create conversion function:
 * 
 * ```typescript
 * import ffmpeg from 'fluent-ffmpeg';
 * 
 * export async function convertWAVtoMP3(wavBuffer: Buffer): Promise<Buffer> {
 *   return new Promise((resolve, reject) => {
 *     const chunks: Buffer[] = [];
 *     
 *     ffmpeg()
 *       .input(Readable.from(wavBuffer))
 *       .inputFormat('wav')
 *       .audioCodec('libmp3lame')
 *       .audioBitrate('128k')
 *       .format('mp3')
 *       .on('error', reject)
 *       .pipe()
 *       .on('data', (chunk) => chunks.push(chunk))
 *       .on('end', () => resolve(Buffer.concat(chunks)));
 *   });
 * }
 * ```
 * 
 * 4. Modify streaming response:
 *    - Change Content-Type to 'audio/mpeg'
 *    - Convert each chunk before enqueuing
 *    - No need for header manipulation!
 */
