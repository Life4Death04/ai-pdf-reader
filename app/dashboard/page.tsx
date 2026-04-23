"use client";

import { useEffect, useState } from "react";
import {
  Library,
  Clock,
  Plus,
  Search,
  Play,
  Headphones,
  LayoutGrid,
  List,
} from "lucide-react";
import { UploadZone } from "@/components/upload/UploadZone";
import { DocumentCard } from "@/components/document/DocumentCard";
import { StatusBadge } from "@/components/document/StatusBadge";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Document {
  id: string;
  title: string;
  fileName: string;
  pageCount?: number;
  status: string;
  totalChunks: number;
  processedChunks: number;
  audioDuration?: number | null;
  playbackProgress?: { time: number }[];
  createdAt: string;
  _count?: { chunks: number };
}

type ViewMode = "grid" | "list";

async function loadDocuments(): Promise<Document[]> {
  const response = await fetch("/api/documents");
  const result = await response.json();
  return result.data ?? [];
}

export default function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadDocuments()
      .then(setDocuments)
      .catch((error) => console.error("Failed to fetch documents:", error))
      .finally(() => setIsLoading(false));
  }, []);

  // Poll for status updates on processing documents
  useEffect(() => {
    const hasProcessing = documents.some(
      (d) => d.status !== "READY" && d.status !== "ERROR"
    );
    if (!hasProcessing) return;

    const interval = setInterval(() => {
      loadDocuments()
        .then(setDocuments)
        .catch((error) => console.error("Failed to fetch documents:", error));
    }, 5000);
    return () => clearInterval(interval);
  }, [documents]);

  const handleUploadComplete = () => {
    setShowUpload(false);
    loadDocuments()
      .then(setDocuments)
      .catch((error) => console.error("Failed to fetch documents:", error));
  };

  const handleDelete = (deletedId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== deletedId));
  };

  const playableStatuses = new Set(["READY", "PARTIALLY_READY"]);
  const readyDocuments = documents.filter((d) => playableStatuses.has(d.status));
  const processingDocuments = documents.filter(
    (d) => !playableStatuses.has(d.status) && d.status !== "ERROR"
  );

  const filteredDocuments = searchQuery
    ? documents.filter((d) =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : documents;

  const recentDocument = readyDocuments[0];

  return (
    <div className="min-h-screen bg-surface-dim relative noise-overlay">
      {/* Ambient background gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(96, 99, 238, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(105, 246, 184, 0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen">
        {/* ─── Sidebar ─── */}
        <aside className="hidden lg:flex w-[240px] flex-shrink-0 flex-col border-r border-surface p-5 bg-surface/50">
          {/* Brand */}
          <div className="mb-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg primary-gradient flex items-center justify-center">
                <Headphones className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-on-surface tracking-tight">
                  Auralis
                </h1>
              </div>
            </div>
            <p className="text-[10px] font-medium text-on-surface-variant tracking-[0.15em] uppercase mt-1.5 ml-[42px]">
              PDF to Audio
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container-high/60 text-on-surface text-sm font-medium"
            >
              <Library className="w-4 h-4 text-primary" />
              Library
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant text-sm hover:text-on-surface hover:bg-surface-container/50 transition-colors"
            >
              <Clock className="w-4 h-4" />
              Recent
            </Link>
          </nav>

          {/* Upload button in sidebar */}
          <div className="mt-auto pt-4">
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                primary-gradient text-white text-sm font-semibold
                hover:scale-[1.02] active:scale-[0.98] transition-transform
                glow-primary"
            >
              <Plus className="w-4 h-4" />
              Upload PDF
            </button>
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <main className="flex-1 overflow-y-auto pb-24 lg:pb-8">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-6 md:py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-bold text-on-surface"
                >
                  Your Library
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-sm text-on-surface-variant mt-1"
                >
                  {documents.length} {documents.length === 1 ? "document" : "documents"} in your collection
                </motion.p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-lg bg-surface-container border border-surface
                      text-on-surface text-sm placeholder:text-on-surface-variant/50
                      focus:outline-none focus:border-primary/30 transition-colors w-40 md:w-56"
                  />
                </div>

                {/* View toggle */}
                <div className="hidden md:flex items-center bg-surface-container rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-surface-container-high text-on-surface"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-surface-container-high text-on-surface"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile upload button */}
                <button
                  onClick={() => setShowUpload(!showUpload)}
                  className="lg:hidden w-10 h-10 rounded-full primary-gradient flex items-center justify-center
                    hover:scale-105 active:scale-95 transition-transform glow-primary"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Upload Zone (collapsible) */}
            <AnimatePresence>
              {showUpload && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden mb-8"
                >
                  <UploadZone onUploadComplete={handleUploadComplete} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue Listening Hero */}
            {recentDocument && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-10"
              >
                <h3 className="text-xs font-semibold text-on-surface-variant tracking-[0.1em] uppercase mb-4">
                  Continue Listening
                </h3>
                <Link href={`/document/${recentDocument.id}`} className="block group">
                  <div
                    className="relative overflow-hidden rounded-2xl-custom p-6 md:p-8 transition-all
                      duration-300 hover:shadow-elevated"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(96, 99, 238, 0.15) 0%, rgba(17, 27, 46, 0.9) 40%, rgba(105, 246, 184, 0.08) 100%)",
                      border: "1px solid rgba(163, 166, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-center gap-6">
                      {/* Mini cover art */}
                      <div
                        className="hidden sm:flex w-20 h-20 rounded-xl items-center justify-center flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #1a1040 0%, #0d2847 100%)",
                        }}
                      >
                        <Headphones className="w-8 h-8 text-primary/40" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-primary mb-1">Resume Session</p>
                        <h3 className="text-lg md:text-xl font-bold text-on-surface truncate">
                          {recentDocument.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-2">
                          {recentDocument.pageCount && (
                            <span>{recentDocument.pageCount} pages</span>
                          )}
                          <StatusBadge status={recentDocument.status} compact />
                        </div>
                      </div>

                      {/* Play button */}
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full secondary-gradient flex items-center justify-center
                          flex-shrink-0 glow-play shadow-elevated
                          opacity-80 group-hover:opacity-100 transition-opacity"
                      >
                        <Play className="w-6 h-6 text-[#001a10] fill-current ml-0.5" />
                      </motion.div>
                    </div>

                    {/* Progress bar */}
                    {(() => {
                      const saved = recentDocument.playbackProgress?.[0]?.time ?? 0;
                      const pct = recentDocument.audioDuration && recentDocument.audioDuration > 0
                        ? Math.min(100, (saved / recentDocument.audioDuration) * 100)
                        : 0;
                      return (
                        <div className="mt-5 h-1 rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full secondary-gradient opacity-70 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      );
                    })()}
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Processing Documents */}
            <AnimatePresence>
              {processingDocuments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-8"
                >
                  <h3 className="text-xs font-semibold text-on-surface-variant tracking-[0.1em] uppercase mb-3">
                    Processing
                  </h3>
                  <div className="space-y-2">
                    {processingDocuments.map((doc) => (
                      <motion.div
                        key={doc.id}
                        layout
                        className="flex items-center justify-between p-4 rounded-xl
                          bg-surface-container border border-surface"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full"
                            />
                          </div>
                          <span className="text-sm text-on-surface truncate">{doc.title}</span>
                        </div>
                        <StatusBadge status={doc.status} compact />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Library Grid */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs font-semibold text-on-surface-variant tracking-[0.1em] uppercase">
                  All Documents
                </h3>
              </div>

              {isLoading ? (
                <div className={`grid gap-5 ${
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-1"
                }`}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="rounded-xl-custom overflow-hidden">
                      <div className="h-40 bg-surface-container shimmer" />
                      <div className="p-4 bg-surface-container-low space-y-2">
                        <div className="h-4 bg-surface-container rounded w-3/4 shimmer" />
                        <div className="h-3 bg-surface-container rounded w-1/2 shimmer" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredDocuments.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-container flex items-center justify-center">
                    <Library className="w-7 h-7 text-on-surface-variant/40" />
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4">
                    {searchQuery
                      ? "No documents match your search"
                      : "Your library is empty"}
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => setShowUpload(true)}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Upload your first PDF
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className={`grid gap-5 ${
                    viewMode === "grid"
                      ? "grid-cols-1"
                      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  }`}
                >
                  <AnimatePresence>
                    {filteredDocuments.map((doc, index) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <DocumentCard
                          id={doc.id}
                          title={doc.title}
                          fileName={doc.fileName}
                          pageCount={doc.pageCount || undefined}
                          status={doc.status}
                          createdAt={doc.createdAt}
                          chunkCount={doc._count?.chunks}
                          totalChunks={doc.totalChunks}
                          processedChunks={doc.processedChunks}
                          progress={(() => {
                            const saved = doc.playbackProgress?.[0]?.time ?? 0;
                            return doc.audioDuration && doc.audioDuration > 0
                              ? Math.min(100, Math.round((saved / doc.audioDuration) * 100))
                              : 0;
                          })()}
                          onDelete={handleDelete}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowUpload(!showUpload)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
          primary-gradient flex items-center justify-center
          shadow-elevated glow-primary"
      >
        <Plus className={`w-6 h-6 text-white transition-transform ${showUpload ? "rotate-45" : ""}`} />
      </motion.button>
    </div>
  );
}
