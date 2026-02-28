import { Play, Pause, Square, Search, Settings, User, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CaptureStatus } from '../types/packet';

interface TopNavBarProps {
  captureStatus: CaptureStatus;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedInterface: string;
  onInterfaceChange: (value: string) => void;
}

export function TopNavBar({
  captureStatus,
  onStart,
  onPause,
  onStop,
  searchTerm,
  onSearchChange,
  selectedInterface,
  onInterfaceChange,
}: TopNavBarProps) {
  return (
    <div className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-cyan-500" style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))' }} />
          <h1 className="text-lg font-semibold text-white">Realtime Network Packet Visualizer</h1>
        </div>
        
        <Select value={selectedInterface} onValueChange={onInterfaceChange}>
          <SelectTrigger className="w-48 bg-slate-900 border-slate-700 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="wifi">WiFi</SelectItem>
            <SelectItem value="ethernet">Ethernet</SelectItem>
            <SelectItem value="localhost">Localhost</SelectItem>
            <SelectItem value="virtual">Virtual Adapter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={onStart}
          disabled={captureStatus === 'capturing'}
          className="bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
          size="sm"
        >
          <Play className="w-4 h-4 mr-1" />
          Start
        </Button>
        
        <Button
          onClick={onPause}
          disabled={captureStatus !== 'capturing'}
          className="bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50"
          size="sm"
        >
          <Pause className="w-4 h-4 mr-1" />
          Pause
        </Button>
        
        <Button
          onClick={onStop}
          disabled={captureStatus === 'idle'}
          className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
          size="sm"
        >
          <Square className="w-4 h-4 mr-1" />
          Stop
        </Button>

        <div className="relative ml-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Filter by IP, port, protocol..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-80 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>

        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <Settings className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
