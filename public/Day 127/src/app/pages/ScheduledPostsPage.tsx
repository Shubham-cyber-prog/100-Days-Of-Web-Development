import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Calendar, Clock, Image as ImageIcon, Edit, Trash2, Plus } from 'lucide-react';
import { currentUser } from '../lib/mockData';

interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'draft';
  image?: string;
}

export default function ScheduledPostsPage() {
  const [scheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      content: 'Excited to share my new photography collection! Check it out 📸✨',
      scheduledDate: '2026-02-22',
      scheduledTime: '14:00',
      status: 'scheduled',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      content: 'Working on something amazing! Can\'t wait to share it with you all 🚀',
      scheduledDate: '2026-02-23',
      scheduledTime: '10:00',
      status: 'scheduled',
    },
    {
      id: '3',
      content: 'Weekend vibes! What are your plans? 🌟',
      scheduledDate: '2026-02-25',
      scheduledTime: '18:00',
      status: 'draft',
    },
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Scheduled Posts</h1>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="size-5" />
              Schedule Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="What's on your mind?"
                  rows={6}
                  className="resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Schedule Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Schedule Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <ImageIcon className="size-4" />
                  Add Media
                </Button>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-primary hover:bg-primary/90">
                  Schedule Post
                </Button>
                <Button variant="outline" className="flex-1">
                  Save as Draft
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Scheduled</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Edit className="size-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Drafts</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Clock className="size-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Published</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Scheduled Posts List */}
      <div className="space-y-4">
        {scheduledPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex gap-4">
              {post.image && (
                <img
                  src={post.image}
                  alt="Post preview"
                  className="size-24 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className={
                          post.status === 'scheduled'
                            ? 'bg-primary/10 text-primary border-0'
                            : 'bg-yellow-500/10 text-yellow-600 border-0'
                        }
                      >
                        {post.status === 'scheduled' ? '⏰ Scheduled' : '📝 Draft'}
                      </Badge>
                    </div>
                    <p className="text-foreground">{post.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    {new Date(post.scheduledDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    {post.scheduledTime}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
