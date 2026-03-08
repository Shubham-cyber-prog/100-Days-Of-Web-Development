import { useState } from "react";
import { Heart, MessageCircle, Share2, Plus, Image as ImageIcon, AlertCircle, Calendar, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";

const posts = [
  {
    id: 1,
    type: "notice",
    author: { name: "Community Admin", avatar: "CA", role: "Administrator" },
    timestamp: "2 hours ago",
    content: "Reminder: The community center will be closed for maintenance this Saturday from 9 AM to 3 PM. We apologize for any inconvenience!",
    likes: 24,
    comments: 5,
    shares: 2,
    isPinned: true,
  },
  {
    id: 2,
    type: "event",
    author: { name: "Emily Rodriguez", avatar: "ER", role: "Event Organizer" },
    timestamp: "5 hours ago",
    content: "Exciting news! We're organizing a Community BBQ next Saturday at Central Park. Bring your family and friends. Food and games provided! 🎉",
    eventDetails: {
      title: "Community BBQ",
      date: "March 1, 2026",
      time: "12:00 PM - 4:00 PM",
      location: "Central Park",
    },
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    likes: 58,
    comments: 12,
    shares: 8,
  },
  {
    id: 3,
    type: "post",
    author: { name: "Michael Chen", avatar: "MC", role: "Resident" },
    timestamp: "1 day ago",
    content: "Thank you to everyone who participated in yesterday's neighborhood clean-up! We collected over 200 pounds of litter. Our community looks amazing! 💚",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600",
    likes: 92,
    comments: 18,
    shares: 15,
  },
  {
    id: 4,
    type: "alert",
    author: { name: "Safety Committee", avatar: "SC", role: "Committee" },
    timestamp: "1 day ago",
    content: "Alert: Several residents have reported suspicious activity near the North entrance. Please remain vigilant and report any concerns to local authorities immediately.",
    likes: 34,
    comments: 23,
    shares: 45,
  },
  {
    id: 5,
    type: "post",
    author: { name: "Sarah Johnson", avatar: "SJ", role: "Resident" },
    timestamp: "2 days ago",
    content: "Lost: Orange tabby cat named Whiskers. Last seen near Oak Avenue. Please contact me if you have any information. Missing since yesterday evening. 🐱",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600",
    likes: 67,
    comments: 31,
    shares: 89,
  },
];

const getPostTypeIcon = (type: string) => {
  switch (type) {
    case "notice": return <FileText className="size-4" />;
    case "event": return <Calendar className="size-4" />;
    case "alert": return <AlertCircle className="size-4" />;
    default: return null;
  }
};

const getPostTypeColor = (type: string) => {
  switch (type) {
    case "notice": return "bg-info text-info-foreground";
    case "event": return "bg-secondary text-secondary-foreground";
    case "alert": return "bg-accent text-accent-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export function FeedPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Post created successfully!");
    setIsCreatePostOpen(false);
  };

  const filteredPosts = selectedTab === "all" 
    ? posts 
    : posts.filter(post => post.type === selectedTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Community Feed</h1>
          <p className="text-muted-foreground">Stay connected with your neighbors</p>
        </div>
        <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create a Post</DialogTitle>
              <DialogDescription>
                Share updates, announcements, or start a conversation
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="postType">Post Type</Label>
                <Select>
                  <SelectTrigger id="postType" className="bg-input-background">
                    <SelectValue placeholder="Select post type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">General Post</SelectItem>
                    <SelectItem value="notice">Notice</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="What's on your mind?"
                  rows={4}
                  className="bg-input-background resize-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Add Media</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-input-background">
                  <ImageIcon className="size-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Publish</Button>
                <Button type="button" variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="notice">Notices</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="alert">Alerts</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="max-w-3xl space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {post.isPinned && (
                <Badge className="mb-4" variant="secondary">
                  📌 Pinned
                </Badge>
              )}
              
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="size-10">
                  <AvatarImage src="" alt={post.author.name} />
                  <AvatarFallback>{post.author.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{post.author.name}</span>
                    <Badge variant="outline" className="text-xs">{post.author.role}</Badge>
                    {post.type !== "post" && (
                      <Badge className={getPostTypeColor(post.type)} variant="secondary">
                        {getPostTypeIcon(post.type)}
                        <span className="ml-1 capitalize">{post.type}</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="whitespace-pre-wrap mb-4">{post.content}</p>
                {post.eventDetails && (
                  <Card className="bg-muted mb-4">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="size-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                          <Calendar className="size-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{post.eventDetails.title}</h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            📅 {post.eventDetails.date} • {post.eventDetails.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            📍 {post.eventDetails.location}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full rounded-lg object-cover max-h-96"
                  />
                )}
              </div>

              <div className="flex items-center gap-6 pt-4 border-t">
                <Button variant="ghost" size="sm" className="gap-2 hover:text-error">
                  <Heart className="size-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 hover:text-primary">
                  <MessageCircle className="size-4" />
                  <span>{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 hover:text-secondary">
                  <Share2 className="size-4" />
                  <span>{post.shares}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Action Button for Mobile */}
      <Button
        className="fixed bottom-6 right-6 size-14 rounded-full shadow-lg lg:hidden"
        onClick={() => setIsCreatePostOpen(true)}
      >
        <Plus className="size-6" />
      </Button>
    </div>
  );
}
