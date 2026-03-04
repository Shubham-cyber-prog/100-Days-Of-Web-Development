import { AnalyticsDashboard } from "../components/AnalyticsDashboard";
import { BarChart3, TrendingUp } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

export function Analytics() {
  const { packets, logs } = useSimulation();

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-semibold text-slate-200">Traffic Analytics</h1>
        </div>
        <p className="text-sm text-slate-400">
          Comprehensive analytics and insights about network traffic patterns and firewall performance.
        </p>
      </div>

      <AnalyticsDashboard />

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <h2 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Performance Metrics
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Active Packets</span>
              <span className="font-mono text-slate-200">{packets.filter(p => p.status === 'pending').length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Processed Packets</span>
              <span className="font-mono text-slate-200">{packets.filter(p => p.status !== 'pending').length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Total Events</span>
              <span className="font-mono text-slate-200">{logs.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <h2 className="font-semibold text-slate-200 mb-4">Traffic Summary</h2>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-400">Allowed Traffic</span>
                <span className="text-green-400">{packets.filter(p => p.status === 'allowed').length}</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${packets.length > 0 ? (packets.filter(p => p.status === 'allowed').length / packets.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-400">Blocked Traffic</span>
                <span className="text-red-400">{packets.filter(p => p.status === 'blocked').length}</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{
                    width: `${packets.length > 0 ? (packets.filter(p => p.status === 'blocked').length / packets.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <h2 className="font-semibold text-slate-200 mb-4">Protocol Distribution</h2>
          <div className="space-y-2 text-sm">
            {['TCP', 'UDP', 'HTTP', 'HTTPS', 'ICMP'].map((protocol) => {
              const count = packets.filter(p => p.protocol === protocol).length;
              return (
                <div key={protocol} className="flex items-center justify-between">
                  <span className="text-slate-400">{protocol}</span>
                  <span className="font-mono text-slate-200">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
