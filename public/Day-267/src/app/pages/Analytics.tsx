import { useEffect, useState } from 'react';
import { useSimulationStore } from '../store/simulationStore';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MetricData } from '../types/service';

export default function Analytics() {
  const { isRunning, metrics, addMetric } = useSimulationStore();
  const [metricsData, setMetricsData] = useState<MetricData[]>([]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const newMetric: MetricData = {
          timestamp: Date.now(),
          rps: Math.floor(Math.random() * 1000) + 500,
          latency: Math.floor(Math.random() * 200) + 50,
          errorRate: Math.random() * 5,
        };
        addMetric(newMetric);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isRunning, addMetric]);

  useEffect(() => {
    setMetricsData(metrics);
  }, [metrics]);

  const formattedData = metricsData.map((m) => ({
    time: new Date(m.timestamp).toLocaleTimeString(),
    'Requests/sec': m.rps,
    'Latency (ms)': m.latency,
    'Error Rate (%)': m.errorRate.toFixed(2),
  }));

  const services = useSimulationStore((state) => state.services);
  const serviceData = services.map((s) => ({
    name: s.name.split(' ')[0],
    requests: s.requests,
    errors: (s.requests * s.errorRate) / 100,
  }));

  return (
    <div className="flex-1 overflow-auto bg-gray-900 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Analytics Dashboard
        </h2>
        <p className="text-gray-400">
          Real-time metrics and performance analytics
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-400 mb-2">Total Requests</div>
          <div className="text-3xl font-bold text-white">
            {services.reduce((sum, s) => sum + s.requests, 0)}
          </div>
          <div className="text-sm text-green-400 mt-2">↑ 12.5% from last hour</div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-400 mb-2">Avg Response Time</div>
          <div className="text-3xl font-bold text-white">
            {Math.round(
              services.reduce((sum, s) => sum + s.responseTime, 0) / services.length
            )}
            ms
          </div>
          <div className="text-sm text-yellow-400 mt-2">↑ 5.2% from last hour</div>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
          <div className="text-sm text-gray-400 mb-2">Error Rate</div>
          <div className="text-3xl font-bold text-white">
            {(
              services.reduce((sum, s) => sum + s.errorRate, 0) / services.length
            ).toFixed(2)}
            %
          </div>
          <div className="text-sm text-green-400 mt-2">↓ 2.1% from last hour</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Requests Per Second
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Requests/sec"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Latency Over Time
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Latency (ms)"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Service Request Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="requests" fill="#10B981" />
              <Bar dataKey="errors" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
