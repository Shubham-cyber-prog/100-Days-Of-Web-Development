import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { PlaylistCard } from "../components/playlist-card";

const playlists = [
  { 
    id: "1", 
    title: "My Favorites", 
    description: "Your top picks", 
    songCount: 127,
    image: "https://images.unsplash.com/photo-1728140161994-975b3f4fd93c?w=400&h=400&fit=crop"
  },
  { 
    id: "2", 
    title: "Road Trip", 
    description: "Long drive essentials", 
    songCount: 68,
    image: "https://images.unsplash.com/photo-1706733788801-f71266d4ec71?w=400&h=400&fit=crop"
  },
  { 
    id: "3", 
    title: "Party Hits", 
    description: "Get the party started", 
    songCount: 92,
    image: "https://images.unsplash.com/photo-1766933161362-ccf4050529a0?w=400&h=400&fit=crop"
  },
  { 
    id: "4", 
    title: "Study Session", 
    description: "Focus music", 
    songCount: 45,
    image: "https://images.unsplash.com/photo-1764096534662-a194a348c4a0?w=400&h=400&fit=crop"
  },
  { 
    id: "5", 
    title: "Morning Coffee", 
    description: "Wake up playlist", 
    songCount: 33,
    image: "https://images.unsplash.com/photo-1649945624740-69d73e3972aa?w=400&h=400&fit=crop"
  },
  { 
    id: "6", 
    title: "Late Night", 
    description: "Midnight vibes", 
    songCount: 56,
    image: "https://images.unsplash.com/photo-1760555960987-96e60fbc0a00?w=400&h=400&fit=crop"
  },
];

const artists = [
  { id: "a1", title: "Luna Nova", description: "Electronic", songCount: 24, image: "https://images.unsplash.com/photo-1635895312273-0921e5f91796?w=400&h=400&fit=crop" },
  { id: "a2", title: "The Synths", description: "Synthwave", songCount: 18, image: "https://images.unsplash.com/photo-1666979290238-2d862b573345?w=400&h=400&fit=crop" },
  { id: "a3", title: "Aquatic Soul", description: "Ambient", songCount: 31, image: "https://images.unsplash.com/photo-1764096534662-a194a348c4a0?w=400&h=400&fit=crop" },
  { id: "a4", title: "Urban Echo", description: "Hip Hop", songCount: 42, image: "https://images.unsplash.com/photo-1649945624740-69d73e3972aa?w=400&h=400&fit=crop" },
  { id: "a5", title: "Golden Hour", description: "Indie Pop", songCount: 27, image: "https://images.unsplash.com/photo-1760555960987-96e60fbc0a00?w=400&h=400&fit=crop" },
  { id: "a6", title: "Neon Dreams", description: "Electronic", songCount: 36, image: "https://images.unsplash.com/photo-1728140161994-975b3f4fd93c?w=400&h=400&fit=crop" },
];

const albums = [
  { id: "al1", title: "Midnight Collection", description: "Luna Nova • 2025", songCount: 12, image: "https://images.unsplash.com/photo-1706733788801-f71266d4ec71?w=400&h=400&fit=crop" },
  { id: "al2", title: "Electric Hearts", description: "The Synths • 2024", songCount: 10, image: "https://images.unsplash.com/photo-1766933161362-ccf4050529a0?w=400&h=400&fit=crop" },
  { id: "al3", title: "Deep Blue", description: "Aquatic Soul • 2024", songCount: 14, image: "https://images.unsplash.com/photo-1635895312273-0921e5f91796?w=400&h=400&fit=crop" },
  { id: "al4", title: "City Stories", description: "Urban Echo • 2025", songCount: 11, image: "https://images.unsplash.com/photo-1666979290238-2d862b573345?w=400&h=400&fit=crop" },
  { id: "al5", title: "Sunset Sessions", description: "Golden Hour • 2024", songCount: 9, image: "https://images.unsplash.com/photo-1764096534662-a194a348c4a0?w=400&h=400&fit=crop" },
  { id: "al6", title: "Future Sounds", description: "Neon Dreams • 2025", songCount: 13, image: "https://images.unsplash.com/photo-1649945624740-69d73e3972aa?w=400&h=400&fit=crop" },
];

export function Library() {
  return (
    <div className="px-4 md:px-6 space-y-6">
      <h1>Your Library</h1>
      
      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="playlists" className="flex-1 md:flex-none">Playlists</TabsTrigger>
          <TabsTrigger value="artists" className="flex-1 md:flex-none">Artists</TabsTrigger>
          <TabsTrigger value="albums" className="flex-1 md:flex-none">Albums</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playlists" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} {...playlist} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="artists" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {artists.map((artist) => (
              <PlaylistCard key={artist.id} {...artist} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="albums" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {albums.map((album) => (
              <PlaylistCard key={album.id} {...album} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}