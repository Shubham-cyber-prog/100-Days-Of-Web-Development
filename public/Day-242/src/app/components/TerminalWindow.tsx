import { useState, useEffect } from 'react';
import { X, Plus, Circle, SplitSquareVertical, SplitSquareHorizontal, Maximize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from './ui/utils';

interface TerminalTab {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
}

interface TerminalWindowProps {
  onNewTerminal: () => void;
  isSplit?: boolean;
  onSplitVertical?: () => void;
  onSplitHorizontal?: () => void;
}

export function TerminalWindow({ 
  onNewTerminal, 
  isSplit = false,
  onSplitVertical,
  onSplitHorizontal 
}: TerminalWindowProps) {
  const [tabs, setTabs] = useState<TerminalTab[]>([
    { id: '1', name: 'bash-main', status: 'connected' },
    { id: '2', name: 'node-server', status: 'connected' },
  ]);
  const [activeTab, setActiveTab] = useState('1');
  const [currentLine, setCurrentLine] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const closeTab = (id: string) => {
    setTabs(tabs.filter(tab => tab.id !== id));
    if (activeTab === id && tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 py-2">
        {/* Tabs */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors group",
                activeTab === tab.id
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <Circle className={cn(
                "w-2 h-2 fill-current",
                tab.status === 'connected' ? 'text-emerald-400' : 'text-red-400'
              )} />
              <span className="text-xs font-mono">{tab.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewTerminal}
            className="h-7 w-7 p-0 text-zinc-400 hover:text-white"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {!isSplit && onSplitVertical && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSplitVertical}
              className="h-7 px-2 text-zinc-400 hover:text-white"
            >
              <SplitSquareVertical className="w-4 h-4" />
            </Button>
          )}
          {!isSplit && onSplitHorizontal && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSplitHorizontal}
              className="h-7 px-2 text-zinc-400 hover:text-white"
            >
              <SplitSquareHorizontal className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-zinc-400 hover:text-white"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 overflow-auto font-mono text-sm">
        <div className="space-y-1">
          <div className="text-emerald-400">
            Last login: Tue Feb 24 09:23:14 on ttys001
          </div>
          <div className="text-zinc-400">
            Welcome to {activeTabData?.name || 'terminal'}
          </div>
          <div className="text-zinc-500">~</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-emerald-400">user@termhub</span>
            <span className="text-zinc-500">:</span>
            <span className="text-blue-400">~/projects</span>
            <span className="text-zinc-400">$</span>
            <span className="text-white">npm run dev</span>
          </div>
          <div className="text-zinc-400 mt-2">
            <div>{'>'} termhub@2.4.1 dev</div>
            <div>{'>'} vite</div>
            <div className="mt-2 text-emerald-400">
              VITE v5.0.0  ready in 324 ms
            </div>
            <div className="text-zinc-400">
              ➜  Local:   <span className="text-cyan-400">http://localhost:5173/</span>
            </div>
            <div className="text-zinc-400">
              ➜  Network: use --host to expose
            </div>
            <div className="text-zinc-400 mt-2">
              ➜  press h to show help
            </div>
          </div>
          
          {/* Mock additional output */}
          <div className="text-zinc-500 mt-4">~</div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">user@termhub</span>
            <span className="text-zinc-500">:</span>
            <span className="text-blue-400">~/projects</span>
            <span className="text-zinc-400">$</span>
            <span className="text-white">{currentLine}</span>
            {showCursor && (
              <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
