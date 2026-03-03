import { Server, Cpu, MemoryStick, HardDrive } from "lucide-react";
import { useVMContext } from "../context/VMContext";

export default function ResourceVisualization() {
  const { vms } = useVMContext();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "border-green-500 bg-green-500/5";
      case "stopped":
        return "border-red-500/30 bg-red-500/5";
      case "paused":
        return "border-yellow-500 bg-yellow-500/5";
      default:
        return "border-gray-500 bg-gray-500/5";
    }
  };

  return (
    <div>
      <h3 className="text-lg text-foreground mb-4">Resource Allocation Visualization</h3>
      <div className="bg-card border border-border rounded-lg p-6">
        {/* Host Machine */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-6 h-6" />
              <h4 className="text-lg">Host Machine</h4>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Cpu className="w-4 h-4" />
                  <span className="text-sm">CPU</span>
                </div>
                <div className="text-xl">100%</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <MemoryStick className="w-4 h-4" />
                  <span className="text-sm">RAM</span>
                </div>
                <div className="text-xl">128 GB</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <HardDrive className="w-4 h-4" />
                  <span className="text-sm">Storage</span>
                </div>
                <div className="text-xl">1 TB</div>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vms.map((vm) => (
            <div
              key={vm.id}
              className={`border-2 rounded-lg p-4 ${getStatusColor(vm.status)}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Server className="w-4 h-4 text-foreground" />
                <h5 className="text-sm text-foreground truncate">{vm.name}</h5>
              </div>

              <div className="space-y-2">
                {/* CPU */}
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>CPU: {vm.cpuAllocation}%</span>
                    <span>{vm.cpuUsage}% used</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all"
                      style={{ width: `${vm.cpuUsage}%` }}
                    />
                  </div>
                </div>

                {/* Memory */}
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>RAM: {vm.memoryAllocation} GB</span>
                    <span>{vm.memoryUsage}% used</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-purple-500 transition-all"
                      style={{ width: `${vm.memoryUsage}%` }}
                    />
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Storage: {vm.storageUsage.toFixed(1)} GB</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500 transition-all"
                      style={{ width: `${Math.min((vm.storageUsage / 500) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
