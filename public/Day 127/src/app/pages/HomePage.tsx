import { useState } from 'react';
import { PostCard } from '../components/PostCard';
import { StoryCircle } from '../components/StoryCircle';
import { TrendingSidebar } from '../components/TrendingSidebar';
import { UserCard } from '../components/UserCard';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Sparkles, Users } from 'lucide-react';
import { mockPosts, mockStories, mockUsers } from '../lib/mockData';

export default function HomePage() {
  const [posts] = useState(mockPosts);
  const [stories] = useState(mockStories);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      {/* Main Feed */}
      <div className="space-y-6">
        {/* Stories Section */}
        <Card className="p-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {stories.map((story) => (
              <StoryCircle key={story.id} story={story} />
            ))}
          </div>
        </Card>

        {/* Feed Tabs */}
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="for-you" className="gap-2">
              <Sparkles className="size-4" />
              For You
            </TabsTrigger>
            <TabsTrigger value="following" className="gap-2">
              <Users className="size-4" />
              Following
            </TabsTrigger>
          </TabsList>

          <TabsContent value="for-you" className="space-y-6 mt-0">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {/* Load More */}
            <div className="flex justify-center py-4">
              <Button variant="outline">Load More Posts</Button>
            </div>
          </TabsContent>

          <TabsContent value="following" className="space-y-6 mt-0">
            {posts.slice(0, 2).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            <div className="flex justify-center py-4">
              <Button variant="outline">Load More Posts</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block space-y-6">
        {/* Trending */}
        <TrendingSidebar />

        {/* Suggested Users */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">Suggested For You</h3>
          <div className="space-y-1">
            {mockUsers.slice(0, 4).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
          <Button variant="ghost" className="w-full">
            See More
          </Button>
        </Card>
      </div>
    </div>
  );
}
