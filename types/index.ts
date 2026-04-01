import type { Document, TextChunk, PlaybackProgress } from "../generated/prisma";

// ─────────────────────────────────────────────
// Re-export Prisma enums for use across the app
// ─────────────────────────────────────────────
export { ProcessingMode, DocumentStatus } from "../generated/prisma";

// ─────────────────────────────────────────────
// Extended types (Prisma model + relations)
// ─────────────────────────────────────────────
export type DocumentWithChunks = Document & {
  chunks: TextChunk[];
};

export type DocumentWithProgress = Document & {
  playbackProgress: PlaybackProgress[];
};

// ─────────────────────────────────────────────
// API response shapes
// ─────────────────────────────────────────────
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface UploadResponse {
  documentId: string;
  title: string;
  status: string;
}

export interface ProgressPayload {
  documentId: string;
  time: number;
  chunkIndex: number;
  mode: string;
}

// ─────────────────────────────────────────────
// TTS types
// ─────────────────────────────────────────────
export interface TTSRequest {
  text: string;
  chunkId?: string;
  speed?: number; // 1.0 default
}

export interface TTSResponse {
  audioBuffer: Buffer;
  duration?: number; // seconds
  cached: boolean;
}

// ─────────────────────────────────────────────
// Chunker types
// ─────────────────────────────────────────────
export interface TextChunkInput {
  index: number;
  text: string;
  tokenCount: number;
}
