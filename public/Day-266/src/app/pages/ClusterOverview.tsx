import { useState } from "react";
import { ClusterDiagram } from "../components/ClusterDiagram";
import { ResourceStatusCards } from "../components/ResourceStatusCards";
import { ResourceDetailsPanel } from "../components/ResourceDetailsPanel";
import { MetricsPanel } from "../components/MetricsPanel";

export function ClusterOverview() {
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [showMetrics, setShowMetrics] = useState(true);

  return (
    <div className="h-full flex flex-col bg-slate-950">
      <div className="flex-1 flex overflow-hidden">
        {/* Main visualization area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Resource status cards */}
          <div className="p-6 pb-4">
            <ResourceStatusCards />
          </div>

          {/* Cluster diagram */}
          <div className="flex-1 overflow-auto px-6">
            <ClusterDiagram onSelectResource={setSelectedResource} />
          </div>

          {/* Bottom metrics panel */}
          {showMetrics && (
            <div className="h-64 border-t border-slate-800 p-6">
              <MetricsPanel />
            </div>
          )}
        </div>

        {/* Right sidebar - Resource details */}
        {selectedResource && (
          <div className="w-96 border-l border-slate-800 overflow-auto">
            <ResourceDetailsPanel 
              resource={selectedResource} 
              onClose={() => setSelectedResource(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
