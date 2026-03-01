import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Scissors, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const surgeriesPerDepartmentData = [
  { department: 'Cardiology', scheduled: 45, completed: 42, cancelled: 3 },
  { department: 'Orthopedics', scheduled: 38, completed: 35, cancelled: 3 },
  { department: 'Neurology', scheduled: 25, completed: 23, cancelled: 2 },
  { department: 'General Surgery', scheduled: 67, completed: 61, cancelled: 6 },
  { department: 'Pediatric', scheduled: 22, completed: 20, cancelled: 2 },
];

const appointmentWaitTimesData = [
  { month: 'Jan', average: 28, target: 25 },
  { month: 'Feb', average: 32, target: 25 },
  { month: 'Mar', average: 26, target: 25 },
  { month: 'Apr', average: 24, target: 25 },
  { month: 'May', average: 29, target: 25 },
  { month: 'Jun', average: 23, target: 25 },
];

const upcomingSurgeries = [
  { patient: 'John Smith', procedure: 'Cardiac Bypass', department: 'Cardiology', time: '08:30 AM', status: 'scheduled' },
  { patient: 'Maria Garcia', procedure: 'Knee Replacement', department: 'Orthopedics', time: '10:15 AM', status: 'prep' },
  { patient: 'Robert Johnson', procedure: 'Appendectomy', department: 'General Surgery', time: '02:00 PM', status: 'scheduled' },
  { patient: 'Sarah Williams', procedure: 'Brain Tumor Removal', department: 'Neurology', time: '03:30 PM', status: 'prep' },
];

export function HospitalServicesModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Hospital Services</h2>
          <p className="text-gray-600">Surgery scheduling and appointment management analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <TrendingUp className="h-4 w-4 mr-1" />
            Performance: Good
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Surgeries</p>
                <p className="text-2xl text-gray-900">12</p>
                <p className="text-sm text-green-600">4 completed, 8 scheduled</p>
              </div>
              <Scissors className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Surgery Success Rate</p>
                <p className="text-2xl text-gray-900">97.3%</p>
                <p className="text-sm text-green-600">+0.2% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Wait Time</p>
                <p className="text-2xl text-gray-900">23 min</p>
                <p className="text-sm text-orange-600">Target: 25 min</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delayed Appointments</p>
                <p className="text-2xl text-gray-900">7</p>
                <p className="text-sm text-red-600">Requires attention</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Surgeries per Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={surgeriesPerDepartmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#008080" name="Completed" />
                <Bar dataKey="scheduled" stackId="a" fill="#4682B4" name="Scheduled" />
                <Bar dataKey="cancelled" stackId="a" fill="#FFB74D" name="Cancelled" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Wait Times Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={appointmentWaitTimesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="average" stroke="#008080" strokeWidth={3} name="Average Wait Time" />
                <Line type="monotone" dataKey="target" stroke="#FFB74D" strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Surgeries */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Surgery Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSurgeries.map((surgery, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="text-gray-900">{surgery.patient}</h4>
                  <p className="text-sm text-gray-600">{surgery.procedure}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-sm text-gray-600">{surgery.department}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-gray-900">{surgery.time}</p>
                </div>
                <div className="flex-1 text-right">
                  <Badge 
                    variant={surgery.status === 'prep' ? 'default' : 'secondary'}
                    className={surgery.status === 'prep' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}
                  >
                    {surgery.status === 'prep' ? 'In Prep' : 'Scheduled'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}