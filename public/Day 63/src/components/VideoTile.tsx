import { useRef, useEffect } from "react";
import { Mic, MicOff, VideoOff } from "lucide-react";
import type { Participant } from "@/lib/meeting";

interface VideoTileProps {
  participant: Participant;
  isLocal?: boolean;
}

const VideoTile = ({ participant, isLocal }: VideoTileProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden aspect-video ${
        isLocal ? "ring-2 ring-primary/50 glow-primary" : "ring-1 ring-glass-border"
      } bg-secondary/50`}
    >
      {participant.stream && !participant.isCameraOff ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-secondary">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl font-display font-bold text-foreground">
              {participant.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Overlay info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground truncate">
            {participant.name} {isLocal && "(You)"}
          </span>
          <div className="flex items-center gap-1">
            {participant.isMuted ? (
              <MicOff className="w-3.5 h-3.5 text-destructive" />
            ) : (
              <Mic className="w-3.5 h-3.5 text-success" />
            )}
            {participant.isCameraOff && (
              <VideoOff className="w-3.5 h-3.5 text-destructive" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTile;
