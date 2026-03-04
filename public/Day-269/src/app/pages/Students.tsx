import { useState } from 'react';
import { Search, Filter, Mail, Phone } from 'lucide-react';
import { students } from '../data/mockData';
import { StudentDetailPanel } from '../components/StudentDetailPanel';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;

    return matchesSearch && matchesClass;
  });

  const selectedStudent = selectedStudentId
    ? students.find((s) => s.id === selectedStudentId)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Students</h2>
          <p className="text-slate-600">Manage and view student information</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all shadow-md">
          Add New Student
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Classes</option>
            <option value="Grade 10-A">Grade 10-A</option>
            <option value="Grade 10-B">Grade 10-B</option>
            <option value="Grade 11-A">Grade 11-A</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => setSelectedStudentId(student.id)}
              className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 cursor-pointer transition-all hover:shadow-md border border-slate-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={student.profilePhoto}
                  alt={student.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-sm"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">{student.name}</h4>
                  <p className="text-sm text-slate-600 mb-1">{student.rollNumber}</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    {student.class}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span>{student.name.toLowerCase().replace(' ', '.')}@school.edu</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span>+1 234-567-{String(1000 + parseInt(student.id) * 111).slice(-4)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Attendance Rate</span>
                  <span className="text-lg font-bold text-slate-900">
                    {student.attendancePercentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      student.attendancePercentage >= 90
                        ? 'bg-green-500'
                        : student.attendancePercentage >= 80
                        ? 'bg-blue-500'
                        : student.attendancePercentage >= 70
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${student.attendancePercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="py-12 text-center text-slate-500">No students found</div>
        )}
      </div>

      {selectedStudent && (
        <StudentDetailPanel student={selectedStudent} onClose={() => setSelectedStudentId(null)} />
      )}
    </div>
  );
}
