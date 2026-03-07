import { Terminal, AlertCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface LogEntry {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  message: string;
}

interface BottomPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  logs: LogEntry[];
}

export function BottomPanel({ isOpen, onToggle, logs }: BottomPanelProps) {
  const [activeTab, setActiveTab] = useState<'console' | 'output' | 'errors'>('console');

  const getLogColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'text-blue-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`bg-[#1e1e1e] border-t border-[#2d2d2d] transition-all ${isOpen ? 'h-64' : 'h-10'}`}>
      <div className="h-10 flex items-center justify-between px-4 bg-[#252525]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-2 text-sm px-2 py-1 rounded ${
              activeTab === 'console' ? 'text-white bg-[#1e1e1e]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Console
          </button>
          <button
            onClick={() => setActiveTab('output')}
            className={`text-sm px-2 py-1 rounded ${
              activeTab === 'output' ? 'text-white bg-[#1e1e1e]' : 'text-gray-400 hover:text-white'
            }`}
          >
            System Output
          </button>
          <button
            onClick={() => setActiveTab('errors')}
            className={`flex items-center gap-2 text-sm px-2 py-1 rounded ${
              activeTab === 'errors' ? 'text-white bg-[#1e1e1e]' : 'text-gray-400 hover:text-white'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            Errors
          </button>
        </div>

        <button
          onClick={onToggle}
          className="p-1 hover:bg-[#3d3d3d] rounded transition-colors"
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="h-[calc(100%-2.5rem)] overflow-y-auto p-4 font-mono text-sm">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-3 mb-2">
              <span className="text-gray-600">{log.timestamp}</span>
              <span className={getLogColor(log.type)}>{log.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
