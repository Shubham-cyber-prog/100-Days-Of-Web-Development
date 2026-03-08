import { Play, RadioTower } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  onStart: () => void;
}

export function EmptyState({ onStart }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center">
            <RadioTower className="w-10 h-10 text-slate-600" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">No Active Capture</h3>
        <p className="text-slate-400 mb-6">
          Start capturing network packets to visualize real-time traffic flow, analyze protocols, and inspect packet details.
        </p>
        
        <Button
          onClick={onStart}
          className="bg-cyan-600 hover:bg-cyan-700 text-white"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Packet Capture
        </Button>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="text-xs text-slate-500 mb-3">Features</div>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <div className="text-xs font-medium text-white mb-1">Live Visualization</div>
              <div className="text-xs text-slate-500">Real-time packet flow animations</div>
            </div>
            <div>
              <div className="text-xs font-medium text-white mb-1">Protocol Analysis</div>
              <div className="text-xs text-slate-500">TCP, UDP, HTTP, DNS, ICMP</div>
            </div>
            <div>
              <div className="text-xs font-medium text-white mb-1">Deep Inspection</div>
              <div className="text-xs text-slate-500">Layer-by-layer packet details</div>
            </div>
            <div>
              <div className="text-xs font-medium text-white mb-1">Traffic Metrics</div>
              <div className="text-xs text-slate-500">Bandwidth and usage analytics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
