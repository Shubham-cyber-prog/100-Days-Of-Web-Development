import { Download, Activity, Clock } from 'lucide-react';
import { Consumer } from '../contexts/SimulationContext';
import { motion } from 'motion/react';

interface ConsumerNodeProps {
  consumer: Consumer;
}

export function ConsumerNode({ consumer }: ConsumerNodeProps) {
  const statusColors = {
    active: 'bg-green-500',
    idle: 'bg-slate-600',
    processing: 'bg-yellow-500',
  };

  const statusLabels = {
    active: 'Active',
    idle: 'Idle',
    processing: 'Processing',
  };

  const isActive = consumer.status !== 'idle';
  const isProcessing = consumer.status === 'processing';

  return (
    <motion.div 
      className="bg-slate-800 border border-slate-700 rounded-lg p-4 w-full hover:border-purple-500/50 transition-all relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Processing indicator glow */}
      {isProcessing && (
        <div className="absolute inset-0 bg-yellow-500/5 rounded-lg animate-pulse" />
      )}
      
      <div className="flex items-center gap-3 mb-3 relative">
        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center relative">
          <Download size={18} className="text-purple-400" />
          {isProcessing && (
            <motion.div
              className="absolute inset-0 rounded-lg border border-purple-400/50"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{consumer.name}</div>
          <div className="text-xs text-slate-400">Consumer</div>
        </div>
        <div className="flex items-center gap-2">
          {isProcessing && <Clock size={14} className="text-yellow-400 animate-spin" style={{ animationDuration: '2s' }} />}
          {consumer.status === 'active' && <Activity size={14} className="text-green-400 animate-pulse" />}
          <div 
            className={`w-2 h-2 rounded-full ${statusColors[consumer.status]}`}
            style={{ 
              boxShadow: isActive ? '0 0 8px rgba(34, 197, 94, 0.6)' : 'none' 
            }}
          />
        </div>
      </div>
      
      <div className="space-y-2 text-xs relative">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Consumed:</span>
          <span className="font-mono font-semibold text-purple-400">{consumer.messagesConsumed}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Process Time:</span>
          <span className="font-mono font-semibold">{consumer.processingTime}ms</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Status:</span>
          <span className={`text-xs px-2 py-0.5 rounded ${
            consumer.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
            consumer.status === 'active' ? 'bg-green-500/20 text-green-400' :
            'bg-slate-600/20 text-slate-400'
          }`}>
            {statusLabels[consumer.status]}
          </span>
        </div>
      </div>

      {/* Connection point */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full border-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}