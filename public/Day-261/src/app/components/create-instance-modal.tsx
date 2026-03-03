import { useState } from 'react';
import { X } from 'lucide-react';
import type { EmulatorInstance } from '../App';

interface CreateInstanceModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (instance: EmulatorInstance) => void;
}

const osOptions = [
  { value: 'Linux Ubuntu 22.04', label: 'Linux Ubuntu 22.04' },
  { value: 'Linux Debian 12', label: 'Linux Debian 12' },
  { value: 'Windows 11', label: 'Windows 11' },
  { value: 'macOS Ventura', label: 'macOS Ventura' },
  { value: 'Custom OS', label: 'Custom OS' },
  { value: 'Retro System - DOS', label: 'Retro System - DOS' },
  { value: 'Retro System - C64', label: 'Retro System - C64' }
];

const cpuOptions = ['1 core', '2 cores', '4 cores', '8 cores', '16 cores'];
const memoryOptions = ['2 GB', '4 GB', '8 GB', '16 GB', '32 GB', '64 GB'];
const storageOptions = ['20 GB', '50 GB', '100 GB', '250 GB', '500 GB', '1 TB'];

export function CreateInstanceModal({ open, onClose, onCreate }: CreateInstanceModalProps) {
  const [name, setName] = useState('');
  const [os, setOs] = useState('Linux Ubuntu 22.04');
  const [cpu, setCpu] = useState('4 cores');
  const [memory, setMemory] = useState('8 GB');
  const [storage, setStorage] = useState('50 GB');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const instanceName = name || `${os.toLowerCase().replace(/\s+/g, '-')}-${Date.now().toString().slice(-6)}`;
    
    onCreate({
      name: instanceName,
      os,
      cpu,
      memory,
      storage,
      uptime: 0
    });

    // Reset form
    setName('');
    setOs('Linux Ubuntu 22.04');
    setCpu('4 cores');
    setMemory('8 GB');
    setStorage('50 GB');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#161b22] border border-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Create Emulator Instance</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-auto max-h-[calc(90vh-8rem)]">
          <div className="space-y-6">
            {/* Instance Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Instance Name
                <span className="text-gray-500 ml-2">(optional)</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="my-emulator-instance"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for auto-generated name
              </p>
            </div>

            {/* Operating System */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Operating System <span className="text-red-500">*</span>
              </label>
              <select
                value={os}
                onChange={(e) => setOs(e.target.value)}
                className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {osOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Resource Allocation */}
            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-sm font-semibold mb-4">Resource Allocation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* CPU */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    CPU Cores <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={cpu}
                    onChange={(e) => setCpu(e.target.value)}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {cpuOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Memory */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Memory <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {memoryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Storage */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Storage <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {storageOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-blue-400 mb-2">Note</h4>
              <p className="text-xs text-gray-400">
                Your emulator instance will be created with the specified configuration. 
                You can start it immediately after creation or configure additional settings later.
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#0d1117]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
          >
            Create Instance
          </button>
        </div>
      </div>
    </div>
  );
}
