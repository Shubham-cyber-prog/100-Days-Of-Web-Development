import { Link } from 'react-router';
import { Play, Pause, Edit, Trash2, ExternalLink, Filter, FileDown } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { useState } from 'react';

export function JobsView() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = mockJobs.filter(job => {
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.targetUrl.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Scraping Jobs</h1>
        <p className="text-gray-600 mt-1">Manage and monitor all your web scraping jobs</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Filter className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job name or URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="idle">Idle</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Job Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Target URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Records</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link to={`/jobs/${job.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                      {job.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={job.targetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {job.targetUrl.replace('https://', '').substring(0, 35)}...
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-900">{job.recordsScraped.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{job.lastRunTime}</div>
                    {job.nextRun && (
                      <div className="text-xs text-gray-500 mt-0.5">Next: {job.nextRun}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.scheduleType}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-green-50 rounded transition-colors" title="Start">
                        <Play className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Pause">
                        <Pause className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-blue-50 rounded transition-colors" title="Edit">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{filteredJobs.length}</span> of <span className="font-medium">{mockJobs.length}</span> jobs
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
          <button 
            onClick={() => {
              setStatusFilter('all');
              setSearchTerm('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
