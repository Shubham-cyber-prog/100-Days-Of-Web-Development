import { Service } from '../types/service';
import { X, Play, Maximize2 } from 'lucide-react';

interface ServiceDetailPanelProps {
  service: Service | null;
  onClose: () => void;
}

export function ServiceDetailPanel({ service, onClose }: ServiceDetailPanelProps) {
  if (!service) return null;

  return (
    <aside className="w-80 bg-gray-950 border-l border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Service Details</h3>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Service Name</h4>
          <p className="text-white">{service.name}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Status</h4>
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              service.status === 'healthy'
                ? 'bg-green-500/20 text-green-400'
                : service.status === 'degraded'
                ? 'bg-yellow-500/20 text-yellow-400'
                : service.status === 'down'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-orange-500/20 text-orange-400'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                service.status === 'healthy'
                  ? 'bg-green-400'
                  : service.status === 'degraded'
                  ? 'bg-yellow-400'
                  : service.status === 'down'
                  ? 'bg-red-400'
                  : 'bg-orange-400'
              }`}
            />
            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
          </span>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Endpoint URL</h4>
          <code className="block px-3 py-2 bg-gray-900 rounded text-sm text-blue-400 font-mono">
            {service.endpoint}
          </code>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Metrics</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">CPU Usage</span>
              <span className="text-white font-medium">{service.cpu}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${service.cpu}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Memory</span>
              <span className="text-white font-medium">{service.memory}MB</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${(service.memory / 4096) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Response Time</span>
              <span className="text-white font-medium">{service.responseTime}ms</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Error Rate</span>
              <span className="text-white font-medium">{service.errorRate}%</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Requests</span>
              <span className="text-white font-medium">{service.requests}/min</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Instances</h4>
          <p className="text-white">{service.instances} active</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Dependencies</h4>
          <div className="space-y-2">
            {service.dependencies.length > 0 ? (
              service.dependencies.map((dep) => (
                <div
                  key={dep}
                  className="px-3 py-2 bg-gray-800 rounded text-sm text-gray-300"
                >
                  {dep}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No dependencies</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Recent Logs</h4>
          <div className="space-y-2">
            <div className="px-3 py-2 bg-gray-900 rounded text-xs font-mono text-gray-400">
              <span className="text-green-400">[INFO]</span> Request processed
              successfully
            </div>
            <div className="px-3 py-2 bg-gray-900 rounded text-xs font-mono text-gray-400">
              <span className="text-blue-400">[DEBUG]</span> Connection established
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors">
            <Play className="w-4 h-4" />
            Restart
          </button>
          <button className="flex-1 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center gap-2 transition-colors">
            <Maximize2 className="w-4 h-4" />
            Scale
          </button>
        </div>
      </div>
    </aside>
  );
}
