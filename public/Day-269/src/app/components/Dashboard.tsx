import { Users, UserCheck, UserX, TrendingUp, Calendar as CalendarIcon } from "lucide-react";
import { AttendanceCalendar } from "./AttendanceCalendar";
import { AttendanceTable } from "./AttendanceTable";
import { StudentDetailPanel } from "./StudentDetailPanel";
import { AnalyticsCharts } from "./AnalyticsCharts";
import { MarkAttendanceModal } from "./MarkAttendanceModal";
import { useState } from "react";
import { useOutletContext } from "react-router";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  status: "present" | "absent" | "late";
  timestamp: string;
  photo: string;
  attendanceRate: number;
}

export function Dashboard() {
  const { showMarkAttendance, setShowMarkAttendance } = useOutletContext<{
    showMarkAttendance: boolean;
    setShowMarkAttendance: (show: boolean) => void;
  }>();
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const stats = [
    {
      icon: Users,
      label: "Total Students",
      value: "1,248",
      trend: "+12%",
      trendUp: true,
      color: "blue",
    },
    {
      icon: UserCheck,
      label: "Present Today",
      value: "1,156",
      trend: "+5%",
      trendUp: true,
      color: "green",
    },
    {
      icon: UserX,
      label: "Absent Today",
      value: "92",
      trend: "-3%",
      trendUp: false,
      color: "red",
    },
    {
      icon: TrendingUp,
      label: "Attendance Rate",
      value: "92.6%",
      trend: "+2.1%",
      trendUp: true,
      color: "purple",
    },
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-600">Track and manage student attendance</p>
        </div>

        {/* Overview Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <span
                        className={`text-sm font-medium ${
                          stat.trendUp ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.trend}
                      </span>
                      <span className="text-xs text-gray-500">vs last week</span>
                    </div>
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      stat.color === "blue"
                        ? "bg-blue-100"
                        : stat.color === "green"
                        ? "bg-green-100"
                        : stat.color === "red"
                        ? "bg-red-100"
                        : "bg-purple-100"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        stat.color === "blue"
                          ? "text-blue-600"
                          : stat.color === "green"
                          ? "text-green-600"
                          : stat.color === "red"
                          ? "text-red-600"
                          : "text-purple-600"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Attendance Calendar */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-700" />
              <h2 className="font-bold text-gray-900">Attendance Calendar</h2>
            </div>
            <AttendanceCalendar />
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-900">Today's Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">On Time</p>
                    <p className="font-bold text-gray-900">1,089</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">87.2%</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Late Arrivals</p>
                    <p className="font-bold text-gray-900">67</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-yellow-600">5.4%</p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <UserX className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Absent</p>
                    <p className="font-bold text-gray-900">92</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">7.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="mt-6">
          <AttendanceTable onSelectStudent={setSelectedStudent} />
        </div>

        {/* Analytics Charts */}
        <div className="mt-6">
          <AnalyticsCharts />
        </div>
      </div>

      {/* Right Sidebar - Student Details */}
      {selectedStudent && (
        <StudentDetailPanel
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Mark Attendance Modal */}
      {showMarkAttendance && (
        <MarkAttendanceModal onClose={() => setShowMarkAttendance(false)} />
      )}
    </div>
  );
}
