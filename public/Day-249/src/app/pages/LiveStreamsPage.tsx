import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  Radio, 
  Search, 
  Users, 
  Eye, 
  Clock,
  Play,
  Video,
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface LiveStream {
  id: string;
  title: string;
  streamer: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  thumbnail: string;
  viewers: number;
  category: string;
  startedAt: string;
  isLive: boolean;
}

interface ScheduledStream {
  id: string;
  title: string;
  streamer: {
    name: string;
    username: string;
    avatar: string;
  };
  scheduledFor: string;
  category: string;
  notificationsEnabled: boolean;
}

export default function LiveStreamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock live streams data
  const liveStreams: LiveStream[] = [
    {
      id: '1',
      title: 'Building a Social Media Platform with React',
      streamer: {
        name: 'Sarah Chen',
        username: 'sarahcodes',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        verified: true,
      },
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
      viewers: 1247,
      category: 'Technology',
      startedAt: '45m ago',
      isLive: true,
    },
    {
      id: '2',
      title: 'Live Cooking: Italian Pasta Masterclass',
      streamer: {
        name: 'Marco Rossi',
        username: 'chefmarco',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        verified: true,
      },
      thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=225&fit=crop',
      viewers: 3421,
      category: 'Food',
      startedAt: '1h ago',
      isLive: true,
    },
    {
      id: '3',
      title: 'Q&A Session: Career in UX Design',
      streamer: {
        name: 'Alex Kim',
        username: 'alexdesigns',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        verified: false,
      },
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
      viewers: 892,
      category: 'Design',
      startedAt: '20m ago',
      isLive: true,
    },
    {
      id: '4',
      title: 'Morning Yoga Flow - Energize Your Day',
      streamer: {
        name: 'Maya Patel',
        username: 'yogawithmaya',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        verified: true,
      },
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=225&fit=crop',
      viewers: 2156,
      category: 'Fitness',
      startedAt: '10m ago',
      isLive: true,
    },
    {
      id: '5',
      title: 'Music Production Live Session',
      streamer: {
        name: 'David Brown',
        username: 'beatsbydave',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
        verified: false,
      },
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=225&fit=crop',
      viewers: 654,
      category: 'Music',
      startedAt: '2h ago',
      isLive: true,
    },
    {
      id: '6',
      title: 'Travel Vlog: Exploring Tokyo Streets',
      streamer: {
        name: 'Emma Wilson',
        username: 'wanderemma',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        verified: true,
      },
      thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=225&fit=crop',
      viewers: 1832,
      category: 'Travel',
      startedAt: '30m ago',
      isLive: true,
    },
  ];

  const scheduledStreams: ScheduledStream[] = [
    {
      id: 's1',
      title: 'Product Launch Event',
      streamer: {
        name: 'Sarah Chen',
        username: 'sarahcodes',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      scheduledFor: 'Today at 3:00 PM',
      category: 'Technology',
      notificationsEnabled: true,
    },
    {
      id: 's2',
      title: 'Weekly Art Tutorial',
      streamer: {
        name: 'Alex Kim',
        username: 'alexdesigns',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      },
      scheduledFor: 'Tomorrow at 10:00 AM',
      category: 'Art',
      notificationsEnabled: false,
    },
    {
      id: 's3',
      title: 'Gaming Tournament Finals',
      streamer: {
        name: 'David Brown',
        username: 'beatsbydave',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      },
      scheduledFor: 'Mar 7 at 6:00 PM',
      category: 'Gaming',
      notificationsEnabled: true,
    },
  ];

  const categories = ['all', 'Technology', 'Food', 'Design', 'Fitness', 'Music', 'Travel', 'Gaming', 'Art'];

  const filteredStreams = liveStreams.filter(stream => {
    const matchesSearch = stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stream.streamer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || stream.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Live Streams</h1>
        <p className="text-muted-foreground">Watch live content from creators around the world</p>
      </div>

      {/* Featured Live Stream */}
      <Card className="mb-8 overflow-hidden">
        <div className="grid md:grid-cols-[2fr_1fr]">
          <div className="relative aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-600 hover:bg-red-600 gap-1 animate-pulse">
                <Radio className="size-3" />
                LIVE
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={liveStreams[0].streamer.avatar} />
                    <AvatarFallback>{liveStreams[0].streamer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{liveStreams[0].title}</h3>
                    <p className="text-sm text-white/80">{liveStreams[0].streamer.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <Badge variant="secondary" className="mb-4">{liveStreams[0].category}</Badge>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="size-4 text-muted-foreground" />
                  <span className="font-semibold">{liveStreams[0].viewers.toLocaleString()}</span>
                  <span className="text-muted-foreground">watching now</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  <span>Started {liveStreams[0].startedAt}</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="w-full">
              <Play className="size-4 mr-2" />
              Watch Now
            </Button>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search live streams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="size-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="live" className="mb-6">
        <TabsList>
          <TabsTrigger value="live" className="gap-2">
            <Radio className="size-4" />
            Live Now
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="gap-2">
            <Calendar className="size-4" />
            Scheduled
          </TabsTrigger>
          <TabsTrigger value="following" className="gap-2">
            <Users className="size-4" />
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStreams.map((stream) => (
              <Card key={stream.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={stream.thumbnail} 
                    alt={stream.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <Badge className="absolute top-3 left-3 bg-red-600 hover:bg-red-600 gap-1 animate-pulse">
                    <Radio className="size-3" />
                    LIVE
                  </Badge>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium flex items-center gap-1">
                    <Eye className="size-3" />
                    {stream.viewers.toLocaleString()}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="lg" className="rounded-full">
                      <Play className="size-5" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="size-10 flex-shrink-0">
                      <AvatarImage src={stream.streamer.avatar} />
                      <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold line-clamp-2 mb-1">{stream.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{stream.streamer.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{stream.category}</Badge>
                        <span className="text-xs text-muted-foreground">{stream.startedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <div className="space-y-4">
            {scheduledStreams.map((stream) => (
              <Card key={stream.id} className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="size-12">
                    <AvatarImage src={stream.streamer.avatar} />
                    <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{stream.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{stream.streamer.name}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <Badge variant="secondary">{stream.category}</Badge>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3" />
                        {stream.scheduledFor}
                      </span>
                    </div>
                  </div>
                  <Button variant={stream.notificationsEnabled ? 'default' : 'outline'}>
                    {stream.notificationsEnabled ? 'Notified' : 'Notify Me'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="following" className="mt-6">
          <Card className="p-12 text-center">
            <Video className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No live streams from people you follow</h3>
            <p className="text-muted-foreground mb-4">
              When creators you follow go live, you'll see them here
            </p>
            <Button>Discover Creators</Button>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Categories Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => (
            <Card
              key={category}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow text-center group"
            >
              <div className="size-12 mx-auto mb-3 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                <TrendingUp className="size-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold">{category}</h3>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
