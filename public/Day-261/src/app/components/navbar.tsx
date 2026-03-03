import { Monitor, Play, Pause, RotateCw, Square, Settings, User } from 'lucide-react';
import type { EmulatorStatus } from '../App';

interface NavbarProps {
  status: EmulatorStatus;
  selectedEmulator: string;
  onSelectEmulator: (value: string) => void;
  onStart: () => void;
  onPause: () => void;
  onRestart: () => void;
  onStop: () => void;
}

const emulatorOptions = [
  'Linux Ubuntu 22.04',
  'Linux Debian 12',
  'Windows 11',
  'macOS Ventura',
  'Custom OS',
  'Retro System - DOS',
  'Retro System - C64'
];

export function Navbar({
  status,
  selectedEmulator,
  onSelectEmulator,
  onStart,
  onPause,
  onRestart,
  onStop
}: NavbarProps) {
  return (
    <nav className="bg-[#161b22] border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Monitor className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold">Browser-Based Emulator</h1>
        </div>
        
        <div className="relative">
          <select 
            value={selectedEmulator}
            onChange={(e) => onSelectEmulator(e.target.value)}
            className="bg-[#0d1117] border border-gray-700 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:border-gray-600 transition-colors"
          >
            {emulatorOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#0d1117] rounded-lg p-1">
          <button
            onClick={onStart}
            disabled={status === 'running'}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Start</span>
          </button>
          
          <button
            onClick={onPause}
            disabled={status !== 'running'}
            className="p-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Pause"
          >
            <Pause className="w-4 h-4" />
          </button>
          
          <button
            onClick={onRestart}
            disabled={status === 'stopped'}
            className="p-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Restart"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          
          <button
            onClick={onStop}
            disabled={status === 'stopped'}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Square className="w-4 h-4" />
            <span className="text-sm font-medium">Stop</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors" title="Settings">
            <Settings className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all" title="User Profile">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
