import { X } from 'lucide-react';
import { Student, attendanceRecords } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StudentDetailPanelProps {
  student: Student;
  onClose: () => void;
}

export function StudentDetailPanel({ student, onClose }: StudentDetailPanelProps) {
  const studentRecords = attendanceRecords
    .filter((r) => r.studentId === student.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recentRecords = studentRecords.slice(0, 10);

  // Generate trend data for last 7 days
  const trendData = studentRecords
    .slice(0, 7)
    .reverse()
    .map((record, index) => ({
      day: `Day ${index + 1}`,
      attendance: record.status === 'present' ? 100 : record.status === 'late' ? 50 : 0,
    }));

  const getStatusBadge = (status: string) => {
    const styles = {
      present: 'bg-green-100 text-green-700',
      absent: 'bg-red-100 text-red-700',
      late: 'bg-yellow-100 text-yellow-700',
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-96 bg-white border-l border-slate-200 fixed right-0 top-16 bottom-0 overflow-y-auto z-30">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Student Details</h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src={student.profilePhoto}
            alt={student.name}
            className="w-24 h-24 rounded-full mb-4 border-4 border-blue-100"
          />
          <h4 className="text-xl font-semibold text-slate-900">{student.name}</h4>
          <p className="text-sm text-slate-600">{student.rollNumber}</p>
          <p className="text-sm text-slate-600">{student.class}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 mb-6 border border-blue-100">
          <div className="text-center">
            <p className="text-sm text-slate-600 mb-2">Overall Attendance</p>
            <p className="text-4xl font-bold text-slate-900 mb-1">{student.attendancePercentage}%</p>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                style={{ width: `${student.attendancePercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h5 className="text-sm font-semibold text-slate-900 mb-4">Attendance Trend</h5>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#64748b" />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-slate-900 mb-4">Recent Attendance History</h5>
          <div className="space-y-3">
            {recentRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{formatDate(record.date)}</p>
                  <p className="text-xs text-slate-500">{record.timestamp.split('T')[1].slice(0, 5)}</p>
                </div>
                {getStatusBadge(record.status)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
