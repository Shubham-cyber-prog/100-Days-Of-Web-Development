import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResourceMonitorProps {
  cpuUsage: number;
  memoryUsage: number;
}

interface DataPoint {
  time: string;
  cpu: number;
  memory: number;
}

export function ResourceMonitor({ cpuUsage, memoryUsage }: ResourceMonitorProps) {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    setData(prev => {
      const newData = [...prev, { time: timeStr, cpu: cpuUsage, memory: memoryUsage }];
      return newData.slice(-20); // Keep last 20 data points
    });
  }, [cpuUsage, memoryUsage]);

  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Resource Usage Over Time</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#374151' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickLine={{ stroke: '#374151' }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#f3f4f6'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="cpu" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
              name="CPU %"
            />
            <Line 
              type="monotone" 
              dataKey="memory" 
              stroke="#A855F7" 
              strokeWidth={2}
              dot={false}
              name="Memory %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded" />
          <span className="text-gray-400">CPU Usage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded" />
          <span className="text-gray-400">Memory Usage</span>
        </div>
      </div>
    </div>
  );
}
