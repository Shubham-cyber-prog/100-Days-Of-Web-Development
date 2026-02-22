import { useEffect, useState } from "react";
import { SearchInput } from "../components/search-input";
import { PlaylistCard } from "../components/playlist-card";
import { SongListItem } from "../components/song-list-item";
import { appleMusicService } from "../services/apple-music";

const featuredPlaylists = [
  { 
    id: "1", 
    title: "Today's Top Hits", 
    description: "The hottest tracks right now", 
    songCount: 50,
    image: "https://images.unsplash.com/photo-1728140161994-975b3f4fd93c?w=400&h=400&fit=crop"
  },
  { 
    id: "2", 
    title: "Chill Vibes", 
    description: "Relax and unwind", 
    songCount: 38,
    image: "https://images.unsplash.com/photo-1635895312273-0921e5f91796?w=400&h=400&fit=crop"
  },
  { 
    id: "3", 
    title: "Workout Mix", 
    description: "Get pumped up", 
    songCount: 45,
    image: "https://images.unsplash.com/photo-1666979290238-2d862b573345?w=400&h=400&fit=crop"
  },
  { 
    id: "4", 
    title: "Focus Flow", 
    description: "Concentration music", 
    songCount: 42,
    image: "https://images.unsplash.com/photo-1764096534662-a194a348c4a0?w=400&h=400&fit=crop"
  },
];

export function Home() {
  const [trendingSongs, setTrendingSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingSongs = async () => {
      try {
        await appleMusicService.initialize();
        const songs = await appleMusicService.getTopCharts(10);
        setTrendingSongs(songs);
      } catch (error) {
        console.error("Failed to load trending songs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingSongs();
  }, []);

  const handlePlaySong = async (songId: string) => {
    await appleMusicService.playSong(songId);
  };

  return (
    <div className="px-4 md:px-6 space-y-8">
      <div className="max-w-2xl">
        <SearchInput />
      </div>

      <section>
        <h2 className="mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4">Trending Now</h2>
        {loading ? (
          <div className="text-muted-foreground">Loading trending songs...</div>
        ) : (
          <div className="space-y-1">
            {trendingSongs.map((song, index) => (
              <SongListItem 
                key={song.id} 
                {...song} 
                number={index + 1}
                onPlay={handlePlaySong}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}