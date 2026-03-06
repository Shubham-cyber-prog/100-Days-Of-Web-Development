import { useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { PostCard } from '../components/PostCard';
import { MapPin, Link as LinkIcon, Calendar, Settings, MessageCircle, MoreHorizontal, Grid3x3, Heart, Bookmark } from 'lucide-react';
import { currentUser, mockPosts } from '../lib/mockData';

export default function ProfilePage() {
  const { username } = useParams();
  const [isOwnProfile] = useState(!username || username === currentUser.username);
  const [user] = useState(currentUser);
  const [posts] = useState(mockPosts);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <Avatar className="size-24 md:size-32 border-4 border-background shadow-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                {user.isVerified && (
                  <Badge className="bg-primary/10 text-primary border-0">
                    ✓ Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <button className="text-center hover:underline">
                <div className="font-bold">{user.posts.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </button>
              <button className="text-center hover:underline">
                <div className="font-bold">{user.followers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </button>
              <button className="text-center hover:underline">
                <div className="font-bold">{user.following.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </button>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-foreground">{user.bio}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="size-4" />
                <a href="https://example.com" className="text-primary hover:underline">
                  example.com
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Joined January 2023
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {isOwnProfile ? (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Settings className="size-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue={user.username} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea id="bio" defaultValue={user.bio} rows={3} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" defaultValue="San Francisco, CA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input id="website" defaultValue="https://example.com" />
                        </div>
                        <div className="flex gap-3">
                          <Button className="flex-1 bg-primary hover:bg-primary/90">Save Changes</Button>
                          <Button variant="outline" className="flex-1">Cancel</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <>
                  <Button className="bg-primary hover:bg-primary/90">Follow</Button>
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="size-4" />
                    Message
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="posts" className="gap-2">
            <Grid3x3 className="size-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2">
            <Grid3x3 className="size-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="likes" className="gap-2">
            <Heart className="size-4" />
            Likes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6 mt-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <div className="grid grid-cols-3 gap-2">
            {posts
              .filter((p) => p.image)
              .map((post) => (
                <button
                  key={post.id}
                  className="aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img
                    src={post.image}
                    alt="Media"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="likes" className="space-y-6 mt-6">
          {posts.slice(0, 2).map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
