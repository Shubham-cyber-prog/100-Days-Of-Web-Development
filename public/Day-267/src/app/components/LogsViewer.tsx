import { useSimulationStore } from '../store/simulationStore';
import { AlertCircle, Info, AlertTriangle } from 'lucide-react';

export function LogsViewer() {
  const logs = useSimulationStore((state) => state.logs);

  const getIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="h-full bg-gray-950 border-t border-gray-800 flex flex-col">
      <div className="px-4 py-3 border-b border-gray-800">
        <h3 className="text-sm font-semibold text-white">System Logs</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-3 p-2 rounded hover:bg-gray-900 transition-colors"
            >
              {getIcon(log.level)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-gray-500 text-xs">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="text-gray-400 text-xs">{log.service}</span>
                  <span
                    className={`text-xs uppercase font-semibold ${
                      log.level === 'error'
                        ? 'text-red-400'
                        : log.level === 'warning'
                        ? 'text-yellow-400'
                        : 'text-blue-400'
                    }`}
                  >
                    {log.level}
                  </span>
                </div>
                <p className="text-gray-300 text-xs">{log.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No logs yet. Start the simulation to see activity.
          </div>
        )}
      </div>
    </div>
  );
}
