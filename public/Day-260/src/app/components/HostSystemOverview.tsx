import { Cpu, MemoryStick, HardDrive, Server } from "lucide-react";
import { useVMContext } from "../context/VMContext";

export default function HostSystemOverview() {
  const { vms } = useVMContext();

  // Calculate total resource usage
  const totalCPU = vms
    .filter((vm) => vm.status === "running")
    .reduce((sum, vm) => sum + (vm.cpuAllocation * vm.cpuUsage) / 100, 0);

  const totalMemory = vms.reduce((sum, vm) => sum + vm.memoryAllocation, 0);
  const totalMemoryUsage = vms
    .filter((vm) => vm.status === "running")
    .reduce((sum, vm) => sum + (vm.memoryAllocation * vm.memoryUsage) / 100, 0);

  const totalStorage = vms.reduce((sum, vm) => sum + vm.storageUsage, 0);

  const activeVMs = vms.filter((vm) => vm.status === "running").length;

  const stats = [
    {
      label: "Total CPU Usage",
      value: `${Math.round(totalCPU)}%`,
      icon: Cpu,
      color: "blue",
      progress: totalCPU,
    },
    {
      label: "Total Memory Usage",
      value: `${Math.round(totalMemoryUsage)} / ${totalMemory} GB`,
      icon: MemoryStick,
      color: "purple",
      progress: totalMemory > 0 ? (totalMemoryUsage / totalMemory) * 100 : 0,
    },
    {
      label: "Storage Usage",
      value: `${Math.round(totalStorage)} / 1000 GB`,
      icon: HardDrive,
      color: "green",
      progress: (totalStorage / 1000) * 100,
    },
    {
      label: "Active VMs",
      value: `${activeVMs} / ${vms.length}`,
      icon: Server,
      color: "cyan",
      progress: vms.length > 0 ? (activeVMs / vms.length) * 100 : 0,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; progress: string }> = {
      blue: { bg: "bg-blue-500/10", text: "text-blue-500", progress: "bg-blue-500" },
      purple: { bg: "bg-purple-500/10", text: "text-purple-500", progress: "bg-purple-500" },
      green: { bg: "bg-green-500/10", text: "text-green-500", progress: "bg-green-500" },
      cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500", progress: "bg-cyan-500" },
    };
    return colors[color];
  };

  return (
    <div>
      <h3 className="text-lg text-foreground mb-4">Host System Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const colors = getColorClasses(stat.color);
          return (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colors.bg}`}>
                  <stat.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <span className="text-2xl text-foreground">{stat.value}</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${colors.progress} transition-all`}
                    style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
