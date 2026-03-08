import type { Participant } from "@/lib/meeting";
import VideoTile from "./VideoTile";

interface VideoGridProps {
  participants: Participant[];
}

const VideoGrid = ({ participants }: VideoGridProps) => {
  const count = participants.length;

  const gridClass =
    count <= 1
      ? "grid-cols-1 max-w-2xl mx-auto"
      : count <= 2
      ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
      : count <= 4
      ? "grid-cols-2 max-w-5xl mx-auto"
      : count <= 6
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${gridClass} gap-3 p-4 h-full content-center`}>
      {participants.map((p) => (
        <VideoTile key={p.id} participant={p} isLocal={p.isLocal} />
      ))}
    </div>
  );
};

export default VideoGrid;
