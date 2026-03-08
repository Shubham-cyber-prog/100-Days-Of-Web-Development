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
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Award, AlertCircle } from 'lucide-react';
import { students, attendanceRecords } from '../data/mockData';

export default function Analytics() {
  // Weekly attendance data
  const weeklyData = [
    { day: 'Mon', present: 8, absent: 2, late: 0 },
    { day: 'Tue', present: 9, absent: 1, late: 0 },
    { day: 'Wed', present: 7, absent: 2, late: 1 },
    { day: 'Thu', present: 9, absent: 0, late: 1 },
    { day: 'Fri', present: 8, absent: 1, late: 1 },
  ];

  // Class-wise attendance
  const classWiseData = [
    { class: 'Grade 10-A', rate: 92 },
    { class: 'Grade 10-B', rate: 88 },
    { class: 'Grade 11-A', rate: 90 },
  ];

  // Monthly trend
  const monthlyTrendData = [
    { month: 'Oct', rate: 87 },
    { month: 'Nov', rate: 89 },
    { month: 'Dec', rate: 86 },
    { month: 'Jan', rate: 91 },
    { month: 'Feb', rate: 89 },
    { month: 'Mar', rate: 90 },
  ];

  // Student attendance distribution
  const distributionData = [
    { name: '90-100%', value: 6, color: '#10b981' },
    { name: '80-89%', value: 3, color: '#3b82f6' },
    { name: '70-79%', value: 1, color: '#f59e0b' },
    { name: 'Below 70%', value: 0, color: '#ef4444' },
  ];

  // Most absent students
  const mostAbsentStudents = students
    .sort((a, b) => a.attendancePercentage - b.attendancePercentage)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Analytics Dashboard</h2>
        <p className="text-slate-600">Detailed insights and attendance patterns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">This Week</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-900 mb-1">89%</p>
          <p className="text-xs text-blue-700">+3% from last week</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-900">Best Performer</span>
            <Award className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-lg font-bold text-green-900 mb-1">Grade 10-A</p>
          <p className="text-xs text-green-700">92% attendance rate</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-yellow-900">Avg. Late Arrivals</span>
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-900 mb-1">2.3</p>
          <p className="text-xs text-yellow-700">Per day this month</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-900">Monthly Trend</span>
            <TrendingDown className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-900 mb-1">90%</p>
          <p className="text-xs text-purple-700">Consistent performance</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#10b981" name="Present" radius={[8, 8, 0, 0]} />
              <Bar dataKey="late" fill="#f59e0b" name="Late" radius={[8, 8, 0, 0]} />
              <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Class-wise Attendance Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classWiseData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis dataKey="class" type="category" tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="rate" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
                name="Attendance Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Student Attendance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Absent Students */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Students Requiring Attention</h3>
        <div className="space-y-3">
          {mostAbsentStudents.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={student.profilePhoto}
                  alt={student.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <p className="font-medium text-slate-900">{student.name}</p>
                  <p className="text-sm text-slate-600">
                    {student.rollNumber} • {student.class}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{student.attendancePercentage}%</p>
                <p className="text-xs text-slate-500">Attendance Rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
