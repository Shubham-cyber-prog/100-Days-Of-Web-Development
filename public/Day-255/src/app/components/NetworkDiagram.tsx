import { Users, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { ServerData } from './ServerCard';

interface NetworkDiagramProps {
  servers: ServerData[];
  activeTraffic: Array<{ id: string; serverId: string; startTime: number }>;
  isRunning: boolean;
}

export function NetworkDiagram({ servers, activeTraffic, isRunning }: NetworkDiagramProps) {
  const clients = [
    { id: 'c1', y: 20 },
    { id: 'c2', y: 40 },
    { id: 'c3', y: 60 },
    { id: 'c4', y: 80 },
  ];

  return (
    <div className="relative h-full bg-gray-950 rounded-lg border border-gray-800 p-8">
      <div className="absolute top-4 left-4 text-sm text-gray-400">Network Traffic Flow</div>

      {/* Clients Section */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 space-y-6">
        <div className="text-xs text-gray-500 mb-4">Clients</div>
        {clients.map((client) => (
          <motion.div
            key={client.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center"
          >
            <Users className="size-6 text-blue-400" />
          </motion.div>
        ))}
      </div>

      {/* Load Balancer in Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={isRunning ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/50">
            <Activity className="size-10 text-white" />
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
            Load Balancer
          </div>
          {isRunning && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-blue-400"
              animate={{ opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </motion.div>
      </div>

      {/* Servers Section */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2">
        <div className="text-xs text-gray-500 mb-4">Servers</div>
        <div className="space-y-4">
          {servers.map((server, index) => {
            const statusColors = {
              healthy: 'border-green-500 bg-green-500/10',
              overloaded: 'border-orange-500 bg-orange-500/10',
              offline: 'border-red-500 bg-red-500/10',
            };

            return (
              <motion.div
                key={server.id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-32 h-20 border-2 rounded-lg flex flex-col items-center justify-center ${
                  statusColors[server.status]
                }`}
              >
                <div className="text-white text-sm font-medium">{server.name}</div>
                <div className="text-xs text-gray-400 mt-1">{server.load}% Load</div>
                <div className="text-xs text-gray-500">{server.connections} conn</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Animated Traffic Arrows */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
          </marker>
        </defs>

        {/* Client to Load Balancer arrows */}
        {activeTraffic.slice(0, 4).map((traffic, index) => {
          const clientY = 20 + index * 25;
          return (
            <motion.line
              key={`client-${traffic.id}`}
              x1="15%"
              y1={`${clientY}%`}
              x2="48%"
              y2="50%"
              stroke="#3b82f6"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
            />
          );
        })}

        {/* Load Balancer to Server arrows */}
        {servers.map((server, index) => {
          const serverY = 20 + index * 25;
          const hasTraffic = activeTraffic.some((t) => t.serverId === server.id);

          return (
            <motion.line
              key={`server-${server.id}`}
              x1="52%"
              y1="50%"
              x2="78%"
              y2={`${serverY}%`}
              stroke={hasTraffic ? '#10b981' : '#374151'}
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              animate={
                hasTraffic && isRunning
                  ? { opacity: [0.3, 1, 0.3], strokeWidth: [2, 3, 2] }
                  : {}
              }
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          );
        })}
      </svg>
    </div>
  );
}
