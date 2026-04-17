"use client";

import { Play, Trash2, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { StatusBadge } from "./StatusBadge";

interface DocumentCardProps {
  id: string;
  title: string;
  fileName: string;
  pageCount?: number;
  status: string;
  createdAt: string;
  chunkCount?: number;
  totalChunks?: number;
  processedChunks?: number;
  progress?: number;
  onDelete?: (id: string) => void;
}

// Estimate remaining processing time from chunk counts.
//   GENERATING / PARTIALLY_READY: 5s per remaining (un-generated) chunk
//   REWRITING: 10s per chunk (rewriting iterates over all chunks)
function getProcessingLabel(
  status: string,
  totalChunks?: number,
  processedChunks?: number
): string | null {
  const fmt = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m === 0) return `~${s}s`;
    return s === 0 ? `~${m}m` : `~${m}m ${s}s`;
  };

  const total = totalChunks ?? 0;
  const done = processedChunks ?? 0;

  if (status === "REWRITING") {
    return total > 0 ? `AI Rewriting ${fmt(total * 20)}` : "AI Rewriting";
  }

  if (status === "GENERATING" || status === "PARTIALLY_READY") {
    const remaining = Math.max(0, total - done);
    return remaining > 0 ? `Generating ${fmt(remaining * 10)}` : "Generating";
  }

  return null;
}

// Generate a deterministic gradient from the document id
function getCardGradient(id: string): string {
  const hash = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const gradients = [
    "linear-gradient(135deg, #1a1040 0%, #0d2847 50%, #0a3035 100%)",
    "linear-gradient(135deg, #0d1f3c 0%, #1a1040 50%, #2d1230 100%)",
    "linear-gradient(135deg, #0a2a2a 0%, #0d1f3c 50%, #1a1040 100%)",
    "linear-gradient(135deg, #1a1040 0%, #2d1230 50%, #0d1f3c 100%)",
    "linear-gradient(135deg, #0d2847 0%, #0a3035 50%, #1a1040 100%)",
    "linear-gradient(135deg, #2d1230 0%, #1a1040 50%, #0d2847 100%)",
  ];
  return gradients[hash % gradients.length];
}

export function DocumentCard({
  id,
  title,
  fileName,
  pageCount,
  status,
  createdAt,
  chunkCount,
  totalChunks,
  processedChunks,
  progress = 0,
  onDelete,
}: DocumentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const isReady = status === "READY" || status === "PARTIALLY_READY";
  const chunkProgress =
    totalChunks && totalChunks > 0
      ? Math.round((processedChunks ?? 0) / totalChunks * 100)
      : 0;
  const processingLabel = getProcessingLabel(status, totalChunks, processedChunks);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm(`Delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete document");
      }

      onDelete?.(id);
    } catch (error) {
      console.error(`[DocumentCard] Delete failed:`, error);
      alert(
        `Failed to delete document: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isDeleting ? 0.4 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative ${isDeleting ? "pointer-events-none" : ""}`}
    >
      <Link
        href={isReady ? `/document/${id}` : "#"}
        className={`block ${!isReady ? "cursor-default" : ""}`}
      >
        <div className="relative overflow-hidden rounded-xl-custom transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5">
          {/* Cover art area */}
          <div
            className="relative h-40 overflow-hidden"
            style={{ background: getCardGradient(id) }}
          >
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(163, 166, 255, 0.5) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(105, 246, 184, 0.3) 0%, transparent 40%)`,
            }} />

            {/* Document icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="w-12 h-12 text-white/10" strokeWidth={1} />
            </div>

            {/* Play button overlay on hover */}
            {isReady && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full secondary-gradient flex items-center justify-center glow-play shadow-elevated"
                >
                  <Play className="w-5 h-5 text-[#001a10] fill-current ml-0.5" />
                </motion.div>
              </div>
            )}

            {/* Delete button */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100
                p-2 rounded-lg bg-black/40 backdrop-blur-sm hover:bg-red-500/20
                text-white/60 hover:text-red-400 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete document"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Progress bar — color matches current status */}
            {status === "ERROR" && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                <div className="h-full bg-[#ff6b6b]" style={{ width: "100%" }} />
              </div>
            )}
            {(status === "PARTIALLY_READY" || status === "GENERATING") && totalChunks && totalChunks > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 overflow-hidden">
                <div
                  className="h-full transition-all duration-700 relative overflow-hidden"
                  style={{
                    width: `${chunkProgress}%`,
                    background: status === "PARTIALLY_READY" ? "#915deb" : "#a3a6ff",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            )}
            {status === "READY" && progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                <div
                  className="h-full secondary-gradient transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {/* Info area */}
          <div className="p-4 bg-surface-container-low">
            <h3 className="text-sm font-semibold text-on-surface truncate mb-1.5">
              {title}
            </h3>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                {pageCount && <span>{pageCount} pages</span>}
                {pageCount && chunkCount && <span className="opacity-30">|</span>}
                {chunkCount && <span>{chunkCount} chunks</span>}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {(() => {
                  if (status === "ERROR") {
                    return <StatusBadge status="ERROR" compact />;
                  }

                  // Playability is derived from chunk counts, not status —
                  // so a document being rewritten still shows "Ready".
                  const done = processedChunks ?? 0;
                  const playability =
                    totalChunks && totalChunks > 0 && done === totalChunks
                      ? "READY"
                      : done > 0
                        ? "PARTIALLY_READY"
                        : null;

                  // Activity mirrors the current DB status (what's running now).
                  const activity =
                    status === "GENERATING" || status === "PARTIALLY_READY"
                      ? "GENERATING"
                      : status === "REWRITING"
                        ? "REWRITING"
                        : null;

                  // Fallback for pre-playable pipeline states.
                  if (!playability && !activity) {
                    return <StatusBadge status={status} compact />;
                  }

                  return (
                    <>
                      {playability && <StatusBadge status={playability} compact />}
                      {activity && (
                        <StatusBadge
                          status={activity}
                          compact
                          label={processingLabel ?? undefined}
                        />
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
