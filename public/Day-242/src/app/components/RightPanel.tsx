import { useState } from 'react';
import { ChevronRight, Server, Database, Activity } from 'lucide-react';
import { cn } from './ui/utils';

interface RightPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function RightPanel({ isCollapsed, onToggle }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState('environment');

  const envVars = [
    { key: 'NODE_ENV', value: 'development' },
    { key: 'PATH', value: '/usr/local/bin:/usr/bin:/bin' },
    { key: 'HOME', value: '/home/user' },
    { key: 'SHELL', value: '/bin/bash' },
    { key: 'USER', value: 'developer' },
    { key: 'LANG', value: 'en_US.UTF-8' },
  ];

  const serverInfo = [
    { label: 'OS', value: 'Ubuntu 22.04 LTS' },
    { label: 'Kernel', value: '5.15.0-89-generic' },
    { label: 'CPU', value: '4 cores @ 2.4GHz' },
    { label: 'Memory', value: '8GB / 16GB' },
    { label: 'Disk', value: '45GB / 100GB' },
  ];

  if (isCollapsed) {
    return (
      <div className="w-12 bg-zinc-900 border-l border-zinc-800 flex flex-col items-center py-4">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col">
      {/* Header */}
      <div className="h-12 border-b border-zinc-800 flex items-center justify-between px-4">
        <h3 className="text-sm font-medium text-white">Inspector</h3>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => setActiveTab('environment')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium transition-colors border-b-2",
            activeTab === 'environment'
              ? "border-emerald-500 text-emerald-400 bg-zinc-800/50"
              : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800"
          )}
        >
          <Database className="w-3.5 h-3.5" />
          Environment
        </button>
        <button
          onClick={() => setActiveTab('server')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium transition-colors border-b-2",
            activeTab === 'server'
              ? "border-emerald-500 text-emerald-400 bg-zinc-800/50"
              : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800"
          )}
        >
          <Server className="w-3.5 h-3.5" />
          Server
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium transition-colors border-b-2",
            activeTab === 'logs'
              ? "border-emerald-500 text-emerald-400 bg-zinc-800/50"
              : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800"
          )}
        >
          <Activity className="w-3.5 h-3.5" />
          Logs
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'environment' && (
          <div className="space-y-2">
            <p className="text-xs text-zinc-500 mb-3">Environment Variables</p>
            {envVars.map((env) => (
              <div key={env.key} className="bg-zinc-950 rounded-lg p-3 border border-zinc-800">
                <div className="text-xs font-mono text-emerald-400 mb-1">{env.key}</div>
                <div className="text-xs font-mono text-zinc-400 break-all">{env.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'server' && (
          <div className="space-y-2">
            <p className="text-xs text-zinc-500 mb-3">Server Information</p>
            {serverInfo.map((info) => (
              <div key={info.label} className="flex justify-between items-center py-2 border-b border-zinc-800">
                <span className="text-xs text-zinc-400">{info.label}</span>
                <span className="text-xs font-mono text-white">{info.value}</span>
              </div>
            ))}
            <div className="mt-4 bg-zinc-950 rounded-lg p-3 border border-zinc-800">
              <div className="text-xs text-zinc-500 mb-2">Resource Usage</div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">CPU</span>
                    <span className="text-emerald-400">23%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[23%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Memory</span>
                    <span className="text-emerald-400">50%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[50%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="font-mono text-xs space-y-1">
            <p className="text-zinc-500 mb-3">System Logs</p>
            <div className="text-zinc-400">
              <span className="text-zinc-600">[09:23:14]</span> Terminal session started
            </div>
            <div className="text-zinc-400">
              <span className="text-zinc-600">[09:23:15]</span> Connected to bash shell
            </div>
            <div className="text-emerald-400">
              <span className="text-zinc-600">[09:24:32]</span> Command executed: npm run dev
            </div>
            <div className="text-emerald-400">
              <span className="text-zinc-600">[09:24:33]</span> Process started (PID: 1234)
            </div>
            <div className="text-zinc-400">
              <span className="text-zinc-600">[09:25:01]</span> Server listening on port 5173
            </div>
            <div className="text-blue-400">
              <span className="text-zinc-600">[09:26:12]</span> Hot reload triggered
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
