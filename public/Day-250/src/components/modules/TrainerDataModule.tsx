import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Users, Activity, Award, BookOpen } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const trainerAgeDistributionData = [
  { ageGroup: '25-30', count: 15, percentage: 18.8 },
  { ageGroup: '31-35', count: 22, percentage: 27.5 },
  { ageGroup: '36-40', count: 19, percentage: 23.8 },
  { ageGroup: '41-45', count: 14, percentage: 17.5 },
  { ageGroup: '46-50', count: 8, percentage: 10.0 },
  { ageGroup: '51+', count: 2, percentage: 2.4 },
];

const treatmentStatusData = [
  { status: 'Active Training', value: 45, color: '#008080' },
  { status: 'Completed', value: 28, color: '#90EE90' },
  { status: 'On Hold', value: 12, color: '#FFB74D' },
  { status: 'Dropped Out', value: 8, color: '#FF6B6B' },
];

const monthlyProgressData = [
  { month: 'Jan', newTrainers: 8, completions: 5, dropouts: 2 },
  { month: 'Feb', newTrainers: 12, completions: 7, dropouts: 1 },
  { month: 'Mar', newTrainers: 15, completions: 9, dropouts: 3 },
  { month: 'Apr', newTrainers: 10, completions: 11, dropouts: 2 },
  { month: 'May', newTrainers: 14, completions: 8, dropouts: 1 },
  { month: 'Jun', newTrainers: 18, completions: 13, dropouts: 2 },
];

const trainerPerformanceData = [
  { name: 'Dr. Emily Chen', completionRate: 95, studentsCount: 24, avgRating: 4.8, specialty: 'Cardiology' },
  { name: 'Dr. Michael Rodriguez', completionRate: 88, studentsCount: 19, avgRating: 4.6, specialty: 'Emergency Medicine' },
  { name: 'Dr. Sarah Johnson', completionRate: 92, studentsCount: 31, avgRating: 4.9, specialty: 'Pediatrics' },
  { name: 'Dr. David Kim', completionRate: 85, studentsCount: 16, avgRating: 4.5, specialty: 'Surgery' },
  { name: 'Dr. Lisa Thompson', completionRate: 90, studentsCount: 22, avgRating: 4.7, specialty: 'Internal Medicine' },
];

export function TrainerDataModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Trainer Data Analytics</h2>
          <p className="text-gray-600">Medical training program insights and trainer performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <BookOpen className="h-4 w-4 mr-1" />
            93 Active Trainers
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trainers</p>
                <p className="text-2xl text-gray-900">93</p>
                <p className="text-sm text-green-600">+8 this month</p>
              </div>
              <Users className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Completion Rate</p>
                <p className="text-2xl text-gray-900">90%</p>
                <p className="text-sm text-green-600">Above target (85%)</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Programs</p>
                <p className="text-2xl text-gray-900">45</p>
                <p className="text-sm text-blue-600">12 starting this week</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl text-gray-900">4.7</p>
                <p className="text-sm text-green-600">Excellent performance</p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trainer Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={trainerAgeDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#008080" name="Number of Trainers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={treatmentStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {treatmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Training Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="newTrainers" stackId="1" stroke="#008080" fill="#008080" fillOpacity={0.6} name="New Trainers" />
              <Area type="monotone" dataKey="completions" stackId="2" stroke="#4682B4" fill="#4682B4" fillOpacity={0.6} name="Completions" />
              <Area type="monotone" dataKey="dropouts" stackId="3" stroke="#FFB74D" fill="#FFB74D" fillOpacity={0.6} name="Dropouts" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trainer Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Trainer Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainerPerformanceData.map((trainer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-gray-900">{trainer.name}</h4>
                  <p className="text-sm text-gray-600">{trainer.specialty}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-gray-900">{trainer.completionRate}%</p>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-gray-900">{trainer.studentsCount}</p>
                  <p className="text-sm text-gray-600">Students</p>
                </div>
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <span className="text-gray-900">{trainer.avgRating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(trainer.avgRating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}