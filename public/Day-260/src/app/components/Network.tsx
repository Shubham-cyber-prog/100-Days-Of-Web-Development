import { Network as NetworkIcon, Wifi, Globe, Activity } from "lucide-react";
import { useVMContext } from "../context/VMContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock network data
const networkData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i}m`,
  upload: Math.random() * 100,
  download: Math.random() * 150,
}));

export default function Network() {
  const { vms } = useVMContext();

  const runningVMs = vms.filter((vm) => vm.status === "running");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl text-foreground mb-1">Network Management</h2>
        <p className="text-sm text-muted-foreground">Monitor network activity and connections</p>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <NetworkIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl text-foreground">{runningVMs.length}</div>
              <div className="text-sm text-muted-foreground">Active Connections</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl text-foreground">45.2 Mbps</div>
              <div className="text-sm text-muted-foreground">Download Speed</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Wifi className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl text-foreground">12.8 Mbps</div>
              <div className="text-sm text-muted-foreground">Upload Speed</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Globe className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <div className="text-2xl text-foreground">8 ms</div>
              <div className="text-sm text-muted-foreground">Latency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Traffic Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg text-foreground mb-4">Network Traffic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={networkData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" tick={{ fontSize: 12, fill: "#888" }} />
            <YAxis tick={{ fontSize: 12, fill: "#888" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "4px",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="download" stroke="#22c55e" strokeWidth={2} name="Download (Mbps)" />
            <Line type="monotone" dataKey="upload" stroke="#a855f7" strokeWidth={2} name="Upload (Mbps)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* VM Network Details */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg text-foreground">VM Network Configuration</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">VM Name</th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">Status</th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">IP Address</th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">MAC Address</th>
                <th className="text-left px-6 py-3 text-sm text-muted-foreground">Network Type</th>
              </tr>
            </thead>
            <tbody>
              {vms.map((vm, index) => (
                <tr key={vm.id} className="border-b border-border hover:bg-accent/50">
                  <td className="px-6 py-4 text-sm text-foreground">{vm.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        vm.status === "running"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {vm.status === "running" ? "Connected" : "Disconnected"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                    {vm.status === "running" ? `192.168.1.${100 + index}` : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                    00:1B:44:11:3A:{(index + 10).toString(16).toUpperCase().padStart(2, "0")}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">NAT</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
