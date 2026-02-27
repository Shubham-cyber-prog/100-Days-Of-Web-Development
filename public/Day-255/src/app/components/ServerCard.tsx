import { Server, X } from 'lucide-react';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { motion } from 'motion/react';

export interface ServerData {
  id: string;
  name: string;
  load: number;
  connections: number;
  responseTime: number;
  status: 'healthy' | 'overloaded' | 'offline';
}

interface ServerCardProps {
  server: ServerData;
  onRemove: (id: string) => void;
}

export function ServerCard({ server, onRemove }: ServerCardProps) {
  const statusColors = {
    healthy: 'bg-green-500',
    overloaded: 'bg-orange-500',
    offline: 'bg-red-500',
  };

  const statusText = {
    healthy: 'Healthy',
    overloaded: 'Overloaded',
    offline: 'Offline',
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-gray-900 border border-gray-800 rounded-lg p-4 relative group"
    >
      <Button
        onClick={() => onRemove(server.id)}
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 size-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-500 hover:bg-gray-800"
      >
        <X className="size-3" />
      </Button>

      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
          <Server className="size-5 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-medium">{server.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${statusColors[server.status]}`}></div>
            <span className="text-xs text-gray-400">{statusText[server.status]}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Load</span>
            <span className="text-gray-300">{server.load}%</span>
          </div>
          <Progress value={server.load} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-800">
          <div>
            <div className="text-xs text-gray-400">Connections</div>
            <div className="text-lg text-white mt-1">{server.connections}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Response</div>
            <div className="text-lg text-white mt-1">{server.responseTime}ms</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
