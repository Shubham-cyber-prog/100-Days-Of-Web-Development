import { Clock, Terminal, Trash2, Play } from 'lucide-react';
import { Button } from './ui/button';

interface SavedSession {
  id: string;
  name: string;
  shell: string;
  createdAt: string;
  lastUsed: string;
  commandCount: number;
}

const mockSessions: SavedSession[] = [
  {
    id: '1',
    name: 'react-project-dev',
    shell: 'bash',
    createdAt: 'Feb 20, 2026',
    lastUsed: '2 hours ago',
    commandCount: 47,
  },
  {
    id: '2',
    name: 'node-api-server',
    shell: 'zsh',
    createdAt: 'Feb 19, 2026',
    lastUsed: '1 day ago',
    commandCount: 32,
  },
  {
    id: '3',
    name: 'database-migration',
    shell: 'bash',
    createdAt: 'Feb 18, 2026',
    lastUsed: '2 days ago',
    commandCount: 15,
  },
  {
    id: '4',
    name: 'docker-compose-stack',
    shell: 'bash',
    createdAt: 'Feb 15, 2026',
    lastUsed: '1 week ago',
    commandCount: 28,
  },
];

export function SavedSessionsScreen() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Saved Sessions</h1>
            <p className="text-zinc-400 text-sm">
              Manage and restore your saved terminal sessions
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Clock className="w-4 h-4" />
            <span>{mockSessions.length} saved sessions</span>
          </div>
        </div>

        <div className="grid gap-4">
          {mockSessions.map((session) => (
            <div
              key={session.id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Terminal className="w-6 h-6 text-emerald-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium mb-1 font-mono">
                      {session.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        Shell: <span className="text-zinc-400 font-mono">{session.shell}</span>
                      </span>
                      <span>•</span>
                      <span>Created {session.createdAt}</span>
                      <span>•</span>
                      <span className="text-emerald-400">Last used {session.lastUsed}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-6 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span className="text-zinc-400">{session.commandCount} commands executed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Restore
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if needed) */}
        {mockSessions.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-white font-medium mb-2">No saved sessions</h3>
            <p className="text-zinc-500 text-sm">
              Your saved terminal sessions will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
