import { Search, Bell, Settings, Plus, Play, Square, Server } from "lucide-react";
import { useVMContext } from "../context/VMContext";
import { useState } from "react";
import CreateVMModal from "./CreateVMModal";

export default function TopNav() {
  const { startAllVMs, stopAllVMs } = useVMContext();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl text-foreground">Hypervisor Simulator</h1>
          </div>

          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md">
            <Server className="w-4 h-4 text-muted-foreground" />
            <select className="bg-transparent text-sm text-foreground outline-none border-none">
              <option>Local Host</option>
              <option>Cluster 01</option>
              <option>Cluster 02</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create VM
          </button>

          <button
            onClick={startAllVMs}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
          >
            <Play className="w-4 h-4" />
            Start All
          </button>

          <button
            onClick={stopAllVMs}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            <Square className="w-4 h-4" />
            Stop All
          </button>

          <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search VMs..."
              className="bg-transparent text-sm text-foreground outline-none border-none w-48"
            />
          </div>

          <button className="p-2 hover:bg-accent rounded-md transition-colors relative">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 hover:bg-accent rounded-md transition-colors">
            <Settings className="w-5 h-5 text-foreground" />
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm">
            A
          </div>
        </div>
      </header>

      <CreateVMModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </>
  );
}
