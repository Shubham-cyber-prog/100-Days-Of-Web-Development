import { Service } from '../types/service';
import { Server, Database, Cloud, Network, Monitor } from 'lucide-react';

interface StatusCardProps {
  service: Service;
  onClick: (service: Service) => void;
}

export function StatusCard({ service, onClick }: StatusCardProps) {
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
    <div
      onClick={() => onClick(service)}
      className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 cursor-pointer transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-800 rounded-lg">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">{service.name}</h4>
            <p className="text-xs text-gray-500">{service.endpoint}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            service.status === 'healthy'
              ? 'bg-green-500/20 text-green-400'
              : service.status === 'degraded'
              ? 'bg-yellow-500/20 text-yellow-400'
              : service.status === 'down'
              ? 'bg-red-500/20 text-red-400'
              : 'bg-orange-500/20 text-orange-400'
          }`}
        >
          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">CPU Usage</div>
          <div className="text-lg font-semibold text-white">{service.cpu}%</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Memory</div>
          <div className="text-lg font-semibold text-white">{service.memory}MB</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Requests</div>
          <div className="text-lg font-semibold text-white">{service.requests}/min</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Error Rate</div>
          <div className="text-lg font-semibold text-white">{service.errorRate}%</div>
        </div>
      </div>
    </div>
  );
}
