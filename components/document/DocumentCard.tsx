"use client";

import { FileText, Clock } from "lucide-react";
import Link from "next/link";

interface DocumentCardProps {
  id: string;
  title: string;
  fileName: string;
  pageCount?: number;
  status: string;
  createdAt: string;
  chunkCount?: number;
  progress?: number; // 0-100
}

export function DocumentCard({
  id,
  title,
  fileName,
  pageCount,
  status,
  createdAt,
  chunkCount,
  progress = 0,
}: DocumentCardProps) {
  const isReady = status === "READY";
  const statusColor = isReady ? "text-secondary" : "text-on-surface-variant";

  const relativeTime = getRelativeTime(new Date(createdAt));

  return (
    <Link
      href={isReady ? `/document/${id}` : "#"}
      className={`
        group block rounded-lg-custom bg-surface-container
        p-6 transition-all duration-300
        hover:bg-surface-container-high hover:scale-[1.02]
        ${!isReady ? "opacity-60 cursor-not-allowed" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Document Info */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-surface-container-highest">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-on-surface truncate">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant mt-1">
                {pageCount && <span>{pageCount} Pages</span>}
                {pageCount && chunkCount && <span>•</span>}
                {chunkCount && <span>{chunkCount} chunks</span>}
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-on-surface-variant flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Added {relativeTime}
            </span>
            <span className={`${statusColor} font-medium`}>
              {status === "READY"
                ? "Ready"
                : status === "EXTRACTING"
                ? "Extracting..."
                : status === "CHUNKING"
                ? "Processing..."
                : status}
            </span>
          </div>
        </div>

        {/* Progress Circle */}
        {isReady && (
          <div className="relative w-16 h-16 flex-shrink-0">
            {/* Background Circle */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="fill-none stroke-surface-container-highest"
                strokeWidth="4"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                className="fill-none stroke-primary transition-all duration-500"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${
                  2 * Math.PI * 28 * (1 - progress / 100)
                }`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-on-surface">
                {progress}%
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}
