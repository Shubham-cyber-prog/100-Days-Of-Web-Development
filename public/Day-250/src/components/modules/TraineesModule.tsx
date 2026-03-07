import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Progress } from '../ui/progress';
import { GraduationCap, User, MapPin, BookOpen, Award, Plus, Edit, Eye, UserCheck, Download, ArrowUpDown } from 'lucide-react';

const traineesData = [
  {
    id: 1,
    name: 'Dr. Aisha Khan',
    cnic: '12345-6789012-3',
    phone: '+92-300-1234567',
    email: 'aisha.khan@email.com',
    hospitalBranch: 'Downtown Medical Center',
    courseEnrolled: 'Advanced Cardiology',
    trainer: 'Dr. Ahmed Hassan',
    enrollmentDate: '2024-01-15',
    status: 'Active',
    progress: 75,
    completedModules: 6,
    totalModules: 8,
    certificatesEarned: 2
  },
  {
    id: 2,
    name: 'Dr. Muhammad Ali',
    cnic: '12345-6789012-4',
    phone: '+92-301-2345678',
    email: 'muhammad.ali@email.com',
    hospitalBranch: 'City General Hospital',
    courseEnrolled: 'Emergency Medicine',
    trainer: 'Dr. Fatima Sheikh',
    enrollmentDate: '2024-02-01',
    status: 'Active',
    progress: 60,
    completedModules: 4,
    totalModules: 8,
    certificatesEarned: 1
  },
  {
    id: 3,
    name: 'Dr. Fatima Malik',
    cnic: '12345-6789012-5',
    phone: '+92-302-3456789',
    email: 'fatima.malik@email.com',
    hospitalBranch: 'Capital Health Center',
    courseEnrolled: 'Pediatric Care',
    trainer: 'Dr. Hassan Raza',
    enrollmentDate: '2023-11-20',
    status: 'Completed',
    progress: 100,
    completedModules: 10,
    totalModules: 10,
    certificatesEarned: 3
  },
  {
    id: 4,
    name: 'Dr. Omar Sheikh',
    cnic: '12345-6789012-6',
    phone: '+92-303-4567890',
    email: 'omar.sheikh@email.com',
    hospitalBranch: 'Regional Medical Complex',
    courseEnrolled: 'Basic Surgery',
    trainer: 'Dr. Ayesha Malik',
    enrollmentDate: '2024-03-10',
    status: 'Dropped',
    progress: 25,
    completedModules: 2,
    totalModules: 8,
    certificatesEarned: 0
  }
];

const courses = [
  'Advanced Cardiology',
  'Emergency Medicine',
  'Pediatric Care',
  'Basic Surgery',
  'Diagnostic Imaging',
  'Internal Medicine',
  'Neurology Basics',
  'Orthopedic Care'
];

const branches = [
  'Downtown Medical Center',
  'City General Hospital',
  'Capital Health Center',
  'Regional Medical Complex'
];

export function TraineesModule() {
  const [selectedTrainee, setSelectedTrainee] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAssignCourseOpen, setIsAssignCourseOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBranch, setFilterBranch] = useState('all');

  const filteredTrainees = traineesData.filter(trainee => {
    const statusMatch = filterStatus === 'all' || trainee.status.toLowerCase() === filterStatus;
    const branchMatch = filterBranch === 'all' || trainee.hospitalBranch === filterBranch;
    return statusMatch && branchMatch;
  });

  const handleViewProfile = (trainee: any) => {
    setSelectedTrainee(trainee);
    setIsProfileOpen(true);
  };

  const handleAssignCourse = (trainee: any) => {
    setSelectedTrainee(trainee);
    setIsAssignCourseOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'Dropped':
        return <Badge className="bg-red-100 text-red-800">Dropped</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Medical Trainees</h2>
          <p className="text-gray-600">Track and manage enrolled medical trainees across all branches</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Trainee
        </Button>
      </div>

      {/* Trainee Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trainees</p>
                <p className="text-2xl text-gray-900">{traineesData.length}</p>
                <p className="text-sm text-blue-600">Enrolled</p>
              </div>
              <GraduationCap className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Training</p>
                <p className="text-2xl text-gray-900">{traineesData.filter(t => t.status === 'Active').length}</p>
                <p className="text-sm text-green-600">In progress</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl text-gray-900">{traineesData.filter(t => t.status === 'Completed').length}</p>
                <p className="text-sm text-blue-600">Graduated</p>
              </div>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl text-gray-900">{Math.round(traineesData.reduce((sum, t) => sum + t.progress, 0) / traineesData.length)}%</p>
                <p className="text-sm text-orange-600">Completion rate</p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Hospital Branch</Label>
              <Select value={filterBranch} onValueChange={setFilterBranch}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="mt-6">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trainees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trainee Directory ({filteredTrainees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trainee</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Trainer</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainees.map((trainee) => (
                <TableRow key={trainee.id}>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{trainee.name}</p>
                      <p className="text-sm text-gray-500">{trainee.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{trainee.hospitalBranch}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{trainee.courseEnrolled}</p>
                      <p className="text-sm text-gray-500">{trainee.completedModules}/{trainee.totalModules} modules</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{trainee.trainer}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{trainee.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(trainee.progress)}`} 
                          style={{ width: `${trainee.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(trainee.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewProfile(trainee)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleAssignCourse(trainee)}>
                        <BookOpen className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Trainee Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedTrainee?.name} - Profile</DialogTitle>
            <DialogDescription>
              Comprehensive trainee information and training history.
            </DialogDescription>
          </DialogHeader>
          {selectedTrainee && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <p className="text-gray-900">{selectedTrainee.name}</p>
                  </div>
                  <div>
                    <Label>CNIC</Label>
                    <p className="text-gray-900">{selectedTrainee.cnic}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="text-gray-900">{selectedTrainee.phone}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-gray-900">{selectedTrainee.email}</p>
                  </div>
                </div>
              </div>

              {/* Training Information */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Training Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Hospital Branch</Label>
                    <p className="text-gray-900">{selectedTrainee.hospitalBranch}</p>
                  </div>
                  <div>
                    <Label>Current Course</Label>
                    <p className="text-gray-900">{selectedTrainee.courseEnrolled}</p>
                  </div>
                  <div>
                    <Label>Assigned Trainer</Label>
                    <p className="text-gray-900">{selectedTrainee.trainer}</p>
                  </div>
                  <div>
                    <Label>Enrollment Date</Label>
                    <p className="text-gray-900">{new Date(selectedTrainee.enrollmentDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Progress Overview</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedTrainee.progress}%</p>
                    <p className="text-sm text-gray-600">Overall Progress</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedTrainee.completedModules}/{selectedTrainee.totalModules}</p>
                    <p className="text-sm text-gray-600">Modules Completed</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedTrainee.certificatesEarned}</p>
                    <p className="text-sm text-gray-600">Certificates Earned</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificates
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Transfer Branch
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Course Dialog */}
      <Dialog open={isAssignCourseOpen} onOpenChange={setIsAssignCourseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Course to {selectedTrainee?.name}</DialogTitle>
            <DialogDescription>
              Select a new course to assign to this trainee.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select Course</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-teal-600 hover:bg-teal-700">Assign Course</Button>
              <Button variant="outline" onClick={() => setIsAssignCourseOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}