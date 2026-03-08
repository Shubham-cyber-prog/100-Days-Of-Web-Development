import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Download, TrendingUp, Users, BookOpen, Award, AlertTriangle } from 'lucide-react';

// Sample data for charts
const monthlyEnrollmentData = [
  { month: 'Jan', trainees: 45, courses: 8 },
  { month: 'Feb', trainees: 52, courses: 10 },
  { month: 'Mar', trainees: 48, courses: 9 },
  { month: 'Apr', trainees: 65, courses: 12 },
  { month: 'May', trainees: 59, courses: 11 },
  { month: 'Jun', trainees: 70, courses: 14 },
];

const courseCompletionData = [
  { name: 'Advanced Cardiology', completed: 85, inProgress: 12, dropped: 3 },
  { name: 'Emergency Medicine', completed: 92, inProgress: 8, dropped: 0 },
  { name: 'Pediatric Care', completed: 78, inProgress: 18, dropped: 4 },
  { name: 'Diagnostic Imaging', completed: 88, inProgress: 10, dropped: 2 },
  { name: 'Patient Care', completed: 95, inProgress: 5, dropped: 0 },
];

const branchPerformanceData = [
  { branch: 'Lahore', completion: 98, trainees: 65 },
  { branch: 'Karachi', completion: 94, trainees: 58 },
  { branch: 'Islamabad', completion: 96, trainees: 42 },
  { branch: 'Faisalabad', completion: 91, trainees: 35 },
  { branch: 'Multan', completion: 89, trainees: 28 },
];

const traineeProgressData = [
  { name: 'Completed', value: 156, color: '#14b8a6' },
  { name: 'In Progress', value: 72, color: '#3b82f6' },
  { name: 'Not Started', value: 19, color: '#94a3b8' },
];

const trainerUtilizationData = [
  { name: 'Dr. Ahmed Khan', sessions: 24, utilization: 92 },
  { name: 'Dr. Sarah Ali', sessions: 22, utilization: 88 },
  { name: 'Dr. Hassan Raza', sessions: 20, utilization: 85 },
  { name: 'Dr. Fatima Malik', sessions: 26, utilization: 95 },
  { name: 'Dr. Imran Siddiqui', sessions: 18, utilization: 78 },
];

export function ReportsAnalyticsModule() {
  const [dateRange, setDateRange] = useState('6-months');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const handleExportReport = (reportType: string) => {
    console.log(`Exporting ${reportType} report...`);
    // In real implementation, this would generate and download a PDF or Excel file
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Comprehensive insights into training performance and trends</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="lahore">Lahore</SelectItem>
              <SelectItem value="karachi">Karachi</SelectItem>
              <SelectItem value="islamabad">Islamabad</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-month">Last Month</SelectItem>
              <SelectItem value="3-months">Last 3 Months</SelectItem>
              <SelectItem value="6-months">Last 6 Months</SelectItem>
              <SelectItem value="1-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl text-gray-900">94.2%</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3.2% from last period
                </p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Attendance</p>
                <p className="text-2xl text-gray-900">87.5%</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +1.8% from last period
                </p>
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
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-2xl text-gray-900">28</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +4 new this month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dropout Rate</p>
                <p className="text-2xl text-gray-900">2.1%</p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  +0.3% from last period
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Analytics</TabsTrigger>
          <TabsTrigger value="branches">Branch Performance</TabsTrigger>
          <TabsTrigger value="trainers">Trainer Utilization</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Monthly Enrollment Trends</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleExportReport('enrollment')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyEnrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="trainees" stroke="#14b8a6" strokeWidth={2} name="Trainees" />
                    <Line type="monotone" dataKey="courses" stroke="#3b82f6" strokeWidth={2} name="Courses" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Trainee Progress Distribution</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleExportReport('progress')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={traineeProgressData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {traineeProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Course Analytics Tab */}
        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Course Completion Analysis</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleExportReport('course-completion')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={courseCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#14b8a6" name="Completed" />
                  <Bar dataKey="inProgress" fill="#3b82f6" name="In Progress" />
                  <Bar dataKey="dropped" fill="#ef4444" name="Dropped" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courseCompletionData.map((course, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <Badge className="bg-teal-100 text-teal-800">
                        {Math.round((course.completed / (course.completed + course.inProgress + course.dropped)) * 100)}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full" 
                        style={{ width: `${Math.round((course.completed / (course.completed + course.inProgress + course.dropped)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="text-gray-600">Completed</p>
                        <p className="text-teal-600">{course.completed}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">In Progress</p>
                        <p className="text-blue-600">{course.inProgress}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Dropped</p>
                        <p className="text-red-600">{course.dropped}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Branch Performance Tab */}
        <TabsContent value="branches" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Branch Performance Comparison</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleExportReport('branch-performance')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={branchPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="branch" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completion" fill="#14b8a6" name="Completion Rate %" />
                  <Bar dataKey="trainees" fill="#3b82f6" name="Total Trainees" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trainer Utilization Tab */}
        <TabsContent value="trainers" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Trainer Utilization Analysis</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleExportReport('trainer-utilization')}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={trainerUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sessions" fill="#8b5cf6" name="Sessions Conducted" />
                  <Bar dataKey="utilization" fill="#14b8a6" name="Utilization Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainerUtilizationData.map((trainer, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{trainer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sessions</span>
                      <span className="text-sm text-gray-900">{trainer.sessions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Utilization</span>
                      <Badge className={
                        trainer.utilization >= 90 ? 'bg-green-100 text-green-800' :
                        trainer.utilization >= 80 ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }>
                        {trainer.utilization}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={
                          trainer.utilization >= 90 ? 'bg-green-600 h-2 rounded-full' :
                          trainer.utilization >= 80 ? 'bg-blue-600 h-2 rounded-full' :
                          'bg-orange-600 h-2 rounded-full'
                        }
                        style={{ width: `${trainer.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
