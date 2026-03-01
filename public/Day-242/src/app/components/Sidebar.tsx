import { Terminal, Clock, FolderOpen, History, Settings, Plus } from 'lucide-react';
import { cn } from './ui/utils';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onNewTerminal: () => void;
}

const sidebarItems = [
  { id: 'terminals', label: 'Terminals', icon: Terminal },
  { id: 'sessions', label: 'Saved Sessions', icon: Clock },
  { id: 'files', label: 'Files', icon: FolderOpen },
  { id: 'history', label: 'History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeView, onViewChange, onNewTerminal }: SidebarProps) {
  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      {/* New Terminal Button */}
      <div className="p-4">
        <button
          onClick={onNewTerminal}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          New Terminal
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors mb-1",
                isActive
                  ? "bg-zinc-800 text-emerald-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800">
        <div className="text-xs text-zinc-500">
          <div className="flex items-center justify-between mb-1">
            <span>Version</span>
            <span className="text-zinc-400">2.4.1</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Status</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
