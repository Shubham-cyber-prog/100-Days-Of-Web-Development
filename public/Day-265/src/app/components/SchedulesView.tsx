import { Calendar, Clock, Plus, Edit, Trash2, Play } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { StatusBadge } from './StatusBadge';

export function SchedulesView() {
  const scheduledJobs = mockJobs.filter(job => job.scheduleType !== 'Manual');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Schedules</h1>
          <p className="text-gray-600 mt-1">Manage automated scraping schedules</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Schedule
        </button>
      </div>

      {/* Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Schedules</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{scheduledJobs.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Schedules</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {scheduledJobs.filter(j => j.status === 'running').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Run</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">in 5 minutes</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Schedules List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Scheduled Jobs</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Job Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Schedule Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Last Run</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Next Run</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scheduledJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{job.name}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {job.scheduleType}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.lastRunTime}</td>
                  <td className="px-6 py-4">
                    {job.nextRun ? (
                      <span className="text-sm font-medium text-blue-600">{job.nextRun}</span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-blue-50 rounded" title="Edit Schedule">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded" title="Delete Schedule">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Types Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h3 className="font-semibold text-blue-900 mb-3">Available Schedule Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium text-blue-800">Frequent</p>
            <ul className="mt-2 space-y-1 text-blue-700">
              <li>• Every 15 minutes</li>
              <li>• Every 30 minutes</li>
              <li>• Hourly</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-blue-800">Regular</p>
            <ul className="mt-2 space-y-1 text-blue-700">
              <li>• Daily at specific time</li>
              <li>• Twice daily</li>
              <li>• Custom interval</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-blue-800">Periodic</p>
            <ul className="mt-2 space-y-1 text-blue-700">
              <li>• Weekly</li>
              <li>• Monthly</li>
              <li>• Manual trigger only</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
