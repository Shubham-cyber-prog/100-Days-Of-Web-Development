import { AlertCircle, Info, AlertTriangle, Download, Filter } from "lucide-react";
import { useVMContext } from "../context/VMContext";
import { format } from "date-fns";
import { useState } from "react";

export default function Logs() {
  const { logs } = useVMContext();
  const [filterType, setFilterType] = useState<string>("all");

  const filteredLogs = logs.filter((log) => {
    if (filterType === "all") return true;
    return log.type === filterType;
  });

  const getLogIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-500/10 border-red-500/20";
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20";
      default:
        return "bg-blue-500/10 border-blue-500/20";
    }
  };

  const logStats = {
    total: logs.length,
    info: logs.filter((log) => log.type === "info").length,
    warning: logs.filter((log) => log.type === "warning").length,
    error: logs.filter((log) => log.type === "error").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-foreground mb-1">System Logs</h2>
          <p className="text-sm text-muted-foreground">
            View all system events and VM activities
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          <Download className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      {/* Log Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl text-foreground mb-1">{logStats.total}</div>
          <div className="text-sm text-muted-foreground">Total Events</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl text-blue-500 mb-1">{logStats.info}</div>
          <div className="text-sm text-muted-foreground">Info</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl text-yellow-500 mb-1">{logStats.warning}</div>
          <div className="text-sm text-muted-foreground">Warnings</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl text-red-500 mb-1">{logStats.error}</div>
          <div className="text-sm text-muted-foreground">Errors</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          Filter:
        </div>
        <div className="flex gap-2">
          {["all", "info", "warning", "error"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                filterType === type
                  ? "bg-blue-600 text-white"
                  : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="space-y-2">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className={`flex items-start gap-4 p-4 rounded-lg border ${getLogColor(log.type)}`}
            >
              {getLogIcon(log.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground mb-1">{log.message}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {format(new Date(log.timestamp), "MMM dd, yyyy HH:mm:ss")}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  log.type === "error"
                    ? "bg-red-500/20 text-red-500"
                    : log.type === "warning"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : "bg-blue-500/20 text-blue-500"
                }`}
              >
                {log.type.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
