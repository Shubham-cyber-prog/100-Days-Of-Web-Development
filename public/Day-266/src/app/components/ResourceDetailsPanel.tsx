import { X, Copy, ExternalLink } from "lucide-react";
import { mockLogs } from "../data/mockData";

interface ResourceDetailsPanelProps {
  resource: any;
  onClose: () => void;
}

export function ResourceDetailsPanel({ resource, onClose }: ResourceDetailsPanelProps) {
  const { type, data } = resource;

  return (
    <div className="bg-slate-900 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${
              data.status === "Running" || data.status === "Ready" ? "bg-green-500" :
              data.status === "Pending" ? "bg-yellow-500" :
              data.status === "Failed" ? "bg-red-500" : "bg-blue-500"
            }`} />
            <h3 className="font-semibold">{data.name}</h3>
          </div>
          <p className="text-xs text-slate-500 capitalize">{type}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Status */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-slate-400 mb-2">STATUS</h4>
          <div className="bg-slate-800 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Status</span>
              <span className={`text-sm font-medium ${
                data.status === "Running" || data.status === "Ready" ? "text-green-400" :
                data.status === "Pending" ? "text-yellow-400" :
                data.status === "Failed" ? "text-red-400" : "text-blue-400"
              }`}>
                {data.status}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-slate-400 mb-2">DETAILS</h4>
          <div className="bg-slate-800 rounded-lg p-3 space-y-2 text-sm">
            {type === "pod" && (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-500">Namespace</span>
                  <span>{data.namespace}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Node</span>
                  <span>{data.node}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Containers</span>
                  <span>{data.containers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Restarts</span>
                  <span>{data.restarts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Age</span>
                  <span>{data.age}</span>
                </div>
              </>
            )}
            {type === "node" && (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-500">Role</span>
                  <span>{data.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Version</span>
                  <span>{data.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pods</span>
                  <span>{data.pods}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Age</span>
                  <span>{data.age}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Resource Usage */}
        {(type === "pod" || type === "node") && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-slate-400 mb-2">RESOURCE USAGE</h4>
            <div className="bg-slate-800 rounded-lg p-3 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">CPU</span>
                  <span>{data.cpu}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${data.cpu}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Memory</span>
                  <span>{data.memory}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-500"
                    style={{ width: `${data.memory}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Labels */}
        {type === "pod" && data.labels && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-slate-400 mb-2">LABELS</h4>
            <div className="bg-slate-800 rounded-lg p-3">
              <div className="space-y-2 text-sm font-mono">
                {Object.entries(data.labels).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-slate-500">{key}:</span>
                    <span className="text-blue-400">{value as string}</span>
                    <button className="ml-auto p-1 hover:bg-slate-700 rounded transition-colors">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Event Logs */}
        <div>
          <h4 className="text-xs font-semibold text-slate-400 mb-2">EVENT LOGS</h4>
          <div className="bg-slate-800 rounded-lg p-3 max-h-64 overflow-auto">
            <div className="space-y-2 text-xs font-mono">
              {mockLogs.slice(0, 5).map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-slate-600">{log.timestamp}</span>
                  <span className={`${
                    log.level === "ERROR" ? "text-red-400" :
                    log.level === "WARN" ? "text-yellow-400" :
                    "text-slate-400"
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-slate-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm flex items-center justify-center gap-2 transition-colors">
          <ExternalLink className="w-4 h-4" />
          View Full Details
        </button>
      </div>
    </div>
  );
}
