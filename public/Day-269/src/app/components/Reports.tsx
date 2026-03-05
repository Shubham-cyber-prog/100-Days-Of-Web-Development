import { Download, FileText, Calendar, Printer, Mail } from "lucide-react";
import { useState } from "react";

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  status: "completed" | "pending" | "scheduled";
  size: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Monthly Attendance Report - March 2026",
    type: "Monthly Summary",
    date: "Mar 4, 2026",
    status: "pending",
    size: "-",
  },
  {
    id: "2",
    title: "Weekly Attendance Report - Week 9",
    type: "Weekly Summary",
    date: "Mar 3, 2026",
    status: "completed",
    size: "2.4 MB",
  },
  {
    id: "3",
    title: "Class-wise Attendance - February 2026",
    type: "Class Analysis",
    date: "Feb 28, 2026",
    status: "completed",
    size: "3.1 MB",
  },
  {
    id: "4",
    title: "Student Absence Report - February 2026",
    type: "Absence Analysis",
    date: "Feb 28, 2026",
    status: "completed",
    size: "1.8 MB",
  },
  {
    id: "5",
    title: "Annual Attendance Report 2025-2026",
    type: "Annual Summary",
    date: "Mar 10, 2026",
    status: "scheduled",
    size: "-",
  },
];

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-600">Generate and export attendance reports</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:shadow-lg">
          <Plus className="h-4 w-4" />
          Generate New Report
        </button>
      </div>

      {/* Quick Report Generator */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-gray-900">Quick Report Generator</h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Report Type
            </label>
            <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-500">
              <option>Daily Summary</option>
              <option>Weekly Summary</option>
              <option>Monthly Summary</option>
              <option>Class-wise Analysis</option>
              <option>Student-wise Analysis</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-500"
            >
              <option value="daily">Today</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Format
            </label>
            <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-blue-500">
              <option>PDF Document</option>
              <option>Excel Spreadsheet</option>
              <option>CSV File</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
            <Download className="h-4 w-4" />
            Generate & Download
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            <Mail className="h-4 w-4" />
            Email
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-4">
          <h2 className="font-bold text-gray-900">Recent Reports</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {report.date}
                    </span>
                    <span>•</span>
                    <span>{report.type}</span>
                    {report.size !== "-" && (
                      <>
                        <span>•</span>
                        <span>{report.size}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    report.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : report.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>

                {report.status === "completed" && (
                  <button className="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-50">
                    <Download className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-3 rounded-lg bg-green-100 p-3 w-fit">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900">Daily Report</h3>
          <p className="mt-2 text-sm text-gray-600">
            Generate daily attendance summary with student details
          </p>
          <button className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            Use Template
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-3 rounded-lg bg-blue-100 p-3 w-fit">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900">Class Analysis</h3>
          <p className="mt-2 text-sm text-gray-600">
            Detailed class-wise attendance breakdown and trends
          </p>
          <button className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            Use Template
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-3 rounded-lg bg-purple-100 p-3 w-fit">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900">Custom Report</h3>
          <p className="mt-2 text-sm text-gray-600">
            Create custom reports with specific parameters
          </p>
          <button className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}
