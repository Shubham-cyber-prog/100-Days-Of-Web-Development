import { Calendar, Download, Filter } from "lucide-react";
import { AttendanceTable } from "./AttendanceTable";
import { useState } from "react";

export function Attendance() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Records</h1>
          <p className="text-sm text-gray-600">View and manage attendance history</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
            Select Date
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:shadow-lg">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Total Records</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">8,456</p>
          <p className="mt-1 text-xs text-gray-500">Last 30 days</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Present</p>
          <p className="mt-2 text-3xl font-bold text-green-600">7,823</p>
          <p className="mt-1 text-xs text-green-600">92.5% average</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Absent</p>
          <p className="mt-2 text-3xl font-bold text-red-600">456</p>
          <p className="mt-1 text-xs text-red-600">5.4% average</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Late</p>
          <p className="mt-2 text-3xl font-bold text-yellow-600">177</p>
          <p className="mt-1 text-xs text-yellow-600">2.1% average</p>
        </div>
      </div>

      {/* Attendance Table */}
      <AttendanceTable onSelectStudent={setSelectedStudent} />

      {/* Monthly Overview */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-gray-900">Monthly Overview</h2>
        <div className="grid grid-cols-7 gap-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center">
              <p className="mb-2 text-xs font-medium text-gray-600">{day}</p>
              <div className="space-y-2">
                {[95, 92, 88, 94].map((rate, idx) => (
                  <div
                    key={idx}
                    className={`rounded p-2 text-xs font-medium ${
                      rate >= 90
                        ? "bg-green-100 text-green-700"
                        : rate >= 80
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {rate}%
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
