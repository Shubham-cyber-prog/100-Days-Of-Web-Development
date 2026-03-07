import { Plus, Search } from 'lucide-react';
import { VMCard } from './VMCard';

interface DashboardProps {
  onCreateVM: () => void;
  onStartVM: (id: string) => void;
  vms: any[];
}

export function Dashboard({ onCreateVM, onStartVM, vms }: DashboardProps) {
  return (
    <div className="h-full overflow-auto bg-[#1a1a1a]">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">My Virtual Machines</h1>
            <p className="text-gray-400">Manage and monitor your virtual environments</p>
          </div>
          <button
            onClick={onCreateVM}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create New VM
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search virtual machines..."
              className="w-full pl-10 pr-4 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vms.map((vm) => (
            <VMCard
              key={vm.id}
              vm={vm}
              onStart={onStartVM}
              onEdit={(id) => console.log('Edit', id)}
              onDelete={(id) => console.log('Delete', id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
