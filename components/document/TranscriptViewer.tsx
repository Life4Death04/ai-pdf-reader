"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
  const activeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchChunks() {
      try {
        const res = await fetch(`/api/documents/${documentId}`);
        const json = await res.json();
        if (json.data?.chunks) {
          setChunks(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            json.data.chunks.map((c: any) => ({
              index: c.index,
              text: c.text || c.processed || "",
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

  // Auto-scroll to active chunk
  useEffect(() => {
    if (activeRef.current && containerRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeChunkIndex]);

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-surface-container-high rounded shimmer" style={{ width: `${80 + Math.random() * 20}%` }} />
            <div className="h-4 bg-surface-container-high rounded shimmer" style={{ width: `${60 + Math.random() * 30}%` }} />
          </div>
        ))}
      </div>
    );
  }

  if (chunks.length === 0) {
    return (
      <div className="text-center py-12 text-on-surface-variant text-sm">
        No transcript available yet.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="max-h-[400px] overflow-y-auto scroll-smooth space-y-1 pr-2"
    >
      {chunks.map((chunk) => {
        const isActive = chunk.index === activeChunkIndex;
        const isPast = chunk.index < activeChunkIndex;

        return (
          <motion.div
            key={chunk.index}
            ref={isActive ? activeRef : undefined}
            animate={{
              opacity: isActive ? 1 : isPast ? 0.4 : 0.55,
            }}
            transition={{ duration: 0.4 }}
            className={`
              relative py-3 px-4 rounded-lg transition-colors duration-300
              ${isActive ? "bg-surface-container-high" : ""}
            `}
          >
            {/* Active indicator bar */}
            {isActive && (
              <motion.div
                layoutId="activeChunkBar"
                className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                style={{ background: isPlaying ? "linear-gradient(to bottom, #69f6b8, #a3a6ff)" : "var(--surface-variant)" }}
              />
            )}

            <p
              className={`text-sm leading-relaxed pl-3 ${
                isActive
                  ? "text-on-surface font-medium"
                  : "text-on-surface-variant"
              }`}
            >
              {chunk.text}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
