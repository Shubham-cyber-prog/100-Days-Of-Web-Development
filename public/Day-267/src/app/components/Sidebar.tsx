import { Link, useLocation } from 'react-router';
import {
  Network,
  Server,
  Database,
  Activity,
  FileText,
  BarChart3,
  Settings,
  Plus,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Architecture Overview', icon: Network },
  { path: '/services', label: 'Services', icon: Server },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/logs', label: 'Logs', icon: FileText },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>
    </aside>
  );
}
