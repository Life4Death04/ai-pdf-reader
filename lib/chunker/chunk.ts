import type { TextChunkInput } from "@/types";
import { preprocessText } from "./filter";

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

// We approximate tokens using character count: 1 token ≈ 4 chars (English avg).
// Target: 800 tokens → ~3200 chars per chunk.
// Max:   1200 tokens → ~4800 chars.
// Overlap: 100 tokens → ~400 chars (prevents cutting a sentence mid-thought).
const TARGET_CHARS = 3200;
const MAX_CHARS = 4800;
const OVERLAP_CHARS = 400;

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

/**
 * Splits extracted PDF text into overlapping chunks ready for TTS.
 *
 * Strategy:
 * 1. Split text into sentences (using punctuation boundaries).
 * 2. Accumulate sentences into a chunk until TARGET_CHARS is reached.
 * 3. When a chunk is "full", store it and begin the next with ~OVERLAP_CHARS
 *    worth of text carried over from the end of the previous chunk.
 *
 * Why sentence-aware splitting?
 * - Splitting mid-sentence produces unnatural TTS pauses (Piper reads each
 *   chunk as a standalone utterance, so incomplete sentences sound wrong).
 * - Overlap ensures that context isn't lost at chunk boundaries, which
 *   matters when we later do AI summarization/rewriting per chunk.
 */
export function chunkText(text: string): TextChunkInput[] {
  const sentences = splitIntoSentences(text);
  const chunks: TextChunkInput[] = [];
  let buffer = "";
  let index = 0;

  console.log(`[chunkText] Starting chunking: ${sentences.length} sentences`);

  for (const sentence of sentences) {
    const candidate = buffer ? buffer + " " + sentence : sentence;

    if (candidate.length > MAX_CHARS && buffer.length > 0) {
      // Buffer is full — flush it as a chunk
      chunks.push(makeChunk(index++, buffer));
      console.log(`[chunkText] Created chunk ${index - 1}: ${buffer.length} chars`);
      // Start next buffer with overlap from end of current buffer
      buffer = getOverlap(buffer) + " " + sentence;
    } else if (candidate.length >= TARGET_CHARS) {
      // We've hit the target — include this sentence then flush
      chunks.push(makeChunk(index++, candidate));
      console.log(`[chunkText] Created chunk ${index - 1}: ${candidate.length} chars`);
      buffer = getOverlap(candidate);
    } else {
      buffer = candidate;
    }
  }

  // Flush any remaining text as the last chunk
  if (buffer.trim().length > 0) {
    chunks.push(makeChunk(index, buffer));
    console.log(`[chunkText] Created final chunk ${index}: ${buffer.length} chars`);
  }

  return chunks;
}

/**
 * Complete preprocessing + chunking pipeline.
 * 
 * Applies page-level filtering BEFORE chunking to remove:
 * - Table of contents
 * - Indexes
 * - References/Bibliography
 * - Short pages (< 50 words)
 * - Non-text content (tables, code)
 * 
 * Then chunks the filtered text for TTS.
 * 
 * USE THIS for production PDF processing.
 * Use plain `chunkText()` only if you've already filtered the text.
 * 
 * @param text - Cleaned text from PDF extraction
 * @returns Array of filtered, chunked text ready for TTS
 */
export function chunkTextWithFiltering(text: string): TextChunkInput[] {
  console.log("\n" + "=".repeat(60));
  console.log("📚 CHUNK WITH FILTERING PIPELINE");
  console.log("=".repeat(60) + "\n");
  
  // Step 1: Filter out useless pages
  const filtered = preprocessText(text);
  
  // Step 2: Chunk the filtered text
  const chunks = chunkText(filtered);
  
  console.log("\n" + "=".repeat(60));
  console.log("✅ CHUNKING PIPELINE COMPLETE");
  console.log(`   Total chunks: ${chunks.length}`);
  console.log("=".repeat(60) + "\n");
  
  return chunks;
}

export function estimateTokenCount(text: string): number {
  // Rough approximation: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
}

// ─────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────

function makeChunk(index: number, text: string): TextChunkInput {
  const trimmed = text.trim();
  return {
    index,
    text: trimmed,
    tokenCount: estimateTokenCount(trimmed),
  };
}

/**
 * Returns the last OVERLAP_CHARS characters of a chunk, starting at a
 * sentence boundary so the overlap begins with a complete sentence.
 */
function getOverlap(text: string): string {
  if (text.length <= OVERLAP_CHARS) return text;

  const tail = text.slice(-OVERLAP_CHARS);

  // Try to start at a sentence boundary within the tail
  const sentenceStart = tail.search(/(?<=[.!?])\s+[A-Z]/);
  if (sentenceStart !== -1) {
    return tail.slice(sentenceStart).trim();
  }

  // Fall back to word boundary
  const wordStart = tail.indexOf(" ");
  return wordStart !== -1 ? tail.slice(wordStart + 1) : tail;
}

/**
 * Splits text into sentences using punctuation and newlines as boundaries.
 * This is intentionally simple — a full NLP tokenizer would be overkill for
 * a personal app and would add significant bundle weight.
 */
function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+|(?<=\n\n)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
