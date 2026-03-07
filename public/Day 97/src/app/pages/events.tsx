import { useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";

const events = [
  {
    id: 1,
    title: "Community Clean-up Day",
    description: "Join us for a neighborhood clean-up. Bring gloves and bags - we'll provide refreshments!",
    date: "Feb 24, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "Community Center Parking Lot",
    category: "Environment",
    organizer: { name: "Emily Rodriguez", avatar: "ER" },
    attendees: 48,
    maxAttendees: 60,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600",
    isAttending: false,
  },
  {
    id: 2,
    title: "Town Hall Meeting",
    description: "Discuss upcoming community projects and budget allocation for 2026.",
    date: "Feb 26, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center - Main Hall",
    category: "Meeting",
    organizer: { name: "Community Admin", avatar: "CA" },
    attendees: 124,
    maxAttendees: 200,
    isAttending: true,
  },
  {
    id: 3,
    title: "Neighborhood Watch Training",
    description: "Learn best practices for community safety and emergency response.",
    date: "Feb 28, 2026",
    time: "7:00 PM - 9:00 PM",
    location: "Police Station Conference Room",
    category: "Safety",
    organizer: { name: "Safety Committee", avatar: "SC" },
    attendees: 32,
    maxAttendees: 40,
    isAttending: false,
  },
  {
    id: 4,
    title: "Community BBQ",
    description: "Family-friendly event with food, games, and live music. All are welcome!",
    date: "Mar 1, 2026",
    time: "12:00 PM - 4:00 PM",
    location: "Central Park",
    category: "Social",
    organizer: { name: "Michael Chen", avatar: "MC" },
    attendees: 156,
    maxAttendees: 250,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    isAttending: true,
  },
  {
    id: 5,
    title: "Yoga in the Park",
    description: "Free morning yoga session for all skill levels. Bring your own mat!",
    date: "Mar 3, 2026",
    time: "8:00 AM - 9:00 AM",
    location: "Central Park Lawn",
    category: "Wellness",
    organizer: { name: "Sarah Johnson", avatar: "SJ" },
    attendees: 28,
    maxAttendees: 50,
    isAttending: false,
  },
  {
    id: 6,
    title: "Kids' Art Workshop",
    description: "Creative art activities for children ages 5-12. Materials provided.",
    date: "Mar 5, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "Community Center - Art Room",
    category: "Education",
    organizer: { name: "David Kim", avatar: "DK" },
    attendees: 22,
    maxAttendees: 30,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600",
    isAttending: false,
  },
];

const categoryColors: Record<string, string> = {
  Environment: "bg-success text-success-foreground",
  Meeting: "bg-primary text-primary-foreground",
  Safety: "bg-accent text-accent-foreground",
  Social: "bg-secondary text-secondary-foreground",
  Wellness: "bg-info text-info-foreground",
  Education: "bg-warning text-warning-foreground",
};

export function EventsPage() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Event created successfully!");
    setIsCreateEventOpen(false);
  };

  const handleRSVP = (eventId: number) => {
    toast.success("RSVP confirmed! See you there!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Events</h1>
          <p className="text-muted-foreground">Discover and join community gatherings</p>
        </div>
        <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create an Event</DialogTitle>
              <DialogDescription>
                Organize a community event or gathering
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  placeholder="Give your event a catchy name"
                  className="bg-input-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDescription">Description</Label>
                <Textarea
                  id="eventDescription"
                  placeholder="Describe your event"
                  rows={4}
                  className="bg-input-background resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-input-background">
                        <CalendarIcon className="mr-2 size-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventTime">Time</Label>
                  <Input
                    id="eventTime"
                    type="text"
                    placeholder="e.g., 6:00 PM - 8:00 PM"
                    className="bg-input-background"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventLocation">Location</Label>
                <Input
                  id="eventLocation"
                  placeholder="Where will the event take place?"
                  className="bg-input-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Maximum Attendees (Optional)</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  placeholder="Leave blank for unlimited"
                  className="bg-input-background"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Create Event</Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">February 2026</h3>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="size-8">
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="size-8">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-semibold text-sm">Upcoming This Week</h4>
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-start gap-2 text-sm">
                    <div className="size-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-muted-foreground text-xs">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="lg:col-span-2 space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full md:w-40 h-40 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{event.title}</h3>
                        <Badge className={categoryColors[event.category]} variant="secondary">
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="size-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="size-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarImage src="" alt={event.organizer.name} />
                            <AvatarFallback className="text-xs">{event.organizer.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{event.organizer.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="size-4" />
                          <span>{event.attendees}</span>
                          {event.maxAttendees && <span>/ {event.maxAttendees}</span>}
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant={event.isAttending ? "outline" : "default"}
                            onClick={() => setSelectedEvent(event)}
                          >
                            {event.isAttending ? "Attending" : "RSVP"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{selectedEvent?.title}</DialogTitle>
                            <DialogDescription>{selectedEvent?.description}</DialogDescription>
                          </DialogHeader>
                          {selectedEvent?.image && (
                            <img
                              src={selectedEvent.image}
                              alt={selectedEvent.title}
                              className="w-full h-64 rounded-lg object-cover"
                            />
                          )}
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <CalendarIcon className="size-4" />
                                  <span className="text-sm">Date</span>
                                </div>
                                <p className="font-medium">{selectedEvent?.date}</p>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="size-4" />
                                  <span className="text-sm">Time</span>
                                </div>
                                <p className="font-medium">{selectedEvent?.time}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="size-4" />
                                <span className="text-sm">Location</span>
                              </div>
                              <p className="font-medium">{selectedEvent?.location}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="size-4" />
                                <span className="text-sm">Attendees</span>
                              </div>
                              <p className="font-medium">
                                {selectedEvent?.attendees} people attending
                                {selectedEvent?.maxAttendees && ` (${selectedEvent.maxAttendees} max)`}
                              </p>
                            </div>
                            {!selectedEvent?.isAttending && (
                              <Button
                                className="w-full"
                                onClick={() => selectedEvent && handleRSVP(selectedEvent.id)}
                              >
                                Confirm RSVP
                              </Button>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
