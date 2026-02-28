import { useSimulation } from '../contexts/SimulationContext';
import { format } from 'date-fns';
import { Upload, Layers, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function LogsPanel() {
  const { logs } = useSimulation();

  const getIcon = (type: string) => {
    switch (type) {
      case 'produced':
        return <Upload size={14} className="text-blue-400" />;
      case 'queued':
        return <Layers size={14} className="text-cyan-400" />;
      case 'consumed':
        return <Download size={14} className="text-purple-400" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'produced':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'queued':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'consumed':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FileText size={20} className="text-cyan-400" />
        Message Logs
        {logs.length > 0 && (
          <motion.span 
            className="ml-auto text-xs bg-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded-full border border-cyan-500/30 font-mono"
            key={logs.length}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
          >
            {logs.length}
          </motion.span>
        )}
      </h2>
      
      <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          {logs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center text-slate-500"
            >
              <div className="w-16 h-16 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText size={32} className="text-slate-600" />
              </div>
              <p className="font-medium">No logs yet</p>
              <p className="text-sm mt-1">Start the simulation to see message events</p>
            </motion.div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-900 sticky top-0 z-10">
                <tr className="border-b border-slate-800">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400">Message ID</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <AnimatePresence initial={false}>
                  {logs.map((log, index) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0, x: -20, backgroundColor: 'rgba(6, 182, 212, 0.15)' }}
                      animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="px-4 py-2.5 text-xs text-slate-400">
                        {format(new Date(log.timestamp), 'HH:mm:ss.SSS')}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md border ${getTypeColor(log.type)}`}>
                          {getIcon(log.type)}
                          <span className="text-xs capitalize font-medium">{log.type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-xs group-hover:text-white transition-colors">{log.message}</td>
                      <td className="px-4 py-2.5 text-xs text-slate-500 group-hover:text-slate-400 transition-colors truncate max-w-[200px]">
                        {log.messageId}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}