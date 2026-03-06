import { Search, Plus, Download } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  email: string;
  phone: string;
  photo: string;
  attendanceRate: number;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emma Johnson",
    rollNumber: "2024001",
    class: "Grade 10-A",
    email: "emma.j@school.edu",
    phone: "+1 234-567-8901",
    photo: "https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?w=100&h=100&fit=crop",
    attendanceRate: 96.5,
  },
  {
    id: "2",
    name: "Michael Chen",
    rollNumber: "2024002",
    class: "Grade 10-A",
    email: "michael.c@school.edu",
    phone: "+1 234-567-8902",
    photo: "https://images.unsplash.com/photo-1680983387172-aedb346ba443?w=100&h=100&fit=crop",
    attendanceRate: 94.2,
  },
  {
    id: "3",
    name: "Sophia Martinez",
    rollNumber: "2024003",
    class: "Grade 10-B",
    email: "sophia.m@school.edu",
    phone: "+1 234-567-8903",
    photo: "https://images.unsplash.com/photo-1631131428457-3c14bdcb81d4?w=100&h=100&fit=crop",
    attendanceRate: 88.7,
  },
  {
    id: "4",
    name: "James Wilson",
    rollNumber: "2024004",
    class: "Grade 10-B",
    email: "james.w@school.edu",
    phone: "+1 234-567-8904",
    photo: "https://images.unsplash.com/photo-1622319107576-cca7c8a906f7?w=100&h=100&fit=crop",
    attendanceRate: 78.3,
  },
  {
    id: "5",
    name: "Olivia Brown",
    rollNumber: "2024005",
    class: "Grade 10-A",
    email: "olivia.b@school.edu",
    phone: "+1 234-567-8905",
    photo: "https://images.unsplash.com/photo-1729821728833-e03c2b5d979b?w=100&h=100&fit=crop",
    attendanceRate: 97.8,
  },
  {
    id: "6",
    name: "Noah Davis",
    rollNumber: "2024006",
    class: "Grade 10-C",
    email: "noah.d@school.edu",
    phone: "+1 234-567-8906",
    photo: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=100&h=100&fit=crop",
    attendanceRate: 91.4,
  },
];

export function Students() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.includes(searchQuery) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-sm text-gray-600">Manage student information</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:shadow-lg">
            <Plus className="h-4 w-4" />
            Add Student
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <ImageWithFallback
                src={student.photo}
                alt={student.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.rollNumber}</p>
                <p className="text-sm text-gray-600">{student.class}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">{student.email}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium text-gray-900">{student.phone}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Attendance:</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${
                        student.attendanceRate >= 90
                          ? "bg-green-500"
                          : student.attendanceRate >= 80
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${student.attendanceRate}%` }}
                    ></div>
                  </div>
                  <span className="font-medium text-gray-900">
                    {student.attendanceRate}%
                  </span>
                </div>
              </div>
            </div>

            <button className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
