import { Play, Pause, RotateCcw, Settings, User } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface TopNavBarProps {
  isRunning: boolean;
  algorithm: string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onAlgorithmChange: (value: string) => void;
}

export function TopNavBar({
  isRunning,
  algorithm,
  onStart,
  onPause,
  onReset,
  onAlgorithmChange,
}: TopNavBarProps) {
  return (
    <div className="h-16 border-b border-gray-800 bg-gray-950 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rounded"></div>
          </div>
          <h1 className="text-xl text-white">Load Balancer Simulator</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {!isRunning ? (
            <Button onClick={onStart} className="bg-green-600 hover:bg-green-700 text-white">
              <Play className="size-4 mr-2" />
              Start Simulation
            </Button>
          ) : (
            <Button onClick={onPause} className="bg-yellow-600 hover:bg-yellow-700 text-white">
              <Pause className="size-4 mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={onReset} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <RotateCcw className="size-4 mr-2" />
            Reset
          </Button>
        </div>

        <Select value={algorithm} onValueChange={onAlgorithmChange}>
          <SelectTrigger className="w-[200px] border-gray-700 bg-gray-900 text-gray-300">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="round-robin">Round Robin</SelectItem>
            <SelectItem value="least-connections">Least Connections</SelectItem>
            <SelectItem value="ip-hash">IP Hash</SelectItem>
            <SelectItem value="random">Random</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-300 hover:bg-gray-800">
          <Settings className="size-5" />
        </Button>

        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="size-5 text-white" />
        </div>
      </div>
    </div>
  );
}
