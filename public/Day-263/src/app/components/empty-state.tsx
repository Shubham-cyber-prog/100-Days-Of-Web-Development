import { Terminal } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  onNewSession: () => void;
}

export function EmptyState({ onNewSession }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-zinc-950">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center">
            <Terminal className="w-12 h-12 text-green-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">No Active Sessions</h2>
          <p className="text-zinc-400">
            Create a new terminal session to start executing commands and managing your virtual environment.
          </p>
        </div>
        
        <Button
          onClick={onNewSession}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Terminal className="w-5 h-5 mr-2" />
          Create Your First Session
        </Button>
      </div>
    </div>
  );
}
