import { Play, Square, Pause, Trash2 } from "lucide-react";
import { useVMContext } from "../context/VMContext";

export default function VMList() {
  const { vms, setSelectedVM, startVM, stopVM, pauseVM, deleteVM, selectedVM } = useVMContext();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "stopped":
        return "bg-red-500";
      case "paused":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      running: "bg-green-500/10 text-green-500 border-green-500/20",
      stopped: "bg-red-500/10 text-red-500 border-red-500/20",
      paused: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    };
    return colors[status as keyof typeof colors] || "bg-gray-500/10 text-gray-500";
  };

  if (vms.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg text-foreground mb-2">No Virtual Machines</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get started by creating your first virtual machine
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg text-foreground mb-4">Virtual Machines</h3>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-sm text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-sm text-muted-foreground">VM Name</th>
              <th className="text-left px-4 py-3 text-sm text-muted-foreground">OS</th>
              <th className="text-left px-4 py-3 text-sm text-muted-foreground">CPU</th>
              <th className="text-left px-4 py-3 text-sm text-muted-foreground">Memory</th>
              <th className="text-left px-4 py-3 text-sm text-muted-foreground">Storage</th>
              <th className="text-left px-4 py-3 text-sm text-muted-foreground">Uptime</th>
              <th className="text-left px-4 py-3 text-sm text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vms.map((vm) => (
              <tr
                key={vm.id}
                onClick={() => setSelectedVM(vm)}
                className={`border-b border-border hover:bg-accent/50 cursor-pointer transition-colors ${
                  selectedVM?.id === vm.id ? "bg-accent/30" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(vm.status)}`} />
                    <span
                      className={`text-xs px-2 py-1 rounded border ${getStatusBadge(
                        vm.status
                      )}`}
                    >
                      {vm.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">{vm.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{vm.os}</td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div className="text-sm text-foreground">{vm.cpuAllocation}%</div>
                    <div className="w-20 bg-muted rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-blue-500"
                        style={{ width: `${vm.cpuUsage}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    <div className="text-sm text-foreground">{vm.memoryAllocation} GB</div>
                    <div className="w-20 bg-muted rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-purple-500"
                        style={{ width: `${vm.memoryUsage}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {vm.storageUsage.toFixed(1)} GB
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{vm.uptime}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    {vm.status !== "running" && (
                      <button
                        onClick={() => startVM(vm.id)}
                        className="p-1.5 hover:bg-green-500/10 text-green-500 rounded transition-colors"
                        title="Start"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                    )}
                    {vm.status === "running" && (
                      <button
                        onClick={() => pauseVM(vm.id)}
                        className="p-1.5 hover:bg-yellow-500/10 text-yellow-500 rounded transition-colors"
                        title="Pause"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                    )}
                    {vm.status !== "stopped" && (
                      <button
                        onClick={() => stopVM(vm.id)}
                        className="p-1.5 hover:bg-red-500/10 text-red-500 rounded transition-colors"
                        title="Stop"
                      >
                        <Square className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm(`Delete VM "${vm.name}"?`)) {
                          deleteVM(vm.id);
                        }
                      }}
                      className="p-1.5 hover:bg-red-500/10 text-red-500 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
