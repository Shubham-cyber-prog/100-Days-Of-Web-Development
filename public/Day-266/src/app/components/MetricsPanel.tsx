import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const cpuData = [
  { time: "14:20", value: 42 },
  { time: "14:22", value: 48 },
  { time: "14:24", value: 45 },
  { time: "14:26", value: 52 },
  { time: "14:28", value: 49 },
  { time: "14:30", value: 51 },
];

const memoryData = [
  { time: "14:20", value: 58 },
  { time: "14:22", value: 62 },
  { time: "14:24", value: 60 },
  { time: "14:26", value: 65 },
  { time: "14:28", value: 63 },
  { time: "14:30", value: 61 },
];

const podData = [
  { time: "14:20", value: 65 },
  { time: "14:22", value: 67 },
  { time: "14:24", value: 68 },
  { time: "14:26", value: 69 },
  { time: "14:28", value: 67 },
  { time: "14:30", value: 69 },
];

export function MetricsPanel() {
  return (
    <div className="h-full">
      <h3 className="text-sm font-semibold text-slate-400 mb-4">Cluster Metrics</h3>
      <div className="grid grid-cols-3 gap-6 h-[calc(100%-2rem)]">
        <MetricChart 
          title="CPU Usage Over Time"
          data={cpuData}
          color="#3b82f6"
        />
        <MetricChart 
          title="Memory Usage Over Time"
          data={memoryData}
          color="#06b6d4"
        />
        <MetricChart 
          title="Pod Count"
          data={podData}
          color="#10b981"
        />
      </div>
    </div>
  );
}

function MetricChart({ title, data, color }: { title: string; data: any[]; color: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col">
      <h4 className="text-xs font-medium text-slate-400 mb-3">{title}</h4>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              style={{ fontSize: '11px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '11px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}