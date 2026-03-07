import { Play } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SongListItemProps {
  id?: string;
  title: string;
  artist: string;
  duration: string;
  number?: number;
  artwork?: string;
  onPlay?: (id: string) => void;
}

export function SongListItem({ id, title, artist, duration, number, artwork, onPlay }: SongListItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onPlay && id) {
      onPlay(id);
    } else {
      navigate("/player");
    }
  };

  return (
    <div
      className="group flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      {number && (
        <span className="w-6 text-sm text-muted-foreground group-hover:hidden">
          {number}
        </span>
      )}
      <div className="w-6 hidden group-hover:flex items-center justify-center">
        <Play className="h-4 w-4 text-violet-600" fill="currentColor" />
      </div>
      
      {artwork ? (
        <ImageWithFallback 
          src={artwork} 
          alt={title}
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0" />
      )}
      
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{title}</p>
        <p className="text-sm text-muted-foreground truncate">{artist}</p>
      </div>
      
      <span className="text-sm text-muted-foreground">{duration}</span>
    </div>
  );
}