import { useVMContext } from "../context/VMContext";
import VMList from "./VMList";
import VMDetailsPanel from "./VMDetailsPanel";
import { Filter } from "lucide-react";
import { useState } from "react";

export default function VirtualMachines() {
  const { selectedVM, vms } = useVMContext();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredVMs = vms.filter((vm) => {
    if (filterStatus === "all") return true;
    return vm.status === filterStatus;
  });

  const stats = {
    total: vms.length,
    running: vms.filter((vm) => vm.status === "running").length,
    stopped: vms.filter((vm) => vm.status === "stopped").length,
    paused: vms.filter((vm) => vm.status === "paused").length,
  };

  return (
    <div className="h-full flex">
      <div className={`flex-1 overflow-auto ${selectedVM ? "mr-96" : ""}`}>
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl text-foreground mb-1">Virtual Machines</h2>
            <p className="text-sm text-muted-foreground">
              Manage all your virtual machines in one place
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl text-foreground mb-1">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total VMs</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl text-green-500 mb-1">{stats.running}</div>
              <div className="text-sm text-muted-foreground">Running</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl text-red-500 mb-1">{stats.stopped}</div>
              <div className="text-sm text-muted-foreground">Stopped</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl text-yellow-500 mb-1">{stats.paused}</div>
              <div className="text-sm text-muted-foreground">Paused</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filter:
            </div>
            <div className="flex gap-2">
              {["all", "running", "stopped", "paused"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                    filterStatus === status
                      ? "bg-blue-600 text-white"
                      : "bg-muted text-foreground hover:bg-accent"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <VMList />
        </div>
      </div>

      {selectedVM && (
        <div className="w-96 border-l border-border">
          <VMDetailsPanel />
        </div>
      )}
    </div>
  );
}
