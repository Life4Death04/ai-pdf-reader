/**
 * AI Rewrite Module - Local LLM via Ollama
 * 
 * Transforms clean text chunks into natural, conversational audiobook-style
 * narration while preserving ALL original information.
 * 
 * NOT summarization - this is full content rewriting for better audio experience.
 */

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "phi3"; // Default to a smaller, faster model for chunk rewriting

// Skip rewriting for very short chunks (not worth the processing time)
const MIN_CHUNK_LENGTH = 100;

// Timeout for Ollama requests
// First request needs more time for model loading (cold start)
const OLLAMA_TIMEOUT_FIRST = 180000; // 3 minutes for first chunk (model loading)
const OLLAMA_TIMEOUT = 120000; // 2 minutes for subsequent chunks

// Max tokens to generate (prevents phi3 from rambling)
const MAX_TOKENS = 2000;

// Track if model has been warmed up
let modelWarmedUp = false;

// ═══════════════════════════════════════════════════════════════════════════
// PROMPT ENGINEERING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Constructs the system prompt for the rewrite task.
 * 
 * OPTIMIZED FOR PHI3: Shorter, more direct prompts work better with smaller models.
 * Phi3 tends to be verbose, so we keep instructions minimal and focused.
 */
function buildRewritePrompt(chunk: string, mode: "audiobook" | "formal" = "audiobook"): string {
  if (mode === "audiobook") {
    return `Rewrite this text as audiobook narration. Keep ALL information. Use natural, flowing language with shorter sentences. Begin directly with the content — no greetings, no "Hey", no "So", no filler openers. Output only the rewritten text.

Text:
${chunk}

Rewritten:`;
  } else {
    return `Rewrite this as clear professional audiobook narration. Keep ALL information. Use accessible language with shorter sentences. Begin directly with the content — no filler phrases or transitions. Output only the rewritten text.

Text:
${chunk}

Rewritten:`;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// OLLAMA CLIENT
// ═══════════════════════════════════════════════════════════════════════════

interface OllamaResponse {
  model: string;
  response: string;
  done: boolean;
}

/**
 * Sends a request to Ollama API.
 * 
 * WHY: Ollama provides a simple REST API for local LLM inference.
 * We use the /api/generate endpoint with streaming disabled for simplicity.
 * 
 * @param prompt - The full prompt including instructions + text to rewrite
 * @returns The generated text from the model
 */
async function callOllama(prompt: string, isFirstRequest = false): Promise<string> {
  console.log(`[Ollama] Sending request to ${OLLAMA_URL}/api/generate...`);
  console.log(`[Ollama] Model: ${OLLAMA_MODEL}`);
  console.log(`[Ollama] Prompt length: ${prompt.length} characters`);
  console.log(`[Ollama] First request: ${isFirstRequest}`);

  const timeout = isFirstRequest ? OLLAMA_TIMEOUT_FIRST : OLLAMA_TIMEOUT;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.log(`[Ollama] Request timed out after ${timeout}ms, aborting...`);
    controller.abort();
  }, timeout);
  
  const startTime = Date.now();

  try {
    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false, // Get full response at once (simpler)
        options: {
          temperature: 0.7, // Slightly creative but consistent
          top_p: 0.9,
          top_k: 40,
          num_predict: MAX_TOKENS, // Limit output length to prevent rambling
        },
      }),
      signal: controller.signal, // Re-enabled: actually abort on timeout
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data: OllamaResponse = await response.json();
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[Ollama] Response received in ${duration}s: ${data.response.length} characters`);
    
    return data.response.trim();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        const timeoutUsed = isFirstRequest ? OLLAMA_TIMEOUT_FIRST : OLLAMA_TIMEOUT;
        throw new Error(`Ollama request timed out after ${timeoutUsed}ms`);
      }
      throw error;
    }
    
    throw new Error("Unknown Ollama error");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN REWRITE FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Rewrites a text chunk using Ollama LLM to make it more natural for audiobooks.
 * 
 * PROCESS:
 * 1. Check if chunk is long enough to warrant rewriting
 * 2. Build prompt with instructions
 * 3. Send to Ollama
 * 4. Return rewritten text
 * 5. On error, fallback to original text
 * 
 * WHY THIS DESIGN:
 * - Simple and synchronous (no complex async queues)
 * - Fails gracefully (returns original on error)
 * - Skips processing for tiny chunks (efficiency)
 * - Logs everything for debugging
 * 
 * @param chunk - Original text chunk from PDF
 * @param options - Configuration options
 * @returns Rewritten chunk (or original if rewrite fails)
 */
export async function rewriteChunk(
  chunk: string,
  options: {
    mode?: "audiobook" | "formal";
    skipShort?: boolean;
  } = {}
): Promise<string> {
  const { mode = "audiobook", skipShort = true } = options;

  console.log("\n" + "─".repeat(60));
  console.log("🎙️  AI REWRITE STARTED");
  console.log("─".repeat(60));

  // ───────────────────────────────────────────────────────────────────────────
  // Skip Check: Is chunk worth rewriting?
  // ───────────────────────────────────────────────────────────────────────────
  if (skipShort && chunk.length < MIN_CHUNK_LENGTH) {
    console.log(`⏭️  SKIP: Chunk too short (${chunk.length} < ${MIN_CHUNK_LENGTH} chars)`);
    console.log("─".repeat(60) + "\n");
    return chunk;
  }

  console.log(`📝 Original length: ${chunk.length} characters`);
  console.log(`🎯 Mode: ${mode}`);
  console.log(`📄 Preview: ${chunk.slice(0, 100)}...`);

  // ───────────────────────────────────────────────────────────────────────────
  // Build Prompt
  // ───────────────────────────────────────────────────────────────────────────
  const prompt = buildRewritePrompt(chunk, mode);

  try {
    // ─────────────────────────────────────────────────────────────────────────
    // Call Ollama
    // ─────────────────────────────────────────────────────────────────────────
    const startTime = Date.now();
    const isFirstRequest = !modelWarmedUp;
    
    if (isFirstRequest) {
      console.log("🔥 First request - model will be loaded into memory (may take 1-3 minutes)");
      modelWarmedUp = true;
    }
    
    const rewritten = await callOllama(prompt, isFirstRequest);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // ─────────────────────────────────────────────────────────────────────────
    // Validation: Ensure we got something back
    // ─────────────────────────────────────────────────────────────────────────
    if (!rewritten || rewritten.length < 50) {
      console.log("⚠️  WARNING: Rewritten text too short, using original");
      console.log("─".repeat(60) + "\n");
      return chunk;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Success!
    // ─────────────────────────────────────────────────────────────────────────
    console.log(`✅ Rewrite complete in ${duration}s`);
    console.log(`📝 New length: ${rewritten.length} characters`);
    console.log(`📊 Length change: ${((rewritten.length / chunk.length - 1) * 100).toFixed(1)}%`);
    console.log(`📄 Preview: ${rewritten.slice(0, 100)}...`);
    console.log("─".repeat(60) + "\n");

    return rewritten;
  } catch (error) {
    // ─────────────────────────────────────────────────────────────────────────
    // Error Handling: Fallback to Original
    // ─────────────────────────────────────────────────────────────────────────
    console.error("❌ REWRITE FAILED:", error);
    console.log("🔄 Fallback: Using original text");
    console.log("─".repeat(60) + "\n");
    
    return chunk; // CRITICAL: Don't block the pipeline, just use original
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// BATCH PROCESSING UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Warms up the Ollama model by sending a small test request.
 * 
 * WHY: The first request to Ollama loads the model into memory which can take
 * 30-60+ seconds for phi3. By warming up with a tiny request first, we:
 * 1. Pre-load the model before processing real chunks
 * 2. Fail fast if Ollama is misconfigured
 * 3. Make first real chunk process at normal speed
 * 
 * @returns true if warmup succeeded, false otherwise
 */
export async function warmupModel(): Promise<boolean> {
  if (modelWarmedUp) {
    console.log("🔥 Model already warmed up, skipping...");
    return true;
  }

  console.log("\n" + "🔥".repeat(30));
  console.log("🔥 WARMING UP MODEL...");
  console.log("🔥 This loads phi3 into memory (30-60 seconds)");
  console.log("🔥".repeat(30) + "\n");

  try {
    const testPrompt = "Rewrite for audio: The sky is blue.\n\nRewritten:";
    const startTime = Date.now();
    
    await callOllama(testPrompt, true);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    modelWarmedUp = true;
    
    console.log(`\n✅ Model warmed up successfully in ${duration}s`);
    console.log("📦 Ready to process chunks at normal speed\n");
    
    return true;
  } catch (error) {
    console.error("❌ Model warmup failed:", error);
    console.log("⚠️  First chunk will be slower as model loads\n");
    return false;
  }
}

/**
 * Rewrites multiple chunks sequentially.
 * 
 * WHY SEQUENTIAL:
 * - Ollama runs on CPU, can't handle many parallel requests
 * - Sequential processing keeps memory usage stable
 * - Easier to track progress and debug
 * 
 * FUTURE OPTIMIZATION:
 * - Could add a queue system (Bull/BullMQ)
 * - Could process in background after upload
 * - Could parallelize with semaphore (limit to 2-3 concurrent)
 * 
 * @param chunks - Array of text chunks
 * @param onProgress - Optional callback for progress updates
 * @returns Array of rewritten chunks
 */
export async function rewriteChunks(
  chunks: string[],
  options: {
    mode?: "audiobook" | "formal";
    onProgress?: (completed: number, total: number) => void;
    skipWarmup?: boolean;
  } = {}
): Promise<string[]> {
  const { mode = "audiobook", onProgress, skipWarmup = false } = options;

  console.log("\n" + "=".repeat(60));
  console.log(`🎙️  BATCH REWRITE: ${chunks.length} chunks`);
  console.log("=".repeat(60) + "\n");

  // ───────────────────────────────────────────────────────────────────────────
  // Warmup: Pre-load model before processing chunks
  // ───────────────────────────────────────────────────────────────────────────
  if (!skipWarmup && !modelWarmedUp) {
    await warmupModel();
  }

  const rewritten: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
    console.log(`\n📦 Processing chunk ${i + 1}/${chunks.length}`);
    
    const result = await rewriteChunk(chunks[i], { mode });
    rewritten.push(result);

    if (onProgress) {
      onProgress(i + 1, chunks.length);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ BATCH REWRITE COMPLETE");
  console.log(`   Processed: ${chunks.length} chunks`);
  console.log("=".repeat(60) + "\n");

  return rewritten;
}

// ═══════════════════════════════════════════════════════════════════════════
// HEALTH CHECK
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Checks if Ollama is running and accessible.
 * 
 * USAGE: Call this before starting a large batch to fail fast if Ollama is down.
 * 
 * @returns true if Ollama is healthy, false otherwise
 */
export async function checkOllamaHealth(): Promise<boolean> {
  try {
    console.log(`[Ollama Health] Checking ${OLLAMA_URL}...`);
    
    const response = await fetch(`${OLLAMA_URL}/api/tags`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`[Ollama Health] ❌ Not healthy: ${response.status}`);
      return false;
    }

    const data = await response.json();
    console.log(`[Ollama Health] ✅ Healthy - Available models:`, data.models?.map((m: any) => m.name));
    
    return true;
  } catch (error) {
    console.error("[Ollama Health] ❌ Failed to connect:", error);
    return false;
  }
}
