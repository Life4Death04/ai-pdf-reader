"use client";

import { useEffect, useState } from "react";
import {  FileAudio, Clock, Upload as UploadIcon } from "lucide-react";
import { UploadZone } from "@/components/upload/UploadZone";
import { DocumentCard } from "@/components/document/DocumentCard";
import Link from "next/link";

interface Document {
  id: string;
  title: string;
  fileName: string;
  pageCount?: number;
  status: string;
  createdAt: string;
  _count?: { chunks: number };
}

export default function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/documents");
      const result = await response.json();
      if (result.data) {
        setDocuments(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadComplete = () => {
    fetchDocuments(); // Refresh the list
  };

  const readyDocuments = documents.filter((d) => d.status === "READY");
  const processingDocuments = documents.filter((d) => d.status !== "READY");

  return (
    <div className="min-h-screen flex bg-surface-dim">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-surface border-r border-outline-variant/10 p-6">
        <div className="space-y-8">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold text-primary">Auralis</h1>
            <p className="text-xs text-on-surface-variant mt-1">
              PDF TO PODCAST
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg-custom bg-surface-container-high text-on-surface"
            >
              <FileAudio className="w-5 h-5" />
              <span className="font-medium">My Library</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3  rounded-lg-custom text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <Clock className="w-5 h-5" />
              <span>Recent</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg-custom text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            >
              <UploadIcon className="w-5 h-5" />
              <span>Upload</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-12 space-y-12">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-5xl font-bold text-on-surface">
              Your Library
            </h2>
            <p className="text-lg text-on-surface-variant">
              Continue where you left off or start a new sonic journey.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Zone - Takes full width on mobile, half on desktop */}
            <div className="lg:col-span-1">
              <UploadZone onUploadComplete={handleUploadComplete} />
            </div>

            {/* Recently Listened (if available) */}
            {readyDocuments.length > 0 && (
              <div className="lg:col-span-1">
                <div className="rounded-xl-custom bg-surface-container-low p-8 h-full flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium mb-4">
                      RECENTLY LISTENED
                    </span>
                    <h3 className="text-2xl font-semibold text-on-surface mb-2">
                      {readyDocuments[0].title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant mb-6">
                      {readyDocuments[0].pageCount && (
                        <span>{readyDocuments[0].pageCount} Pages</span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/document/${readyDocuments[0].id}`}
                    className="inline-block px-6 py-3 rounded-lg-custom primary-gradient text-on-primary font-medium text-center hover:scale-105 transition-transform"
                  >
                    Resume Session
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Library Collection */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-on-surface">
                Library Collection
              </h3>
              <span className="text-on-surface-variant">
                {documents.length} {documents.length === 1 ? "File" : "Files"}
              </span>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-on-surface-variant">
                Loading your library...
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant">
                No documents yet. Upload a PDF to get started!
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {documents.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    id={doc.id}
                    title={doc.title}
                    fileName={doc.fileName}
                    pageCount={doc.pageCount || undefined}
                    status={doc.status}
                    createdAt={doc.createdAt}
                    chunkCount={doc._count?.chunks}
                    progress={doc.status === "READY" ? 70 : 0}
                  />
                ))}
              </div>
            )}

            {/* Processing Documents */}
            {processingDocuments.length > 0 && (
              <div className="mt-8 p-6 rounded-lg-custom bg-surface-container">
                <h4 className="text-lg font-semibold text-on-surface mb-4">
                  Processing
                </h4>
                <div className="space-y-3">
                  {processingDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 rounded-md bg-surface-container-high"
                    >
                      <span className="text-on-surface">{doc.title}</span>
                      <span className="text-sm text-on-surface-variant">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
