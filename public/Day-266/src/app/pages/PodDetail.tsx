import { useParams, Link } from "react-router";
import { mockPods, mockLogs } from "../data/mockData";
import { ArrowLeft, Box, Terminal, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function PodDetail() {
  const { podId } = useParams();
  const pod = mockPods.find(p => p.id === podId);

  if (!pod) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-slate-400">Pod not found</p>
        </div>
      </div>
    );
  }

  const cpuHistory = [
    { time: "14:20", value: Math.max(0, pod.cpu - 8) },
    { time: "14:22", value: Math.max(0, pod.cpu - 5) },
    { time: "14:24", value: Math.max(0, pod.cpu - 3) },
    { time: "14:26", value: pod.cpu + 2 },
    { time: "14:28", value: pod.cpu - 1 },
    { time: "14:30", value: pod.cpu },
  ];

  const memoryHistory = [
    { time: "14:20", value: Math.max(0, pod.memory - 6) },
    { time: "14:22", value: Math.max(0, pod.memory - 4) },
    { time: "14:24", value: Math.max(0, pod.memory - 2) },
    { time: "14:26", value: pod.memory + 1 },
    { time: "14:28", value: pod.memory },
    { time: "14:30", value: pod.memory + 2 },
  ];

  return (
    <div className="p-6">
      {/* Back button */}
      <Link 
        to="/pods"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Pods
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Box className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold font-mono">{pod.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  pod.status === "Running" ? "bg-green-500" :
                  pod.status === "Pending" ? "bg-yellow-500" :
                  pod.status === "Failed" ? "bg-red-500" :
                  "bg-blue-500"
                }`} />
                <span className="text-sm text-slate-400">{pod.status}</span>
              </div>
              <span className="text-sm text-slate-600">|</span>
              <span className="text-xs bg-slate-800 px-2 py-1 rounded">{pod.namespace}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Node</div>
          <div className="text-lg font-semibold">{pod.node}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Containers</div>
          <div className="text-lg font-semibold">{pod.containers}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Restarts</div>
          <div className={`text-lg font-semibold ${pod.restarts > 3 ? "text-yellow-400" : ""}`}>
            {pod.restarts}
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Age</div>
          <div className="text-lg font-semibold">{pod.age}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">IP Address</div>
          <div className="text-lg font-semibold font-mono text-sm">10.244.2.{Math.floor(Math.random() * 254) + 1}</div>
        </div>
      </div>

      {/* Resource usage charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-slate-400">CPU Usage Over Time</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cpuHistory}>
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
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-slate-400">Memory Usage Over Time</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={memoryHistory}>
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
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Labels */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
        <h3 className="text-sm font-semibold text-slate-400 mb-4">Labels</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(pod.labels).map(([key, value]) => (
            <div 
              key={key}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 font-mono text-sm"
            >
              <span className="text-slate-500">{key}:</span>
              <span className="text-blue-400 ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Container logs */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <h3 className="font-semibold">Container Logs</h3>
        </div>
        <div className="p-4 bg-slate-950 max-h-96 overflow-auto">
          <div className="font-mono text-xs space-y-1">
            {mockLogs.map((log, index) => (
              <div key={index} className="flex gap-3">
                <span className="text-slate-600">{log.timestamp}</span>
                <span className={`${
                  log.level === "ERROR" ? "text-red-400" :
                  log.level === "WARN" ? "text-yellow-400" :
                  log.level === "INFO" ? "text-blue-400" :
                  "text-slate-400"
                }`}>
                  {log.level.padEnd(5)}
                </span>
                <span className="text-slate-300">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
