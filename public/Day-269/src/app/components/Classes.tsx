import { Users, TrendingUp, BookOpen, Plus } from "lucide-react";

interface ClassData {
  id: string;
  name: string;
  grade: string;
  students: number;
  teacher: string;
  attendanceRate: number;
  schedule: string;
}

const mockClasses: ClassData[] = [
  {
    id: "1",
    name: "Mathematics",
    grade: "Grade 10-A",
    students: 32,
    teacher: "Dr. Sarah Mitchell",
    attendanceRate: 94.5,
    schedule: "Mon, Wed, Fri - 9:00 AM",
  },
  {
    id: "2",
    name: "Physics",
    grade: "Grade 10-A",
    students: 32,
    teacher: "Prof. John Anderson",
    attendanceRate: 91.2,
    schedule: "Tue, Thu - 10:00 AM",
  },
  {
    id: "3",
    name: "Chemistry",
    grade: "Grade 10-B",
    students: 30,
    teacher: "Dr. Emily Parker",
    attendanceRate: 89.8,
    schedule: "Mon, Wed - 11:00 AM",
  },
  {
    id: "4",
    name: "Biology",
    grade: "Grade 10-B",
    students: 30,
    teacher: "Dr. Michael Brown",
    attendanceRate: 93.7,
    schedule: "Tue, Fri - 2:00 PM",
  },
  {
    id: "5",
    name: "English Literature",
    grade: "Grade 10-C",
    students: 28,
    teacher: "Ms. Rachel Green",
    attendanceRate: 90.4,
    schedule: "Mon, Thu - 1:00 PM",
  },
  {
    id: "6",
    name: "History",
    grade: "Grade 11-A",
    students: 35,
    teacher: "Prof. David Wilson",
    attendanceRate: 95.2,
    schedule: "Wed, Fri - 3:00 PM",
  },
];

export function Classes() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
          <p className="text-sm text-gray-600">Manage class schedules and information</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:shadow-lg">
          <Plus className="h-4 w-4" />
          Add Class
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">1,248</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-100 p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Attendance</p>
              <p className="text-2xl font-bold text-gray-900">92.6%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {mockClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{classItem.name}</h3>
                <p className="text-sm text-gray-600">{classItem.grade}</p>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  classItem.attendanceRate >= 90
                    ? "bg-green-100 text-green-700"
                    : classItem.attendanceRate >= 80
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {classItem.attendanceRate}% Attendance
              </div>
            </div>

            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Teacher</span>
                <span className="text-sm font-medium text-gray-900">
                  {classItem.teacher}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Students</span>
                <span className="text-sm font-medium text-gray-900">
                  {classItem.students}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Schedule</span>
                <span className="text-sm font-medium text-gray-900">
                  {classItem.schedule}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Attendance Rate</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${
                        classItem.attendanceRate >= 90
                          ? "bg-green-500"
                          : classItem.attendanceRate >= 80
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${classItem.attendanceRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                View Details
              </button>
              <button className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 py-2 text-sm font-medium text-white transition hover:shadow-md">
                Mark Attendance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
