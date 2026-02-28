import { useState, useEffect } from 'react';
import { Maximize2, Circle } from 'lucide-react';
import type { EmulatorStatus, EmulatorInstance } from '../App';
import { ResourceMonitor } from './resource-monitor';
import { InstanceDetails } from './instance-details';

interface EmulatorViewProps {
  status: EmulatorStatus;
  instance: EmulatorInstance;
  currentView: string;
}

export function EmulatorView({ status, instance, currentView }: EmulatorViewProps) {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    if (status === 'running') {
      const interval = setInterval(() => {
        setCpuUsage(Math.floor(Math.random() * 40) + 30);
        setMemoryUsage(Math.floor(Math.random() * 30) + 50);
        setUptime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (status === 'stopped') {
      setCpuUsage(0);
      setMemoryUsage(0);
      setUptime(0);
    }
  }, [status]);

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (currentView !== 'emulator') {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0d1117]">
        <div className="text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-2xl font-semibold mb-2">View Under Construction</h2>
          <p className="text-gray-400">This view is not yet implemented</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 p-6 overflow-auto">
        {/* Emulator Display */}
        <div className="mb-6">
          <div className="relative bg-black border-4 border-gray-700 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            {status === 'stopped' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Circle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-xl text-gray-500">Emulator Stopped</p>
                  <p className="text-sm text-gray-600 mt-2">Click Start to begin</p>
                </div>
              </div>
            )}

            {status === 'paused' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-6xl mb-4">⏸️</div>
                  <p className="text-xl text-gray-300">Emulator Paused</p>
                </div>
              </div>
            )}

            {status === 'running' && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
                <div className="font-mono text-green-400 text-sm">
                  <div className="mb-4">
                    <p className="text-blue-400">Ubuntu 22.04.1 LTS ubuntu tty1</p>
                    <p className="mt-2">ubuntu login: user</p>
                    <p>Password: </p>
                    <p className="mt-2">Last login: Sat Feb 28 10:23:45 UTC 2026</p>
                  </div>
                  <div className="mt-6">
                    <p>user@ubuntu:~$ <span className="animate-pulse">_</span></p>
                  </div>
                  <div className="mt-8 text-xs text-gray-500">
                    <p>System information as of Sat Feb 28 10:24:12 UTC 2026</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p>System load: 0.{cpuUsage}</p>
                        <p>Processes: 142</p>
                        <p>Users logged in: 1</p>
                      </div>
                      <div>
                        <p>Memory usage: {memoryUsage}%</p>
                        <p>Swap usage: 0%</p>
                        <p>IPv4 address: 192.168.1.42</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button 
              className="absolute top-4 right-4 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status and Resource Indicators */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Status</span>
              <div className={`w-3 h-3 rounded-full ${
                status === 'running' ? 'bg-green-500 animate-pulse' : 
                status === 'paused' ? 'bg-yellow-500' : 
                'bg-gray-500'
              }`} />
            </div>
            <p className="text-xl font-semibold capitalize">{status}</p>
          </div>

          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">CPU Usage</div>
            <p className="text-xl font-semibold">{cpuUsage}%</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${cpuUsage}%` }}
              />
            </div>
          </div>

          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Memory Usage</div>
            <p className="text-xl font-semibold">{memoryUsage}%</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${memoryUsage}%` }}
              />
            </div>
          </div>

          <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Uptime</div>
            <p className="text-xl font-semibold font-mono">{formatUptime(uptime)}</p>
          </div>
        </div>

        {/* Resource Monitor Charts */}
        {status === 'running' && (
          <ResourceMonitor cpuUsage={cpuUsage} memoryUsage={memoryUsage} />
        )}
      </div>

      {/* Right Sidebar - Instance Details */}
      <InstanceDetails instance={instance} status={status} />
    </div>
  );
}
