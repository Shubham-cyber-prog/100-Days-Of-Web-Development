import { Search, Bell, ChevronDown } from 'lucide-react';

interface TopBarProps {
  title?: string;
}

export function TopBar({ title }: TopBarProps) {
  return (
    <div className="h-16 border-b border-border bg-white flex items-center justify-between px-8">
      <div>
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-80 h-10 pl-10 pr-4 rounded-xl bg-input-background border border-transparent focus:border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="w-10 h-10 rounded-xl hover:bg-accent flex items-center justify-center transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-accent transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <span className="text-sm font-medium">John Doe</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
