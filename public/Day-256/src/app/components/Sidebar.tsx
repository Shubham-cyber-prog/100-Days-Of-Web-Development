import { 
  LayoutDashboard, 
  Box, 
  Image, 
  Database, 
  Network, 
  FileText, 
  Terminal, 
  Settings,
  Plus
} from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onCreateContainer: () => void;
}

export function Sidebar({ activeView, onViewChange, onCreateContainer }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "containers", label: "Containers", icon: Box },
    { id: "images", label: "Images", icon: Image },
    { id: "volumes", label: "Volumes", icon: Database },
    { id: "networks", label: "Networks", icon: Network },
    { id: "logs", label: "Logs", icon: FileText },
    { id: "terminal", label: "Terminal", icon: Terminal },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Button 
          onClick={onCreateContainer}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Container
        </Button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeView === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
