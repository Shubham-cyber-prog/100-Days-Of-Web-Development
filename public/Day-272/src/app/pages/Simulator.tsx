import { NetworkVisualization } from "../components/NetworkVisualization";
import { FirewallRulesTable } from "../components/FirewallRulesTable";
import { PacketInspectionPanel } from "../components/PacketInspectionPanel";
import { LogsViewer } from "../components/LogsViewer";
import { AnalyticsDashboard } from "../components/AnalyticsDashboard";

export function Simulator() {
  return (
    <div className="p-6 space-y-6">
      {/* Main Simulation Area */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <NetworkVisualization />
          <FirewallRulesTable compact />
        </div>
        <div>
          <PacketInspectionPanel />
        </div>
      </div>

      {/* Bottom Panels */}
      <div className="grid grid-cols-2 gap-6">
        <LogsViewer compact />
        <div>
          <AnalyticsDashboard compact />
        </div>
      </div>
    </div>
  );
}
