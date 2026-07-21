"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Upload as UploadIcon, FileUp, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
  onUploadComplete?: (documentId: string) => void;
}

type UploadState = "idle" | "dragging" | "uploading" | "success";

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const t = useTranslations();
  const [state, setState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [aiRewrite, setAiRewrite] = useState(false);

  const uploadFile = async (file: File) => {
    setState("uploading");
    setFileName(file.name);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + Math.random() * 15, 85));
    }, 300);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("enableAiRewrite", String(aiRewrite));

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok && result.data?.documentId) {
        setState("success");
        setTimeout(() => {
          setState("idle");
          setUploadProgress(0);
          setFileName("");
          onUploadComplete?.(result.data.documentId);
        }, 1500);
      } else {
        setState("idle");
        setUploadProgress(0);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      clearInterval(progressInterval);
      setState("idle");
      setUploadProgress(0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setState("dragging");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setState("idle");
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setState("idle");
    const pdfFile = Array.from(e.dataTransfer.files).find((f) => f.type === "application/pdf");
    if (pdfFile) await uploadFile(pdfFile);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") await uploadFile(file);
  };

  const isActive = state === "idle" || state === "dragging";

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      animate={{
        borderColor: state === "dragging" ? "rgba(163, 166, 255, 0.6)" : "rgba(30, 45, 72, 0.5)",
        scale: state === "dragging" ? 1.01 : 1,
      }}
      transition={{ duration: 0.2 }}
      className={`
        relative overflow-hidden rounded-2xl-custom
        transition-colors
        ${state === "uploading" || state === "success" ? "pointer-events-none" : "cursor-pointer"}
      `}
      style={{
        background: state === "dragging"
          ? "linear-gradient(145deg, rgba(163, 166, 255, 0.06) 0%, rgba(105, 246, 184, 0.03) 100%)"
          : "linear-gradient(145deg, var(--surface-container) 0%, var(--surface-container-low) 100%)",
      }}
    >
      <label className="block cursor-pointer p-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="w-16 h-16 rounded-full secondary-gradient flex items-center justify-center glow-secondary"
              >
                <Check className="w-8 h-8 text-[#001a10]" />
              </motion.div>
            ) : state === "uploading" ? (
              <motion.div
                key="uploading"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-16 h-16"
              >
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32" cy="32" r="28"
                    fill="none"
                    stroke="var(--surface-variant)"
                    strokeWidth="3"
                  />
                  <motion.circle
                    cx="32" cy="32" r="28"
                    fill="none"
                    stroke="url(#uploadGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 * (1 - uploadProgress / 100)}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="uploadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a3a6ff" />
                      <stop offset="100%" stopColor="#69f6b8" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileUp className="w-6 h-6 text-primary" />
                </div>
              </motion.div>
            ) : (
        <motion.div
                key="idle"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center transition-colors
                  ${state === "dragging"
                    ? "primary-gradient glow-primary"
                    : "bg-surface-container-highest"
                  }
                `}
              >
                <UploadIcon className={`w-7 h-7 ${state === "dragging" ? "text-white" : "text-primary"}`} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1.5">
            {state === "uploading" ? (
              <>
                <p className="text-sm font-semibold text-on-surface">{t("upload.uploading")}</p>
                <p className="text-xs text-on-surface-variant truncate max-w-[200px]">{fileName}</p>
              </>
            ) : state === "success" ? (
              <>
                <p className="text-sm font-semibold text-secondary">{t("upload.complete")}</p>
                <p className="text-xs text-on-surface-variant">{t("upload.processing")}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-on-surface">
                  {state === "dragging" ? t("upload.dropHint") : t("upload.addLibrary")}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {t("upload.clickBrowse")}
                </p>
              </>
            )}
          </div>
        </div>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
          disabled={state !== "idle"}
        />
      </label>

      {/* AI Rewrite toggle — outside label to avoid triggering file input */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="px-8 pb-6 flex items-center justify-between"
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex items-center gap-2">
              <Sparkles className={`w-3.5 h-3.5 transition-colors ${aiRewrite ? "text-primary" : "text-on-surface-variant"}`} />
              <span className={`text-xs font-medium transition-colors ${aiRewrite ? "text-on-surface" : "text-on-surface-variant"}`}>
                {t("upload.aiRewrite")}
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={aiRewrite}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setAiRewrite((v) => !v);
              }}
              className={`
                relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0
                ${aiRewrite ? "primary-gradient" : "bg-surface-container-highest"}
              `}
            >
              <span
                className={`
                  absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm
                  transition-transform duration-200
                  ${aiRewrite ? "translate-x-4" : "translate-x-0.5"}
                `}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload progress bar at bottom */}
      {state === "uploading" && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
        >
          <div
            className="h-full aurora-gradient transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
