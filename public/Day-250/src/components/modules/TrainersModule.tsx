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
import { Users, Star, BookOpen, MapPin, Phone, Mail, Plus, Edit, Eye, Calendar, Award, FileText } from 'lucide-react';

const trainersData = [
  {
    id: 1,
    name: 'Dr. Ahmed Hassan',
    specialty: 'Cardiology',
    coursesHandled: ['Advanced Cardiology', 'Basic ECG Reading'],
    branchAssigned: 'Downtown Medical Center',
    rating: 4.8,
    phone: '+92-300-1111111',
    email: 'ahmed.hassan@hospital.com',
    qualifications: 'MBBS, MD Cardiology, FCPS',
    experience: '12 years',
    status: 'Active',
    totalTrainees: 45,
    completedCourses: 8,
    availability: 'Full-time'
  },
  {
    id: 2,
    name: 'Dr. Fatima Sheikh',
    specialty: 'Emergency Medicine',
    coursesHandled: ['Emergency Medicine', 'Trauma Care'],
    branchAssigned: 'City General Hospital',
    rating: 4.6,
    phone: '+92-301-2222222',
    email: 'fatima.sheikh@hospital.com',
    qualifications: 'MBBS, FCPS Emergency Medicine',
    experience: '8 years',
    status: 'Active',
    totalTrainees: 32,
    completedCourses: 6,
    availability: 'Part-time'
  },
  {
    id: 3,
    name: 'Dr. Hassan Raza',
    specialty: 'Pediatrics',
    coursesHandled: ['Pediatric Care', 'Child Development'],
    branchAssigned: 'Capital Health Center',
    rating: 4.9,
    phone: '+92-302-3333333',
    email: 'hassan.raza@hospital.com',
    qualifications: 'MBBS, FCPS Pediatrics, Diploma Child Health',
    experience: '15 years',
    status: 'Active',
    totalTrainees: 38,
    completedCourses: 12,
    availability: 'Full-time'
  },
  {
    id: 4,
    name: 'Dr. Ayesha Malik',
    specialty: 'Surgery',
    coursesHandled: ['Basic Surgery', 'Surgical Techniques'],
    branchAssigned: 'Regional Medical Complex',
    rating: 4.4,
    phone: '+92-303-4444444',
    email: 'ayesha.malik@hospital.com',
    qualifications: 'MBBS, MS Surgery, FCPS',
    experience: '10 years',
    status: 'On Leave',
    totalTrainees: 28,
    completedCourses: 5,
    availability: 'Unavailable'
  }
];

const specialties = [
  'Cardiology',
  'Emergency Medicine',
  'Pediatrics',
  'Surgery',
  'Internal Medicine',
  'Neurology',
  'Orthopedics',
  'Radiology',
  'Psychiatry',
  'Dermatology'
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
  'Basic Surgery',
  'Internal Medicine',
  'Diagnostic Imaging',
  'Neurology Basics',
  'Orthopedic Care'
];

export function TrainersModule() {
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAssignCourseOpen, setIsAssignCourseOpen] = useState(false);
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    specialty: '',
    phone: '',
    email: '',
    qualifications: '',
    experience: '',
    branchAssigned: ''
  });

  const handleViewProfile = (trainer: any) => {
    setSelectedTrainer(trainer);
    setIsProfileOpen(true);
  };

  const handleAssignCourse = (trainer: any) => {
    setSelectedTrainer(trainer);
    setIsAssignCourseOpen(true);
  };

  const handleAddTrainer = () => {
    console.log('Adding trainer:', newTrainer);
    setIsAddTrainerOpen(false);
    setNewTrainer({
      name: '',
      specialty: '',
      phone: '',
      email: '',
      qualifications: '',
      experience: '',
      branchAssigned: ''
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'On Leave':
        return <Badge className="bg-orange-100 text-orange-800">On Leave</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'Full-time':
        return <Badge className="bg-blue-100 text-blue-800">Full-time</Badge>;
      case 'Part-time':
        return <Badge className="bg-purple-100 text-purple-800">Part-time</Badge>;
      case 'Unavailable':
        return <Badge className="bg-red-100 text-red-800">Unavailable</Badge>;
      default:
        return <Badge>{availability}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Medical Trainers</h2>
          <p className="text-gray-600">Manage professionals delivering medical training across your network</p>
        </div>
        <Dialog open={isAddTrainerOpen} onOpenChange={setIsAddTrainerOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Trainer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Medical Trainer</DialogTitle>
              <DialogDescription>
                Register a new medical professional to join your training team.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newTrainer.name}
                    onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select value={newTrainer.specialty} onValueChange={(value) => setNewTrainer({ ...newTrainer, specialty: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newTrainer.phone}
                    onChange={(e) => setNewTrainer({ ...newTrainer, phone: e.target.value })}
                    placeholder="+92-XXX-XXXXXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newTrainer.email}
                    onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                    placeholder="trainer@hospital.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="qualifications">Qualifications</Label>
                <Input
                  id="qualifications"
                  value={newTrainer.qualifications}
                  onChange={(e) => setNewTrainer({ ...newTrainer, qualifications: e.target.value })}
                  placeholder="MBBS, FCPS, etc."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={newTrainer.experience}
                    onChange={(e) => setNewTrainer({ ...newTrainer, experience: e.target.value })}
                    placeholder="e.g., 10 years"
                  />
                </div>
                <div>
                  <Label htmlFor="branch">Assign Branch</Label>
                  <Select value={newTrainer.branchAssigned} onValueChange={(value) => setNewTrainer({ ...newTrainer, branchAssigned: value })}>
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
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleAddTrainer} className="bg-teal-600 hover:bg-teal-700">
                  Add Trainer
                </Button>
                <Button variant="outline" onClick={() => setIsAddTrainerOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Trainer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trainers</p>
                <p className="text-2xl text-gray-900">{trainersData.length}</p>
                <p className="text-sm text-blue-600">Professional staff</p>
              </div>
              <Users className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Trainers</p>
                <p className="text-2xl text-gray-900">{trainersData.filter(t => t.status === 'Active').length}</p>
                <p className="text-sm text-green-600">Currently teaching</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl text-gray-900">{(trainersData.reduce((sum, trainer) => sum + trainer.rating, 0) / trainersData.length).toFixed(1)}</p>
                <p className="text-sm text-orange-600">Trainer performance</p>
              </div>
              <Star className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trainees</p>
                <p className="text-2xl text-gray-900">{trainersData.reduce((sum, trainer) => sum + trainer.totalTrainees, 0)}</p>
                <p className="text-sm text-purple-600">Under guidance</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trainers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Training Faculty</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trainer</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Trainees</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainersData.map((trainer) => (
                <TableRow key={trainer.id}>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{trainer.name}</p>
                      <p className="text-sm text-gray-500">{trainer.experience} experience</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {trainer.specialty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{trainer.branchAssigned}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {trainer.coursesHandled.map((course, index) => (
                        <div key={index} className="text-xs text-gray-600">{course}</div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <p className="text-gray-900">{trainer.totalTrainees}</p>
                    <p className="text-xs text-gray-500">active</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900">{trainer.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getStatusBadge(trainer.status)}
                      {getAvailabilityBadge(trainer.availability)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewProfile(trainer)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleAssignCourse(trainer)}>
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

      {/* Trainer Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedTrainer?.name} - Profile</DialogTitle>
            <DialogDescription>
              Comprehensive trainer information and performance metrics.
            </DialogDescription>
          </DialogHeader>
          {selectedTrainer && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Professional Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-gray-900">{selectedTrainer.name}</p>
                  </div>
                  <div>
                    <Label>Specialty</Label>
                    <p className="text-gray-900">{selectedTrainer.specialty}</p>
                  </div>
                  <div>
                    <Label>Qualifications</Label>
                    <p className="text-gray-900">{selectedTrainer.qualifications}</p>
                  </div>
                  <div>
                    <Label>Experience</Label>
                    <p className="text-gray-900">{selectedTrainer.experience}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="text-gray-900">{selectedTrainer.phone}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="text-gray-900">{selectedTrainer.email}</p>
                  </div>
                </div>
              </div>

              {/* Assignment Information */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Current Assignments</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Branch Assigned</Label>
                    <p className="text-gray-900">{selectedTrainer.branchAssigned}</p>
                  </div>
                  <div>
                    <Label>Availability</Label>
                    <div className="mt-1">{getAvailabilityBadge(selectedTrainer.availability)}</div>
                  </div>
                  <div className="col-span-2">
                    <Label>Courses Handled</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedTrainer.coursesHandled.map((course: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-teal-50 text-teal-700">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedTrainer.totalTrainees}</p>
                    <p className="text-sm text-gray-600">Active Trainees</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedTrainer.completedCourses}</p>
                    <p className="text-sm text-gray-600">Completed Courses</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedTrainer.rating}</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-900">{selectedTrainer.coursesHandled.length}</p>
                    <p className="text-sm text-gray-600">Active Courses</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Documents</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-900">CV/Resume</p>
                      <p className="text-xs text-gray-500">Updated 2 months ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-900">License</p>
                      <p className="text-xs text-gray-500">Valid until 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-900">Certificates</p>
                      <p className="text-xs text-gray-500">3 documents</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
                <Button variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Change Branch
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
            <DialogTitle>Assign Course to {selectedTrainer?.name}</DialogTitle>
            <DialogDescription>
              Select a course to assign to this trainer.
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