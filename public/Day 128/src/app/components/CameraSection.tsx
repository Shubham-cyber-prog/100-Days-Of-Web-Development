import { Camera, Video, VideoOff, Play, Square } from 'lucide-react';
import { useState } from 'react';
import { Switch } from './ui/switch';

interface CameraSectionProps {
  onStartDetection: () => void;
  isDetecting: boolean;
}

export function CameraSection({ onStartDetection, isDetecting }: CameraSectionProps) {
  const [isRealtimeEnabled, setIsRealtimeEnabled] = useState(false);

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
          <Camera className="w-6 h-6 text-cyan-400" />
        </div>
        Live Camera Recognition
      </h2>

      {/* Camera Preview Frame */}
      <div className="relative bg-black rounded-2xl overflow-hidden mb-6 aspect-video border-2 border-purple-500/30">
        {/* Simulated Camera View */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 flex items-center justify-center">
          {isDetecting ? (
            <div className="relative w-full h-full">
              {/* Scanning Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-cyan-400 font-medium">Camera Active</p>
                  <p className="text-gray-400 text-sm mt-2">Detecting objects...</p>
                </div>
              </div>

              {/* Scanning Line */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
              </div>

              {/* Corner Brackets */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-cyan-400" />
            </div>
          ) : (
            <div className="text-center">
              <VideoOff className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Camera is off</p>
              <p className="text-gray-500 text-sm mt-2">Click start to begin detection</p>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        {isDetecting && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-sm font-medium">LIVE</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">Real-time Detection</span>
          <Switch
            checked={isRealtimeEnabled}
            onCheckedChange={setIsRealtimeEnabled}
          />
        </div>

        <button
          onClick={onStartDetection}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            isDetecting
              ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
              : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-purple-500/30'
          }`}
        >
          {isDetecting ? (
            <>
              <Square className="w-5 h-5" />
              Stop Detection
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Detection
            </>
          )}
        </button>
      </div>
    </div>
  );
}
