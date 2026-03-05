import { useParams, Link } from "react-router";
import { mockNodes, mockPods } from "../data/mockData";
import { ArrowLeft, Server, Box } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function NodeDetail() {
  const { nodeId } = useParams();
  const node = mockNodes.find(n => n.id === nodeId);
  const nodePods = mockPods.filter(p => p.node === node?.name);

  if (!node) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-slate-400">Node not found</p>
        </div>
      </div>
    );
  }

  const cpuHistory = [
    { time: "14:20", value: node.cpu - 8 },
    { time: "14:22", value: node.cpu - 5 },
    { time: "14:24", value: node.cpu - 3 },
    { time: "14:26", value: node.cpu + 2 },
    { time: "14:28", value: node.cpu - 1 },
    { time: "14:30", value: node.cpu },
  ];

  const memoryHistory = [
    { time: "14:20", value: node.memory - 6 },
    { time: "14:22", value: node.memory - 4 },
    { time: "14:24", value: node.memory - 2 },
    { time: "14:26", value: node.memory + 1 },
    { time: "14:28", value: node.memory },
    { time: "14:30", value: node.memory + 2 },
  ];

  return (
    <div className="p-6">
      {/* Back button */}
      <Link 
        to="/nodes"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Nodes
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <Server className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{node.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${node.status === "Ready" ? "bg-green-500" : "bg-red-500"}`} />
              <span className="text-sm text-slate-400">{node.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Role</div>
          <div className="text-xl font-semibold capitalize">{node.role}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Version</div>
          <div className="text-xl font-semibold font-mono">{node.version}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Pods</div>
          <div className="text-xl font-semibold">{node.pods}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-1">Age</div>
          <div className="text-xl font-semibold">{node.age}</div>
        </div>
      </div>

      {/* Resource usage charts */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-slate-400 mb-4">CPU Usage Over Time</h3>
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
          <h3 className="text-sm font-semibold text-slate-400 mb-4">Memory Usage Over Time</h3>
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

      {/* Pods running on this node */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800">
          <h3 className="font-semibold">Pods Running on This Node</h3>
          <p className="text-sm text-slate-400 mt-1">{nodePods.length} pods</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAME</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAMESPACE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">STATUS</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">CPU</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">MEMORY</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">RESTARTS</th>
              </tr>
            </thead>
            <tbody>
              {nodePods.map((pod) => (
                <tr 
                  key={pod.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium font-mono">{pod.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded">{pod.namespace}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        pod.status === "Running" ? "bg-green-500" :
                        pod.status === "Pending" ? "bg-yellow-500" :
                        pod.status === "Failed" ? "bg-red-500" :
                        "bg-blue-500"
                      }`} />
                      <span className="text-sm">{pod.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{pod.cpu}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{pod.memory}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${pod.restarts > 3 ? "text-yellow-400" : ""}`}>
                      {pod.restarts}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
