import { DashboardCard } from '../components/DashboardCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, Mail, Phone, MapPin, Calendar, Book, Award, Edit } from 'lucide-react';
import { Badge } from '../components/ui/badge';

const profileData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  studentId: 'STU2024001',
  course: 'Computer Science',
  year: '3rd Year',
  phone: '+1 (555) 123-4567',
  address: 'Campus Residence Hall A, Room 305',
  enrollmentDate: 'September 2023',
  gpa: '3.8',
};

const achievements = [
  { id: 1, title: 'Dean\'s List', semester: 'Fall 2025' },
  { id: 2, title: 'Hackathon Winner', event: 'TechFest 2025' },
  { id: 3, title: 'Perfect Attendance', semester: 'Spring 2025' },
];

const courses = [
  { id: 1, name: 'Data Structures & Algorithms', code: 'CS301', credits: 4 },
  { id: 2, name: 'Database Management Systems', code: 'CS302', credits: 3 },
  { id: 3, name: 'Computer Networks', code: 'CS303', credits: 3 },
  { id: 4, name: 'Operating Systems', code: 'CS304', credits: 4 },
  { id: 5, name: 'Software Engineering', code: 'CS305', credits: 3 },
];

export function Profile() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-secondary mb-2">Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard title="Profile Information" className="lg:col-span-2">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-secondary mb-1">{profileData.name}</h2>
              <p className="text-muted-foreground mb-2">{profileData.course} - {profileData.year}</p>
              <Badge variant="outline" className="mb-3">Student ID: {profileData.studentId}</Badge>
              <Button className="bg-primary hover:bg-primary/90 rounded-xl">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input 
                  value={profileData.email} 
                  readOnly 
                  className="rounded-xl bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  Phone
                </Label>
                <Input 
                  value={profileData.phone} 
                  readOnly 
                  className="rounded-xl bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Enrollment Date
                </Label>
                <Input 
                  value={profileData.enrollmentDate} 
                  readOnly 
                  className="rounded-xl bg-muted"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Book className="w-4 h-4" />
                  Course
                </Label>
                <Input 
                  value={profileData.course} 
                  readOnly 
                  className="rounded-xl bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Address
                </Label>
                <Input 
                  value={profileData.address} 
                  readOnly 
                  className="rounded-xl bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4" />
                  GPA
                </Label>
                <Input 
                  value={profileData.gpa} 
                  readOnly 
                  className="rounded-xl bg-muted"
                />
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Achievements">
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-3 rounded-xl bg-accent/10 border border-accent/20"
              >
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-secondary">{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {achievement.semester || achievement.event}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Current Courses">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-xl border border-border hover:bg-muted transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <Book className="w-5 h-5 text-primary" />
                <Badge variant="outline" className="text-xs">{course.credits} Credits</Badge>
              </div>
              <h4 className="text-secondary mb-1">{course.name}</h4>
              <p className="text-sm text-muted-foreground">{course.code}</p>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Academic Performance">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-primary/10 text-center">
            <p className="text-3xl font-semibold text-primary mb-1">3.8</p>
            <p className="text-sm text-muted-foreground">Current GPA</p>
          </div>
          <div className="p-4 rounded-xl bg-accent/10 text-center">
            <p className="text-3xl font-semibold text-accent mb-1">87%</p>
            <p className="text-sm text-muted-foreground">Attendance</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/10 text-center">
            <p className="text-3xl font-semibold text-secondary mb-1">17</p>
            <p className="text-sm text-muted-foreground">Total Credits</p>
          </div>
          <div className="p-4 rounded-xl bg-muted text-center">
            <p className="text-3xl font-semibold text-secondary mb-1">5</p>
            <p className="text-sm text-muted-foreground">Courses</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
