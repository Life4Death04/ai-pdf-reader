"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AudioPlayer } from "@/components/audio/AudioPlayer";

interface Document {
  id: string;
  title: string;
  fileName: string;
  pageCount?: number;
  status: string;
  audioDuration?: number; // Total audio duration in seconds
}

export default function DocumentPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const documentId = params.id as string;

  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDocument();
  }, [documentId]);

  const fetchDocument = async () => {
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
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-dim flex items-center justify-center">
        <div className="text-on-surface-variant">Loading...</div>
      </div>
    );
  }

  if (!document) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface-dim">
      {/* Header */}
      <header className="bg-surface border-b border-outline-variant/10 px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-surface-container transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-on-surface" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-on-surface truncate">
              {document.title}
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              {document.fileName}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-8 py-12">
        <div className="space-y-12">
          {/* Resume Prompt (placeholder) */}
          <div className="rounded-xl-custom bg-surface-container-low p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-on-surface">
                  Resume from 12:32?
                </h3>
                <p className="text-sm text-on-surface-variant">
                  You were halfway through Chapter 3.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-medium transition-colors">
                Start Over
              </button>
              <button className="px-4 py-2 rounded-lg primary-gradient text-on-primary text-sm font-medium hover:scale-105 transition-transform">
                Resume
              </button>
            </div>
          </div>

          {/* Audio Player */}
          <div className="rounded-xl-custom bg-surface-container p-8">
            <AudioPlayer 
              documentId={documentId} 
              title={document.title}
              totalDuration={document.audioDuration}
            />
          </div>

          {/* Mode Tabs */}
          <div className="flex gap-2 p-1 rounded-lg-custom bg-surface-container">
            <button className="flex-1 px-6 py-3 rounded-lg-custom bg-surface-container-highest text-on-surface font-medium">
              Podcast
            </button>
            <button className="flex-1 px-6 py-3 rounded-lg text-on-surface-variant hover:text-on-surface font-medium transition-colors">
              Summary
            </button>
            <button className="flex-1 px-6 py-3 rounded-lg text-on-surface-variant hover:text-on-surface font-medium transition-colors">
              Full Text
            </button>
          </div>

          {/* Live Transcript */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-on-surface">
                Live Transcript
              </h2>
              <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                SYNCING
              </span>
            </div>

            <div className="p-6 rounded-lg-custom bg-surface-container space-y-4">
              <p className="text-on-surface-variant leading-relaxed">
                The concept of neural networks is inspired by the human brain's
                architecture. While traditional algorithms follow linear logic,
                these systems learn through weighted connections...
              </p>

              <div className="pl-4 border-l-4 border-primary">
                <p className="text-on-surface leading-relaxed">
                  <strong>Currently playing:</strong> "The breakthrough came when
                  we realized that backpropagation could be applied to deep
                  architectures, allowing machines to recognize patterns
                  previously thought impossible."
                </p>
              </div>

              <p className="text-on-surface-variant leading-relaxed">
                This shift in perspective birthed the era of deep learning.
                Transformers allow for parallel processing of data sequences,
                making them exceptionally efficient for natural language...
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
