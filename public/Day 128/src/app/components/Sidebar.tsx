import {
  Home,
  Upload,
  Camera,
  History,
  Settings,
  TrendingUp,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
}

export function Sidebar({ activeTab, onTabChange, isOpen }: SidebarProps) {
  const navItems = [
    { id: 'Home', icon: Home, label: 'Dashboard' },
    { id: 'Upload', icon: Upload, label: 'Upload' },
    { id: 'Live Camera', icon: Camera, label: 'Live Camera' },
    { id: 'History', icon: History, label: 'History' },
    { id: 'Settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => onTabChange(activeTab)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-16 left-0 bottom-0 w-64 bg-black/40 backdrop-blur-xl border-r border-purple-500/20 p-4 flex flex-col gap-6 transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Stats Cards */}
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Scans</p>
                <p className="text-xl font-bold text-cyan-400">1,247</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Accuracy</p>
                <p className="text-xl font-bold text-purple-400">98.7%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10'
                    : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Model Status */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-500/50 animate-pulse" />
            <p className="text-sm font-medium text-green-400">Model Active</p>
          </div>
          <p className="text-xs text-gray-400">TensorFlow.js v4.2.0</p>
        </div>
      </aside>
    </>
  );
}
