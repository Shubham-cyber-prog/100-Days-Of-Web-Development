import { useParams } from "react-router";
import { Play, Heart, MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { SongListItem } from "../components/song-list-item";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { appleMusicService } from "../services/apple-music";

const playlistData: Record<string, { title: string; description: string; songCount: number; image: string; songs: Array<{ id: string; title: string; artist: string; duration: string; artwork: string }> }> = {
  "1": {
    title: "Today's Top Hits",
    description: "The hottest tracks right now",
    songCount: 50,
    image: "https://images.unsplash.com/photo-1728140161994-975b3f4fd93c?w=500&h=500&fit=crop",
    songs: [
      { id: "1", title: "Midnight Dreams", artist: "Luna Nova", duration: "3:45", artwork: "https://images.unsplash.com/photo-1728140161994-975b3f4fd93c?w=400" },
      { id: "2", title: "Electric Pulse", artist: "The Synths", duration: "4:12", artwork: "https://images.unsplash.com/photo-1635895312273-0921e5f91796?w=400" },
      { id: "3", title: "Ocean Waves", artist: "Aquatic Soul", duration: "3:28", artwork: "https://images.unsplash.com/photo-1666979290238-2d862b573345?w=400" },
      { id: "4", title: "City Lights", artist: "Urban Echo", duration: "3:56", artwork: "https://images.unsplash.com/photo-1764096534662-a194a348c4a0?w=400" },
      { id: "5", title: "Sunset Boulevard", artist: "Golden Hour", duration: "4:03", artwork: "https://images.unsplash.com/photo-1649945624740-69d73e3972aa?w=400" },
      { id: "6", title: "Neon Nights", artist: "Neon Dreams", duration: "3:34", artwork: "https://images.unsplash.com/photo-1760555960987-96e60fbc0a00?w=400" },
      { id: "7", title: "Crystal Sky", artist: "Luna Nova", duration: "4:21", artwork: "https://images.unsplash.com/photo-1706733788801-f71266d4ec71?w=400" },
      { id: "8", title: "Digital Love", artist: "The Synths", duration: "3:47", artwork: "https://images.unsplash.com/photo-1766933161362-ccf4050529a0?w=400" },
    ],
  },
};

export function PlaylistDetail() {
  const { id } = useParams<{ id: string }>();
  const playlist = playlistData[id || "1"] || playlistData["1"];

  const handlePlaySong = async (songId: string) => {
    await appleMusicService.playSong(songId);
  };

  const handlePlayAll = async () => {
    if (playlist.songs.length > 0) {
      await appleMusicService.playSong(playlist.songs[0].id);
    }
  };

  return (
    <div className="px-4 md:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
        <ImageWithFallback 
          src={playlist.image} 
          alt={playlist.title}
          className="w-full md:w-56 aspect-square rounded-xl shadow-lg object-cover"
        />
        
        <div className="space-y-4 flex-1">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Playlist</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{playlist.title}</h1>
            <p className="text-muted-foreground">{playlist.description}</p>
            <p className="text-sm text-muted-foreground mt-2">{playlist.songCount} songs</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700 gap-2" onClick={handlePlayAll}>
              <Play className="h-5 w-5" fill="currentColor" />
              Play
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="space-y-1">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 text-sm text-muted-foreground border-b border-border">
          <span className="w-6">#</span>
          <span>Title</span>
          <span>Duration</span>
        </div>
        
        {playlist.songs.map((song, index) => (
          <SongListItem key={song.id} {...song} number={index + 1} onPlay={handlePlaySong} />
        ))}
      </div>
    </div>
  );
}