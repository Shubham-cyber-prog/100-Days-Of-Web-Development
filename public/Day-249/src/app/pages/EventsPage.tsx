import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Calendar } from '../components/ui/calendar';
import { 
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Clock,
  Search,
  Plus,
  Share2,
  Bookmark,
  TrendingUp,
  Video,
  Globe,
  Building
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';

interface Event {
  id: string;
  title: string;
  description: string;
  organizer: {
    name: string;
    avatar: string;
  };
  date: string;
  time: string;
  location: string;
  type: 'online' | 'in-person' | 'hybrid';
  category: string;
  attendees: number;
  maxAttendees?: number;
  coverImage: string;
  isGoing: boolean;
  isInterested: boolean;
  isSaved: boolean;
}

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [eventType, setEventType] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'React Workshop: Advanced Patterns',
      description: 'Deep dive into advanced React patterns including hooks, context, and performance optimization.',
      organizer: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      },
      date: 'Mar 8, 2026',
      time: '2:00 PM - 5:00 PM',
      location: 'Online via Zoom',
      type: 'online',
      category: 'Technology',
      attendees: 245,
      maxAttendees: 500,
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      isGoing: true,
      isInterested: false,
      isSaved: true,
    },
    {
      id: '2',
      title: 'Design Meetup: UI/UX Trends 2026',
      description: 'Join us for an evening of networking and discussing the latest trends in UI/UX design.',
      organizer: {
        name: 'Alex Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      },
      date: 'Mar 10, 2026',
      time: '6:00 PM - 9:00 PM',
      location: 'Design Hub, San Francisco',
      type: 'in-person',
      category: 'Design',
      attendees: 87,
      maxAttendees: 100,
      coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      isGoing: false,
      isInterested: true,
      isSaved: false,
    },
    {
      id: '3',
      title: 'Startup Networking Event',
      description: 'Connect with fellow entrepreneurs, investors, and startup enthusiasts.',
      organizer: {
        name: 'David Brown',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      },
      date: 'Mar 12, 2026',
      time: '7:00 PM - 10:00 PM',
      location: 'Innovation Center, NYC',
      type: 'in-person',
      category: 'Business',
      attendees: 156,
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
      isGoing: false,
      isInterested: false,
      isSaved: false,
    },
    {
      id: '4',
      title: 'Virtual Music Festival',
      description: 'Experience live performances from artists around the world from the comfort of your home.',
      organizer: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      },
      date: 'Mar 15, 2026',
      time: '5:00 PM - 11:00 PM',
      location: 'Online Streaming',
      type: 'online',
      category: 'Music',
      attendees: 3421,
      coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop',
      isGoing: true,
      isInterested: false,
      isSaved: true,
    },
    {
      id: '5',
      title: 'Yoga & Wellness Retreat',
      description: 'A weekend retreat focused on yoga, meditation, and holistic wellness.',
      organizer: {
        name: 'Maya Patel',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      },
      date: 'Mar 20-22, 2026',
      time: 'All Day',
      location: 'Serenity Spa Resort, Bali',
      type: 'in-person',
      category: 'Fitness',
      attendees: 45,
      maxAttendees: 50,
      coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
      isGoing: false,
      isInterested: true,
      isSaved: true,
    },
    {
      id: '6',
      title: 'Tech Conference 2026',
      description: 'Annual technology conference featuring keynotes, workshops, and networking opportunities.',
      organizer: {
        name: 'Tech Innovators',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
      },
      date: 'Apr 5-7, 2026',
      time: '9:00 AM - 6:00 PM',
      location: 'Convention Center, Seattle + Online',
      type: 'hybrid',
      category: 'Technology',
      attendees: 1250,
      maxAttendees: 2000,
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
      isGoing: false,
      isInterested: false,
      isSaved: false,
    },
  ]);

  const categories = ['all', 'Technology', 'Design', 'Business', 'Music', 'Fitness', 'Food', 'Art', 'Sports'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = eventType === 'all' || event.type === eventType;
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleToggleGoing = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, isGoing: !event.isGoing, isInterested: false }
        : event
    ));
  };

  const handleToggleInterested = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, isInterested: !event.isInterested, isGoing: false }
        : event
    ));
  };

  const handleToggleSaved = (eventId: string) => {
    setEvents(events.map(event =>
      event.id === eventId
        ? { ...event, isSaved: !event.isSaved }
        : event
    ));
  };

  const upcomingEvents = filteredEvents.filter(e => e.isGoing || e.isInterested);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Events</h1>
          <p className="text-muted-foreground">Discover and join events in your community</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Event Title</label>
                <Input placeholder="Enter event title" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea placeholder="Tell people about your event" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Time</label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input placeholder="Where will your event be?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Event Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="in-person">In Person</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full">Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="in-person">In Person</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
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

          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="upcoming">
                My Events ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="saved">
                Saved ({events.filter(e => e.isSaved).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6 space-y-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-[300px_1fr] gap-6">
                    <div className="relative aspect-video md:aspect-square overflow-hidden">
                      <img 
                        src={event.coverImage} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        className="absolute top-3 left-3"
                        variant={event.type === 'online' ? 'default' : 'secondary'}
                      >
                        {event.type === 'online' && <Video className="size-3 mr-1" />}
                        {event.type === 'in-person' && <Building className="size-3 mr-1" />}
                        {event.type === 'hybrid' && <Globe className="size-3 mr-1" />}
                        {event.type}
                      </Badge>
                    </div>
                    <div className="p-6 flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <Badge variant="secondary" className="mb-2">{event.category}</Badge>
                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleSaved(event.id)}
                          >
                            <Bookmark className={`size-4 ${event.isSaved ? 'fill-current' : ''}`} />
                          </Button>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarIcon className="size-4 text-muted-foreground" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="size-4 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="size-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="size-4 text-muted-foreground" />
                            <span>
                              {event.attendees} attending
                              {event.maxAttendees && ` / ${event.maxAttendees} max`}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Avatar className="size-8">
                            <AvatarImage src={event.organizer.avatar} />
                            <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm">Organized by</p>
                            <p className="text-sm font-semibold">{event.organizer.name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant={event.isGoing ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => handleToggleGoing(event.id)}
                        >
                          {event.isGoing ? 'Going' : 'Attend'}
                        </Button>
                        <Button
                          variant={event.isInterested ? 'default' : 'outline'}
                          className="flex-1"
                          onClick={() => handleToggleInterested(event.id)}
                        >
                          {event.isInterested ? 'Interested' : 'Maybe'}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6 space-y-6">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="grid md:grid-cols-[300px_1fr] gap-6">
                      <div className="relative aspect-video md:aspect-square overflow-hidden">
                        <img 
                          src={event.coverImage} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <Badge variant="secondary" className="mb-2">{event.category}</Badge>
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarIcon className="size-4 text-muted-foreground" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="size-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <CalendarIcon className="size-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
                  <p className="text-muted-foreground">Events you're attending will appear here</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="saved" className="mt-6 space-y-6">
              {events.filter(e => e.isSaved).map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-[300px_1fr] gap-6">
                    <div className="relative aspect-video md:aspect-square overflow-hidden">
                      <img 
                        src={event.coverImage} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="size-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="size-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Calendar</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md"
            />
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <div className="space-y-2">
              {categories.slice(1, 6).map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setCategoryFilter(category)}
                >
                  <TrendingUp className="size-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
