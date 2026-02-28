import { X, Clock, User, Server, CheckCircle2, Info } from 'lucide-react';
import { useSimulation } from '../contexts/SimulationContext';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

export function MessageDetailsPanel() {
  const { selectedMessage, selectMessage, producers, consumers } = useSimulation();

  if (!selectedMessage) return null;

  const producer = producers.find(p => p.id === selectedMessage.producerId);
  const consumer = consumers.find(c => c.id === selectedMessage.consumerId);

  const statusColors = {
    queued: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  const statusGradients = {
    queued: 'from-cyan-500 to-blue-500',
    processing: 'from-yellow-500 to-orange-500',
    completed: 'from-green-500 to-emerald-500',
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-80 shadow-2xl"
      >
        {/* Header with gradient background */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 bg-gradient-to-br ${statusGradients[selectedMessage.status]} rounded-lg flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold">M</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Message Details</h3>
              <p className="text-xs text-slate-400">Live tracking</p>
            </div>
          </div>
          <motion.button
            onClick={() => selectMessage(null)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={16} />
          </motion.button>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-xs text-slate-400 mb-2 flex items-center gap-1">
              <Info size={12} />
              Message ID
            </div>
            <div className="font-mono text-sm bg-slate-800 px-3 py-2.5 rounded-lg border border-slate-700 break-all">
              {selectedMessage.id}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="text-xs text-slate-400 mb-2">Status</div>
            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${statusColors[selectedMessage.status]} font-medium`}>
              <motion.div 
                className="w-2 h-2 rounded-full bg-current"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="capitalize">{selectedMessage.status}</span>
            </div>
          </motion.div>

          <motion.div 
            className="pt-4 border-t border-slate-800 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <User size={16} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400">Producer</div>
                <div className="text-sm font-medium">{producer?.name || 'Unknown'}</div>
              </div>
            </div>

            {consumer && (
              <motion.div 
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Server size={16} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-slate-400">Consumer</div>
                  <div className="text-sm font-medium">{consumer.name}</div>
                </div>
              </motion.div>
            )}

            <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
                <Clock size={16} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400">Timestamp</div>
                <div className="text-sm font-mono">
                  {format(new Date(selectedMessage.timestamp), 'HH:mm:ss.SSS')}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="pt-4 border-t border-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="text-xs text-slate-400 mb-3 font-semibold">Timeline</div>
            <div className="space-y-2">
              {selectedMessage.queuedAt && (
                <motion.div 
                  className="flex items-center gap-2 text-xs p-2 bg-cyan-500/5 rounded-lg border border-cyan-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CheckCircle2 size={14} className="text-cyan-400" />
                  <span className="text-slate-300 font-medium">Queued</span>
                  <span className="font-mono ml-auto text-cyan-400">{format(new Date(selectedMessage.queuedAt), 'HH:mm:ss')}</span>
                </motion.div>
              )}
              {selectedMessage.processingAt && (
                <motion.div 
                  className="flex items-center gap-2 text-xs p-2 bg-yellow-500/5 rounded-lg border border-yellow-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <CheckCircle2 size={14} className="text-yellow-400" />
                  <span className="text-slate-300 font-medium">Processing</span>
                  <span className="font-mono ml-auto text-yellow-400">{format(new Date(selectedMessage.processingAt), 'HH:mm:ss')}</span>
                </motion.div>
              )}
              {selectedMessage.completedAt && (
                <motion.div 
                  className="flex items-center gap-2 text-xs p-2 bg-green-500/5 rounded-lg border border-green-500/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle2 size={14} className="text-green-400" />
                  <span className="text-slate-300 font-medium">Completed</span>
                  <span className="font-mono ml-auto text-green-400">{format(new Date(selectedMessage.completedAt), 'HH:mm:ss')}</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div 
            className="pt-4 border-t border-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-xs text-slate-400 mb-2 font-semibold">Content Preview</div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm font-mono text-slate-300">
              {selectedMessage.content}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}