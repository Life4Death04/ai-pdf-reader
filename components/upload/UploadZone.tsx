"use client";

import { useCallback, useState } from "react";
import { Upload as UploadIcon } from "lucide-react";

interface UploadZoneProps {
  onUploadComplete?: (documentId: string) => void;
}

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(( e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find((f) => f.type === "application/pdf");

    if (pdfFile) {
      await uploadFile(pdfFile);
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      await uploadFile(file);
    }
  }, []);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      
      if (response.ok && result.data?.documentId) {
        onUploadComplete?.(result.data.documentId);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative rounded-xl-custom overflow-hidden
        bg-surface-container-low p-12
        border-2 border-dashed transition-all duration-300
        ${isDragging
          ? "border-primary glow-primary bg-surface-container"
          : "border-outline-variant/20 hover:border-outline-variant/40"
        }
        ${isUploading ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div
          className={`
            rounded-full p-6 transition-all duration-300
            ${isDragging ? "primary-gradient scale-110" : "bg-surface-container"}
          `}
        >
          <UploadIcon 
            className={`w-12 h-12 ${ isDragging ? "text-on-primary" : "text-primary"}`}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-on-surface">
            {isUploading ? "Uploading..." : "Upload New PDF"}
          </h3>
          <p className="text-on-surface-variant max-w-xs">
            Transform your static documents into immersive podcasts.
          </p>
        </div>

        <label className="cursor-pointer">
          <span className="inline-block px-8 py-3 rounded-lg-custom primary-gradient text-on-primary font-medium hover:scale-105 transition-transform">
            {isUploading ? "Processing..." : "Drag and drop or Browse"}
          </span>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
}
