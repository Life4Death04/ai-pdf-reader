/**
 * Processing Service - Business logic for document background processing
 * 
 * Handles document processing orchestration including:
 * - Fast path (extract + chunk)
 * - Slow path (AI rewrite)
 * - Processing status management
 */

import { prisma } from "../prisma/prisma";
import { processDocument, rewriteDocumentChunks } from "../pdf/process";

export interface ProcessingConfig {
  enableAiRewrite: boolean;
  aiConcurrency: number;
  rewriteMode: "audiobook" | "formal";
}

/**
 * Get processing configuration from environment.
 * 
 * @returns Processing configuration
 */
export function getProcessingConfig(): ProcessingConfig {
  return {
    enableAiRewrite: process.env.ENABLE_AI_REWRITE === "true",
    // Default is 1 because Ollama (phi3) is single-threaded: sending multiple
    // requests simultaneously doesn't increase throughput — it only causes
    // later requests to timeout while waiting in Ollama's queue.
    //
    // Raise AI_CONCURRENCY only if you switch to a model server that supports
    // true parallel inference (e.g. vLLM, llama.cpp with --parallel N,
    // or a hosted API like Claude/GPT-4 that handles concurrent requests natively).
    // A safe starting point for those setups is AI_CONCURRENCY=3; tune up from there.
    aiConcurrency: parseInt(process.env.AI_CONCURRENCY ?? "1", 10),
    rewriteMode: (process.env.AI_REWRITE_MODE ?? "audiobook") as ProcessingConfig["rewriteMode"],
  };
}

/**
 * Run two-phase document processing in background.
 * 
 * Phase 1 (Fast): Extract + Chunk → Document becomes READY (2-5s)
 * Phase 2 (Slow): AI rewrite chunks in background (30-60 minutes, optional)
 * 
 * This function is fire-and-forget. It catches and logs all errors internally.
 * 
 * @param documentId - Document ID to process
 * @param config - Processing configuration (defaults to environment vars)
 */
export async function runBackgroundProcessing(
  documentId: string,
  config: ProcessingConfig = getProcessingConfig()
): Promise<void> {
  try {
    // Phase 1: Fast path - extract and chunk
    console.log(`[processing] Starting fast path for document ${documentId}`);
    await processDocument(documentId);
    console.log(`[processing] Document ${documentId} is READY`);

    // Fetch document language for subsequent processing steps
    const doc = await prisma.document.findUnique({
      where: { id: documentId },
      select: { language: true },
    });
    const language = (doc?.language as "en" | "es") ?? "en";

    if (config.enableAiRewrite) {
      // AI rewrite path: each chunk is rewritten then immediately gets TTS + S3
      // upload without waiting for the rest. generateAllChunkAudio is NOT called
      // separately — audio generation is embedded inside rewriteDocumentChunks.
      console.log(
        `[processing] Starting AI rewrite + audio pipeline for ${documentId} (mode: ${config.rewriteMode}, concurrency: ${config.aiConcurrency}, language: ${language})`
      );

      await rewriteDocumentChunks(documentId, {
        mode: config.rewriteMode,
        language,
        concurrency: config.aiConcurrency,
      });

      console.log(`[processing] AI rewrite + audio pipeline completed for ${documentId}`);
    } else {
      // No rewrite: generate audio from original text in batch
      console.log(`[processing] Starting audio generation for ${documentId} (language: ${language})`);
      const { generateAllChunkAudio } = await import("./audioService");
      await generateAllChunkAudio(documentId, language);
      console.log(`[processing] Audio generation completed for ${documentId}`);
    }
  } catch (error) {
    console.error(
      `[processing] Background processing failed for ${documentId}:`,
      error
    );
    // Don't throw - this is fire-and-forget
  }
}
