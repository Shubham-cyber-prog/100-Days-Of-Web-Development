import { X, Search, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MarkAttendanceModalProps {
  onClose: () => void;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  photo: string;
  status: "present" | "absent" | "late" | null;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emma Johnson",
    rollNumber: "2024001",
    photo: "https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?w=100&h=100&fit=crop",
    status: null,
  },
  {
    id: "2",
    name: "Michael Chen",
    rollNumber: "2024002",
    photo: "https://images.unsplash.com/photo-1680983387172-aedb346ba443?w=100&h=100&fit=crop",
    status: null,
  },
  {
    id: "3",
    name: "Sophia Martinez",
    rollNumber: "2024003",
    photo: "https://images.unsplash.com/photo-1631131428457-3c14bdcb81d4?w=100&h=100&fit=crop",
    status: null,
  },
  {
    id: "4",
    name: "James Wilson",
    rollNumber: "2024004",
    photo: "https://images.unsplash.com/photo-1622319107576-cca7c8a906f7?w=100&h=100&fit=crop",
    status: null,
  },
  {
    id: "5",
    name: "Olivia Brown",
    rollNumber: "2024005",
    photo: "https://images.unsplash.com/photo-1729821728833-e03c2b5d979b?w=100&h=100&fit=crop",
    status: null,
  },
  {
    id: "6",
    name: "Noah Davis",
    rollNumber: "2024006",
    photo: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=100&h=100&fit=crop",
    status: null,
  },
];

export function MarkAttendanceModal({ onClose }: MarkAttendanceModalProps) {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [selectedClass, setSelectedClass] = useState("Grade 10-A");
  const [searchQuery, setSearchQuery] = useState("");

  const markStatus = (id: string, status: "present" | "absent" | "late") => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents((prev) =>
      prev.map((student) => ({ ...student, status: "present" as const }))
    );
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.includes(searchQuery)
  );

  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const lateCount = students.filter((s) => s.status === "late").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <div>
            <h2 className="font-bold text-gray-900">Mark Attendance</h2>
            <p className="text-sm text-gray-600">
              {selectedClass} • {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Summary Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-700">Present</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-green-900">{presentCount}</p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm text-red-700">Absent</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-red-900">{absentCount}</p>
            </div>
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-sm text-yellow-700">Late</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-yellow-900">{lateCount}</p>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="mb-4 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
            <button
              onClick={markAllPresent}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600"
            >
              Mark All Present
            </button>
          </div>

          {/* Student List */}
          <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="sticky top-0 border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                    Student
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                    Roll Number
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600">
                    Mark Attendance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={student.photo}
                          alt={student.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {student.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {student.rollNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => markStatus(student.id, "present")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                            student.status === "present"
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-green-100"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => markStatus(student.id, "absent")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                            student.status === "absent"
                              ? "bg-red-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-red-100"
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => markStatus(student.id, "late")}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                            student.status === "late"
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-yellow-100"
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-gradient-to-r from-blue-500 to-green-500 px-6 py-2 text-sm font-medium text-white shadow-md transition hover:shadow-lg"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
