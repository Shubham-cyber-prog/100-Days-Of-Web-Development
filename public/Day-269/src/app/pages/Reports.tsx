import { Download, FileText, Calendar, TrendingUp } from 'lucide-react';

export default function Reports() {
  const reportTypes = [
    {
      id: 1,
      title: 'Monthly Attendance Report',
      description: 'Complete attendance data for the current month',
      icon: Calendar,
      format: 'PDF, Excel',
      color: 'blue',
    },
    {
      id: 2,
      title: 'Student-wise Report',
      description: 'Individual attendance records for each student',
      icon: FileText,
      format: 'PDF, CSV',
      color: 'green',
    },
    {
      id: 3,
      title: 'Class-wise Summary',
      description: 'Attendance summary grouped by class',
      icon: TrendingUp,
      format: 'PDF, Excel',
      color: 'yellow',
    },
    {
      id: 4,
      title: 'Absentee Report',
      description: 'List of students with low attendance',
      icon: FileText,
      format: 'PDF, CSV',
      color: 'red',
    },
  ];

  const recentReports = [
    {
      id: 1,
      name: 'February 2026 Attendance Report',
      date: '2026-03-01',
      size: '1.2 MB',
      format: 'PDF',
    },
    {
      id: 2,
      name: 'Grade 10-A Weekly Summary',
      date: '2026-02-28',
      size: '850 KB',
      format: 'Excel',
    },
    {
      id: 3,
      name: 'Monthly Absentee List',
      date: '2026-02-25',
      size: '450 KB',
      format: 'CSV',
    },
  ];

  const colorStyles = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    green: 'from-green-50 to-green-100 border-green-200',
    yellow: 'from-yellow-50 to-yellow-100 border-yellow-200',
    red: 'from-red-50 to-red-100 border-red-200',
  };

  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">Reports</h2>
        <p className="text-slate-600">Generate and download attendance reports</p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className={`bg-gradient-to-br ${
                colorStyles[report.color as keyof typeof colorStyles]
              } rounded-xl p-6 border`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 bg-white rounded-lg shadow-sm ${
                    iconColors[report.color as keyof typeof iconColors]
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-slate-600 bg-white px-3 py-1 rounded-full">
                  {report.format}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">{report.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{report.description}</p>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          );
        })}
      </div>

      {/* Custom Report Builder */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Custom Report Builder</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Attendance Summary</option>
              <option>Detailed Records</option>
              <option>Absentee Report</option>
              <option>Class Performance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Class Filter</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Classes</option>
              <option>Grade 10-A</option>
              <option>Grade 10-B</option>
              <option>Grade 11-A</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Format</label>
            <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>PDF</option>
              <option>Excel (.xlsx)</option>
              <option>CSV</option>
            </select>
          </div>
        </div>

        <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all shadow-md">
          <Download className="w-4 h-4" />
          Generate Custom Report
        </button>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Reports</h3>

        <div className="space-y-3">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{report.name}</p>
                  <p className="text-sm text-slate-600">
                    Generated on {new Date(report.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })} • {report.size} • {report.format}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
