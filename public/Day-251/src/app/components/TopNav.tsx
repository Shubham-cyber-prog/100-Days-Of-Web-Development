import { Play, Square, RotateCw, Settings, User } from 'lucide-react';

interface TopNavProps {
  vmStatus?: 'Running' | 'Stopped' | 'Loading';
  onStart?: () => void;
  onStop?: () => void;
  onRestart?: () => void;
  onSettings?: () => void;
  showVMControls?: boolean;
}

export function TopNav({ 
  vmStatus = 'Stopped', 
  onStart, 
  onStop, 
  onRestart, 
  onSettings,
  showVMControls = false 
}: TopNavProps) {
  const getStatusColor = () => {
    switch (vmStatus) {
      case 'Running':
        return 'bg-green-500';
      case 'Loading':
        return 'bg-yellow-500 animate-pulse';
      case 'Stopped':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-14 bg-[#1e1e1e] border-b border-[#2d2d2d] flex items-center justify-between px-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">VM</span>
          </div>
          <span className="font-semibold text-white">VirtualVM</span>
        </div>

        {showVMControls && (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2d2d2d] rounded-md">
              <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
              <span className="text-sm text-gray-300">{vmStatus}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onStart}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
                disabled={vmStatus === 'Running'}
              >
                <Play className="w-4 h-4" />
                Start
              </button>
              <button
                onClick={onStop}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white rounded-md transition-colors text-sm"
                disabled={vmStatus === 'Stopped'}
              >
                <Square className="w-4 h-4" />
                Stop
              </button>
              <button
                onClick={onRestart}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white rounded-md transition-colors text-sm"
                disabled={vmStatus !== 'Running'}
              >
                <RotateCw className="w-4 h-4" />
                Restart
              </button>
              <button
                onClick={onSettings}
                className="p-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white rounded-md transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
