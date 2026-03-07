import { Clock, Activity, FolderOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SessionInfoProps {
  currentDirectory: string;
  startTime: Date;
  processes: Array<{ pid: number; name: string; cpu: string }>;
  envVars: Record<string, string>;
}

export function SessionInfo({ currentDirectory, startTime, processes, envVars }: SessionInfoProps) {
  const [uptime, setUptime] = useState('00:00:00');

  useEffect(() => {
    const updateUptime = () => {
      const diff = Date.now() - startTime.getTime();
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setUptime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };

    updateUptime();
    const interval = setInterval(updateUptime, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <aside className="w-80 bg-zinc-900 border-l border-zinc-800 p-4 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FolderOpen className="w-4 h-4 text-green-400" />
            <h3 className="font-semibold text-white text-sm">Current Directory</h3>
          </div>
          <div className="bg-zinc-800 rounded px-3 py-2 font-mono text-sm text-green-400">
            {currentDirectory}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-green-400" />
            <h3 className="font-semibold text-white text-sm">Session Uptime</h3>
          </div>
          <div className="bg-zinc-800 rounded px-3 py-2 font-mono text-sm text-white">
            {uptime}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-green-400" />
            <h3 className="font-semibold text-white text-sm">Active Processes</h3>
          </div>
          <div className="bg-zinc-800 rounded divide-y divide-zinc-700">
            {processes.length === 0 ? (
              <div className="px-3 py-2 text-sm text-zinc-500">No active processes</div>
            ) : (
              processes.map((proc) => (
                <div key={proc.pid} className="px-3 py-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white font-mono">{proc.name}</span>
                    <span className="text-xs text-zinc-400">PID: {proc.pid}</span>
                  </div>
                  <div className="text-xs text-green-400 mt-1">CPU: {proc.cpu}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white text-sm mb-3">Environment Variables</h3>
          <div className="bg-zinc-800 rounded px-3 py-2 space-y-2 max-h-64 overflow-y-auto">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="text-blue-400 font-mono">{key}</span>
                <span className="text-zinc-500">=</span>
                <span className="text-zinc-300 font-mono">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
