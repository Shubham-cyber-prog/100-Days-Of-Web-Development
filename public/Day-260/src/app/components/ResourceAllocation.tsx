import { useVMContext } from "../context/VMContext";
import ResourceVisualization from "./ResourceVisualization";
import { Cpu, MemoryStick, HardDrive, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ResourceAllocation() {
  const { vms } = useVMContext();

  // Prepare chart data
  const chartData = vms.map((vm) => ({
    name: vm.name,
    cpu: vm.cpuAllocation,
    memory: vm.memoryAllocation,
    storage: vm.storageUsage,
  }));

  // Calculate total allocations
  const totalCPU = vms.reduce((sum, vm) => sum + vm.cpuAllocation, 0);
  const totalMemory = vms.reduce((sum, vm) => sum + vm.memoryAllocation, 0);
  const totalStorage = vms.reduce((sum, vm) => sum + vm.storageUsage, 0);

  const resourceStats = [
    {
      label: "Total CPU Allocated",
      value: `${totalCPU}%`,
      max: "100%",
      icon: Cpu,
      color: "blue",
      percentage: totalCPU,
    },
    {
      label: "Total Memory Allocated",
      value: `${totalMemory} GB`,
      max: "128 GB",
      icon: MemoryStick,
      color: "purple",
      percentage: (totalMemory / 128) * 100,
    },
    {
      label: "Total Storage Used",
      value: `${totalStorage.toFixed(0)} GB`,
      max: "1000 GB",
      icon: HardDrive,
      color: "green",
      percentage: (totalStorage / 1000) * 100,
    },
    {
      label: "Active Virtual Machines",
      value: vms.filter((vm) => vm.status === "running").length,
      max: vms.length,
      icon: Activity,
      color: "cyan",
      percentage: vms.length > 0 ? (vms.filter((vm) => vm.status === "running").length / vms.length) * 100 : 0,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; progress: string; chart: string }> = {
      blue: { bg: "bg-blue-500/10", text: "text-blue-500", progress: "bg-blue-500", chart: "#3b82f6" },
      purple: { bg: "bg-purple-500/10", text: "text-purple-500", progress: "bg-purple-500", chart: "#a855f7" },
      green: { bg: "bg-green-500/10", text: "text-green-500", progress: "bg-green-500", chart: "#22c55e" },
      cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500", progress: "bg-cyan-500", chart: "#06b6d4" },
    };
    return colors[color];
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl text-foreground mb-1">Resource Allocation</h2>
        <p className="text-sm text-muted-foreground">
          Monitor resource distribution across all virtual machines
        </p>
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resourceStats.map((stat) => {
          const colors = getColorClasses(stat.color);
          return (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colors.bg}`}>
                  <stat.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">of {stat.max}</div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${colors.progress} transition-all`}
                    style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resource Chart */}
      {vms.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg text-foreground mb-4">Resource Distribution by VM</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#888" }} angle={-45} textAnchor="end" height={100} />
              <YAxis tick={{ fontSize: 12, fill: "#888" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <Bar dataKey="cpu" fill="#3b82f6" name="CPU %" />
              <Bar dataKey="memory" fill="#a855f7" name="Memory (GB)" />
              <Bar dataKey="storage" fill="#22c55e" name="Storage (GB)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Visual Diagram */}
      <ResourceVisualization />
    </div>
  );
}
