import { LogEntry } from "../types/thread";
import { ScrollArea } from "./ui/scroll-area";

interface LogsPanelProps {
  logs: LogEntry[];
}

const logTypeColors = {
  added: "text-blue-400",
  started: "text-green-400",
  preempted: "text-yellow-400",
  completed: "text-gray-400",
};

const logTypeIcons = {
  added: "+",
  started: "▶",
  preempted: "⏸",
  completed: "✓",
};

export function LogsPanel({ logs }: LogsPanelProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm uppercase tracking-wider text-gray-400">Event Logs</h3>
      
      <ScrollArea className="h-[200px] bg-gray-900 rounded-lg border border-gray-700 p-4">
        <div className="space-y-2">
          {logs.length === 0 ? (
            <div className="text-gray-500 text-sm font-mono">No events yet...</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 font-mono text-sm">
                <span className="text-gray-500 w-12 shrink-0">{log.timestamp}ms</span>
                <span className={`w-4 ${logTypeColors[log.type]}`}>
                  {logTypeIcons[log.type]}
                </span>
                <span className="text-gray-300">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
