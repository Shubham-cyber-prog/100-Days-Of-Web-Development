import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  UserCheck, 
  UserX, 
  Users, 
  Calendar as CalendarIcon,
  Search,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '../ui/utils';
import { format } from 'date-fns';

interface AttendanceRecord {
  id: string;
  traineeName: string;
  course: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  session: string;
  duration: string;
}

interface TraineeAttendanceStats {
  traineeName: string;
  totalSessions: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}

const sampleAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    traineeName: 'Dr. Ali Hassan',
    course: 'Advanced Cardiology',
    date: '2024-03-05',
    status: 'present',
    session: 'Morning Session',
    duration: '3 hours'
  },
  {
    id: '2',
    traineeName: 'Dr. Fatima Khan',
    course: 'Advanced Cardiology',
    date: '2024-03-05',
    status: 'present',
    session: 'Morning Session',
    duration: '3 hours'
  },
  {
    id: '3',
    traineeName: 'Dr. Ahmed Raza',
    course: 'Advanced Cardiology',
    date: '2024-03-05',
    status: 'late',
    session: 'Morning Session',
    duration: '3 hours'
  },
  {
    id: '4',
    traineeName: 'Dr. Sarah Ali',
    course: 'Emergency Medicine',
    date: '2024-03-05',
    status: 'absent',
    session: 'Afternoon Session',
    duration: '4 hours'
  },
  {
    id: '5',
    traineeName: 'Dr. Imran Malik',
    course: 'Emergency Medicine',
    date: '2024-03-05',
    status: 'present',
    session: 'Afternoon Session',
    duration: '4 hours'
  },
];

const traineeStats: TraineeAttendanceStats[] = [
  {
    traineeName: 'Dr. Ali Hassan',
    totalSessions: 24,
    present: 22,
    absent: 1,
    late: 1,
    excused: 0,
    attendanceRate: 91.7
  },
  {
    traineeName: 'Dr. Fatima Khan',
    totalSessions: 24,
    present: 24,
    absent: 0,
    late: 0,
    excused: 0,
    attendanceRate: 100
  },
  {
    traineeName: 'Dr. Ahmed Raza',
    totalSessions: 24,
    present: 20,
    absent: 2,
    late: 2,
    excused: 0,
    attendanceRate: 83.3
  },
  {
    traineeName: 'Dr. Sarah Ali',
    totalSessions: 22,
    present: 16,
    absent: 4,
    late: 1,
    excused: 1,
    attendanceRate: 72.7
  },
  {
    traineeName: 'Dr. Imran Malik',
    totalSessions: 22,
    present: 21,
    absent: 0,
    late: 1,
    excused: 0,
    attendanceRate: 95.5
  },
];

export function AttendanceTrackingModule() {
  const [attendanceRecords] = useState<AttendanceRecord[]>(sampleAttendanceRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [date, setDate] = useState<Date>();

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.traineeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === 'all' || record.course === courseFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'absent': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'excused': return <UserCheck className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const calculateStats = () => {
    const total = attendanceRecords.length;
    const present = attendanceRecords.filter(r => r.status === 'present').length;
    const absent = attendanceRecords.filter(r => r.status === 'absent').length;
    const late = attendanceRecords.filter(r => r.status === 'late').length;
    const excused = attendanceRecords.filter(r => r.status === 'excused').length;
    const attendanceRate = total > 0 ? ((present + late) / total * 100).toFixed(1) : 0;

    return { total, present, absent, late, excused, attendanceRate };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Attendance Tracking</h1>
          <p className="text-sm text-gray-600 mt-1">Monitor trainee attendance and participation</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <UserCheck className="h-4 w-4 mr-2" />
          Mark Attendance
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl text-gray-900">{stats.present}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-2xl text-gray-900">{stats.absent}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Late/Excused</p>
                <p className="text-2xl text-gray-900">{stats.late + stats.excused}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Rate</p>
                <p className="text-2xl text-gray-900">{stats.attendanceRate}%</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="records" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
          <TabsTrigger value="statistics">Trainee Statistics</TabsTrigger>
        </TabsList>

        {/* Attendance Records Tab */}
        <TabsContent value="records" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by trainee name or course..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="Advanced Cardiology">Advanced Cardiology</SelectItem>
                    <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                    <SelectItem value="Pediatric Care">Pediatric Care</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                    <SelectItem value="excused">Excused</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-56">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Trainee Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>{record.traineeName}</TableCell>
                      <TableCell>{record.course}</TableCell>
                      <TableCell>{record.session}</TableCell>
                      <TableCell>{record.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(record.status)}
                          <Badge className={getStatusColor(record.status)}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trainee Statistics Tab */}
        <TabsContent value="statistics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trainee Attendance Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trainee Name</TableHead>
                    <TableHead className="text-center">Total Sessions</TableHead>
                    <TableHead className="text-center">Present</TableHead>
                    <TableHead className="text-center">Absent</TableHead>
                    <TableHead className="text-center">Late</TableHead>
                    <TableHead className="text-center">Excused</TableHead>
                    <TableHead className="text-center">Attendance Rate</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {traineeStats.map((stat, index) => (
                    <TableRow key={index}>
                      <TableCell>{stat.traineeName}</TableCell>
                      <TableCell className="text-center">{stat.totalSessions}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-green-100 text-green-800">{stat.present}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-red-100 text-red-800">{stat.absent}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-yellow-100 text-yellow-800">{stat.late}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-blue-100 text-blue-800">{stat.excused}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-gray-900">{stat.attendanceRate}%</span>
                      </TableCell>
                      <TableCell className="text-center">
                        {stat.attendanceRate >= 90 ? (
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        ) : stat.attendanceRate >= 80 ? (
                          <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                        ) : stat.attendanceRate >= 70 ? (
                          <Badge className="bg-yellow-100 text-yellow-800">Fair</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Poor</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Attendance Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                Attendance Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {traineeStats
                  .filter(stat => stat.attendanceRate < 80)
                  .map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="text-sm text-gray-900">{stat.traineeName}</p>
                          <p className="text-xs text-gray-600">
                            Attendance rate below threshold: {stat.attendanceRate}%
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                    </div>
                  ))}
                {traineeStats.filter(stat => stat.attendanceRate < 80).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-600" />
                    <p>No attendance alerts at this time</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}