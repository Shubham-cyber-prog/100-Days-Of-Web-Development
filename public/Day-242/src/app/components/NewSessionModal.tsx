import { useState } from 'react';
import { X, Terminal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface NewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSession: (name: string, shell: string) => void;
}

const shellOptions = [
  { id: 'bash', name: 'Bash', description: 'Bourne Again Shell' },
  { id: 'zsh', name: 'Zsh', description: 'Z Shell' },
  { id: 'fish', name: 'Fish', description: 'Friendly Interactive Shell' },
  { id: 'sh', name: 'sh', description: 'Bourne Shell' },
];

export function NewSessionModal({ isOpen, onClose, onCreateSession }: NewSessionModalProps) {
  const [sessionName, setSessionName] = useState('');
  const [selectedShell, setSelectedShell] = useState('bash');

  const handleCreate = () => {
    if (sessionName.trim()) {
      onCreateSession(sessionName, selectedShell);
      setSessionName('');
      setSelectedShell('bash');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center">
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>
            Create New Terminal Session
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Session Name */}
          <div>
            <Label htmlFor="session-name" className="text-sm text-zinc-300 mb-2 block">
              Session Name
            </Label>
            <Input
              id="session-name"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="e.g., my-project-dev"
              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600"
            />
          </div>

          {/* Shell Selection */}
          <div>
            <Label className="text-sm text-zinc-300 mb-3 block">
              Select Shell
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {shellOptions.map((shell) => (
                <button
                  key={shell.id}
                  onClick={() => setSelectedShell(shell.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedShell === shell.id
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-mono text-sm font-medium text-white mb-1">
                    {shell.name}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {shell.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!sessionName.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Create Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
