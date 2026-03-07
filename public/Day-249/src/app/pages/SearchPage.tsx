import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Search, Hash, MapPin, TrendingUp, UserPlus, X } from 'lucide-react';
import { motion } from 'motion/react';

// Mock data for search results
const mockUsers = [
  { id: 1, name: 'Alex Johnson', username: 'alexj', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', bio: 'Designer & Developer', followers: 2.5, verified: true },
  { id: 2, name: 'Sarah Williams', username: 'sarahw', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', bio: 'Travel enthusiast', followers: 1.2, verified: false },
  { id: 3, name: 'Michael Chen', username: 'michaelc', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', bio: 'Tech entrepreneur', followers: 5.3, verified: true },
  { id: 4, name: 'Emma Davis', username: 'emmad', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', bio: 'Fitness coach', followers: 3.1, verified: true },
];

const mockPosts = [
  { id: 1, author: 'Alex Johnson', username: 'alexj', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', content: 'Just launched my new portfolio website! Check it out 🚀', likes: 234, time: '2h ago' },
  { id: 2, author: 'Sarah Williams', username: 'sarahw', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', content: 'Amazing sunset at the beach today 🌅', likes: 567, time: '5h ago' },
  { id: 3, author: 'Michael Chen', username: 'michaelc', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', content: 'Excited to announce our Series A funding! 💰', likes: 1203, time: '1d ago' },
];

const mockHashtags = [
  { tag: 'design', posts: 1.2, trending: true },
  { tag: 'photography', posts: 890, trending: false },
  { tag: 'technology', posts: 2.3, trending: true },
  { tag: 'travel', posts: 567, trending: false },
  { tag: 'fitness', posts: 432, trending: true },
];

const mockPlaces = [
  { id: 1, name: 'New York City', country: 'United States', posts: 5.2 },
  { id: 2, name: 'Paris', country: 'France', posts: 3.8 },
  { id: 3, name: 'Tokyo', country: 'Japan', posts: 4.1 },
  { id: 4, name: 'London', country: 'United Kingdom', posts: 2.9 },
];

const recentSearches = ['web development', '#design', '@alexj', 'New York'];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [recentSearchList, setRecentSearchList] = useState(recentSearches);

  const removeRecentSearch = (search: string) => {
    setRecentSearchList(recentSearchList.filter(s => s !== search));
  };

  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}M`;
    return `${count}K`;
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-6">
      {/* Search Header */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            placeholder="Search for users, posts, hashtags, or places..."
            className="pl-10 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {/* Recent Searches - Show when no search query */}
      {!searchQuery && recentSearchList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card>
            <CardHeader>
              <h2 className="font-semibold">Recent Searches</h2>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentSearchList.map((search, index) => (
                <motion.div
                  key={search}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <Search className="size-4 text-muted-foreground" />
                    <span>{search}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeRecentSearch(search)}
                  >
                    <X className="size-4" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
            <TabsTrigger value="places">Places</TabsTrigger>
          </TabsList>

          {/* All Results */}
          <TabsContent value="all" className="space-y-6 mt-6">
            {/* Top Users */}
            <div>
              <h3 className="font-semibold mb-4">Users</h3>
              <div className="space-y-2">
                {mockUsers.slice(0, 3).map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </div>

            {/* Top Posts */}
            <div>
              <h3 className="font-semibold mb-4">Posts</h3>
              <div className="space-y-2">
                {mockPosts.slice(0, 2).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Top Hashtags */}
            <div>
              <h3 className="font-semibold mb-4">Hashtags</h3>
              <div className="space-y-2">
                {mockHashtags.slice(0, 3).map((hashtag) => (
                  <HashtagCard key={hashtag.tag} hashtag={hashtag} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-2 mt-6">
            {mockUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-2 mt-6">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          {/* Hashtags Tab */}
          <TabsContent value="hashtags" className="space-y-2 mt-6">
            {mockHashtags.map((hashtag) => (
              <HashtagCard key={hashtag.tag} hashtag={hashtag} />
            ))}
          </TabsContent>

          {/* Places Tab */}
          <TabsContent value="places" className="space-y-2 mt-6">
            {mockPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

// User Card Component
function UserCard({ user }: { user: any }) {
  const [following, setFollowing] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="size-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold truncate">{user.name}</p>
                  {user.verified && (
                    <Badge variant="secondary" className="size-4 p-0 flex items-center justify-center">
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {user.followers}M followers
                </p>
              </div>
            </div>
            <Button
              variant={following ? 'outline' : 'default'}
              size="sm"
              onClick={() => setFollowing(!following)}
              className={following ? '' : 'bg-primary hover:bg-primary/90'}
            >
              {following ? (
                'Following'
              ) : (
                <>
                  <UserPlus className="size-4 mr-2" />
                  Follow
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Post Card Component
function PostCard({ post }: { post: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="size-10">
              <AvatarImage src={post.avatar} alt={post.author} />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-muted-foreground">@{post.username}</p>
                <span className="text-sm text-muted-foreground">·</span>
                <p className="text-sm text-muted-foreground">{post.time}</p>
              </div>
              <p className="text-sm mb-2">{post.content}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{post.likes} likes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Hashtag Card Component
function HashtagCard({ hashtag }: { hashtag: any }) {
  const [following, setFollowing] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Hash className="size-6 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">#{hashtag.tag}</p>
                  {hashtag.trending && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <TrendingUp className="size-3" />
                      Trending
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {hashtag.posts >= 1000 ? `${(hashtag.posts / 1000).toFixed(1)}M` : `${hashtag.posts}K`} posts
                </p>
              </div>
            </div>
            <Button
              variant={following ? 'outline' : 'default'}
              size="sm"
              onClick={() => setFollowing(!following)}
              className={following ? '' : 'bg-primary hover:bg-primary/90'}
            >
              {following ? 'Following' : 'Follow'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Place Card Component
function PlaceCard({ place }: { place: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="size-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{place.name}</p>
                <p className="text-sm text-muted-foreground">{place.country}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {place.posts}M posts
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
