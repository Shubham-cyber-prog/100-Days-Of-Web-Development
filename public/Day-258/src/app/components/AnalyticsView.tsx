import { useSimulation } from '../contexts/SimulationContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Activity, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MetricData {
  timestamp: string;
  messagesProduced: number;
  messagesConsumed: number;
  queueDepth: number;
}

export function AnalyticsView() {
  const { queues, producers, consumers, messages } = useSimulation();
  const [metricsHistory, setMetricsHistory] = useState<MetricData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const totalProduced = producers.reduce((sum, p) => sum + p.messagesProduced, 0);
      const totalConsumed = consumers.reduce((sum, c) => sum + c.messagesConsumed, 0);
      const totalQueueDepth = queues.reduce((sum, q) => sum + q.messagesInQueue, 0);

      setMetricsHistory((prev) => {
        const newData = {
          timestamp: new Date().toLocaleTimeString(),
          messagesProduced: totalProduced,
          messagesConsumed: totalConsumed,
          queueDepth: totalQueueDepth,
        };
        return [...prev.slice(-19), newData]; // Keep last 20 data points
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [producers, consumers, queues]);

  const totalProduced = producers.reduce((sum, p) => sum + p.messagesProduced, 0);
  const totalConsumed = consumers.reduce((sum, c) => sum + c.messagesConsumed, 0);
  const totalQueued = queues.reduce((sum, q) => sum + q.messagesInQueue, 0);
  const avgProcessingRate = queues.length > 0 
    ? queues.reduce((sum, q) => sum + q.processingRate, 0) / queues.length 
    : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Analytics</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Total Messages Produced</div>
              <div className="text-2xl font-mono">{totalProduced}</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Total Messages Consumed</div>
              <div className="text-2xl font-mono">{totalConsumed}</div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-cyan-400" />
            </div>
            <div>
              <div className="text-sm text-slate-400">Current Queue Depth</div>
              <div className="text-2xl font-mono">{totalQueued}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Messages Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metricsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="messagesProduced" 
                stroke="#3b82f6" 
                name="Produced"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="messagesConsumed" 
                stroke="#a855f7" 
                name="Consumed"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Queue Depth Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metricsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="queueDepth" 
                stroke="#06b6d4" 
                name="Queue Depth"
                strokeWidth={2}
                fill="#06b6d4"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Producer vs Consumer Throughput</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Producers', value: totalProduced },
              { name: 'Consumers', value: totalConsumed },
              { name: 'In Queue', value: totalQueued },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Producer Performance</h2>
          <div className="space-y-3">
            {producers.map((producer) => (
              <div key={producer.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div>
                  <div className="font-medium">{producer.name}</div>
                  <div className="text-xs text-slate-400">Rate: {producer.rate}/s</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-mono">{producer.messagesProduced}</div>
                  <div className="text-xs text-slate-400">messages</div>
                </div>
              </div>
            ))}
            {producers.length === 0 && (
              <div className="text-center text-slate-500 py-6">No producers configured</div>
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Consumer Performance</h2>
          <div className="space-y-3">
            {consumers.map((consumer) => (
              <div key={consumer.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                <div>
                  <div className="font-medium">{consumer.name}</div>
                  <div className="text-xs text-slate-400">Processing: {consumer.processingTime}ms</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-mono">{consumer.messagesConsumed}</div>
                  <div className="text-xs text-slate-400">messages</div>
                </div>
              </div>
            ))}
            {consumers.length === 0 && (
              <div className="text-center text-slate-500 py-6">No consumers configured</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
