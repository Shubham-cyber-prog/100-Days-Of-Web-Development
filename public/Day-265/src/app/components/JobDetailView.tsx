import { useParams, Link } from 'react-router';
import { ArrowLeft, ExternalLink, Play, Pause, Edit, Trash2, Download, Copy, Shield, RotateCcw } from 'lucide-react';
import { mockJobs, mockScrapedData, mockLogs } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { useState } from 'react';

export function JobDetailView() {
  const { jobId } = useParams();
  const job = mockJobs.find(j => j.id === jobId);
  const jobData = mockScrapedData.filter(d => d.jobId === jobId);
  const jobLogs = mockLogs.filter(l => l.jobId === jobId);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (!job) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Job not found</h2>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
            ← Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  const paginatedData = jobData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(jobData.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link 
            to="/jobs" 
            className="p-2 hover:bg-gray-100 rounded-lg mt-1"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{job.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <StatusBadge status={job.status} />
              <span className="text-sm text-gray-600">•</span>
              <a 
                href={job.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                {job.targetUrl}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Pause className="w-4 h-4" />
            Pause
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Data Preview Panel */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Scraped Data Preview</h2>
                <p className="text-sm text-gray-600 mt-0.5">{jobData.length} records total</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  CSV
                </button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  JSON
                </button>
              </div>
            </div>

            {jobData.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Timestamp</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">URL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {paginatedData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.price || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{item.timestamp}</td>
                          <td className="px-6 py-4">
                            {item.url ? (
                              <a 
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Link
                              </a>
                            ) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(page => (
                      <button 
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          currentPage === page 
                            ? 'bg-blue-600 text-white' 
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                No data has been scraped yet
              </div>
            )}
          </div>

          {/* Logs Viewer */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Job Logs</h2>
            </div>
            <div className="p-4 bg-gray-900 font-mono text-sm max-h-96 overflow-y-auto">
              {jobLogs.map((log) => (
                <div key={log.id} className="mb-2">
                  <span className="text-gray-400">[{log.timestamp}]</span>{' '}
                  <span className={`${
                    log.level === 'error' ? 'text-red-400' :
                    log.level === 'warning' ? 'text-yellow-400' :
                    log.level === 'success' ? 'text-green-400' :
                    'text-blue-400'
                  }`}>
                    [{log.level.toUpperCase()}]
                  </span>{' '}
                  <span className="text-gray-200">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Job Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Job Configuration</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Target URL</label>
                <div className="mt-1 flex items-center gap-2">
                  <input 
                    type="text" 
                    value={job.targetUrl} 
                    readOnly 
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Copy className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">CSS Selector</label>
                <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-900">
                  {job.selectors.css || 'Not set'}
                </div>
              </div>

              {job.selectors.xpath && (
                <div>
                  <label className="text-sm font-medium text-gray-600">XPath Selector</label>
                  <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-900">
                    {job.selectors.xpath}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-600">Schedule</label>
                <div className="mt-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                  {job.scheduleType}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Proxy Enabled</span>
                </div>
                <span className={`text-sm font-medium ${job.proxyEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                  {job.proxyEnabled ? 'Yes' : 'No'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Retry Attempts</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{job.retryAttempts}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Statistics</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Records Scraped</span>
                <span className="text-sm font-semibold text-gray-900">{job.recordsScraped.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Run</span>
                <span className="text-sm font-semibold text-gray-900">{job.lastRunTime}</span>
              </div>
              {job.nextRun && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next Run</span>
                  <span className="text-sm font-semibold text-blue-600">{job.nextRun}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
