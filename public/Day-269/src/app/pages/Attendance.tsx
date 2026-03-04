import { useState } from 'react';
import { AttendanceTable } from '../components/AttendanceTable';
import { AttendanceCalendar } from '../components/AttendanceCalendar';
import { StudentDetailPanel } from '../components/StudentDetailPanel';
import { students, attendanceRecords } from '../data/mockData';
import { Calendar, FileText } from 'lucide-react';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const displayRecords = selectedDate
    ? attendanceRecords.filter((r) => r.date === selectedDate)
    : attendanceRecords.filter((r) => r.date === '2026-03-04');

  const selectedStudent = selectedStudentId
    ? students.find((s) => s.id === selectedStudentId)
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Attendance Management</h2>
        <p className="text-slate-600">View and manage attendance records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Total Records</h3>
              <p className="text-sm text-slate-600">All time attendance data</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900">{attendanceRecords.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Active Students</h3>
              <p className="text-sm text-slate-600">Currently enrolled</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900">{students.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceCalendar onDateClick={setSelectedDate} />

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Date Summary</h3>
          {selectedDate ? (
            <div className="space-y-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Selected Date</p>
                <p className="text-xl font-semibold text-slate-900">
                  {new Date(selectedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {displayRecords.filter((r) => r.status === 'present').length}
                  </p>
                  <p className="text-xs text-slate-600">Present</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {displayRecords.filter((r) => r.status === 'late').length}
                  </p>
                  <p className="text-xs text-slate-600">Late</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {displayRecords.filter((r) => r.status === 'absent').length}
                  </p>
                  <p className="text-xs text-slate-600">Absent</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDate(null)}
                className="w-full px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-medium transition-colors"
              >
                Clear Selection
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-500">Select a date from the calendar to view details</p>
            </div>
          )}
        </div>
      </div>

      <AttendanceTable records={displayRecords} onStudentClick={setSelectedStudentId} />

      {selectedStudent && (
        <StudentDetailPanel student={selectedStudent} onClose={() => setSelectedStudentId(null)} />
      )}
    </div>
  );
}
