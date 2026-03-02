import { Thread } from "../types/thread";

interface AnalyticsPanelProps {
  threads: Thread[];
  totalTime: number;
}

export function AnalyticsPanel({ threads, totalTime }: AnalyticsPanelProps) {
  const completedThreads = threads.filter((t) => t.status === "completed");
  
  const avgWaitingTime =
    completedThreads.length > 0
      ? completedThreads.reduce((sum, t) => sum + (t.waitingTime || 0), 0) / completedThreads.length
      : 0;
      
  const avgTurnaroundTime =
    completedThreads.length > 0
      ? completedThreads.reduce((sum, t) => sum + (t.turnaroundTime || 0), 0) / completedThreads.length
      : 0;
      
  const cpuUtilization =
    totalTime > 0
      ? (completedThreads.reduce((sum, t) => sum + t.burstTime, 0) / totalTime) * 100
      : 0;

  return (
    <div className="space-y-2">
      <h3 className="text-sm uppercase tracking-wider text-gray-400">Analytics</h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            Avg Waiting Time
          </div>
          <div className="text-2xl font-mono font-bold text-blue-400">
            {avgWaitingTime.toFixed(2)}ms
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            Avg Turnaround Time
          </div>
          <div className="text-2xl font-mono font-bold text-green-400">
            {avgTurnaroundTime.toFixed(2)}ms
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            CPU Utilization
          </div>
          <div className="text-2xl font-mono font-bold text-purple-400">
            {cpuUtilization.toFixed(1)}%
          </div>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
        <div className="grid grid-cols-4 gap-4 text-center font-mono text-sm">
          <div>
            <div className="text-gray-500 text-xs mb-1">Total</div>
            <div className="text-lg font-bold">{threads.length}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Ready</div>
            <div className="text-lg font-bold text-blue-400">
              {threads.filter((t) => t.status === "ready").length}
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Running</div>
            <div className="text-lg font-bold text-green-400">
              {threads.filter((t) => t.status === "running").length}
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Completed</div>
            <div className="text-lg font-bold text-gray-400">
              {completedThreads.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
