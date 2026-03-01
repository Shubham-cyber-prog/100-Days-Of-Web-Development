import { Activity, Radio, BarChart3, PieChart, AlertTriangle, Archive, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

const menuItems = [
  { id: 'live', icon: Activity, label: 'Live Capture', active: true },
  { id: 'stream', icon: Radio, label: 'Packet Stream', active: false },
  { id: 'analytics', icon: BarChart3, label: 'Traffic Analytics', active: false },
  { id: 'protocol', icon: PieChart, label: 'Protocol Breakdown', active: false },
  { id: 'alerts', icon: AlertTriangle, label: 'Alerts & Logs', active: false },
  { id: 'sessions', icon: Archive, label: 'Saved Sessions', active: false },
];

export function LeftSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`border-r border-slate-800 bg-slate-950/30 backdrop-blur-sm transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } flex flex-col`}
    >
      <div className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                item.active
                  ? 'bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full text-slate-400 hover:text-white"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </div>
  );
}
