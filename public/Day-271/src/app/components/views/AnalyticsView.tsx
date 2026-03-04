import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../store/SimulationContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  memory: number;
  objects: number;
  garbage: number;
}

export const AnalyticsView: React.FC = () => {
  const { stats, logs, objects } = useSimulation();
  const [historicalData, setHistoricalData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      
      setHistoricalData((prev) => {
        const newData = [
          ...prev,
          {
            time: timeStr,
            memory: stats.memoryUsage,
            objects: stats.activeObjects,
            garbage: stats.garbageObjects,
          },
        ].slice(-20); // Keep last 20 data points
        
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [stats]);

  const gcCycles = logs.filter((l) => l.type === 'gc-completed').length;
  const allocations = logs.filter((l) => l.type === 'allocation').length;
  const collections = logs.filter((l) => l.type === 'object-collected').length;

  const stateDistribution = [
    { name: 'Active', value: objects.filter((o) => o.state === 'active').length, color: '#10b981' },
    { name: 'New', value: objects.filter((o) => o.state === 'new').length, color: '#3b82f6' },
    { name: 'Candidate', value: objects.filter((o) => o.state === 'candidate').length, color: '#f59e0b' },
    { name: 'Garbage', value: objects.filter((o) => o.state === 'garbage').length, color: '#ef4444' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Analytics</h2>
        <p className="text-zinc-400">Performance metrics and visualization trends</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-sm text-zinc-400 mb-2">Total GC Cycles</p>
          <p className="text-3xl font-bold text-purple-400">{gcCycles}</p>
          <p className="text-xs text-zinc-500 mt-2">Since simulation start</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-sm text-zinc-400 mb-2">Total Allocations</p>
          <p className="text-3xl font-bold text-blue-400">{allocations}</p>
          <p className="text-xs text-zinc-500 mt-2">Objects created</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-sm text-zinc-400 mb-2">Total Collections</p>
          <p className="text-3xl font-bold text-red-400">{collections}</p>
          <p className="text-xs text-zinc-500 mt-2">Objects removed</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">Memory Usage Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="time" stroke="#71717a" style={{ fontSize: '12px' }} />
            <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #3f3f46',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="memory"
              stroke="#10b981"
              strokeWidth={2}
              name="Memory Usage (bytes)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">Object Count Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="time" stroke="#71717a" style={{ fontSize: '12px' }} />
            <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #3f3f46',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="objects"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Active Objects"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="garbage"
              stroke="#ef4444"
              strokeWidth={2}
              name="Garbage Objects"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">Object State Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stateDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis dataKey="name" stroke="#71717a" style={{ fontSize: '12px' }} />
            <YAxis stroke="#71717a" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #3f3f46',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            />
            <Bar dataKey="value" fill="#10b981" name="Count">
              {stateDistribution.map((entry, index) => (
                <rect key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
