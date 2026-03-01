import { Maximize2, Minimize2, MonitorOff, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BottomPanel } from './BottomPanel';
import { RightPanel } from './RightPanel';

interface VMRunningViewProps {
  vm: any;
  vmStatus: 'Running' | 'Stopped' | 'Loading';
}

export function VMRunningView({ vm, vmStatus }: VMRunningViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bottomPanelOpen, setBottomPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);

  useEffect(() => {
    if (vmStatus === 'Loading') {
      const interval = setInterval(() => {
        setBootProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    } else {
      setBootProgress(0);
    }
  }, [vmStatus]);

  const logs = [
    { id: '1', type: 'info' as const, timestamp: '12:00:01', message: 'VM initialization started' },
    { id: '2', type: 'success' as const, timestamp: '12:00:02', message: 'System boot sequence initiated' },
    { id: '3', type: 'info' as const, timestamp: '12:00:03', message: 'Loading kernel modules...' },
    { id: '4', type: 'success' as const, timestamp: '12:00:05', message: 'Network interface configured' },
    { id: '5', type: 'info' as const, timestamp: '12:00:06', message: 'Starting system services...' },
    { id: '6', type: 'success' as const, timestamp: '12:00:08', message: 'VM is now running' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col bg-[#1a1a1a]">
          <div className="h-12 bg-[#2d2d2d] border-b border-[#3d3d3d] flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-400">Display</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-[#3d3d3d] rounded transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-gray-400" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <button
                className="p-2 hover:bg-[#3d3d3d] rounded transition-colors"
                title="Disconnect"
              >
                <MonitorOff className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden">
            {vmStatus === 'Loading' ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                  <div className="text-white mb-2">Booting Virtual Machine...</div>
                  <div className="w-64 h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${bootProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">{bootProgress}%</div>
                </div>
              </div>
            ) : vmStatus === 'Running' ? (
              <div className="absolute inset-0 bg-black p-4 font-mono text-sm text-green-400">
                <div className="mb-2">Ubuntu 22.04.1 LTS ubuntu-vm tty1</div>
                <div className="mb-4">ubuntu-vm login: user</div>
                <div className="mb-2">Password: ********</div>
                <div className="mb-4">Last login: Thu Feb 26 12:00:00 UTC 2026</div>
                <div className="mb-2">Welcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-56-generic x86_64)</div>
                <div className="mb-4 text-gray-500">
                  * Documentation:  https://help.ubuntu.com<br />
                  * Management:     https://landscape.canonical.com<br />
                  * Support:        https://ubuntu.com/advantage
                </div>
                <div className="mb-2">System information:</div>
                <div className="mb-4 text-gray-400">
                  System load:  0.45              Processes:           124<br />
                  Usage of /:   23.1% of 48.29GB  Users logged in:     1<br />
                  Memory usage: {vm.ramUsage}%              IP address:          192.168.1.100<br />
                  Swap usage:   0%
                </div>
                <div className="flex items-center">
                  <span className="text-green-400">user@ubuntu-vm</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">$</span>
                  <span className="ml-1 animate-pulse">_</span>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center">
                  <MonitorOff className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <div className="text-gray-400">Virtual Machine Stopped</div>
                  <div className="text-sm text-gray-600 mt-2">Start the VM to connect</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <RightPanel
          vm={{
            name: vm.name,
            os: vm.os,
            ram: vm.ram,
            cpu: vm.cpu,
            disk: vm.disk,
            cpuUsage: vm.cpuUsage || 45,
            ramUsage: vm.ramUsage || 62,
            networkStatus: vmStatus === 'Running' ? 'Connected' : 'Disconnected',
          }}
          isOpen={rightPanelOpen}
          onToggle={() => setRightPanelOpen(!rightPanelOpen)}
        />
      </div>

      <BottomPanel
        isOpen={bottomPanelOpen}
        onToggle={() => setBottomPanelOpen(!bottomPanelOpen)}
        logs={logs}
      />
    </div>
  );
}
