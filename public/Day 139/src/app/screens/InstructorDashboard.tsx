import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Users, BookOpen, TrendingUp, DollarSign, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function InstructorDashboard() {
  const stats = [
    { label: 'Total Students', value: '1,245', change: '+12%', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Courses', value: '8', change: '+2', icon: BookOpen, color: 'bg-green-100 text-green-600' },
    { label: 'Course Rating', value: '4.8', change: '+0.2', icon: TrendingUp, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Total Revenue', value: '$12.5K', change: '+18%', icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
  ];
  
  const enrollmentData = [
    { month: 'Jan', students: 145 },
    { month: 'Feb', students: 198 },
    { month: 'Mar', students: 234 },
    { month: 'Apr', students: 289 },
    { month: 'May', students: 312 },
    { month: 'Jun', students: 345 },
  ];
  
  const coursePerformance = [
    { name: 'Web Dev', completion: 85, students: 245 },
    { name: 'React', completion: 78, students: 189 },
    { name: 'UI/UX', completion: 92, students: 167 },
    { name: 'Node.js', completion: 71, students: 134 },
  ];
  
  const recentActivity = [
    { student: 'Sarah Johnson', action: 'Completed "Advanced React Patterns"', time: '2 hours ago', status: 'success' },
    { student: 'Mike Chen', action: 'Submitted assignment for review', time: '4 hours ago', status: 'pending' },
    { student: 'Emma Davis', action: 'Asked a question in Web Development', time: '6 hours ago', status: 'info' },
    { student: 'John Smith', action: 'Enrolled in Node.js Fundamentals', time: '8 hours ago', status: 'success' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Instructor Dashboard</h1>
          <p className="text-gray-600">Manage your courses and track student progress</p>
        </div>
        <Button variant="primary">
          <Plus className="w-5 h-5" />
          Create New Course
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="success">{stat.change}</Badge>
                </div>
                <h2 className="mb-1">{stat.value}</h2>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3>Student Enrollment Trend</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h3>Course Performance</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="completion" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3>My Courses</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'Web Development Fundamentals', students: 245, completion: 85, revenue: '$4.2K' },
                  { title: 'Advanced React Patterns', students: 189, completion: 78, revenue: '$3.8K' },
                  { title: 'UI/UX Design Principles', students: 167, completion: 92, revenue: '$2.9K' },
                ].map((course) => (
                  <div key={course.title} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4>{course.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{course.students} students enrolled</p>
                      </div>
                      <Badge variant="success">{course.revenue}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Avg. Completion: {course.completion}%</span>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h3>Recent Activity</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'pending' ? 'bg-yellow-500' : 
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.student}</p>
                      <p className="text-xs text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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
