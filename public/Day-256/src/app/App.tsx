import { useState } from "react";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { DashboardView } from "./components/DashboardView";
import { ContainersView } from "./components/ContainersView";
import { ImagesView } from "./components/ImagesView";
import { VolumesView } from "./components/VolumesView";
import { NetworksView } from "./components/NetworksView";
import { LogsView } from "./components/LogsView";
import { TerminalView } from "./components/TerminalView";
import { SettingsView } from "./components/SettingsView";
import { ContainerDetails } from "./components/ContainerDetails";
import { CreateContainerModal } from "./components/CreateContainerModal";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView onSelectContainer={setSelectedContainer} />;
      case "containers":
        return <ContainersView onSelectContainer={setSelectedContainer} />;
      case "images":
        return <ImagesView />;
      case "volumes":
        return <VolumesView />;
      case "networks":
        return <NetworksView />;
      case "logs":
        return <LogsView />;
      case "terminal":
        return <TerminalView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView onSelectContainer={setSelectedContainer} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 dark">
      <TopNav />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          onCreateContainer={() => setIsCreateModalOpen(true)}
        />
        
        {renderView()}
        
        {selectedContainer && (
          <ContainerDetails
            containerId={selectedContainer}
            onClose={() => setSelectedContainer(null)}
          />
        )}
      </div>

      <CreateContainerModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}