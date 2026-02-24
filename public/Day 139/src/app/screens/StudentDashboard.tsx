import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { CourseCard } from '../components/CourseCard';
import { AssignmentCard } from '../components/AssignmentCard';
import { Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';

export function StudentDashboard() {
  const navigate = useNavigate();
  
  const stats = [
    { label: 'Courses Enrolled', value: '6', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
    { label: 'Completed', value: '12', icon: Award, color: 'bg-green-100 text-green-600' },
    { label: 'In Progress', value: '4', icon: Clock, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Upcoming Events', value: '8', icon: Calendar, color: 'bg-purple-100 text-purple-600' },
  ];
  
  const courses = [
    { title: 'Web Development Fundamentals', instructor: 'Sarah Johnson', progress: 75, imageQuery: '1498050108023-1c05d9a834a0', duration: '6h 30m', lessons: 24 },
    { title: 'Advanced React Patterns', instructor: 'Michael Chen', progress: 45, imageQuery: '1633356122544-f134324a6c5f', duration: '8h 15m', lessons: 32 },
    { title: 'UI/UX Design Principles', instructor: 'Emma Davis', progress: 90, imageQuery: '1561070791-2526d30994b5', duration: '5h 45m', lessons: 18 },
  ];
  
  const assignments = [
    { title: 'React Component Library', course: 'Advanced React Patterns', dueDate: 'Feb 28', status: 'pending' as const },
    { title: 'Responsive Landing Page', course: 'Web Development', dueDate: 'Feb 25', status: 'submitted' as const },
    { title: 'User Research Report', course: 'UI/UX Design', dueDate: 'Feb 22', status: 'graded' as const, grade: '95/100' },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Welcome back, Alex!</h1>
        <p className="text-gray-600">Here's what's happening with your courses today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <h2>{stat.value}</h2>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="mb-4">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <CourseCard 
                  key={course.title} 
                  {...course} 
                  onClick={() => navigate('/course-detail')}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="mb-4">Recent Assignments</h2>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <AssignmentCard key={assignment.title} {...assignment} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3>Learning Progress</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Overall Completion</span>
                    <span className="text-sm text-gray-600">68%</span>
                  </div>
                  <Progress value={68} showLabel={false} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">This Week</span>
                    <span className="text-sm text-gray-600">12h 30m</span>
                  </div>
                  <Progress value={83} showLabel={false} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3>Upcoming Deadlines</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: 'React Component Library', date: 'Feb 28', course: 'Advanced React' },
                  { task: 'CSS Grid Assignment', date: 'Mar 2', course: 'Web Development' },
                  { task: 'Wireframe Submission', date: 'Mar 5', course: 'UI/UX Design' },
                ].map((item) => (
                  <div key={item.task} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">{item.task}</p>
                      <p className="text-xs text-gray-500">{item.course} • {item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
