import { Card } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface RightSidebarProps {
  algorithm: string;
  totalRequests: number;
  requestsPerServer: Record<string, number>;
  servers: Array<{ id: string; name: string }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export function RightSidebar({ algorithm, totalRequests, requestsPerServer, servers }: RightSidebarProps) {
  const algorithmDescriptions = {
    'round-robin': 'Distributes requests sequentially across all servers in a circular order.',
    'least-connections': 'Routes traffic to the server with the fewest active connections.',
    'ip-hash': 'Uses client IP address to determine which server receives the request, ensuring session persistence.',
    'random': 'Randomly selects a server for each request, providing simple load distribution.',
  };

  const chartData = servers.map((server, index) => ({
    name: server.name,
    value: requestsPerServer[server.id] || 0,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="w-80 bg-gray-950 border-l border-gray-800 p-6 space-y-6 overflow-y-auto">
      <div>
        <h2 className="text-white text-lg mb-4">Simulation Details</h2>
      </div>

      <Card className="bg-gray-900 border-gray-800 p-4">
        <h3 className="text-gray-400 text-sm mb-2">Current Algorithm</h3>
        <div className="text-white font-medium mb-3 capitalize">
          {algorithm.replace('-', ' ')}
        </div>
        <p className="text-gray-500 text-xs leading-relaxed">
          {algorithmDescriptions[algorithm as keyof typeof algorithmDescriptions]}
        </p>
      </Card>

      <Card className="bg-gray-900 border-gray-800 p-4">
        <h3 className="text-gray-400 text-sm mb-2">Statistics</h3>
        <div className="space-y-3">
          <div>
            <div className="text-gray-500 text-xs">Total Requests</div>
            <div className="text-white text-2xl font-mono">{totalRequests}</div>
          </div>
          <div className="pt-3 border-t border-gray-800">
            <div className="text-gray-500 text-xs mb-2">Active Servers</div>
            <div className="text-white text-2xl font-mono">{servers.length}</div>
          </div>
        </div>
      </Card>

      {servers.length > 0 && (
        <Card className="bg-gray-900 border-gray-800 p-4">
          <h3 className="text-gray-400 text-sm mb-4">Request Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                content={({ payload }) => (
                  <div className="space-y-1 mt-4">
                    {payload?.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-gray-400">{entry.value}</span>
                        </div>
                        <span className="text-gray-300 font-mono">
                          {chartData[index].value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}
