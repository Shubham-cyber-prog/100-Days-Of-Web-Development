import { Search, Filter, Download, Trash2, Eye, MoreVertical, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function History() {
  const [searchQuery, setSearchQuery] = useState('');

  const historyData = [
    {
      id: 1,
      name: 'Q4 Financial Report 2025',
      date: '2026-02-23',
      time: '10:30 AM',
      originalLength: '45 pages',
      summaryLength: '2 pages',
      compression: '97%',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Product Requirements Document',
      date: '2026-02-23',
      time: '09:15 AM',
      originalLength: '32 pages',
      summaryLength: '3 pages',
      compression: '91%',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Market Research Analysis',
      date: '2026-02-22',
      time: '04:20 PM',
      originalLength: '67 pages',
      summaryLength: '4 pages',
      compression: '94%',
      status: 'completed'
    },
    {
      id: 4,
      name: 'Legal Contract Review',
      date: '2026-02-21',
      time: '02:45 PM',
      originalLength: '89 pages',
      summaryLength: '5 pages',
      compression: '94%',
      status: 'completed'
    },
    {
      id: 5,
      name: 'Technical Specification V2',
      date: '2026-02-21',
      time: '11:00 AM',
      originalLength: '56 pages',
      summaryLength: '4 pages',
      compression: '93%',
      status: 'completed'
    },
    {
      id: 6,
      name: 'Annual Business Plan',
      date: '2026-02-20',
      time: '03:30 PM',
      originalLength: '78 pages',
      summaryLength: '6 pages',
      compression: '92%',
      status: 'completed'
    },
    {
      id: 7,
      name: 'User Research Findings',
      date: '2026-02-20',
      time: '10:15 AM',
      originalLength: '41 pages',
      summaryLength: '3 pages',
      compression: '93%',
      status: 'completed'
    },
    {
      id: 8,
      name: 'Compliance Audit Report',
      date: '2026-02-19',
      time: '01:50 PM',
      originalLength: '52 pages',
      summaryLength: '4 pages',
      compression: '92%',
      status: 'completed'
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Document History</h1>
        <p className="text-muted-foreground">View and manage all your summarized documents</p>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          />
        </div>
        <button className="h-11 px-4 rounded-xl border border-border bg-white hover:bg-accent transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
        <button className="h-11 px-4 rounded-xl border border-border bg-white hover:bg-accent transition-colors flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Date Range</span>
        </button>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-white rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Documents</p>
          <p className="text-2xl font-semibold">124</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">This Month</p>
          <p className="text-2xl font-semibold">23</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Avg. Compression</p>
          <p className="text-2xl font-semibold text-green-600">93%</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Time Saved</p>
          <p className="text-2xl font-semibold text-purple-600">52 hrs</p>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Document Name</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Original</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Summary</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Compression</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="border-b border-border hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{item.date}</td>
                  <td className="px-6 py-4 text-sm">{item.originalLength}</td>
                  <td className="px-6 py-4 text-sm">{item.summaryLength}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                      {item.compression}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium capitalize">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                      <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 1-8 of 124 documents</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg border border-border hover:bg-gray-50 transition-colors text-sm">
              Previous
            </button>
            <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
              1
            </button>
            <button className="px-3 py-2 rounded-lg border border-border hover:bg-gray-50 transition-colors text-sm">
              2
            </button>
            <button className="px-3 py-2 rounded-lg border border-border hover:bg-gray-50 transition-colors text-sm">
              3
            </button>
            <button className="px-3 py-2 rounded-lg border border-border hover:bg-gray-50 transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
