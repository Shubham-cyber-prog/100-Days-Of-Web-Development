import { Brain, Menu } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMenuToggle: () => void;
}

export function TopNav({ activeTab, onTabChange, onMenuToggle }: TopNavProps) {
  const menuItems = ['Home', 'Upload', 'Live Camera', 'History', 'Settings'];

  return (
    <nav className="h-16 bg-black/40 backdrop-blur-xl border-b border-purple-500/20 flex items-center px-6 relative z-50">
      {/* Mobile Menu Toggle */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden mr-4 p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6 text-purple-400" />
      </button>

      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-lg opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-cyan-500 to-purple-600 p-2 rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          AI-Powered Image Recognition
        </h1>
      </div>

      {/* Desktop Menu Items */}
      <div className="hidden lg:flex items-center gap-1 ml-auto">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => onTabChange(item)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === item
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}
