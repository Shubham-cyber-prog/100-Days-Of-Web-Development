import { useState } from 'react';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { AttendanceCalendar } from '../components/AttendanceCalendar';
import { AttendanceTable } from '../components/AttendanceTable';
import { StudentDetailPanel } from '../components/StudentDetailPanel';
import { students, attendanceRecords } from '../data/mockData';

export default function Dashboard() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = '2026-03-04';
  const todayRecords = attendanceRecords.filter((r) => r.date === today);
  
  const totalStudents = students.length;
  const presentToday = todayRecords.filter((r) => r.status === 'present').length;
  const absentToday = todayRecords.filter((r) => r.status === 'absent').length;
  const attendanceRate = Math.round((presentToday / totalStudents) * 100);

  const selectedStudent = selectedStudentId
    ? students.find((s) => s.id === selectedStudentId)
    : null;

  const displayRecords = selectedDate
    ? attendanceRecords.filter((r) => r.date === selectedDate)
    : todayRecords;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Dashboard Overview</h2>
        <p className="text-slate-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          trend={{ value: 5, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Present Today"
          value={presentToday}
          icon={UserCheck}
          trend={{ value: 3, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Absent Today"
          value={absentToday}
          icon={UserX}
          trend={{ value: -2, isPositive: true }}
          color="red"
        />
        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          icon={TrendingUp}
          trend={{ value: 2, isPositive: true }}
          color="yellow"
        />
      </div>

      {/* Calendar and Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceCalendar onDateClick={setSelectedDate} />

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Average Attendance</span>
              <span className="text-xl font-semibold text-blue-600">89%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Best Class</span>
              <span className="text-xl font-semibold text-green-600">Grade 10-A</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Late Arrivals</span>
              <span className="text-xl font-semibold text-yellow-600">
                {todayRecords.filter((r) => r.status === 'late').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Total Days</span>
              <span className="text-xl font-semibold text-purple-600">30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <AttendanceTable
        records={displayRecords}
        onStudentClick={setSelectedStudentId}
      />

      {/* Student Detail Panel */}
      {selectedStudent && (
        <StudentDetailPanel
          student={selectedStudent}
          onClose={() => setSelectedStudentId(null)}
        />
      )}
    </div>
  );
}
