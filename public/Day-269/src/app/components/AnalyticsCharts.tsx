import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const trendData = [
  { date: "Feb 26", present: 1145, absent: 103 },
  { date: "Feb 27", present: 1167, absent: 81 },
  { date: "Feb 28", present: 1134, absent: 114 },
  { date: "Mar 1", present: 1178, absent: 70 },
  { date: "Mar 2", present: 1142, absent: 106 },
  { date: "Mar 3", present: 1189, absent: 59 },
  { date: "Mar 4", present: 1156, absent: 92 },
];

const classData = [
  { class: "Grade 10-A", rate: 94.5 },
  { class: "Grade 10-B", rate: 91.2 },
  { class: "Grade 10-C", rate: 89.8 },
  { class: "Grade 11-A", rate: 93.7 },
  { class: "Grade 11-B", rate: 90.4 },
  { class: "Grade 12-A", rate: 95.2 },
];

const weeklyData = [
  { name: "Present", value: 6745, color: "#10b981" },
  { name: "Absent", value: 625, color: "#ef4444" },
  { name: "Late", value: 368, color: "#f59e0b" },
];

const absentStudents = [
  { name: "James Wilson", absences: 34 },
  { name: "Sarah Davis", absences: 28 },
  { name: "Alex Thompson", absences: 25 },
  { name: "Emily Rodriguez", absences: 22 },
  { name: "Daniel Kim", absences: 19 },
];

export function AnalyticsCharts() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 font-bold text-gray-900">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Attendance Trends Over Time */}
        <div className="rounded-lg border border-gray-100 p-4">
          <h3 className="mb-4 text-sm font-medium text-gray-900">
            Attendance Trends (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="present"
                stroke="#10b981"
                strokeWidth={2}
                name="Present"
              />
              <Line
                type="monotone"
                dataKey="absent"
                stroke="#ef4444"
                strokeWidth={2}
                name="Absent"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Class-wise Attendance Rate */}
        <div className="rounded-lg border border-gray-100 p-4">
          <h3 className="mb-4 text-sm font-medium text-gray-900">
            Class-wise Attendance Rate
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={classData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="class" tick={{ fontSize: 12 }} stroke="#999" />
              <YAxis tick={{ fontSize: 12 }} stroke="#999" domain={[80, 100]} />
              <Tooltip />
              <Bar dataKey="rate" fill="#3b82f6" name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Attendance Comparison */}
        <div className="rounded-lg border border-gray-100 p-4">
          <h3 className="mb-4 text-sm font-medium text-gray-900">
            Weekly Attendance Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={weeklyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {weeklyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Most Absent Students */}
        <div className="rounded-lg border border-gray-100 p-4">
          <h3 className="mb-4 text-sm font-medium text-gray-900">
            Most Absent Students
          </h3>
          <div className="space-y-3">
            {absentStudents.map((student, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-medium text-red-600">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {student.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-red-600">
                    {student.absences}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
