"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextChunk {
  index: number;
  text: string;
}

interface TranscriptViewerProps {
  documentId: string;
  activeChunkIndex: number;
  isPlaying: boolean;
}

export function TranscriptViewer({
  documentId,
  activeChunkIndex,
  isPlaying,
}: TranscriptViewerProps) {
  const [chunks, setChunks] = useState<TextChunk[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchChunks() {
      try {
        const res = await fetch(`/api/documents/${documentId}/chunks`);
        const json = await res.json();
        if (json.data?.chunks) {
          setChunks(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            json.data.chunks.map((c: any) => ({
              index: c.index,
              text: c.processed || c.text || "",
            }))
          );
        }
      } catch {
        // fallback
      } finally {
        setIsLoading(false);
      }
    }

    fetchChunks();
  }, [documentId]);

  const activeChunk = chunks.find((c) => c.index === activeChunkIndex);

  if (isLoading) {
    return (
      <div className="space-y-3 p-6">
        <div className="h-4 bg-surface-container-high rounded shimmer w-full" />
        <div className="h-4 bg-surface-container-high rounded shimmer w-5/6" />
        <div className="h-4 bg-surface-container-high rounded shimmer w-4/5" />
      </div>
    );
  }

  if (!activeChunk) {
    return (
      <div className="text-center py-12 text-on-surface-variant text-sm">
        No transcript available yet.
      </div>
    );
  }

  return (
    <div className="relative p-6">
      {/* Active indicator bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-colors duration-500"
        style={{
          background: isPlaying
            ? "linear-gradient(to bottom, #69f6b8, #a3a6ff)"
            : "var(--surface-variant)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.p
          key={activeChunkIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm leading-relaxed pl-4 text-on-surface"
        >
          {activeChunk.text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
