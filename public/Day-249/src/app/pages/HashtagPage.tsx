import { useState } from 'react';
import { useParams } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { PostCard } from '../components/PostCard';
import { 
  Hash, 
  Search, 
  TrendingUp,
  Users,
  BarChart3,
  Bookmark,
  Share2,
  Grid3x3,
  List
} from 'lucide-react';
import { mockPosts } from '../lib/mockData';

interface Hashtag {
  tag: string;
  posts: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage?: number;
}

interface RelatedHashtag {
  tag: string;
  posts: number;
}

export default function HashtagPage() {
  const { tag } = useParams();
  const currentTag = tag || 'react';
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'feed' | 'grid'>('feed');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock hashtag data
  const hashtagData: Hashtag = {
    tag: currentTag,
    posts: 12847,
    trend: 'up',
    trendPercentage: 24,
  };

  const trendingHashtags: Hashtag[] = [
    { tag: 'typescript', posts: 8921, trend: 'up', trendPercentage: 18 },
    { tag: 'webdev', posts: 15234, trend: 'up', trendPercentage: 32 },
    { tag: 'javascript', posts: 24561, trend: 'stable' },
    { tag: 'coding', posts: 19873, trend: 'down', trendPercentage: 5 },
    { tag: 'programming', posts: 31245, trend: 'up', trendPercentage: 12 },
    { tag: 'ui', posts: 9234, trend: 'up', trendPercentage: 28 },
    { tag: 'ux', posts: 7821, trend: 'stable' },
    { tag: 'design', posts: 18392, trend: 'up', trendPercentage: 15 },
  ];

  const relatedHashtags: RelatedHashtag[] = [
    { tag: 'reactjs', posts: 9821 },
    { tag: 'frontend', posts: 11234 },
    { tag: 'nextjs', posts: 6543 },
    { tag: 'hooks', posts: 4321 },
    { tag: 'components', posts: 3892 },
  ];

  const filteredPosts = mockPosts.filter(post =>
    searchQuery ? post.content.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <Card className="p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Hash className="size-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">#{currentTag}</h1>
                <p className="text-muted-foreground">
                  {hashtagData.posts.toLocaleString()} posts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className={`size-4 ${
                  hashtagData.trend === 'up' ? 'text-green-600' :
                  hashtagData.trend === 'down' ? 'text-red-600' :
                  'text-muted-foreground'
                }`} />
                {hashtagData.trendPercentage && (
                  <span className={`text-sm font-semibold ${
                    hashtagData.trend === 'up' ? 'text-green-600' :
                    hashtagData.trend === 'down' ? 'text-red-600' :
                    'text-muted-foreground'
                  }`}>
                    {hashtagData.trend === 'up' ? '+' : hashtagData.trend === 'down' ? '-' : ''}{hashtagData.trendPercentage}%
                  </span>
                )}
                <span className="text-sm text-muted-foreground">in the last 7 days</span>
              </div>
            </div>

            <p className="text-muted-foreground max-w-2xl">
              Discover the latest posts, discussions, and content tagged with #{currentTag}.
              Follow this hashtag to see more content in your feed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant={isFollowing ? 'outline' : 'default'}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              <Hash className="size-4 mr-2" />
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
            <Button variant="outline" size="icon">
              <Bookmark className="size-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="size-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <BarChart3 className="size-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Posts</p>
              <p className="text-2xl font-bold">{hashtagData.posts.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Users className="size-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contributors</p>
              <p className="text-2xl font-bold">2.4K</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="size-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Growth</p>
              <p className="text-2xl font-bold">+{hashtagData.trendPercentage}%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          {/* Search and View Controls */}
          <Card className="p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'feed' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('feed')}
                >
                  <List className="size-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="size-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="recent" className="mb-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="top">Top</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="mt-6">
              {viewMode === 'feed' ? (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                  <div className="flex justify-center py-4">
                    <Button variant="outline">Load More Posts</Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="top" className="mt-6">
              {viewMode === 'feed' ? (
                <div className="space-y-6">
                  {filteredPosts.slice(0, 3).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {filteredPosts.slice(0, 9).map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="media" className="mt-6">
              <div className="grid grid-cols-3 gap-2">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Hashtags */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Related Hashtags</h3>
            <div className="space-y-3">
              {relatedHashtags.map((hashtag) => (
                <div key={hashtag.tag} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="size-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">#{hashtag.tag}</p>
                      <p className="text-xs text-muted-foreground">
                        {hashtag.posts.toLocaleString()} posts
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Follow</Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Trending Hashtags */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="size-4" />
              Trending Hashtags
            </h3>
            <div className="space-y-3">
              {trendingHashtags.slice(0, 5).map((hashtag, index) => (
                <div key={hashtag.tag} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-muted-foreground w-4">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">#{hashtag.tag}</p>
                      <p className="text-xs text-muted-foreground">
                        {hashtag.posts.toLocaleString()} posts
                      </p>
                    </div>
                  </div>
                  {hashtag.trendPercentage && (
                    <Badge variant={hashtag.trend === 'up' ? 'default' : 'secondary'}>
                      {hashtag.trend === 'up' ? '+' : ''}{hashtag.trendPercentage}%
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-4 bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
            <h3 className="font-semibold mb-2">Using Hashtags</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Follow hashtags to see more content you care about in your feed.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use relevant hashtags in your posts</li>
              <li>• Follow up to 30 hashtags</li>
              <li>• Discover new communities</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
