import { DashboardCard } from '../components/DashboardCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Annual Tech Fest 2026',
    date: 'Mar 15, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'Main Auditorium',
    attendees: 500,
    category: 'Technology',
    description: 'Join us for the biggest tech event of the year featuring workshops, competitions, and guest speakers.',
    registered: false,
  },
  {
    id: 2,
    title: 'Career Fair - Spring 2026',
    date: 'Feb 25, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Sports Complex',
    attendees: 300,
    category: 'Career',
    description: 'Meet with top employers and explore internship and job opportunities.',
    registered: true,
  },
  {
    id: 3,
    title: 'Cultural Night',
    date: 'Mar 8, 2026',
    time: '6:00 PM - 10:00 PM',
    location: 'Open Air Theatre',
    attendees: 800,
    category: 'Cultural',
    description: 'Celebrate diversity with performances, food, and entertainment from around the world.',
    registered: false,
  },
  {
    id: 4,
    title: 'AI & Machine Learning Workshop',
    date: 'Feb 28, 2026',
    time: '2:00 PM - 5:00 PM',
    location: 'Computer Lab 3',
    attendees: 50,
    category: 'Workshop',
    description: 'Hands-on workshop on machine learning fundamentals and practical applications.',
    registered: true,
  },
  {
    id: 5,
    title: 'Inter-College Sports Meet',
    date: 'Mar 20, 2026',
    time: '8:00 AM - 6:00 PM',
    location: 'Stadium',
    attendees: 1000,
    category: 'Sports',
    description: 'Annual sports competition featuring cricket, football, basketball, and athletics.',
    registered: false,
  },
  {
    id: 6,
    title: 'Entrepreneurship Summit',
    date: 'Mar 5, 2026',
    time: '11:00 AM - 3:00 PM',
    location: 'Conference Hall',
    attendees: 200,
    category: 'Business',
    description: 'Learn from successful entrepreneurs and network with like-minded students.',
    registered: false,
  },
];

const categories = ['All', 'Technology', 'Career', 'Cultural', 'Workshop', 'Sports', 'Business'];

export function Events() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-secondary mb-2">Campus Events</h1>
          <p className="text-muted-foreground">Discover and register for upcoming events</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              className={category === 'All' ? 'bg-primary hover:bg-primary/90 rounded-xl' : 'rounded-xl'}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-primary/40" />
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {event.category}
                </Badge>
                {event.registered && (
                  <Badge className="bg-accent hover:bg-accent text-xs">
                    Registered
                  </Badge>
                )}
              </div>

              <h3 className="text-secondary mb-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>

              <Button
                className={`w-full rounded-xl ${
                  event.registered
                    ? 'bg-muted hover:bg-muted text-muted-foreground'
                    : 'bg-primary hover:bg-primary/90'
                }`}
                disabled={event.registered}
              >
                {event.registered ? 'Already Registered' : 'Register Now'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}