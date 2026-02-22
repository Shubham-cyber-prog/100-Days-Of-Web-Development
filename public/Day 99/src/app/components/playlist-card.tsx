import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PlaylistCardProps {
  id: string;
  title: string;
  description: string;
  songCount: number;
  image?: string;
}

export function PlaylistCard({ id, title, description, songCount, image }: PlaylistCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-card rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-all shadow-sm hover:shadow-md"
      onClick={() => navigate(`/playlist/${id}`)}
    >
      {image ? (
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="aspect-square rounded-lg mb-4 object-cover w-full"
        />
      ) : (
        <div className="aspect-square bg-muted rounded-lg mb-4" />
      )}
      <h3 className="font-semibold mb-1 truncate">{title}</h3>
      <p className="text-sm text-muted-foreground truncate">{description}</p>
      <p className="text-xs text-muted-foreground mt-2">{songCount} songs</p>
    </div>
  );
}