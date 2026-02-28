import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Calendar, Clock, MapPin, Users, BookOpen, Plus, Edit, Trash2, Filter, ChevronLeft, ChevronRight, User } from 'lucide-react';

const calendarData = [
  {
    id: 1,
    title: 'Advanced Cardiology - Module 3',
    course: 'Advanced Cardiology',
    trainer: 'Dr. Ahmed Hassan',
    branch: 'Downtown Medical Center',
    date: '2024-01-28',
    time: '09:00 - 11:00',
    attendees: 24,
    type: 'Lecture',
    status: 'Scheduled'
  },
  {
    id: 2,
    title: 'Emergency Medicine - Practical',
    course: 'Emergency Medicine',
    trainer: 'Dr. Fatima Sheikh',
    branch: 'City General Hospital',
    date: '2024-01-28',
    time: '14:00 - 16:00',
    attendees: 18,
    type: 'Practical',
    status: 'Scheduled'
  },
  {
    id: 3,
    title: 'Pediatric Care - Assessment',
    course: 'Pediatric Care',
    trainer: 'Dr. Hassan Raza',
    branch: 'Capital Health Center',
    date: '2024-01-29',
    time: '10:00 - 12:00',
    attendees: 32,
    type: 'Assessment',
    status: 'Completed'
  },
  {
    id: 4,
    title: 'Basic Surgery - OR Training',
    course: 'Basic Surgery',
    trainer: 'Dr. Ayesha Malik',
    branch: 'Regional Medical Complex',
    date: '2024-01-29',
    time: '13:00 - 17:00',
    attendees: 16,
    type: 'Practical',
    status: 'Cancelled'
  },
  {
    id: 5,
    title: 'Advanced Cardiology - Case Studies',
    course: 'Advanced Cardiology',
    trainer: 'Dr. Ahmed Hassan',
    branch: 'Downtown Medical Center',
    date: '2024-01-30',
    time: '11:00 - 13:00',
    attendees: 24,
    type: 'Workshop',
    status: 'Scheduled'
  }
];

const upcomingSessions = [
  {
    id: 1,
    title: 'Emergency Medicine Simulation',
    date: 'Today',
    time: '09:00 AM',
    trainer: 'Dr. Fatima Sheikh',
    trainees: 18,
    location: 'City General Hospital - Room 203'
  },
  {
    id: 2,
    title: 'Cardiology Case Review',
    date: 'Tomorrow',
    time: '02:00 PM',
    trainer: 'Dr. Ahmed Hassan',
    trainees: 24,
    location: 'Downtown Medical Center - Conference Hall'
  },
  {
    id: 3,
    title: 'Pediatric Assessment',
    date: 'Jan 30',
    time: '10:00 AM',
    trainer: 'Dr. Hassan Raza',
    trainees: 32,
    location: 'Capital Health Center - Training Room A'
  },
  {
    id: 4,
    title: 'Surgery Practical Session',
    date: 'Jan 31',
    time: '01:00 PM',
    trainer: 'Dr. Ayesha Malik',
    trainees: 16,
    location: 'Regional Medical Complex - OR Simulation'
  }
];

const trainers = [
  'Dr. Ahmed Hassan',
  'Dr. Fatima Sheikh',
  'Dr. Hassan Raza',
  'Dr. Ayesha Malik'
];

const branches = [
  'Downtown Medical Center',
  'City General Hospital',
  'Capital Health Center',
  'Regional Medical Complex'
];

const courses = [
  'Advanced Cardiology',
  'Emergency Medicine',
  'Pediatric Care',
  'Basic Surgery'
];

export function ScheduleModule() {
  const [selectedDate, setSelectedDate] = useState('2024-01-28');
  const [viewMode, setViewMode] = useState('week');
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterTrainer, setFilterTrainer] = useState('all');
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    course: '',
    trainer: '',
    branch: '',
    date: '',
    startTime: '',
    endTime: '',
    type: '',
    maxAttendees: ''
  });

  const handleAddSession = () => {
    console.log('Adding session:', newSession);
    setIsAddSessionOpen(false);
    setNewSession({
      title: '',
      course: '',
      trainer: '',
      branch: '',
      date: '',
      startTime: '',
      endTime: '',
      type: '',
      maxAttendees: ''
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return <Badge className="bg-green-100 text-green-800">Scheduled</Badge>;
      case 'Completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'In Progress':
        return <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Lecture': 'bg-blue-100 text-blue-800',
      'Practical': 'bg-green-100 text-green-800',
      'Assessment': 'bg-purple-100 text-purple-800',
      'Workshop': 'bg-orange-100 text-orange-800'
    };
    return <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{type}</Badge>;
  };

  const filteredSessions = calendarData.filter(session => {
    const branchMatch = filterBranch === 'all' || session.branch === filterBranch;
    const trainerMatch = filterTrainer === 'all' || session.trainer === filterTrainer;
    return branchMatch && trainerMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Training Schedule</h2>
          <p className="text-gray-600">Manage sessions, trainer availability, and course timelines</p>
        </div>
        <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Training Session</DialogTitle>
              <DialogDescription>
                Create a new training session and assign resources.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    value={newSession.title}
                    onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                    placeholder="e.g., Cardiology Module 1"
                  />
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select value={newSession.course} onValueChange={(value) => setNewSession({ ...newSession, course: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="trainer">Trainer</Label>
                  <Select value={newSession.trainer} onValueChange={(value) => setNewSession({ ...newSession, trainer: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map(trainer => (
                        <SelectItem key={trainer} value={trainer}>{trainer}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={newSession.branch} onValueChange={(value) => setNewSession({ ...newSession, branch: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map(branch => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newSession.startTime}
                    onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newSession.endTime}
                    onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Session Type</Label>
                  <Select value={newSession.type} onValueChange={(value) => setNewSession({ ...newSession, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lecture">Lecture</SelectItem>
                      <SelectItem value="Practical">Practical</SelectItem>
                      <SelectItem value="Assessment">Assessment</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxAttendees">Max Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={newSession.maxAttendees}
                    onChange={(e) => setNewSession({ ...newSession, maxAttendees: e.target.value })}
                    placeholder="30"
                  />
                </div>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleAddSession} className="bg-teal-600 hover:bg-teal-700">
                  Schedule Session
                </Button>
                <Button variant="outline" onClick={() => setIsAddSessionOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Schedule Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Sessions</p>
                <p className="text-2xl text-gray-900">4</p>
                <p className="text-sm text-green-600">2 completed</p>
              </div>
              <Calendar className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl text-gray-900">18</p>
                <p className="text-sm text-blue-600">Total sessions</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Trainers</p>
                <p className="text-2xl text-gray-900">12</p>
                <p className="text-sm text-purple-600">Teaching today</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilization</p>
                <p className="text-2xl text-gray-900">85%</p>
                <p className="text-sm text-orange-600">Room capacity</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View Controls and Filters */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Training Calendar</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">January 2024</span>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Filter by:</span>
              </div>
              <Select value={filterBranch} onValueChange={setFilterBranch}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterTrainer} onValueChange={setFilterTrainer}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Trainer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trainers</SelectItem>
                  {trainers.map(trainer => (
                    <SelectItem key={trainer} value={trainer}>{trainer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <div key={session.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-gray-900">{session.title}</h4>
                        {getTypeBadge(session.type)}
                        {getStatusBadge(session.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{session.trainer}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{session.branch}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{session.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm text-gray-900">{session.title}</h4>
                      <Badge variant="outline" className="text-xs">{session.date}</Badge>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{session.trainer}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{session.trainees} trainees</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">{session.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Sessions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-sm text-gray-600 mb-2">{day}</div>
                <div className="space-y-1">
                  {index < 5 && (
                    <div className="bg-teal-100 text-teal-800 text-xs p-1 rounded">
                      3 sessions
                    </div>
                  )}
                  {index === 5 && (
                    <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">
                      2 sessions
                    </div>
                  )}
                  {index === 6 && (
                    <div className="bg-gray-100 text-gray-600 text-xs p-1 rounded">
                      No sessions
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}