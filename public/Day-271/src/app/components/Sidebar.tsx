import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, Box, GitFork, FileText, BarChart3, Settings, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useSimulation } from '../store/SimulationContext';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Memory Overview' },
  { path: '/objects', icon: Box, label: 'Objects' },
  { path: '/references', icon: GitFork, label: 'References' },
  { path: '/logs', icon: FileText, label: 'GC Logs' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const { addObject } = useSimulation();

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <Button onClick={addObject} className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4" />
          Add Object
        </Button>
      </div>
    </div>
  );
};
