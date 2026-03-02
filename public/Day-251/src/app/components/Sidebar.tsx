import { LayoutDashboard, Server, FileStack, HardDrive, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'machines', icon: Server, label: 'My Machines' },
    { id: 'templates', icon: FileStack, label: 'Templates' },
    { id: 'storage', icon: HardDrive, label: 'Storage' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`h-full bg-[#1e1e1e] border-r border-[#2d2d2d] flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-60'}`}>
      <div className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                isActive
                  ? 'bg-[#2d2d2d] text-blue-500 border-l-2 border-blue-500'
                  : 'text-gray-400 hover:text-white hover:bg-[#252525]'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-4 text-gray-400 hover:text-white transition-colors border-t border-[#2d2d2d]"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>
    </div>
  );
}
