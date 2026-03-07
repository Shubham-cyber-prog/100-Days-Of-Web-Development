import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Video, Users, Clock, Calendar, Bell } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function LiveClasses() {
  const upcomingClasses = [
    { 
      title: 'Advanced React Patterns Workshop',
      instructor: 'Michael Chen',
      date: 'Mar 8, 2026',
      time: '2:00 PM - 4:00 PM EST',
      attendees: 45,
      status: 'upcoming',
      image: '1517694712202-28599e57e1b0'
    },
    { 
      title: 'UI/UX Design Critique Session',
      instructor: 'Emma Davis',
      date: 'Mar 10, 2026',
      time: '3:00 PM - 4:30 PM EST',
      attendees: 32,
      status: 'upcoming',
      image: '1561070791-2526d30994b5'
    },
  ];
  
  const liveNow = {
    title: 'Web Development Q&A Session',
    instructor: 'Sarah Johnson',
    attendees: 67,
    duration: '45 min remaining',
    image: '1498050108023-1c05d9a834a0'
  };
  
  const recordings = [
    { title: 'JavaScript Fundamentals', instructor: 'John Smith', date: 'Feb 28', duration: '1h 45m', views: 234 },
    { title: 'React Hooks Deep Dive', instructor: 'Michael Chen', date: 'Feb 25', duration: '2h 15m', views: 189 },
    { title: 'CSS Grid & Flexbox', instructor: 'Sarah Johnson', date: 'Feb 22', duration: '1h 30m', views: 156 },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Live Classes</h1>
        <p className="text-gray-600">Join interactive sessions with instructors and peers</p>
      </div>
      
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="success" className="animate-pulse">LIVE NOW</Badge>
            <span className="text-sm text-gray-600">{liveNow.duration}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ImageWithFallback 
                src={`https://images.unsplash.com/photo-${liveNow.image}?w=600&h=300&fit=crop`}
                alt={liveNow.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-3">{liveNow.title}</h2>
              <p className="text-gray-600 mb-4">with {liveNow.instructor}</p>
              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{liveNow.attendees} attending</span>
                </div>
              </div>
              <Button variant="primary" className="w-full lg:w-auto">
                <Video className="w-5 h-5" />
                Join Class Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="mb-4">Upcoming Classes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingClasses.map((classItem) => (
            <Card key={classItem.title} hover>
              <ImageWithFallback 
                src={`https://images.unsplash.com/photo-${classItem.image}?w=600&h=200&fit=crop`}
                alt={classItem.title}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <CardContent className="p-5">
                <h3 className="mb-2">{classItem.title}</h3>
                <p className="text-sm text-gray-600 mb-4">by {classItem.instructor}</p>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{classItem.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{classItem.attendees} registered</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1">Register</Button>
                  <Button variant="secondary" size="sm">
                    <Bell className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <h2>Class Recordings</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recordings.map((recording) => (
              <div key={recording.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="mb-1">{recording.title}</h4>
                    <p className="text-sm text-gray-600">{recording.instructor} • {recording.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span>{recording.duration}</span>
                  <span>{recording.views} views</span>
                  <Button variant="primary" size="sm">Watch</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
