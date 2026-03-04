import { useSimulation } from "../context/SimulationContext";
import { AlertCircle, CheckCircle, XCircle, ArrowRight } from "lucide-react";

export function LogsViewer({ compact = false }: { compact?: boolean }) {
  const { logs } = useSimulation();

  const getLogIcon = (type: string) => {
    switch (type) {
      case "received":
        return <ArrowRight className="w-4 h-4 text-blue-400" />;
      case "matched":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case "blocked":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "forwarded":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      default:
        return null;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case "received":
        return "border-blue-500/20";
      case "matched":
        return "border-yellow-500/20";
      case "blocked":
        return "border-red-500/20";
      case "forwarded":
        return "border-green-500/20";
      default:
        return "border-slate-700";
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800">
      <div className="p-4 border-b border-slate-800">
        <h2 className="font-semibold text-slate-200">Event Logs</h2>
      </div>

      <div className={`overflow-auto ${compact ? "max-h-64" : "max-h-96"}`}>
        {logs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="text-sm">No events logged yet</p>
            <p className="text-xs mt-1">Start the simulation to see logs</p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`flex items-start gap-3 p-3 bg-slate-950 rounded border-l-2 ${getLogColor(
                  log.type
                )}`}
              >
                <div className="mt-0.5">{getLogIcon(log.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{log.message}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono text-slate-500">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    {log.packetId && (
                      <span className="text-xs font-mono text-slate-600">{log.packetId}</span>
                    )}
                    {log.ruleId && (
                      <span className="text-xs font-mono text-slate-600">{log.ruleId}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
