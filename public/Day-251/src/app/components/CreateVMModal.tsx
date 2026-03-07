import { X } from 'lucide-react';
import { useState } from 'react';

interface CreateVMModalProps {
  onClose: () => void;
  onCreate: (config: VMConfig) => void;
}

interface VMConfig {
  name: string;
  os: string;
  ram: number;
  cpu: number;
  disk: number;
}

export function CreateVMModal({ onClose, onCreate }: CreateVMModalProps) {
  const [config, setConfig] = useState<VMConfig>({
    name: '',
    os: '',
    ram: 4,
    cpu: 2,
    disk: 50,
  });

  const osOptions = [
    { id: 'ubuntu-22', name: 'Ubuntu 22.04 LTS', icon: '🐧' },
    { id: 'ubuntu-20', name: 'Ubuntu 20.04 LTS', icon: '🐧' },
    { id: 'debian', name: 'Debian 11', icon: '🐧' },
    { id: 'windows-11', name: 'Windows 11', icon: '🪟' },
    { id: 'windows-10', name: 'Windows 10', icon: '🪟' },
    { id: 'custom', name: 'Custom ISO', icon: '📀' },
  ];

  const handleCreate = () => {
    if (config.name && config.os) {
      onCreate(config);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2d2d2d] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#2d2d2d] border-b border-[#3d3d3d] p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Create New Virtual Machine</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#3d3d3d] rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">VM Name</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              placeholder="my-virtual-machine"
              className="w-full px-3 py-2 bg-[#1e1e1e] border border-[#3d3d3d] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Operating System</label>
            <div className="grid grid-cols-2 gap-3">
              {osOptions.map((os) => (
                <button
                  key={os.id}
                  onClick={() => setConfig({ ...config, os: os.id })}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    config.os === os.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#3d3d3d] bg-[#1e1e1e] hover:border-[#4d4d4d]'
                  }`}
                >
                  <span className="text-2xl">{os.icon}</span>
                  <span className="text-white text-sm">{os.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              RAM: {config.ram} GB
            </label>
            <input
              type="range"
              min="1"
              max="32"
              value={config.ram}
              onChange={(e) => setConfig({ ...config, ram: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#3d3d3d] rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 GB</span>
              <span>32 GB</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              CPU Cores: {config.cpu}
            </label>
            <input
              type="range"
              min="1"
              max="16"
              value={config.cpu}
              onChange={(e) => setConfig({ ...config, cpu: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#3d3d3d] rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 Core</span>
              <span>16 Cores</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Disk Space: {config.disk} GB
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={config.disk}
              onChange={(e) => setConfig({ ...config, disk: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#3d3d3d] rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10 GB</span>
              <span>500 GB</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#3d3d3d] p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#3d3d3d] hover:bg-[#4d4d4d] text-white rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!config.name || !config.os}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Virtual Machine
          </button>
        </div>
      </div>
    </div>
  );
}
