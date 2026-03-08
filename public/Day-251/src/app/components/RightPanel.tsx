import { Cpu, HardDrive, Wifi, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface RightPanelProps {
  vm: {
    name: string;
    os: string;
    ram: string;
    cpu: string;
    disk: string;
    cpuUsage: number;
    ramUsage: number;
    networkStatus: 'Connected' | 'Disconnected';
  };
  isOpen: boolean;
  onToggle: () => void;
}

export function RightPanel({ vm, isOpen, onToggle }: RightPanelProps) {
  return (
    <div className={`bg-[#1e1e1e] border-l border-[#2d2d2d] transition-all ${isOpen ? 'w-80' : 'w-12'} overflow-hidden`}>
      <div className="h-full flex">
        <button
          onClick={onToggle}
          className="w-12 flex-shrink-0 flex items-center justify-center hover:bg-[#252525] border-r border-[#2d2d2d]"
        >
          {isOpen ? (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {isOpen && (
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">VM Configuration</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Name</div>
                  <div className="text-sm text-white">{vm.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Operating System</div>
                  <div className="text-sm text-white">{vm.os}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Memory</div>
                  <div className="text-sm text-white">{vm.ram}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">CPU</div>
                  <div className="text-sm text-white">{vm.cpu}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Storage</div>
                  <div className="text-sm text-white">{vm.disk}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-white">CPU Usage</span>
                    </div>
                    <span className="text-sm text-white">{vm.cpuUsage}%</span>
                  </div>
                  <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${vm.cpuUsage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-white">RAM Usage</span>
                    </div>
                    <span className="text-sm text-white">{vm.ramUsage}%</span>
                  </div>
                  <div className="h-2 bg-[#2d2d2d] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 transition-all"
                      style={{ width: `${vm.ramUsage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase mb-3">Network</h3>
              <div className="flex items-center gap-2">
                <Wifi className={`w-4 h-4 ${vm.networkStatus === 'Connected' ? 'text-green-500' : 'text-red-500'}`} />
                <span className="text-sm text-white">{vm.networkStatus}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
