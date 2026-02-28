import { Track } from "@/types/music";
import { formatTime, getTrackColor } from "@/data/tracks";
import { Music, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onRemoveTrack?: (trackId: string) => void;
  showRemove?: boolean;
}

export default function TrackList({
  tracks,
  currentTrack,
  isPlaying,
  onTrackSelect,
  onRemoveTrack,
  showRemove,
}: TrackListProps) {
  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Music className="w-12 h-12 mb-3 opacity-40" />
        <p className="text-sm">No tracks in this playlist</p>
        <p className="text-xs mt-1 opacity-60">Upload songs or add from All Songs</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {tracks.map((track, index) => {
        const isActive = currentTrack?.id === track.id;
        return (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => onTrackSelect(track)}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
              isActive
                ? "bg-primary/10 border border-primary/20"
                : "hover:bg-secondary/60 border border-transparent"
            }`}
          >
            {/* Track number / playing indicator */}
            <div className="w-8 text-center flex-shrink-0">
              {isActive && isPlaying ? (
                <div className="flex items-center justify-center gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-primary rounded-full"
                      animate={{ height: [4, 12, 4] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <span className={`text-xs font-mono ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
            </div>

            {/* Artwork placeholder */}
            <div
              className={`w-10 h-10 rounded-md flex-shrink-0 bg-gradient-to-br ${getTrackColor(index)} flex items-center justify-center ${
                isActive ? "animate-pulse-glow" : ""
              }`}
            >
              <Music className="w-4 h-4 text-foreground opacity-80" />
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
              >
                {track.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
            </div>

            {/* Duration */}
            <span className="text-xs text-muted-foreground font-mono flex-shrink-0">
              {formatTime(track.duration)}
            </span>

            {/* Remove button */}
            {showRemove && onRemoveTrack && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveTrack(track.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
