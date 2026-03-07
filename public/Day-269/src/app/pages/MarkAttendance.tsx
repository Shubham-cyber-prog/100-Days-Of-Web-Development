import { useState } from 'react';
import { Check, X, Clock, Save } from 'lucide-react';
import { students } from '../data/mockData';

export default function MarkAttendance() {
  const [selectedClass, setSelectedClass] = useState('Grade 10-A');
  const [attendanceData, setAttendanceData] = useState<Record<string, 'present' | 'absent' | 'late'>>(
    {}
  );

  const filteredStudents = students.filter((s) => s.class === selectedClass);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAll = (status: 'present' | 'absent' | 'late') => {
    const newData: Record<string, 'present' | 'absent' | 'late'> = {};
    filteredStudents.forEach((student) => {
      newData[student.id] = status;
    });
    setAttendanceData(newData);
  };

  const handleSave = () => {
    alert('Attendance saved successfully!');
  };

  const getButtonStyle = (studentId: string, status: 'present' | 'absent' | 'late') => {
    const isSelected = attendanceData[studentId] === status;
    const baseStyle = 'flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all';

    if (status === 'present') {
      return `${baseStyle} ${
        isSelected
          ? 'bg-green-500 text-white shadow-md'
          : 'bg-green-50 text-green-600 hover:bg-green-100'
      }`;
    }
    if (status === 'absent') {
      return `${baseStyle} ${
        isSelected
          ? 'bg-red-500 text-white shadow-md'
          : 'bg-red-50 text-red-600 hover:bg-red-100'
      }`;
    }
    return `${baseStyle} ${
      isSelected
        ? 'bg-yellow-500 text-white shadow-md'
        : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
    }`;
  };

  const markedCount = Object.keys(attendanceData).length;
  const totalCount = filteredStudents.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Mark Attendance</h2>
          <p className="text-slate-600">Mark attendance for today's session</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-slate-600">Progress</p>
            <p className="text-lg font-semibold text-slate-900">
              {markedCount} / {totalCount}
            </p>
          </div>
          <div className="w-16 h-16">
            <svg className="transform -rotate-90" width="64" height="64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#e2e8f0"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#3b82f6"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(markedCount / totalCount) * 175.93} 175.93`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700">Select Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Grade 10-A">Grade 10-A</option>
              <option value="Grade 10-B">Grade 10-B</option>
              <option value="Grade 11-A">Grade 11-A</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMarkAll('present')}
              className="px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
            >
              Mark All Present
            </button>
            <button
              onClick={() => handleMarkAll('absent')}
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
            >
              Mark All Absent
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredStudents.map((student) => (
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

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(student.id, 'present')}
                  className={getButtonStyle(student.id, 'present')}
                >
                  <Check className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => handleStatusChange(student.id, 'late')}
                  className={getButtonStyle(student.id, 'late')}
                >
                  <Clock className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => handleStatusChange(student.id, 'absent')}
                  className={getButtonStyle(student.id, 'absent')}
                >
                  <X className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-slate-200">
          <button className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={markedCount === 0}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
}
