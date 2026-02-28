import { useSimulation } from '../contexts/SimulationContext';
import * as Progress from '@radix-ui/react-progress';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function QueueStatusPanel() {
  const { queues } = useSimulation();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity size={20} className="text-cyan-400" />
        Queue Status
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {queues.map((queue, index) => (
            <motion.div 
              key={queue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all relative group"
            >
              {/* Glow effect for active queues */}
              {queue.status === 'normal' && queue.messagesInQueue > 0 && (
                <div className="absolute inset-0 bg-cyan-500/5 rounded-lg animate-pulse" />
              )}
              {queue.status === 'overloaded' && (
                <div className="absolute inset-0 bg-red-500/5 rounded-lg animate-pulse" />
              )}

              <div className="flex items-center justify-between mb-3 relative">
                <h3 className="font-medium truncate">{queue.name}</h3>
                <motion.span 
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${
                    queue.status === 'overloaded' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    queue.status === 'normal' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    'bg-slate-600/20 text-slate-400 border border-slate-600/30'
                  }`}
                  key={queue.status}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {queue.status === 'overloaded' && <TrendingUp size={10} />}
                  {queue.status === 'normal' && queue.messagesInQueue > 0 && <Activity size={10} className="animate-pulse" />}
                  {queue.status}
                </motion.span>
              </div>

              <div className="space-y-3 relative">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Messages in Queue</span>
                    <motion.span 
                      className="font-mono font-bold text-cyan-400"
                      key={queue.messagesInQueue}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {queue.messagesInQueue}
                    </motion.span>
                  </div>
                  <Progress.Root className="relative overflow-hidden bg-slate-700 rounded-full w-full h-2.5 shadow-inner">
                    <Progress.Indicator
                      className={`h-full transition-all duration-500 ease-out ${
                        queue.status === 'overloaded' 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      }`}
                      style={{ 
                        transform: `translateX(-${100 - Math.min((queue.messagesInQueue / 10) * 100, 100)}%)`,
                        boxShadow: queue.messagesInQueue > 0 ? '0 0 10px rgba(6, 182, 212, 0.5)' : 'none'
                      }}
                    />
                    {/* Animated shimmer effect */}
                    {queue.messagesInQueue > 0 && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </Progress.Root>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/50 rounded-lg p-2">
                    <div className="text-slate-400 mb-1">Processed</div>
                    <motion.div 
                      className="text-lg font-mono font-bold text-green-400"
                      key={queue.messagesProcessed}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                    >
                      {queue.messagesProcessed}
                    </motion.div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-2">
                    <div className="text-slate-400 mb-1">Rate</div>
                    <motion.div 
                      className="text-lg font-mono font-bold"
                      key={queue.processingRate}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                    >
                      {queue.processingRate.toFixed(1)}/s
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}