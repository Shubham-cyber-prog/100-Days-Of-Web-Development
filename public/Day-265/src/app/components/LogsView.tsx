import { ScrollText, Download, Filter } from 'lucide-react';
import { mockLogs, mockJobs } from '../data/mockData';
import { useState } from 'react';

export function LogsView() {
  const [jobFilter, setJobFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredLogs = mockLogs.filter(log => {
    const matchesJob = jobFilter === 'all' || log.jobId === jobFilter;
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesJob && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">System Logs</h1>
        <p className="text-gray-600 mt-1">Monitor all scraping activities and system events</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Jobs</option>
            {mockJobs.map(job => (
              <option key={job.id} value={job.id}>{job.name}</option>
            ))}
          </select>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          <div className="flex-1"></div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Logs Display */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Activity Logs</h2>
              <p className="text-sm text-gray-600 mt-0.5">{filteredLogs.length} log entries</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Auto-refresh enabled</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {filteredLogs.length > 0 ? (
          <div className="p-6 bg-gray-900 font-mono text-sm max-h-[600px] overflow-y-auto">
            {filteredLogs.map((log) => {
              const job = mockJobs.find(j => j.id === log.jobId);
              return (
                <div key={log.id} className="mb-2 flex gap-3">
                  <span className="text-gray-400 whitespace-nowrap">{log.timestamp}</span>
                  <span className={`whitespace-nowrap ${
                    log.level === 'error' ? 'text-red-400' :
                    log.level === 'warning' ? 'text-yellow-400' :
                    log.level === 'success' ? 'text-green-400' :
                    'text-blue-400'
                  }`}>
                    [{log.level.toUpperCase()}]
                  </span>
                  <span className="text-purple-400 whitespace-nowrap">[{job?.name || 'Unknown'}]</span>
                  <span className="text-gray-200">{log.message}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <ScrollText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">No logs found</h3>
            <p className="text-sm text-gray-600">No activity matches your current filters</p>
          </div>
        )}
      </div>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Info</p>
              <p className="text-xl font-semibold text-gray-900">
                {mockLogs.filter(l => l.level === 'info').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Success</p>
              <p className="text-xl font-semibold text-gray-900">
                {mockLogs.filter(l => l.level === 'success').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Warning</p>
              <p className="text-xl font-semibold text-gray-900">
                {mockLogs.filter(l => l.level === 'warning').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Error</p>
              <p className="text-xl font-semibold text-gray-900">
                {mockLogs.filter(l => l.level === 'error').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
