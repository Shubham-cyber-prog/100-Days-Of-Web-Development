import { useMemo } from "react";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useSimulation } from "../context/SimulationContext";
import { TrendingUp, Shield, Activity } from "lucide-react";

export function AnalyticsDashboard({ compact = false }: { compact?: boolean }) {
  const { logs, packets } = useSimulation();

  const analytics = useMemo(() => {
    const allowed = packets.filter((p) => p.status === "allowed").length;
    const blocked = packets.filter((p) => p.status === "blocked").length;
    const pending = packets.filter((p) => p.status === "pending").length;

    const protocolCounts: Record<string, number> = {};
    packets.forEach((p) => {
      protocolCounts[p.protocol] = (protocolCounts[p.protocol] || 0) + 1;
    });

    const ipCounts: Record<string, number> = {};
    packets.forEach((p) => {
      ipCounts[p.sourceIP] = (ipCounts[p.sourceIP] || 0) + 1;
    });

    const topIPs = Object.entries(ipCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([ip, count]) => ({ ip, count }));

    const statusData = [
      { name: "Allowed", value: allowed, color: "#10b981" },
      { name: "Blocked", value: blocked, color: "#ef4444" },
      { name: "Pending", value: pending, color: "#eab308" },
    ];

    const protocolData = Object.entries(protocolCounts).map(([name, value]) => ({
      name,
      value,
    }));

    // Traffic rate over time (last 10 seconds)
    const now = Date.now();
    const timeSlots: Record<number, number> = {};
    packets.forEach((p) => {
      const slot = Math.floor((p.timestamp - (now - 10000)) / 1000);
      if (slot >= 0) {
        timeSlots[slot] = (timeSlots[slot] || 0) + 1;
      }
    });

    const rateData = Array.from({ length: 10 }, (_, i) => ({
      time: i,
      packets: timeSlots[i] || 0,
    }));

    return {
      statusData,
      protocolData,
      topIPs,
      rateData,
      totalPackets: packets.length,
      allowedPercentage: packets.length > 0 ? Math.round((allowed / packets.length) * 100) : 0,
      blockedPercentage: packets.length > 0 ? Math.round((blocked / packets.length) * 100) : 0,
    };
  }, [logs, packets]);

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase">Total Packets</p>
              <p className="text-2xl font-semibold text-slate-200 mt-1">{analytics.totalPackets}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-400 opacity-50" />
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase">Allowed</p>
              <p className="text-2xl font-semibold text-green-400 mt-1">{analytics.allowedPercentage}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400 opacity-50" />
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase">Blocked</p>
              <p className="text-2xl font-semibold text-red-400 mt-1">{analytics.blockedPercentage}%</p>
            </div>
            <Shield className="w-8 h-8 text-red-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-2"} gap-4`}>
        {/* Allowed vs Blocked */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Traffic Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={analytics.statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {analytics.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic by Protocol */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Traffic by Protocol</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analytics.protocolData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: "12px" }} />
              <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Packet Rate Over Time */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Packet Rate (Last 10s)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analytics.rateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: "12px" }} />
              <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="packets" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Source IPs */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Top Source IPs</h3>
          <div className="space-y-2">
            {analytics.topIPs.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">No data available</p>
            ) : (
              analytics.topIPs.map((item, index) => (
                <div key={item.ip} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-4">{index + 1}</span>
                    <span className="text-xs font-mono text-slate-300">{item.ip}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${Math.min((item.count / Math.max(...analytics.topIPs.map((i) => i.count))) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-8 text-right">{item.count}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
