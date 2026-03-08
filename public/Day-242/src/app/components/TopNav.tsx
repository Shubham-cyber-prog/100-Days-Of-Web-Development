import { Terminal, ChevronDown, Settings, Bell, User } from 'lucide-react';
import { Button } from './ui/button';

interface TopNavProps {
  workspaceName: string;
  onSettingsClick: () => void;
}

export function TopNav({ workspaceName, onSettingsClick }: TopNavProps) {
  return (
    <div className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4">
      {/* Logo and Workspace */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-white text-lg">TermHub</span>
        </div>
        
        <div className="h-6 w-px bg-zinc-700" />
        
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors">
          <span className="text-sm text-zinc-300">{workspaceName}</span>
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        </button>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
          <Bell className="w-4 h-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
          onClick={onSettingsClick}
        >
          <Settings className="w-4 h-4" />
        </Button>
        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition-colors">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
