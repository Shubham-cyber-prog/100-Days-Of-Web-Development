import { Monitor, FolderOpen, Camera, Terminal, Activity, Settings, Plus } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onCreateInstance: () => void;
}

const menuItems = [
  { id: 'emulator', label: 'Emulator', icon: Monitor },
  { id: 'filesystem', label: 'File System', icon: FolderOpen },
  { id: 'snapshots', label: 'Snapshots', icon: Camera },
  { id: 'terminal', label: 'Terminal', icon: Terminal },
  { id: 'resources', label: 'Resource Monitor', icon: Activity },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export function Sidebar({ currentView, onViewChange, onCreateInstance }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#161b22] border-r border-gray-800 flex flex-col">
      <div className="p-4">
        <button
          onClick={onCreateInstance}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Create Emulator Instance
        </button>
      </div>

      <nav className="flex-1 px-3 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                isActive 
                  ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200 border-l-4 border-transparent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 space-y-1">
          <p>Version 2.4.1</p>
          <p>© 2026 Browser Emulator</p>
        </div>
      </div>
    </aside>
  );
}
