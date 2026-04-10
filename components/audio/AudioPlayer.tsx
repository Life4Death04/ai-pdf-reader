"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface AudioChunkInfo {
  id: string;
  chunkIndex: number;
  s3Url: string;
  duration: number | null;
}

interface AudioPlayerProps {
  documentId: string;
  title: string;
  totalDuration?: number;
}

export function AudioPlayer({ documentId, title, totalDuration }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const preloadRef = useRef<HTMLAudioElement | null>(null);

  const [chunks, setChunks] = useState<AudioChunkInfo[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  // Cumulative durations: cumulativeDurations[i] = total seconds before chunk i starts
  const cumulativeDurations = useRef<number[]>([]);

  const computedTotalDuration = totalDuration ?? chunks.reduce(
    (sum, c) => sum + (c.duration ?? 0),
    0
  );

  // Fetch audio chunks on mount
  useEffect(() => {
    let cancelled = false;

    async function fetchChunks() {
      try {
        const res = await fetch(`/api/audio?docId=${documentId}`);
        if (!res.ok) throw new Error("Failed to fetch audio chunks");

        const json = await res.json();
        const fetched: AudioChunkInfo[] = json.data?.chunks ?? [];

        if (cancelled) return;

        if (fetched.length === 0) {
          setUseFallback(true);
          setIsLoading(false);
          return;
        }

        // Compute cumulative durations
        const cumulative: number[] = [0];
        for (let i = 0; i < fetched.length; i++) {
          cumulative.push(cumulative[i] + (fetched[i].duration ?? 0));
        }
        cumulativeDurations.current = cumulative;

        setChunks(fetched);
        setIsLoading(false);
      } catch {
        if (!cancelled) {
          setUseFallback(true);
          setIsLoading(false);
        }
      }
    }

    fetchChunks();
    return () => { cancelled = true; };
  }, [documentId]);

  // Preload next chunk when current chunk changes
  useEffect(() => {
    if (useFallback || chunks.length === 0) return;

    const nextIndex = currentChunkIndex + 1;
    if (nextIndex < chunks.length) {
      const preload = new Audio(chunks[nextIndex].s3Url);
      preload.preload = "auto";
      preloadRef.current = preload;
    } else {
      preloadRef.current = null;
    }
  }, [currentChunkIndex, chunks, useFallback]);

  // Set audio src when chunk changes
  useEffect(() => {
    if (useFallback || chunks.length === 0) return;

    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlaying;
    audio.src = chunks[currentChunkIndex].s3Url;
    audio.load();

    if (wasPlaying) {
      audio.play().catch(() => {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChunkIndex, chunks, useFallback]);

  // Advance to next chunk on end
  const handleEnded = useCallback(() => {
    if (useFallback) {
      setIsPlaying(false);
      return;
    }

    if (currentChunkIndex < chunks.length - 1) {
      setCurrentChunkIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentChunkIndex, chunks.length, useFallback]);

  // Track time updates for the global progress
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (useFallback) {
      setCurrentTime(audio.currentTime);
      return;
    }

    const chunkOffset = cumulativeDurations.current[currentChunkIndex] ?? 0;
    setCurrentTime(chunkOffset + audio.currentTime);
  }, [currentChunkIndex, useFallback]);

  // Wire up audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [handleTimeUpdate, handleEnded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);

    if (useFallback) {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = targetTime;
        setCurrentTime(targetTime);
      }
      return;
    }

    // Find which chunk the target time falls into
    const cumDurations = cumulativeDurations.current;
    let targetChunk = 0;
    for (let i = 0; i < chunks.length; i++) {
      if (targetTime >= cumDurations[i] && targetTime < cumDurations[i + 1]) {
        targetChunk = i;
        break;
      }
      // If past all chunks, seek to last chunk
      if (i === chunks.length - 1) {
        targetChunk = i;
      }
    }

    const offsetWithinChunk = targetTime - cumDurations[targetChunk];

    if (targetChunk !== currentChunkIndex) {
      setCurrentChunkIndex(targetChunk);
      // Wait for audio to load then seek
      const audio = audioRef.current;
      if (audio) {
        const seekOnLoad = () => {
          audio.currentTime = offsetWithinChunk;
          audio.removeEventListener("canplay", seekOnLoad);
        };
        audio.addEventListener("canplay", seekOnLoad);
      }
    } else {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = offsetWithinChunk;
      }
    }

    setCurrentTime(targetTime);
  };

  const skip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(computedTotalDuration, currentTime + seconds));

    // Simulate a seek event
    handleSeek({
      target: { value: String(newTime) },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = computedTotalDuration ? (currentTime / computedTotalDuration) * 100 : 0;

  // Fallback: use old streaming endpoint
  const audioSrc = useFallback
    ? `/api/stream?documentId=${documentId}&mode=FULL_TEXT`
    : undefined; // src is set programmatically for chunk mode

  return (
    <div className="space-y-8">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
      />

      {/* Waveform Placeholder */}
      <div className="flex items-center justify-center h-32 bg-surface-container rounded-lg-custom">
        <div className="flex items-end gap-1 h-16">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary rounded-full transition-all duration-200"
              style={{
                height: `${Math.random() * 100}%`,
                opacity: isPlaying ? (i / 40 < progress / 100 ? 1 : 0.3) : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={computedTotalDuration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-surface-container-highest rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-secondary
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-track]:bg-surface-container-highest
            [&::-webkit-slider-track]:rounded-full"
          style={{
            background: `linear-gradient(to right, var(--color-secondary) 0%, var(--color-secondary) ${progress}%, var(--surface-container-highest) ${progress}%, var(--surface-container-highest) 100%)`,
          }}
        />
        <div className="flex justify-between text-sm text-on-surface-variant">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(computedTotalDuration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => skip(-15)}
          className="p-3 rounded-full hover:bg-surface-container transition-colors"
          aria-label="Skip back 15 seconds"
        >
          <SkipBack className="w-6 h-6 text-on-surface" />
        </button>

        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="w-16 h-16 rounded-full primary-gradient flex items-center justify-center hover:scale-105 transition-transform glow-primary disabled:opacity-50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-on-primary fill-current" />
          ) : (
            <Play className="w-8 h-8 text-on-primary fill-current" />
          )}
        </button>

        <button
          onClick={() => skip(15)}
          className="p-3 rounded-full hover:bg-surface-container transition-colors"
          aria-label="Skip forward 15 seconds"
        >
          <SkipForward className="w-6 h-6 text-on-surface" />
        </button>
      </div>

      {/* Speed Control */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container">
          <span className="text-sm text-on-surface-variant">Speed</span>
          <span className="text-sm font-semibold text-on-surface">1.0x</span>
        </div>
      </div>
    </div>
  );
}
