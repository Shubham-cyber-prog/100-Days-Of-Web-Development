import { Layers, TrendingUp } from 'lucide-react';
import { Queue } from '../contexts/SimulationContext';
import { motion } from 'motion/react';

interface QueueNodeProps {
  queue: Queue;
}

export function QueueNode({ queue }: QueueNodeProps) {
  const statusColors = {
    normal: 'border-cyan-500 bg-cyan-500/10',
    overloaded: 'border-red-500 bg-red-500/10',
    idle: 'border-slate-600 bg-slate-800',
  };

  const statusLabels = {
    normal: 'Normal',
    overloaded: 'Overloaded',
    idle: 'Idle',
  };

  const isOverloaded = queue.status === 'overloaded';
  const isNormal = queue.status === 'normal';

  return (
    <motion.div 
      className={`border-2 rounded-lg p-6 w-full relative ${statusColors[queue.status]} transition-all group`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Overloaded warning glow */}
      {isOverloaded && (
        <div className="absolute inset-0 bg-red-500/10 rounded-lg animate-pulse" />
      )}

      {/* Active flow indicator */}
      {isNormal && (
        <div className="absolute inset-0 bg-cyan-500/5 rounded-lg" />
      )}

      <div className="flex items-center gap-3 mb-4 relative">
        <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center relative">
          <Layers size={24} className="text-cyan-400" />
          {isNormal && (
            <motion.div
              className="absolute inset-0 rounded-lg border border-cyan-400/50"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-base">{queue.name}</div>
          <div className="text-xs text-slate-400">Message Queue</div>
        </div>
        <div className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 ${
          queue.status === 'overloaded' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
          queue.status === 'normal' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
          'bg-slate-600/20 text-slate-400 border border-slate-600/30'
        }`}>
          {queue.status === 'overloaded' && <TrendingUp size={12} />}
          {statusLabels[queue.status]}
        </div>
      </div>

      {/* Queue visualization */}
      <div className="mb-4 min-h-[80px] bg-slate-900/50 rounded-lg p-4 border border-slate-800/50 relative overflow-hidden">
        <div className="flex gap-1.5 flex-wrap relative z-10">
          {Array.from({ length: Math.min(queue.messagesInQueue, 15) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded shadow-lg"
              style={{ 
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)',
              }}
            >
              <motion.div
                className="w-full h-full flex items-center justify-center text-white text-[10px] font-bold"
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: i * 0.1 
                }}
              >
                M
              </motion.div>
            </motion.div>
          ))}
          {queue.messagesInQueue > 15 && (
            <div className="flex items-center justify-center w-8 h-8 text-xs text-cyan-400 font-bold bg-slate-800 rounded border border-cyan-500/30">
              +{queue.messagesInQueue - 15}
            </div>
          )}
        </div>
        {queue.messagesInQueue === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs text-slate-500 font-medium">Empty queue</div>
          </div>
        )}
        
        {/* Animated background particles for active queue */}
        {isNormal && queue.messagesInQueue > 0 && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ 
                  x: [0, 100, 200],
                  y: [20 + i * 20, 40 + i * 15, 20 + i * 20],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm relative">
        <div>
          <div className="text-slate-400 text-xs mb-1">In Queue</div>
          <div className="text-2xl font-mono font-bold text-cyan-400">{queue.messagesInQueue}</div>
        </div>
        <div>
          <div className="text-slate-400 text-xs mb-1">Processed</div>
          <div className="text-2xl font-mono font-bold text-green-400">{queue.messagesProcessed}</div>
        </div>
        <div>
          <div className="text-slate-400 text-xs mb-1">Rate</div>
          <div className="text-2xl font-mono font-bold">{queue.processingRate.toFixed(1)}/s</div>
        </div>
      </div>

      {/* Connection points */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full border-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full border-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}