import { useState } from 'react';
import { User, Calendar, TrendingUp, Award, Mail, Phone, Download } from 'lucide-react';
import { students, attendanceRecords } from '../data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function ParentPortal() {
  // Simulate parent viewing their child's data
  const [selectedStudent] = useState(students[0]); // Emma Johnson

  const studentRecords = attendanceRecords
    .filter((r) => r.studentId === selectedStudent.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recentRecords = studentRecords.slice(0, 10);

  // Generate monthly trend data
  const monthlyTrendData = [
    { month: 'Oct', rate: 93 },
    { month: 'Nov', rate: 96 },
    { month: 'Dec', rate: 94 },
    { month: 'Jan', rate: 95 },
    { month: 'Feb', rate: 96 },
    { month: 'Mar', rate: 95 },
  ];

  // Attendance breakdown
  const presentCount = studentRecords.filter((r) => r.status === 'present').length;
  const lateCount = studentRecords.filter((r) => r.status === 'late').length;
  const absentCount = studentRecords.filter((r) => r.status === 'absent').length;

  const attendanceBreakdown = [
    { name: 'Present', value: presentCount, color: '#10b981' },
    { name: 'Late', value: lateCount, color: '#f59e0b' },
    { name: 'Absent', value: absentCount, color: '#ef4444' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      present: 'bg-green-100 text-green-700',
      absent: 'bg-red-100 text-red-700',
      late: 'bg-yellow-100 text-yellow-700',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          styles[status as keyof typeof styles]
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5" />
          <span className="text-blue-100">Parent Portal</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Welcome, Parent!</h2>
        <p className="text-blue-100">
          View your child's attendance records and academic performance
        </p>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <img
              src={selectedStudent.profilePhoto}
              alt={selectedStudent.name}
              className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-1">
                {selectedStudent.name}
              </h3>
              <p className="text-slate-600 mb-3">
                {selectedStudent.rollNumber} • {selectedStudent.class}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{selectedStudent.name.toLowerCase().replace(' ', '.')}@school.edu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 234-567-8900</span>
                </div>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <Calendar className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Total Days</p>
            <p className="text-2xl font-bold text-slate-900">{studentRecords.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Attendance Rate</p>
            <p className="text-2xl font-bold text-slate-900">{selectedStudent.attendancePercentage}%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <Award className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Present Days</p>
            <p className="text-2xl font-bold text-slate-900">{presentCount}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
            <TrendingUp className="w-6 h-6 text-yellow-600 mb-2" />
            <p className="text-sm text-slate-600 mb-1">Ranking</p>
            <p className="text-2xl font-bold text-slate-900">Top 10%</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            6-Month Attendance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
              <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Attendance Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Attendance */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Attendance History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">
                      {formatDate(record.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600">
                      {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(record.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600">
                      {record.timestamp.split('T')[1].slice(0, 5)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-green-600" />
          Performance Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Overall Performance</p>
            <p className="text-xl font-bold text-green-600">Excellent</p>
            <p className="text-xs text-slate-500 mt-1">
              {selectedStudent.name} maintains consistent attendance
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">This Month</p>
            <p className="text-xl font-bold text-blue-600">100%</p>
            <p className="text-xs text-slate-500 mt-1">Perfect attendance in March</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Class Ranking</p>
            <p className="text-xl font-bold text-purple-600">#1</p>
            <p className="text-xs text-slate-500 mt-1">Top performer in {selectedStudent.class}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
