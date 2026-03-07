import { useVMContext } from "../context/VMContext";
import HostSystemOverview from "./HostSystemOverview";
import VMList from "./VMList";
import ResourceVisualization from "./ResourceVisualization";
import VMDetailsPanel from "./VMDetailsPanel";
import LogsPanel from "./LogsPanel";

export default function Dashboard() {
  const { selectedVM, vms } = useVMContext();

  return (
    <div className="h-full flex">
      <div className={`flex-1 overflow-auto ${selectedVM ? "mr-96" : ""}`}>
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl text-foreground mb-1">Dashboard</h2>
            <p className="text-sm text-muted-foreground">
              Monitor and manage your virtual machines
            </p>
          </div>

          <HostSystemOverview />

          <VMList />

          {vms.length > 0 && <ResourceVisualization />}

          <LogsPanel />
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
