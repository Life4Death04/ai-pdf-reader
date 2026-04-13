/**
 * Processing Service - Business logic for document background processing
 * 
 * Handles document processing orchestration including:
 * - Fast path (extract + chunk)
 * - Slow path (AI rewrite)
 * - Processing status management
 */

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
    aiConcurrency: parseInt(process.env.AI_CONCURRENCY ?? "3", 10),
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

    // Phase 1.5: Pre-generate audio and upload to S3
    console.log(`[processing] Starting audio generation for ${documentId}`);
    const { generateAllChunkAudio } = await import("./audioService");
    await generateAllChunkAudio(documentId);
    console.log(`[processing] Audio generation completed for ${documentId}`);

    // Phase 2: Slow path - optionally rewrite chunks
    if (config.enableAiRewrite) {
      console.log(
        `[processing] Starting AI rewrite in background for ${documentId} (mode: ${config.rewriteMode}, concurrency: ${config.aiConcurrency})`
      );
      
      await rewriteDocumentChunks(documentId, {
        mode: config.rewriteMode,
        concurrency: config.aiConcurrency,
      });
      
      console.log(`[processing] AI rewrite completed for ${documentId}`);
    } else {
      console.log(`[processing] AI rewrite disabled. Skipping for ${documentId}`);
    }
  } catch (error) {
    console.error(
      `[processing] Background processing failed for ${documentId}:`,
      error
    );
    // Don't throw - this is fire-and-forget
  }
}
