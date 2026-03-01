import { Terminal, PlusCircle, Trash2, Save, Settings, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';

interface TerminalHeaderProps {
  sessionName: string;
  onSessionNameChange: (name: string) => void;
  onNewSession: () => void;
  onClearTerminal: () => void;
  onSaveSession: () => void;
}

export function TerminalHeader({
  sessionName,
  onSessionNameChange,
  onNewSession,
  onClearTerminal,
  onSaveSession,
}: TerminalHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-zinc-900 border-b border-zinc-800">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-green-400" />
          <span className="font-semibold text-white">Browser Shell</span>
        </div>
        <div className="flex items-center gap-2 ml-8">
          <span className="text-sm text-zinc-400">Session:</span>
          <Input
            value={sessionName}
            onChange={(e) => onSessionNameChange(e.target.value)}
            className="h-8 w-48 bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onNewSession}
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Session
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearTerminal}
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onSaveSession}
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-400 hover:text-white"
        >
          <Settings className="w-5 h-5" />
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-green-600 text-white">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
