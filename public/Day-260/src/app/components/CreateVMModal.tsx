import { X } from "lucide-react";
import { useState } from "react";
import { useVMContext } from "../context/VMContext";

interface CreateVMModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateVMModal({ isOpen, onClose }: CreateVMModalProps) {
  const { createVM } = useVMContext();
  const [formData, setFormData] = useState({
    name: "",
    os: "Ubuntu 22.04 LTS",
    cpuAllocation: 25,
    memoryAllocation: 8,
    memoryUsage: 0,
    storageUsage: 50,
    cpuUsage: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createVM(formData);
    onClose();
    setFormData({
      name: "",
      os: "Ubuntu 22.04 LTS",
      cpuAllocation: 25,
      memoryAllocation: 8,
      memoryUsage: 0,
      storageUsage: 50,
      cpuUsage: 0,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl text-foreground">Create New Virtual Machine</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm text-foreground mb-2">VM Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500"
              placeholder="e.g., Ubuntu-WebServer-01"
            />
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">Operating System</label>
            <select
              value={formData.os}
              onChange={(e) => setFormData({ ...formData, os: e.target.value })}
              className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500"
            >
              <option>Ubuntu 22.04 LTS</option>
              <option>Ubuntu 20.04 LTS</option>
              <option>Windows Server 2022</option>
              <option>Windows Server 2019</option>
              <option>CentOS 8</option>
              <option>CentOS 7</option>
              <option>Debian 11</option>
              <option>Debian 10</option>
              <option>Fedora 38</option>
              <option>Red Hat Enterprise Linux 9</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">
              CPU Allocation: {formData.cpuAllocation}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={formData.cpuAllocation}
              onChange={(e) =>
                setFormData({ ...formData, cpuAllocation: Number(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">
              Memory Allocation: {formData.memoryAllocation} GB
            </label>
            <input
              type="range"
              min="2"
              max="64"
              step="2"
              value={formData.memoryAllocation}
              onChange={(e) =>
                setFormData({ ...formData, memoryAllocation: Number(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">
              Storage: {formData.storageUsage} GB
            </label>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={formData.storageUsage}
              onChange={(e) =>
                setFormData({ ...formData, storageUsage: Number(e.target.value) })
              }
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-muted hover:bg-accent text-foreground rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Create VM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
