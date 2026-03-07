import { Terminal, Download, Trash2 } from "lucide-react";
import { mockLogs } from "../data/mockData";
import { useState } from "react";

export function Logs() {
  const [filter, setFilter] = useState("all");
  
  const filteredLogs = filter === "all" 
    ? mockLogs 
    : mockLogs.filter(log => log.level === filter);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Logs</h2>
          <p className="text-sm text-slate-400">Cluster-wide event logs and messages</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="INFO">Info</option>
            <option value="WARN">Warning</option>
            <option value="ERROR">Error</option>
          </select>
          <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-4 py-2 text-sm flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-4 py-2 text-sm flex items-center gap-2 transition-colors">
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2 bg-slate-950">
          <Terminal className="w-4 h-4 text-slate-400" />
          <h3 className="font-semibold font-mono text-sm">Cluster Logs</h3>
        </div>
        <div className="p-4 bg-slate-950 max-h-[calc(100vh-300px)] overflow-auto">
          <div className="font-mono text-xs space-y-1">
            {filteredLogs.map((log, index) => (
              <div 
                key={index} 
                className="flex gap-3 py-1 hover:bg-slate-900/50 px-2 -mx-2 rounded transition-colors"
              >
                <span className="text-slate-600 w-40 shrink-0">{log.timestamp}</span>
                <span className={`w-12 shrink-0 ${
                  log.level === "ERROR" ? "text-red-400" :
                  log.level === "WARN" ? "text-yellow-400" :
                  log.level === "INFO" ? "text-blue-400" :
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
  );
}
