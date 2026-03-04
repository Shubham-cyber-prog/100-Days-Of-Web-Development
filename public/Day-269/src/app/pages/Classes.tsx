import { Users, BookOpen, TrendingUp } from 'lucide-react';
import { students, attendanceRecords } from '../data/mockData';

export default function Classes() {
  const classData = [
    {
      name: 'Grade 10-A',
      students: students.filter((s) => s.class === 'Grade 10-A'),
      color: 'blue',
    },
    {
      name: 'Grade 10-B',
      students: students.filter((s) => s.class === 'Grade 10-B'),
      color: 'green',
    },
    {
      name: 'Grade 11-A',
      students: students.filter((s) => s.class === 'Grade 11-A'),
      color: 'purple',
    },
  ];

  const getClassAttendanceRate = (className: string) => {
    const classStudents = students.filter((s) => s.class === className);
    const totalPercentage = classStudents.reduce((sum, s) => sum + s.attendancePercentage, 0);
    return Math.round(totalPercentage / classStudents.length);
  };

  const getTodayPresentCount = (className: string) => {
    const today = '2026-03-04';
    const classRecords = attendanceRecords.filter(
      (r) => r.class === className && r.date === today && r.status === 'present'
    );
    return classRecords.length;
  };

  const colorStyles = {
    blue: {
      gradient: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    green: {
      gradient: 'from-green-50 to-green-100',
      border: 'border-green-200',
      text: 'text-green-600',
      bg: 'bg-green-100',
    },
    purple: {
      gradient: 'from-purple-50 to-purple-100',
      border: 'border-purple-200',
      text: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Classes</h2>
          <p className="text-slate-600">Manage class information and attendance</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all shadow-md">
          Add New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classData.map((classItem) => {
          const styles = colorStyles[classItem.color as keyof typeof colorStyles];
          const attendanceRate = getClassAttendanceRate(classItem.name);
          const presentToday = getTodayPresentCount(classItem.name);

          return (
            <div
              key={classItem.name}
              className={`bg-gradient-to-br ${styles.gradient} rounded-xl border ${styles.border} overflow-hidden hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-white rounded-lg shadow-sm ${styles.text}`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 ${styles.bg} ${styles.text} rounded-full text-xs font-medium`}>
                    Active
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-4">{classItem.name}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="w-4 h-4" />
                      <span>Total Students</span>
                    </div>
                    <span className="font-semibold text-slate-900">{classItem.students.length}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Present Today</span>
                    </div>
                    <span className="font-semibold text-slate-900">{presentToday}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Attendance Rate</span>
                    </div>
                    <span className="font-semibold text-slate-900">{attendanceRate}%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/50">
                  <div className="w-full bg-white/50 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${attendanceRate}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 text-center">Overall Performance</p>
                </div>
              </div>

              <div className="bg-white/40 px-6 py-3">
                <button className="w-full text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Class Students Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {classData.map((classItem) => (
          <div key={classItem.name} className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">{classItem.name} Students</h3>
            <div className="space-y-3">
              {classItem.students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={student.profilePhoto}
                    alt={student.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm truncate">{student.name}</p>
                    <p className="text-xs text-slate-600">{student.rollNumber}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      student.attendancePercentage >= 90
                        ? 'bg-green-100 text-green-700'
                        : student.attendancePercentage >= 80
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {student.attendancePercentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
