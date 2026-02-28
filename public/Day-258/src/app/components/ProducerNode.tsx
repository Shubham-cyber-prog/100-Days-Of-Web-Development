import { Upload, Activity } from 'lucide-react';
import { Producer } from '../contexts/SimulationContext';
import { motion } from 'motion/react';

interface ProducerNodeProps {
  producer: Producer;
}

export function ProducerNode({ producer }: ProducerNodeProps) {
  const statusColors = {
    active: 'bg-green-500',
    idle: 'bg-slate-600',
  };

  const isActive = producer.status === 'active';

  return (
    <motion.div 
      className="bg-slate-800 border border-slate-700 rounded-lg p-4 w-full hover:border-blue-500/50 transition-all relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Active indicator glow */}
      {isActive && (
        <div className="absolute inset-0 bg-blue-500/5 rounded-lg animate-pulse" />
      )}
      
      <div className="flex items-center gap-3 mb-3 relative">
        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center relative">
          <Upload size={18} className="text-blue-400" />
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-lg border border-blue-400/50"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{producer.name}</div>
          <div className="text-xs text-slate-400">Producer</div>
        </div>
        <div className="flex items-center gap-2">
          {isActive && <Activity size={14} className="text-green-400 animate-pulse" />}
          <div className={`w-2 h-2 rounded-full ${statusColors[producer.status]}`} 
               style={{ 
                 boxShadow: isActive ? '0 0 8px rgba(34, 197, 94, 0.6)' : 'none' 
               }}
          />
        </div>
      </div>
      
      <div className="space-y-2 text-xs relative">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Produced:</span>
          <span className="font-mono font-semibold text-blue-400">{producer.messagesProduced}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Rate:</span>
          <span className="font-mono font-semibold">{producer.rate}/s</span>
        </div>
      </div>
      
      {/* Connection point */}
      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}