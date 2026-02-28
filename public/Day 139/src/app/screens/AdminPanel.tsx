import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Users, BookOpen, DollarSign, Activity, Search, Filter, MoreVertical } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AdminPanel() {
  const stats = [
    { label: 'Total Users', value: '12,453', change: '+245', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Courses', value: '156', change: '+12', icon: BookOpen, color: 'bg-green-100 text-green-600' },
    { label: 'Revenue (MTD)', value: '$45.2K', change: '+18%', icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
    { label: 'Platform Activity', value: '98.5%', change: '+2.3%', icon: Activity, color: 'bg-yellow-100 text-yellow-600' },
  ];
  
  const revenueData = [
    { month: 'Jan', revenue: 24500 },
    { month: 'Feb', revenue: 28900 },
    { month: 'Mar', revenue: 32400 },
    { month: 'Apr', revenue: 35600 },
    { month: 'May', revenue: 39800 },
    { month: 'Jun', revenue: 45200 },
  ];
  
  const userDistribution = [
    { name: 'Students', value: 8945, color: '#6366f1' },
    { name: 'Instructors', value: 2134, color: '#10b981' },
    { name: 'Admins', value: 1374, color: '#f59e0b' },
  ];
  
  const recentUsers = [
    { name: 'Sarah Johnson', email: 'sarah.j@email.com', role: 'Student', status: 'Active', joined: 'Feb 20, 2026' },
    { name: 'Michael Chen', email: 'michael.c@email.com', role: 'Instructor', status: 'Active', joined: 'Feb 19, 2026' },
    { name: 'Emma Davis', email: 'emma.d@email.com', role: 'Student', status: 'Active', joined: 'Feb 18, 2026' },
    { name: 'John Smith', email: 'john.s@email.com', role: 'Student', status: 'Pending', joined: 'Feb 17, 2026' },
  ];
  
  const topCourses = [
    { name: 'Web Development Fundamentals', instructor: 'Sarah Johnson', students: 1245, revenue: '$12.5K', rating: 4.8 },
    { name: 'Advanced React Patterns', instructor: 'Michael Chen', students: 987, revenue: '$9.8K', rating: 4.9 },
    { name: 'UI/UX Design Principles', instructor: 'Emma Davis', students: 856, revenue: '$8.5K', rating: 4.7 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Admin Panel</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Filter className="w-5 h-5" />
            Filters
          </Button>
          <Button variant="primary">Generate Report</Button>
        </div>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3>Revenue Analytics</h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <h3>User Distribution</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {userDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>Recent Users</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.status === 'Active' ? 'success' : 'warning'}>{user.status}</Badge>
                    <button className="p-1 hover:bg-gray-200 rounded-lg">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h3>Top Performing Courses</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={course.name} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm mb-1">{course.name}</h4>
                        <p className="text-xs text-gray-600">{course.instructor}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div>
                      <p className="text-gray-500">Students</p>
                      <p className="text-gray-900">{course.students}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="text-gray-900">{course.revenue}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rating</p>
                      <p className="text-gray-900">{course.rating} ⭐</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
