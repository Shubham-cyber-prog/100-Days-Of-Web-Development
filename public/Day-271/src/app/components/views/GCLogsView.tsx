import React from 'react';
import { useSimulation } from '../../store/SimulationContext';
import { Badge } from '../ui/badge';
import { GCLog } from '../../types';

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

  const timestamp = new Date(log.timestamp).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  });

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-zinc-800/50 rounded-lg transition-colors border border-zinc-800">
      <span className="text-2xl mt-1">{getLogIcon()}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <Badge className={`${getLogColor()}`}>
            {log.type.replace('-', ' ').toUpperCase()}
          </Badge>
          <span className="text-sm text-zinc-500 font-mono">{timestamp}</span>
        </div>
        <p className="text-sm text-zinc-300 font-mono leading-relaxed">{log.message}</p>
        {log.objectId && (
          <p className="text-xs text-zinc-600 font-mono mt-2">Object: {log.objectId}</p>
        )}
      </div>
    </div>
  );
};

export const GCLogsView: React.FC = () => {
  const { logs } = useSimulation();

  const groupedLogs = {
    allocation: logs.filter((l) => l.type === 'allocation'),
    gc: logs.filter((l) => l.type === 'gc-started' || l.type === 'gc-completed'),
    references: logs.filter((l) => l.type === 'reference-created' || l.type === 'reference-removed'),
    collection: logs.filter((l) => l.type === 'object-collected' || l.type === 'memory-reclaimed'),
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">GC Logs</h2>
        <p className="text-zinc-400">Detailed event logs for garbage collection operations</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-1">Allocations</p>
          <p className="text-2xl font-semibold text-blue-400">{groupedLogs.allocation.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-1">GC Cycles</p>
          <p className="text-2xl font-semibold text-purple-400">{groupedLogs.gc.length / 2}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-1">Reference Operations</p>
          <p className="text-2xl font-semibold text-cyan-400">{groupedLogs.references.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-sm text-zinc-400 mb-1">Collections</p>
          <p className="text-2xl font-semibold text-red-400">{groupedLogs.collection.length}</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">All Events</h3>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-zinc-500">
              <p>No events logged yet</p>
            </div>
          ) : (
            logs.map((log) => <LogEntry key={log.id} log={log} />)
          )}
        </div>
      </div>
    </div>
  );
};
