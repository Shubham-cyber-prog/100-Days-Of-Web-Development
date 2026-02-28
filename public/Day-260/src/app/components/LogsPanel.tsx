import { AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useVMContext } from "../context/VMContext";
import { format } from "date-fns";

export default function LogsPanel() {
  const { logs } = useVMContext();

  const getLogIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
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

  return (
    <div>
      <h3 className="text-lg text-foreground mb-4">Recent Logs & Events</h3>
      <div className="bg-card border border-border rounded-lg p-4 max-h-96 overflow-y-auto">
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${getLogColor(log.type)}`}
            >
              {getLogIcon(log.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{log.message}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {format(new Date(log.timestamp), "MMM dd, yyyy HH:mm:ss")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
