"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Loader2, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

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
  documentStatus?: string;
  totalChunks?: number;
  onChunkChange?: (chunkIndex: number) => void;
  onPlayStateChange?: (playing: boolean) => void;
}

export function AudioPlayer({ documentId, title, totalDuration, documentStatus, totalChunks, onChunkChange, onPlayStateChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const preloadRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [chunks, setChunks] = useState<AudioChunkInfo[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Stable waveform bar heights (randomized once on mount)
  const waveHeights = useRef([...Array(40)].map(() => Math.random() * 100));

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

  // Poll for newly generated chunks while audio generation is still in progress
  useEffect(() => {
    if (documentStatus === "READY" || documentStatus === undefined || useFallback) return;

    const poll = setInterval(async () => {
      try {
        const res = await fetch(`/api/audio?docId=${documentId}`);
        if (!res.ok) return;
        const json = await res.json();
        const fetched: AudioChunkInfo[] = json.data?.chunks ?? [];

        if (fetched.length > chunks.length) {
          const cumulative: number[] = [0];
          for (let i = 0; i < fetched.length; i++) {
            cumulative.push(cumulative[i] + (fetched[i].duration ?? 0));
          }
          cumulativeDurations.current = cumulative;
          setChunks(fetched);
        }
      } catch {
        // ignore polling errors silently
      }
    }, 10_000);

    return () => clearInterval(poll);
  }, [documentStatus, documentId, chunks.length, useFallback]);

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
      onPlayStateChange?.(false);
      return;
    }

    if (currentChunkIndex < chunks.length - 1) {
      setCurrentChunkIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
      onPlayStateChange?.(false);
    }
  }, [currentChunkIndex, chunks.length, useFallback, onPlayStateChange]);

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

  // Sync volume and mute state to audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Sync playback speed to audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = speed;
  }, [speed]);

  // Notify parent when chunk changes
  useEffect(() => {
    onChunkChange?.(currentChunkIndex);
  }, [currentChunkIndex, onChunkChange]);

  const seekTo = (targetTime: number) => {
    handleSeek({
      target: { value: String(targetTime) },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    const next = !isPlaying;
    setIsPlaying(next);
    onPlayStateChange?.(next);
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

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    if (!bar || !computedTotalDuration) return;

    const rect = bar.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seekTo(fraction * computedTotalDuration);
  };

  const handleProgressDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const bar = progressRef.current;
    if (!bar || !computedTotalDuration) return;

    const onMove = (moveEvent: PointerEvent) => {
      const rect = bar.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
      setCurrentTime(fraction * computedTotalDuration);
    };

    const onUp = (upEvent: PointerEvent) => {
      const rect = bar.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (upEvent.clientX - rect.left) / rect.width));
      seekTo(fraction * computedTotalDuration);
      setIsDragging(false);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
  };

  const skip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(computedTotalDuration, currentTime + seconds));

    // Simulate a seek event
    handleSeek({
      target: { value: String(newTime) },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
      <div className="flex items-center justify-center h-32 rounded-lg-custom">
        <div className="flex items-end gap-1 h-16">
          {waveHeights.current.map((height, i) => (
            <div
              key={i}
              className="w-1 bg-secondary rounded-full transition-all duration-200"
              style={{
                height: `${height}%`,
                opacity: isPlaying ? (i / 40 < progress / 100 ? 1 : 0.3) : 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Generating more audio banner — shown when at last available chunk and not fully ready */}
      <AnimatePresence>
        {documentStatus !== "READY" &&
          documentStatus !== undefined &&
          chunks.length > 0 &&
          currentChunkIndex >= chunks.length - 1 &&
          (totalChunks === undefined || chunks.length < totalChunks) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg
              bg-surface-container border border-surface/60"
          >
            <motion.span
              className="block w-2 h-2 rounded-full bg-secondary flex-shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="text-xs text-on-surface-variant">
              Generating more audio…
              {totalChunks && totalChunks > 0 && (
                <span className="ml-1 text-secondary/80">
                  {chunks.length} / {totalChunks} chunks ready
                </span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => skip(-15)}
          className="p-3 rounded-full hover:bg-surface-container-high transition-colors"
          aria-label="Skip back 15 seconds"
        >
          <SkipBack className="w-5 h-5 text-on-surface" />
          <span className="sr-only">-15s</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={togglePlay}
          disabled={isLoading}
          className={`w-16 h-16 rounded-full flex items-center justify-center
            transition-shadow disabled:opacity-50
            ${isPlaying ? "secondary-gradient glow-play" : "secondary-gradient glow-secondary"}`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <Loader2 className="w-7 h-7 text-[#001a10] animate-spin" />
              </motion.div>
            ) : isPlaying ? (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <Pause className="w-7 h-7 text-[#001a10] fill-current" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <Play className="w-7 h-7 text-[#001a10] fill-current ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => skip(15)}
          className="p-3 rounded-full hover:bg-surface-container-high transition-colors"
          aria-label="Skip forward 15 seconds"
        >
          <SkipForward className="w-5 h-5 text-on-surface" />
          <span className="sr-only">+15s</span>
        </motion.button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-between px-4">
        {/* Speed Control */}
        <div className="relative">
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold
              bg-surface-container-high hover:bg-surface-container-highest
              text-on-surface transition-colors"
          >
            {speed}x
          </button>

          <AnimatePresence>
            {showSpeedMenu && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-2 py-1 rounded-lg
                  bg-surface-container-highest shadow-elevated z-10 min-w-[72px]"
              >
                {SPEED_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSpeed(s);
                      setShowSpeedMenu(false);
                    }}
                    className={`block w-full px-4 py-1.5 text-xs font-medium text-left
                      transition-colors hover:bg-surface-variant
                      ${s === speed ? "text-secondary" : "text-on-surface"}`}
                  >
                    {s}x
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-full hover:bg-surface-container-high transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-on-surface-variant" />
            ) : (
              <Volume2 className="w-4 h-4 text-on-surface-variant" />
            )}
          </button>
          <div
            className="w-20 h-1 rounded-full bg-surface-container-highest cursor-pointer group relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              setVolume(fraction);
              setIsMuted(false);
            }}
          >
            <div
              className="h-full rounded-full bg-on-surface-variant transition-all"
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
