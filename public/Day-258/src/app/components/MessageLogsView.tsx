import { useSimulation } from '../contexts/SimulationContext';
import { format } from 'date-fns';
import { Upload, Layers, Download, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export function MessageLogsView() {
  const { logs } = useSimulation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'produced' | 'queued' | 'consumed'>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'produced':
        return <Upload size={16} className="text-blue-400" />;
      case 'queued':
        return <Layers size={16} className="text-cyan-400" />;
      case 'consumed':
        return <Download size={16} className="text-purple-400" />;
      default:
        return null;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.messageId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || log.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Message Logs</h1>
        <div className="text-sm text-slate-400">
          {logs.length} total event{logs.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Events</option>
              <option value="produced">Produced</option>
              <option value="queued">Queued</option>
              <option value="consumed">Consumed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-950 border-b border-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase tracking-wider">Event Description</th>
              <th className="px-6 py-3 text-left text-xs text-slate-400 uppercase tracking-wider">Message ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  {searchTerm || filterType !== 'all' ? 'No logs match your filters' : 'No logs yet. Start the simulation to see events.'}
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-slate-400">
                    {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss.SSS')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getIcon(log.type)}
                      <span className="text-sm capitalize">{log.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{log.message}</td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{log.messageId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
