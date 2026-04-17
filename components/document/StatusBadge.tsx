"use client";

import { motion } from "framer-motion";

interface StatusBadgeProps {
  status: string;
  compact?: boolean;
  label?: string; // overrides the default label from STATUS_CONFIG
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; pulse: boolean }> = {
  UPLOADED: { label: "Uploaded", color: "#8494b8", bg: "rgba(132, 148, 184, 0.1)", pulse: false },
  EXTRACTING: { label: "Extracting", color: "#a3a6ff", bg: "rgba(163, 166, 255, 0.1)", pulse: true },
  CHUNKING: { label: "Processing", color: "#a3a6ff", bg: "rgba(163, 166, 255, 0.1)", pulse: true },
  REWRITING: { label: "Rewriting", color: "#c4a3ff", bg: "rgba(196, 163, 255, 0.1)", pulse: true },
  GENERATING: { label: "Generating", color: "#a3a6ff", bg: "rgba(163, 166, 255, 0.1)", pulse: true },
  PARTIALLY_READY: { label: "Partially Ready", color: "#915deb", bg: "rgba(145, 93, 235, 0.1)", pulse: true },
  READY: { label: "Ready", color: "#69f6b8", bg: "rgba(105, 246, 184, 0.1)", pulse: false },
  ERROR: { label: "Error", color: "#ff6b6b", bg: "rgba(255, 107, 107, 0.1)", pulse: false },
};

export function StatusBadge({ status, compact = false, label }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.UPLOADED;
  const displayLabel = label ?? config.label;

  return (
    <span
      className="inline-flex items-center gap-1.5 font-medium"
      style={{
        fontSize: compact ? "11px" : "12px",
        color: config.color,
        background: config.bg,
        padding: compact ? "2px 8px" : "4px 12px",
        borderRadius: "20px",
        letterSpacing: "0.02em",
      }}
    >
      {config.pulse ? (
        <motion.span
          className="block w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: config.color }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <span
          className="block w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: config.color }}
        />
      )}
      {displayLabel}
    </span>
  );
}
