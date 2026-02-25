import { useState } from 'react';
import { TerminalWindow } from './TerminalWindow';
import { RightPanel } from './RightPanel';
import { StatusBar } from './StatusBar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable';

interface TerminalDashboardProps {
  onNewTerminal: () => void;
}

export function TerminalDashboard({ onNewTerminal }: TerminalDashboardProps) {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [splitView, setSplitView] = useState<'none' | 'vertical' | 'horizontal'>('none');

  const handleSplitVertical = () => {
    setSplitView('vertical');
  };

  const handleSplitHorizontal = () => {
    setSplitView('horizontal');
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950">
      <div className="flex-1 flex overflow-hidden">
        {/* Main Terminal Area */}
        <div className="flex-1 flex flex-col p-4 gap-4">
          {splitView === 'none' && (
            <TerminalWindow 
              onNewTerminal={onNewTerminal}
              onSplitVertical={handleSplitVertical}
              onSplitHorizontal={handleSplitHorizontal}
            />
          )}

          {splitView === 'vertical' && (
            <ResizablePanelGroup direction="horizontal" className="flex-1">
              <ResizablePanel defaultSize={50} minSize={30}>
                <TerminalWindow onNewTerminal={onNewTerminal} isSplit />
              </ResizablePanel>
              <ResizableHandle className="w-1 bg-zinc-800 hover:bg-emerald-500 transition-colors" />
              <ResizablePanel defaultSize={50} minSize={30}>
                <TerminalWindow onNewTerminal={onNewTerminal} isSplit />
              </ResizablePanel>
            </ResizablePanelGroup>
          )}

          {splitView === 'horizontal' && (
            <ResizablePanelGroup direction="vertical" className="flex-1">
              <ResizablePanel defaultSize={50} minSize={30}>
                <TerminalWindow onNewTerminal={onNewTerminal} isSplit />
              </ResizablePanel>
              <ResizableHandle className="h-1 bg-zinc-800 hover:bg-emerald-500 transition-colors" />
              <ResizablePanel defaultSize={50} minSize={30}>
                <TerminalWindow onNewTerminal={onNewTerminal} isSplit />
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>

        {/* Right Panel */}
        <RightPanel 
          isCollapsed={isPanelCollapsed}
          onToggle={() => setIsPanelCollapsed(!isPanelCollapsed)}
        />
      </div>

      {/* Status Bar */}
      <StatusBar 
        connectionStatus="connected"
        shellType="bash 5.1.16"
        uptime="2h 34m"
      />
    </div>
  );
}
