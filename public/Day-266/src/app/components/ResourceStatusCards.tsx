import { Server, Box, AlertCircle, Layers, Cpu, MemoryStick } from "lucide-react";
import { mockNodes, mockPods, mockDeployments } from "../data/mockData";

export function ResourceStatusCards() {
  const totalNodes = mockNodes.length;
  const runningPods = mockPods.filter(p => p.status === "Running").length;
  const failedPods = mockPods.filter(p => p.status === "Failed").length;
  const activeDeployments = mockDeployments.length;
  const avgCpu = Math.round(mockNodes.reduce((acc, n) => acc + n.cpu, 0) / mockNodes.length);
  const avgMemory = Math.round(mockNodes.reduce((acc, n) => acc + n.memory, 0) / mockNodes.length);

  const cards = [
    {
      title: "Total Nodes",
      value: totalNodes,
      icon: Server,
      color: "blue",
      description: "All nodes ready"
    },
    {
      title: "Running Pods",
      value: runningPods,
      icon: Box,
      color: "green",
      description: `${mockPods.length} total pods`
    },
    {
      title: "Failed Pods",
      value: failedPods,
      icon: AlertCircle,
      color: "red",
      description: "Requires attention"
    },
    {
      title: "Active Deployments",
      value: activeDeployments,
      icon: Layers,
      color: "cyan",
      description: "All deployments healthy"
    },
    {
      title: "CPU Usage",
      value: `${avgCpu}%`,
      icon: Cpu,
      color: "purple",
      description: "Cluster average",
      progress: avgCpu
    },
    {
      title: "Memory Usage",
      value: `${avgMemory}%`,
      icon: MemoryStick,
      color: "orange",
      description: "Cluster average",
      progress: avgMemory
    }
  ];

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    red: "bg-red-500/10 text-red-400",
    cyan: "bg-cyan-500/10 text-cyan-400",
    purple: "bg-purple-500/10 text-purple-400",
    orange: "bg-orange-500/10 text-orange-400"
  };

  const progressColors: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500"
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      {cards.map((card) => (
        <div key={card.title} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${colorClasses[card.color]} flex items-center justify-center`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="mb-1">
            <div className="text-2xl font-semibold">{card.value}</div>
          </div>
          <div className="text-xs text-slate-500 mb-2">{card.title}</div>
          {card.progress !== undefined && (
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${progressColors[card.color]} transition-all duration-500`}
                style={{ width: `${card.progress}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
