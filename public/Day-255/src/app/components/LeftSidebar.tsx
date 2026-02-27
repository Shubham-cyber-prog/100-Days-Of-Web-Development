import { Activity, GitBranch, FileText, Server, BarChart3, Settings, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface LeftSidebarProps {
  onAddServer: () => void;
}

export function LeftSidebar({ onAddServer }: LeftSidebarProps) {
  const menuItems = [
    { icon: Activity, label: 'Simulator Dashboard', active: true },
    { icon: GitBranch, label: 'Algorithms', active: false },
    { icon: FileText, label: 'Traffic Logs', active: false },
    { icon: Server, label: 'Server Configuration', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-gray-300'
              }`}
            >
              <item.icon className="size-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Button onClick={onAddServer} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="size-4 mr-2" />
          Add Server
        </Button>
      </div>
    </div>
  );
}
