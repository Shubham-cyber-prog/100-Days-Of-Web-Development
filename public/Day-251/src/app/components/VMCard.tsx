import { Play, Settings, Trash2, Circle } from 'lucide-react';

interface VMCardProps {
  vm: {
    id: string;
    name: string;
    os: string;
    status: 'Running' | 'Stopped';
    lastUsed: string;
    ram: string;
    cpu: string;
    disk: string;
  };
  onStart: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function VMCard({ vm, onStart, onEdit, onDelete }: VMCardProps) {
  const getOSIcon = (os: string) => {
    const osLower = os.toLowerCase();
    if (osLower.includes('ubuntu')) return '🐧';
    if (osLower.includes('windows')) return '🪟';
    if (osLower.includes('linux')) return '🐧';
    return '💻';
  };

  return (
    <div className="bg-[#2d2d2d] rounded-lg p-5 border border-[#3d3d3d] hover:border-[#4d4d4d] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{getOSIcon(vm.os)}</div>
          <div>
            <h3 className="text-white font-semibold">{vm.name}</h3>
            <p className="text-sm text-gray-400">{vm.os}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Circle
            className={`w-2 h-2 ${
              vm.status === 'Running' ? 'fill-green-500 text-green-500' : 'fill-gray-500 text-gray-500'
            }`}
          />
          <span className="text-xs text-gray-400">{vm.status}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">RAM:</span>
          <span className="text-white">{vm.ram}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">CPU:</span>
          <span className="text-white">{vm.cpu}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Disk:</span>
          <span className="text-white">{vm.disk}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Last used:</span>
          <span className="text-white">{vm.lastUsed}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onStart(vm.id)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
        >
          <Play className="w-4 h-4" />
          {vm.status === 'Running' ? 'Connect' : 'Start'}
        </button>
        <button
          onClick={() => onEdit(vm.id)}
          className="p-2 bg-[#3d3d3d] hover:bg-[#4d4d4d] text-white rounded-md transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(vm.id)}
          className="p-2 bg-[#3d3d3d] hover:bg-red-900/50 text-white rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
