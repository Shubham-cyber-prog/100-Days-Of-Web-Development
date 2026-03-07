import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ChevronLeft, ChevronRight, Video, FileText, Calendar as CalendarIcon } from 'lucide-react';

export function CalendarView() {
  const [currentDate] = useState(new Date(2026, 2, 6)); // March 6, 2026
  
  const events = [
    { date: 6, type: 'assignment', title: 'React Assignment Due', course: 'Advanced React', time: '11:59 PM' },
    { date: 8, type: 'live', title: 'Live Q&A Session', course: 'Web Development', time: '2:00 PM' },
    { date: 10, type: 'quiz', title: 'JavaScript Quiz', course: 'Web Development', time: '10:00 AM' },
    { date: 12, type: 'assignment', title: 'Design Project', course: 'UI/UX Design', time: '11:59 PM' },
    { date: 15, type: 'live', title: 'Workshop: React Hooks', course: 'Advanced React', time: '3:00 PM' },
  ];
  
  const upcomingEvents = [
    { title: 'React Assignment Due', course: 'Advanced React', date: 'Today', time: '11:59 PM', type: 'assignment' },
    { title: 'Live Q&A Session', course: 'Web Development', date: 'Mar 8', time: '2:00 PM', type: 'live' },
    { title: 'JavaScript Quiz', course: 'Web Development', date: 'Mar 10', time: '10:00 AM', type: 'quiz' },
  ];
  
  const daysInMonth = 31;
  const firstDay = 6; // March 1, 2026 is Saturday
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Calendar</h1>
        <p className="text-gray-600">Manage your course schedule and deadlines</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2>March 2026</h2>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = events.filter(e => e.date === day);
                  const isToday = day === 6;
                  
                  return (
                    <div
                      key={day}
                      className={`aspect-square p-2 rounded-xl border transition-all cursor-pointer ${
                        isToday 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : dayEvents.length > 0 
                            ? 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50' 
                            : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`text-sm mb-1 ${isToday ? 'text-indigo-600 font-medium' : ''}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <div 
                            key={idx}
                            className={`h-1 rounded-full ${
                              event.type === 'assignment' ? 'bg-yellow-500' :
                              event.type === 'live' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-gray-600">Assignments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-600">Live Classes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-gray-600">Quizzes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3>Upcoming Events</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => {
                  const Icon = event.type === 'live' ? Video : event.type === 'quiz' ? FileText : CalendarIcon;
                  const color = event.type === 'assignment' ? 'bg-yellow-100 text-yellow-600' :
                                event.type === 'live' ? 'bg-green-100 text-green-600' :
                                'bg-blue-100 text-blue-600';
                  
                  return (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-600">{event.course}</p>
                          <p className="text-xs text-gray-500 mt-1">{event.date} at {event.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3>This Week</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Classes Attended</span>
                  <span>8/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Assignments Due</span>
                  <Badge variant="warning">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Study Hours</span>
                  <span>12.5h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
