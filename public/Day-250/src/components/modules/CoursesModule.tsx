import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { BookOpen, Clock, Users, Star, Plus, Edit, Eye, Archive, Video, FileText, Calendar } from 'lucide-react';

const coursesData = [
  {
    id: 1,
    title: 'Advanced Cardiology',
    duration: '8 weeks',
    mode: 'Hybrid',
    totalSessions: 16,
    traineesEnrolled: 24,
    assignedTrainers: ['Dr. Ahmed Hassan', 'Dr. Sarah Khan'],
    objectives: 'Master advanced cardiac diagnosis and treatment procedures',
    curriculum: ['ECG Interpretation', 'Cardiac Catheterization', 'Heart Surgery Basics', 'Emergency Cardiology'],
    rating: 4.8,
    status: 'Active',
    startDate: '2024-02-01',
    endDate: '2024-03-29',
    materials: 12,
    completionRate: 85
  },
  {
    id: 2,
    title: 'Emergency Medicine',
    duration: '6 weeks',
    mode: 'On-site',
    totalSessions: 18,
    traineesEnrolled: 18,
    assignedTrainers: ['Dr. Fatima Sheikh', 'Dr. Omar Malik'],
    objectives: 'Develop critical emergency response and trauma care skills',
    curriculum: ['Trauma Assessment', 'Emergency Procedures', 'Critical Care', 'Emergency Pharmacology'],
    rating: 4.6,
    status: 'Active',
    startDate: '2024-02-15',
    endDate: '2024-03-29',
    materials: 8,
    completionRate: 78
  },
  {
    id: 3,
    title: 'Pediatric Care',
    duration: '10 weeks',
    mode: 'Online',
    totalSessions: 20,
    traineesEnrolled: 32,
    assignedTrainers: ['Dr. Hassan Raza', 'Dr. Aisha Malik'],
    objectives: 'Comprehensive pediatric healthcare and development knowledge',
    curriculum: ['Child Development', 'Pediatric Diseases', 'Vaccination Protocols', 'Family Counseling'],
    rating: 4.9,
    status: 'Completed',
    startDate: '2023-12-01',
    endDate: '2024-02-10',
    materials: 15,
    completionRate: 95
  },
  {
    id: 4,
    title: 'Basic Surgery',
    duration: '12 weeks',
    mode: 'Hybrid',
    totalSessions: 24,
    traineesEnrolled: 16,
    assignedTrainers: ['Dr. Ayesha Malik'],
    objectives: 'Foundation surgical skills and operating room procedures',
    curriculum: ['Surgical Anatomy', 'Sterile Techniques', 'Basic Procedures', 'Post-op Care'],
    rating: 4.4,
    status: 'Planning',
    startDate: '2024-04-01',
    endDate: '2024-06-24',
    materials: 10,
    completionRate: 0
  }
];

const trainers = [
  'Dr. Ahmed Hassan',
  'Dr. Fatima Sheikh',
  'Dr. Hassan Raza',
  'Dr. Ayesha Malik',
  'Dr. Sarah Khan',
  'Dr. Omar Malik'
];

export function CoursesModule() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isCourseDetailsOpen, setIsCourseDetailsOpen] = useState(false);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    duration: '',
    mode: '',
    objectives: '',
    totalSessions: '',
    assignedTrainer: ''
  });

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setIsCourseDetailsOpen(true);
  };

  const handleAddCourse = () => {
    console.log('Adding course:', newCourse);
    setIsAddCourseOpen(false);
    setNewCourse({
      title: '',
      duration: '',
      mode: '',
      objectives: '',
      totalSessions: '',
      assignedTrainer: ''
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'Planning':
        return <Badge className="bg-orange-100 text-orange-800">Planning</Badge>;
      case 'Archived':
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getModeBadge = (mode: string) => {
    const colors = {
      'On-site': 'bg-purple-100 text-purple-800',
      'Online': 'bg-green-100 text-green-800',
      'Hybrid': 'bg-blue-100 text-blue-800'
    };
    return <Badge className={colors[mode as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{mode}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Medical Training Courses</h2>
          <p className="text-gray-600">Manage training programs and curriculum across your consultancy network</p>
        </div>
        <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Training Course</DialogTitle>
              <DialogDescription>
                Design a new medical training program for your consultancy network.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="e.g., Advanced Cardiology"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    placeholder="e.g., 8 weeks"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mode">Training Mode</Label>
                  <Select value={newCourse.mode} onValueChange={(value) => setNewCourse({ ...newCourse, mode: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sessions">Total Sessions</Label>
                  <Input
                    id="sessions"
                    type="number"
                    value={newCourse.totalSessions}
                    onChange={(e) => setNewCourse({ ...newCourse, totalSessions: e.target.value })}
                    placeholder="Number of sessions"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="objectives">Course Objectives</Label>
                <Textarea
                  id="objectives"
                  value={newCourse.objectives}
                  onChange={(e) => setNewCourse({ ...newCourse, objectives: e.target.value })}
                  placeholder="Describe the main learning objectives..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="trainer">Assign Trainer</Label>
                <Select value={newCourse.assignedTrainer} onValueChange={(value) => setNewCourse({ ...newCourse, assignedTrainer: value })}>
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
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleAddCourse} className="bg-teal-600 hover:bg-teal-700">
                  Create Course
                </Button>
                <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-2xl text-gray-900">{coursesData.length}</p>
                <p className="text-sm text-blue-600">Available programs</p>
              </div>
              <BookOpen className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-2xl text-gray-900">{coursesData.filter(c => c.status === 'Active').length}</p>
                <p className="text-sm text-green-600">Currently running</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Enrollments</p>
                <p className="text-2xl text-gray-900">{coursesData.reduce((sum, course) => sum + course.traineesEnrolled, 0)}</p>
                <p className="text-sm text-purple-600">Across all courses</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl text-gray-900">{(coursesData.reduce((sum, course) => sum + course.rating, 0) / coursesData.length).toFixed(1)}</p>
                <p className="text-sm text-orange-600">Course satisfaction</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Catalog */}
      <Card>
        <CardHeader>
          <CardTitle>Course Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Trainers</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coursesData.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{course.title}</p>
                      <p className="text-sm text-gray-500">{course.totalSessions} sessions</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{course.duration}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getModeBadge(course.mode)}</TableCell>
                  <TableCell>
                    <div className="text-center">
                      <p className="text-gray-900">{course.traineesEnrolled}</p>
                      <p className="text-xs text-gray-500">enrolled</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {course.assignedTrainers.map((trainer, index) => (
                        <div key={index} className="text-xs text-gray-600">{trainer}</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900">{course.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(course)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Course Details Dialog */}
      <Dialog open={isCourseDetailsOpen} onOpenChange={setIsCourseDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.title} - Course Details</DialogTitle>
            <DialogDescription>
              Comprehensive course information, curriculum, and performance metrics.
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-6">
              {/* Course Overview */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Course Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Duration</Label>
                    <p className="text-gray-900">{selectedCourse.duration}</p>
                  </div>
                  <div>
                    <Label>Training Mode</Label>
                    <div className="mt-1">{getModeBadge(selectedCourse.mode)}</div>
                  </div>
                  <div>
                    <Label>Total Sessions</Label>
                    <p className="text-gray-900">{selectedCourse.totalSessions}</p>
                  </div>
                  <div>
                    <Label>Course Rating</Label>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900">{selectedCourse.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Learning Objectives</h3>
                <p className="text-gray-700">{selectedCourse.objectives}</p>
              </div>

              {/* Curriculum */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Curriculum Modules</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCourse.curriculum?.map((module: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <BookOpen className="h-4 w-4 text-teal-600" />
                      <span className="text-gray-900">{module}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedCourse.traineesEnrolled}</p>
                    <p className="text-sm text-gray-600">Enrolled Trainees</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedCourse.completionRate}%</p>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedCourse.materials}</p>
                    <p className="text-sm text-gray-600">Learning Materials</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedCourse.assignedTrainers.length}</p>
                    <p className="text-sm text-gray-600">Assigned Trainers</p>
                  </div>
                </div>
              </div>

              {/* Materials & Resources */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Course Materials</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Video className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-900">Video Lectures</p>
                      <p className="text-xs text-gray-500">8 videos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-900">Reading Materials</p>
                      <p className="text-xs text-gray-500">12 documents</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-900">Assessments</p>
                      <p className="text-xs text-gray-500">4 quizzes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Assign Trainer
                </Button>
                <Button variant="outline">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Course
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}