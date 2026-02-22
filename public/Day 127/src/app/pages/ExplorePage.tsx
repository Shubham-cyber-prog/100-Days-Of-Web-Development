import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Search, TrendingUp, Hash, Image as ImageIcon } from 'lucide-react';
import { trendingHashtags, mockPosts } from '../lib/mockData';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search Bar */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            placeholder="Search for topics, people, or posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </Card>

      {/* Explore Tabs */}
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="trending" className="gap-2">
            <TrendingUp className="size-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="hashtags" className="gap-2">
            <Hash className="size-4" />
            Hashtags
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2">
            <ImageIcon className="size-4" />
            Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-6 space-y-4">
          {/* Trending Topics */}
          <div className="grid gap-3">
            {trendingHashtags.map((item, index) => (
              <Card
                key={index}
                className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        #{index + 1} Trending
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg">{item.tag}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.posts.toLocaleString()} posts
                    </p>
                  </div>
                  <TrendingUp className="size-8 text-primary" />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hashtags" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {trendingHashtags.map((item, index) => (
              <Card
                key={index}
                className="p-6 hover:bg-accent/50 transition-colors cursor-pointer text-center"
              >
                <Hash className="size-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">{item.tag}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.posts.toLocaleString()} posts
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {mockPosts
              .filter((p) => p.image)
              .map((post) => (
                <button
                  key={post.id}
                  className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity relative group"
                >
                  <img
                    src={post.image}
                    alt="Media"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                      <span>❤️</span>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
