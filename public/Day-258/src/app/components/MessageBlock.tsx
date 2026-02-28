import { motion } from 'motion/react';
import { Message } from '../contexts/SimulationContext';
import { useSimulation } from '../contexts/SimulationContext';

interface MessageBlockProps {
  message: Message;
  position: { x: number; y: number };
}

export function MessageBlock({ message, position }: MessageBlockProps) {
  const { selectMessage } = useSimulation();

  const statusColors = {
    queued: 'from-cyan-400 to-blue-500',
    processing: 'from-yellow-400 to-orange-500',
    completed: 'from-green-400 to-emerald-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y 
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
      onClick={() => selectMessage(message)}
      className={`absolute w-8 h-8 bg-gradient-to-br ${statusColors[message.status]} rounded shadow-lg cursor-pointer hover:scale-110 transition-transform`}
      style={{ 
        boxShadow: '0 4px 20px rgba(6, 182, 212, 0.4)'
      }}
    />
  );
}
