import { LogsViewer } from "../components/LogsViewer";
import { List, Download, Trash2 } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

export function Logs() {
  const { logs } = useSimulation();

  const handleExport = () => {
    const logText = logs.map((log) => {
      const timestamp = new Date(log.timestamp).toISOString();
      return `[${timestamp}] [${log.type.toUpperCase()}] ${log.message}`;
    }).join("\n");

    const blob = new Blob([logText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `firewall-logs-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <List className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-semibold text-slate-200">Event Logs</h1>
          </div>
          <p className="text-sm text-slate-400">
            View detailed logs of all firewall events and packet processing activities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            disabled={logs.length === 0}
            className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> Export Logs
          </button>
        </div>
      </div>

      <LogsViewer />

      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase">Total Events</p>
              <p className="text-2xl font-semibold text-slate-200 mt-1">{logs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase">Received</p>
              <p className="text-2xl font-semibold text-blue-400 mt-1">
                {logs.filter((l) => l.type === "received").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase">Blocked</p>
              <p className="text-2xl font-semibold text-red-400 mt-1">
                {logs.filter((l) => l.type === "blocked").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase">Forwarded</p>
              <p className="text-2xl font-semibold text-green-400 mt-1">
                {logs.filter((l) => l.type === "forwarded").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-slate-900 rounded-lg border border-slate-800 p-6">
        <h2 className="font-semibold text-slate-200 mb-4">Log Event Types</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <h3 className="text-slate-300 font-medium">Received</h3>
            </div>
            <p className="text-xs text-slate-400 ml-4">Packet arrived at the firewall</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <h3 className="text-slate-300 font-medium">Matched</h3>
            </div>
            <p className="text-xs text-slate-400 ml-4">Packet matched a firewall rule</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <h3 className="text-slate-300 font-medium">Blocked</h3>
            </div>
            <p className="text-xs text-slate-400 ml-4">Packet was denied by firewall rule</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <h3 className="text-slate-300 font-medium">Forwarded</h3>
            </div>
            <p className="text-xs text-slate-400 ml-4">Packet was allowed and forwarded to destination</p>
          </div>
        </div>
      </div>
    </div>
  );
}
