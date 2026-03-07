import { Server, Database, Cloud, Network, Monitor } from 'lucide-react';
import { Service } from '../types/service';
import { motion } from 'motion/react';

interface ServiceNodeProps {
  service: Service;
  onClick: (service: Service) => void;
  isSelected: boolean;
}

export function ServiceNode({ service, onClick, isSelected }: ServiceNodeProps) {
  const getStatusColor = () => {
    switch (service.status) {
      case 'healthy':
        return 'border-green-500 bg-green-500/10';
      case 'degraded':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'down':
        return 'border-red-500 bg-red-500/10';
      case 'overloaded':
        return 'border-orange-500 bg-orange-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getIcon = () => {
    switch (service.type) {
      case 'client':
        return Monitor;
      case 'gateway':
        return Network;
      case 'database':
        return Database;
      case 'queue':
        return Cloud;
      default:
        return Server;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: service.position.x,
        top: service.position.y,
      }}
      onClick={() => onClick(service)}
      className={`cursor-pointer ${isSelected ? 'z-10' : 'z-0'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`relative w-36 p-4 rounded-xl border-2 ${getStatusColor()} backdrop-blur-sm ${
          isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900' : ''
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-gray-200" />
          <div
            className={`w-2 h-2 rounded-full ${
              service.status === 'healthy'
                ? 'bg-green-500'
                : service.status === 'degraded'
                ? 'bg-yellow-500'
                : service.status === 'down'
                ? 'bg-red-500'
                : 'bg-orange-500'
            }`}
          />
        </div>
        
        <div className="text-sm font-medium text-gray-200 mb-1 line-clamp-2">
          {service.name}
        </div>
        
        <div className="text-xs text-gray-400 space-y-0.5">
          <div>CPU: {service.cpu}%</div>
          <div>Mem: {service.memory}MB</div>
        </div>

        {service.status === 'healthy' && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}
