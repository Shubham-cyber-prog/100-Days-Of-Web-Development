import { Search, Terminal, Clock, Copy } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface CommandHistory {
  id: string;
  command: string;
  timestamp: string;
  session: string;
  exitCode: number;
}

const mockHistory: CommandHistory[] = [
  { id: '1', command: 'npm run dev', timestamp: '10:45 AM', session: 'bash-main', exitCode: 0 },
  { id: '2', command: 'git status', timestamp: '10:42 AM', session: 'bash-main', exitCode: 0 },
  { id: '3', command: 'git add .', timestamp: '10:41 AM', session: 'bash-main', exitCode: 0 },
  { id: '4', command: 'git commit -m "Update components"', timestamp: '10:40 AM', session: 'bash-main', exitCode: 0 },
  { id: '5', command: 'npm install lucide-react', timestamp: '10:35 AM', session: 'bash-main', exitCode: 0 },
  { id: '6', command: 'ls -la', timestamp: '10:30 AM', session: 'bash-main', exitCode: 0 },
  { id: '7', command: 'cd projects', timestamp: '10:28 AM', session: 'bash-main', exitCode: 0 },
  { id: '8', command: 'docker ps', timestamp: '10:15 AM', session: 'node-server', exitCode: 0 },
  { id: '9', command: 'docker-compose up -d', timestamp: '10:12 AM', session: 'node-server', exitCode: 0 },
  { id: '10', command: 'npm test', timestamp: '09:58 AM', session: 'bash-main', exitCode: 1 },
];

export function HistoryScreen() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Command History</h1>
            <p className="text-zinc-400 text-sm">
              Browse and search your recent commands
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search commands..."
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600"
          />
        </div>

        {/* History List */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          {mockHistory.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-4 px-5 py-4 hover:bg-zinc-850 transition-colors border-b border-zinc-800 last:border-0 group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  item.exitCode === 0 ? 'bg-emerald-400' : 'bg-red-400'
                }`} />
                
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm text-white mb-1">
                    {item.command}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      {item.session}
                    </span>
                    <span>•</span>
                    <span className={item.exitCode === 0 ? 'text-emerald-400' : 'text-red-400'}>
                      Exit {item.exitCode}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 hover:text-white"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-semibold text-white mb-1">{mockHistory.length}</div>
            <div className="text-xs text-zinc-500">Total Commands</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-semibold text-emerald-400 mb-1">
              {mockHistory.filter(h => h.exitCode === 0).length}
            </div>
            <div className="text-xs text-zinc-500">Successful</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <div className="text-2xl font-semibold text-red-400 mb-1">
              {mockHistory.filter(h => h.exitCode !== 0).length}
            </div>
            <div className="text-xs text-zinc-500">Failed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
