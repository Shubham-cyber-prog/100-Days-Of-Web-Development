import { Save, RotateCcw, HardDrive, Cpu, MemoryStick } from 'lucide-react';
import type { EmulatorStatus, EmulatorInstance } from '../App';

interface InstanceDetailsProps {
  instance: EmulatorInstance;
  status: EmulatorStatus;
}

export function InstanceDetails({ instance, status }: InstanceDetailsProps) {
  return (
    <aside className="w-80 bg-[#161b22] border-l border-gray-800 p-6 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Instance Details</h2>

      {status === 'stopped' ? (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">No active instance</div>
          <p className="text-sm text-gray-600">Start the emulator to view details</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Instance Name */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Instance Name</label>
            <p className="text-sm font-medium mt-1">{instance.name}</p>
          </div>

          {/* OS Type */}
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider">Operating System</label>
            <p className="text-sm font-medium mt-1">{instance.os}</p>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-sm font-semibold mb-3">Resource Allocation</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Cpu className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">CPU</div>
                  <div className="text-sm font-medium">{instance.cpu}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <MemoryStick className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">Memory</div>
                  <div className="text-sm font-medium">{instance.memory}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <HardDrive className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-400">Storage</div>
                  <div className="text-sm font-medium">{instance.storage}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-sm font-semibold mb-3">Snapshot Controls</h3>
            
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                <Save className="w-4 h-4" />
                Save Snapshot
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                <RotateCcw className="w-4 h-4" />
                Restore Snapshot
              </button>
            </div>

            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Last Snapshot</div>
              <div className="text-sm">Feb 27, 2026 - 14:32</div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-sm font-semibold mb-3">Network</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">IP Address</span>
                <span className="font-mono">192.168.1.42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Gateway</span>
                <span className="font-mono">192.168.1.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-green-400">Connected</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
