"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Headphones,
  BookOpen,
  FileText,
  Mic2,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { TranscriptViewer } from "@/components/document/TranscriptViewer";
import { StatusBadge } from "@/components/document/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";

interface Document {
  id: string;
  title: string;
  fileName: string;
  pageCount?: number;
  status: string;
  audioDuration?: number;
  totalChunks: number;
  processedChunks: number;
}

type ContentTab = "transcript" | "summary" | "fulltext";

function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-surface-dim relative noise-overlay">
      {/* Ambient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(96, 99, 238, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 80%, rgba(105, 246, 184, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Skeleton */}
        <header className="sticky top-0 z-30 glass-heavy border-b border-surface">
          <div className="max-w-4xl mx-auto px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container animate-pulse" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-surface-container rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-surface-container rounded w-1/2 animate-pulse" />
            </div>
            <div className="w-16 h-6 rounded-full bg-surface-container animate-pulse" />
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="flex-1 flex flex-col">
          <div className="max-w-lg mx-auto w-full px-6 pt-8 md:pt-12 pb-6 flex-1 flex flex-col">
            {/* Album Art Skeleton */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-square max-h-[340px] w-full mx-auto mb-8 rounded-2xl-custom overflow-hidden shadow-ambient bg-surface-container"
            >
              {/* Shimmer animation */}
              <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </motion.div>
          </div>

          {/* Audio Player Skeleton */}
          <div className="rounded-xl-custom p-8 max-w-4xl mx-auto w-full mb-8 shadow-ambient">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-4"
            >
              {/* Player display */}
              <div className="h-6 bg-surface-container rounded w-1/3 animate-pulse" />

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="h-2 bg-surface-container rounded-full animate-pulse" />
                <div className="flex justify-between">
                  <div className="h-3 bg-surface-container rounded w-12 animate-pulse" />
                  <div className="h-3 bg-surface-container rounded w-12 animate-pulse" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="w-10 h-10 rounded-full bg-surface-container animate-pulse" />
                <div className="w-12 h-12 rounded-full bg-surface-container animate-pulse" />
                <div className="w-10 h-10 rounded-full bg-surface-container animate-pulse" />
              </div>

              {/* Volume control */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-surface-container rounded animate-pulse" />
                <div className="flex-1 h-2 bg-surface-container rounded-full animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Content Section Skeleton */}
          <div className="border-t border-surface">
            {/* Tabs Skeleton */}
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-24 bg-surface-container rounded-lg animate-pulse" />
                <div className="h-9 w-24 bg-surface-container rounded-lg animate-pulse" />
                <div className="h-9 w-24 bg-surface-container rounded-lg animate-pulse" />
              </div>
              <div className="w-10 h-10 bg-surface-container rounded-lg animate-pulse" />
            </div>

            {/* Content area skeleton */}
            <div className="max-w-4xl mx-auto px-6 pb-8">
              <div className="rounded-xl-custom bg-surface-container border border-surface overflow-hidden p-6 space-y-3">
                <div className="h-4 bg-surface-container/50 rounded w-full animate-pulse" />
                <div className="h-4 bg-surface-container/50 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-surface-container/50 rounded w-4/5 animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DocumentPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const documentId = params.id as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ContentTab>("transcript");
  const [activeChunkIndex, setActiveChunkIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const response = await fetch(`/api/documents/${documentId}`);
        const result = await response.json();
        if (result.data) {
          setDocument(result.data);
        } else {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Failed to fetch document:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDocument();
  }, [documentId, router]);

  const handleChunkChange = (chunkIndex: number) => {
    setActiveChunkIndex(chunkIndex);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!document) {
    return null;
  }

  const tabs: { id: ContentTab; label: string; icon: React.ReactNode }[] = [
    { id: "transcript", label: "Transcript", icon: <Mic2 className="w-4 h-4" /> },
    { id: "summary", label: "Summary", icon: <BookOpen className="w-4 h-4" /> },
    { id: "fulltext", label: "Full Text", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-surface-dim relative noise-overlay">
      {/* Ambient background - matches the art gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(96, 99, 238, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 80%, rgba(105, 246, 184, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ─── Top Bar ─── */}
        <header className="sticky top-0 z-30 glass-heavy border-b border-surface">
          <div className="max-w-4xl mx-auto px-5 py-3 flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 -ml-2 rounded-lg hover:bg-surface-container transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-semibold text-on-surface truncate">
                {document.title}
              </h1>
              <p className="text-[11px] text-on-surface-variant truncate">
                {document.fileName}
              </p>
            </div>
            <StatusBadge status={document.status} compact />
          </div>
        </header>

        {/* ─── Now Playing Content ─── */}
        <main className="flex-1 flex flex-col">
          <div className="max-w-lg mx-auto w-full px-6 pt-8 md:pt-12 pb-6 flex-1 flex flex-col">
            {/* Album Art / Visualization Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-square max-h-[340px] w-full mx-auto mb-8 rounded-2xl-custom overflow-hidden shadow-ambient"
              style={{
                background: `
                  linear-gradient(135deg, #0d1a35 0%, #1a1040 30%, #0d2847 60%, #0a3035 100%)
                `,
              }}
            >
              {/* Decorative circles */}
              <div className="absolute inset-0">
                <div
                  className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl"
                  style={{
                    background: "radial-gradient(circle, rgba(163, 166, 255, 0.4), transparent)",
                    top: "10%",
                    left: "15%",
                  }}
                />
                <div
                  className="absolute w-48 h-48 rounded-full opacity-15 blur-3xl"
                  style={{
                    background: "radial-gradient(circle, rgba(105, 246, 184, 0.3), transparent)",
                    bottom: "15%",
                    right: "10%",
                  }}
                />
              </div>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Headphones
                    className="w-20 h-20 text-white/10"
                    strokeWidth={1}
                  />
                </motion.div>
              </div>

              {/* Title overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-xs font-medium text-primary/80 mb-1">Now Playing</p>
                <h2 className="text-lg font-bold text-white leading-tight line-clamp-2">
                  {document.title}
                </h2>
                {document.pageCount && (
                  <p className="text-xs text-white/50 mt-1">
                    {document.pageCount} pages
                  </p>
                )}
              </div>
            </motion.div>
            </div>
          {/* Audio Player */}
          <div className="rounded-xl-custom p-8 max-w-4xl mx-auto w-full mb-8 shadow-ambient">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <AudioPlayer
                documentId={documentId}
                title={document.title}
                totalDuration={document.audioDuration}
                documentStatus={document.status}
                totalChunks={document.totalChunks}
                onChunkChange={handleChunkChange}
                onPlayStateChange={setIsPlaying}
              />
            </motion.div>
          </div>

          {/* ─── Content Section (Transcript / Summary / Full Text) ─── */}
          <div className="border-t border-surface">
            {/* Section header with tabs and collapse toggle */}
            <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
              {/* Tabs */}
              <div className="flex items-center gap-1 bg-surface-container rounded-lg p-0.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowContent(true);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
                      transition-all duration-200
                      ${activeTab === tab.id
                        ? "bg-surface-container-highest text-on-surface"
                        : "text-on-surface-variant hover:text-on-surface"
                      }`}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowContent(!showContent)}
                className="p-2 rounded-lg hover:bg-surface-container transition-colors"
              >
                <ChevronDown
                  className={`w-4 h-4 text-on-surface-variant transition-transform ${
                    showContent ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Content area */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-4xl mx-auto px-6 pb-8">
                    <div className="rounded-xl-custom bg-surface-container border border-surface overflow-hidden">
                      {activeTab === "transcript" ? (
                        <TranscriptViewer
                          documentId={documentId}
                          activeChunkIndex={activeChunkIndex}
                          isPlaying={isPlaying}
                        />
                      ) : activeTab === "summary" ? (
                        <div className="p-6 text-sm text-on-surface-variant">
                          <p className="leading-relaxed">
                            Summary generation coming soon. This view will show an
                            AI-generated summary of the document content.
                          </p>
                        </div>
                      ) : (
                        <div className="p-6 text-sm text-on-surface-variant">
                          <p className="leading-relaxed">
                            Full text view coming soon. This will display the complete
                            extracted text from the PDF.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
