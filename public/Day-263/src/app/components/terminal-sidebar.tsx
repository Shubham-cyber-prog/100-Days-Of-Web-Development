import { Terminal, Folder, History, FileCode, Settings, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';

type SidebarView = 'terminal' | 'files' | 'history' | 'scripts' | 'settings';

interface TerminalSidebarProps {
  activeView: SidebarView;
  onViewChange: (view: SidebarView) => void;
  onNewSession: () => void;
  sessions: Array<{ id: string; name: string }>;
  activeSessionId: string;
  onSessionChange: (id: string) => void;
}

export function TerminalSidebar({
  activeView,
  onViewChange,
  onNewSession,
  sessions,
  activeSessionId,
  onSessionChange,
}: TerminalSidebarProps) {
  const navItems: Array<{ id: SidebarView; icon: any; label: string }> = [
    { id: 'terminal', icon: Terminal, label: 'Terminal Sessions' },
    { id: 'files', icon: Folder, label: 'File System' },
    { id: 'history', icon: History, label: 'Command History' },
    { id: 'scripts', icon: FileCode, label: 'Scripts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="p-4 border-b border-zinc-800">
        <Button
          onClick={onNewSession}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Terminal Session
        </Button>
      </div>
      
      <nav className="flex-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-zinc-800 text-green-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {activeView === 'terminal' && (
        <div className="p-2 border-t border-zinc-800 max-h-64 overflow-y-auto">
          <div className="text-xs text-zinc-500 px-4 py-2 uppercase tracking-wider">
            Active Sessions
          </div>
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSessionChange(session.id)}
              className={cn(
                'w-full text-left px-4 py-2 rounded text-sm transition-colors',
                activeSessionId === session.id
                  ? 'bg-green-600 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              )}
            >
              {session.name}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
