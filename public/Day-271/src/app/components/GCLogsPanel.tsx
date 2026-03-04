import React from 'react';
import { useSimulation } from '../store/SimulationContext';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { GCLog } from '../types';

const LogEntry: React.FC<{ log: GCLog }> = ({ log }) => {
  const getLogColor = () => {
    switch (log.type) {
      case 'allocation':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'reference-created':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
      case 'reference-removed':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'gc-started':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'gc-completed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'object-collected':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'memory-reclaimed':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/50';
    }
  };

  const getLogIcon = () => {
    switch (log.type) {
      case 'allocation':
        return '📦';
      case 'reference-created':
        return '🔗';
      case 'reference-removed':
        return '⛓️‍💥';
      case 'gc-started':
        return '🚀';
      case 'gc-completed':
        return '✅';
      case 'object-collected':
        return '🗑️';
      case 'memory-reclaimed':
        return '♻️';
      default:
        return '📝';
    }
  };

  const timestamp = new Date(log.timestamp).toLocaleTimeString();

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-zinc-800/50 rounded transition-colors">
      <span className="text-lg mt-0.5">{getLogIcon()}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge className={`${getLogColor()} text-xs`}>
            {log.type.replace('-', ' ').toUpperCase()}
          </Badge>
          <span className="text-xs text-zinc-500 font-mono">{timestamp}</span>
        </div>
        <p className="text-sm text-zinc-300 font-mono">{log.message}</p>
      </div>
    </div>
  );
};

export const GCLogsPanel: React.FC = () => {
  const { logs } = useSimulation();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg h-80">
      <div className="px-6 py-4 border-b border-zinc-800">
        <h3 className="font-semibold text-white">GC Event Logs</h3>
        <p className="text-sm text-zinc-500 mt-1">Real-time garbage collection events</p>
      </div>
      
      <ScrollArea className="h-[calc(100%-72px)]">
        <div className="p-3">
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-zinc-500">
              <p>No events logged yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {logs.map((log) => (
                <LogEntry key={log.id} log={log} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
