import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, FileText, ChevronUp, ChevronDown } from 'lucide-react';
import type { EmulatorStatus } from '../App';

interface TerminalPanelProps {
  status: EmulatorStatus;
}

export function TerminalPanel({ status }: TerminalPanelProps) {
  const [activeTab, setActiveTab] = useState<'terminal' | 'logs'>('terminal');
  const [command, setCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Browser-Based Emulator Terminal v2.4.1',
    'Type "help" for available commands',
    ''
  ]);
  const [logs, setLogs] = useState<string[]>([
    '[10:23:45] System initialized',
    '[10:23:46] Emulator environment ready',
    ''
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'running' && logs[logs.length - 1] !== '[INFO] Emulator started successfully') {
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, `[${timestamp}] [INFO] Emulator started successfully`]);
    } else if (status === 'stopped' && !logs[logs.length - 1].includes('stopped')) {
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, `[${timestamp}] [INFO] Emulator stopped`]);
    }
  }, [status]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput, logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;

    const newOutput = [...terminalOutput, `$ ${command}`];
    
    // Mock command responses
    if (command.toLowerCase() === 'help') {
      newOutput.push('Available commands:');
      newOutput.push('  help     - Show this help message');
      newOutput.push('  clear    - Clear terminal');
      newOutput.push('  status   - Show emulator status');
      newOutput.push('  uptime   - Show system uptime');
      newOutput.push('');
    } else if (command.toLowerCase() === 'clear') {
      setTerminalOutput(['']);
      setCommand('');
      return;
    } else if (command.toLowerCase() === 'status') {
      newOutput.push(`Emulator Status: ${status}`);
      newOutput.push('');
    } else if (command.toLowerCase() === 'uptime') {
      newOutput.push('System has been running for 00:01:23');
      newOutput.push('');
    } else {
      newOutput.push(`Command not found: ${command}`);
      newOutput.push('Type "help" for available commands');
      newOutput.push('');
    }

    setTerminalOutput(newOutput);
    setCommand('');
  };

  return (
    <div 
      className={`bg-[#161b22] border-t border-gray-800 transition-all duration-300 ${
        isExpanded ? 'h-96' : 'h-64'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-2 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'terminal'
                ? 'bg-blue-600/20 text-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <TerminalIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Terminal</span>
          </button>
          
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'logs'
                ? 'bg-blue-600/20 text-blue-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Logs</span>
          </button>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      <div className="h-[calc(100%-3rem)] flex flex-col">
        {activeTab === 'terminal' ? (
          <>
            <div 
              ref={terminalRef}
              className="flex-1 overflow-auto px-6 py-4 font-mono text-sm text-green-400 bg-black"
            >
              {terminalOutput.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap break-words">
                  {line}
                </div>
              ))}
            </div>
            <form onSubmit={handleCommand} className="px-6 py-3 border-t border-gray-800 bg-black">
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-green-400">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="flex-1 bg-transparent text-green-400 outline-none"
                  placeholder="Enter command..."
                  disabled={status === 'stopped'}
                />
              </div>
            </form>
          </>
        ) : (
          <div 
            ref={terminalRef}
            className="flex-1 overflow-auto px-6 py-4 font-mono text-sm text-gray-300 bg-black"
          >
            {logs.map((log, i) => (
              <div key={i} className="whitespace-pre-wrap break-words">
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
