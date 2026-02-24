import { 
  LayoutDashboard, 
  Code2, 
  Star, 
  FolderOpen, 
  Share2, 
  Settings,
  Plus
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onNewSnippet: () => void;
}

export function Sidebar({ currentView, onViewChange, onNewSnippet }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'all', label: 'All Snippets', icon: Code2 },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'collections', label: 'Collections / Tags', icon: FolderOpen },
    { id: 'shared', label: 'Shared Snippets', icon: Share2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-[#1e1e1e] border-r border-[#2d2d2d] h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg text-white font-semibold">Code Snippets</h1>
        </div>
      </div>

      {/* New Snippet Button */}
      <div className="p-4">
        <button
          onClick={onNewSnippet}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Snippet
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-[#2d2d2d] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[#252525]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#2d2d2d] text-xs text-gray-500">
        <p>© 2026 Code Snippet Manager</p>
      </div>
    </div>
  );
}