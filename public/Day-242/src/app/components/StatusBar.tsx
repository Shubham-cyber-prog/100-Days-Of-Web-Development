import { Circle, Zap } from 'lucide-react';

interface StatusBarProps {
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  shellType: string;
  uptime: string;
}

export function StatusBar({ connectionStatus, shellType, uptime }: StatusBarProps) {
  const statusColors = {
    connected: 'text-emerald-400',
    disconnected: 'text-red-400',
    connecting: 'text-yellow-400',
  };

  const statusLabels = {
    connected: 'Connected',
    disconnected: 'Disconnected',
    connecting: 'Connecting...',
  };

  return (
    <div className="h-7 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between px-4 text-xs">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Circle className={`w-2 h-2 fill-current ${statusColors[connectionStatus]}`} />
          <span className={statusColors[connectionStatus]}>
            {statusLabels[connectionStatus]}
          </span>
        </div>
        
        <div className="h-3 w-px bg-zinc-800" />
        
        <div className="flex items-center gap-2 text-zinc-400">
          <Zap className="w-3 h-3" />
          <span>{shellType}</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <span className="text-zinc-500">Uptime: {uptime}</span>
        <span className="text-zinc-500">Terminal Emulator v2.4.1</span>
      </div>
    </div>
  );
}
