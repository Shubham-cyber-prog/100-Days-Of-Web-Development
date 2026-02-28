import { Track } from "@/types/music";
import { formatTime, getTrackColor } from "@/data/tracks";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  Music,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  trackIndex: number;
}

export default function PlayerBar({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  onToggleMute,
  trackIndex,
}: PlayerBarProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="h-24 glass border-t border-border/50 flex items-center px-4 gap-4 z-50">
      {/* Track Info */}
      <div className="flex items-center gap-3 w-64 flex-shrink-0">
        <AnimatePresence mode="wait">
          {currentTrack ? (
            <motion.div
              key={currentTrack.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${getTrackColor(trackIndex)} flex items-center justify-center flex-shrink-0 ${
                  isPlaying ? "animate-pulse-glow" : ""
                }`}
              >
                <Music className="w-6 h-6 text-foreground opacity-80" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate text-foreground">
                  {currentTrack.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentTrack.artist}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center">
                <Music className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">No track selected</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls + Progress */}
      <div className="flex-1 flex flex-col items-center gap-1.5 max-w-2xl mx-auto">
        {/* Playback Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={onPrev}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-105 transition-transform glow-primary"
          >
            {isPlaying ? (
              <Pause className="w-4.5 h-4.5" />
            ) : (
              <Play className="w-4.5 h-4.5 ml-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 group">
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={([val]) => {
                if (duration > 0) onSeek((val / 100) * duration);
              }}
              className="cursor-pointer"
            />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-40 flex-shrink-0 justify-end">
        <button
          onClick={onToggleMute}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <VolumeIcon className="w-4 h-4" />
        </button>
        <div className="w-24">
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            max={100}
            step={1}
            onValueChange={([val]) => onVolumeChange(val / 100)}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
