import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ScrollArea } from './ui/scroll-area';

interface LogEntry {
  id: string;
  timestamp: string;
  clientId: string;
  serverId: string;
  serverName: string;
  responseTime: number;
}

interface BottomSectionProps {
  requestsPerSecond: Array<{ time: string; requests: number }>;
  logs: LogEntry[];
}

export function BottomSection({ requestsPerSecond, logs }: BottomSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="bg-gray-950 border-gray-800 p-4">
        <h3 className="text-white text-sm mb-4">Requests Per Second</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={requestsPerSecond}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '6px',
                color: '#fff',
              }}
            />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="bg-gray-950 border-gray-800 p-4">
        <h3 className="text-white text-sm mb-4">Traffic Logs</h3>
        <ScrollArea className="h-[200px]">
          <div className="space-y-1 font-mono text-xs">
            {logs.length === 0 ? (
              <div className="text-gray-600 text-center py-8">No traffic logs yet</div>
            ) : (
              logs.slice().reverse().map((log) => (
                <div key={log.id} className="flex items-center gap-3 py-1 border-b border-gray-800">
                  <span className="text-gray-500">{log.timestamp}</span>
                  <span className="text-blue-400">{log.clientId}</span>
                  <span className="text-gray-600">→</span>
                  <span className="text-green-400">{log.serverName}</span>
                  <span className="text-gray-500 ml-auto">{log.responseTime}ms</span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
