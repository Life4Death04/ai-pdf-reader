"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface AudioPlayerProps {
  documentId: string;
  title: string;
}

export function AudioPlayer({ documentId, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={`/api/stream?documentId=${documentId}&mode=FULL_TEXT`}
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
          max={duration}
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
          <span>{formatTime(duration)}</span>
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
