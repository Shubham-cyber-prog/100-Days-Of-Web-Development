import { useState, useEffect } from 'react';
import { NetworkNode } from './NetworkNode';
import { PacketFlowAnimation } from './PacketFlowAnimation';
import { networkNodes } from '../utils/mockData';
import { PacketFlow, Protocol } from '../types/packet';

interface NetworkVisualizationProps {
  isCapturing: boolean;
}

const protocols: Protocol[] = ['TCP', 'UDP', 'HTTP', 'DNS', 'ICMP'];

export function NetworkVisualization({ isCapturing }: NetworkVisualizationProps) {
  const [activeFlows, setActiveFlows] = useState<PacketFlow[]>([]);

  useEffect(() => {
    if (!isCapturing) {
      setActiveFlows([]);
      return;
    }

    const interval = setInterval(() => {
      // Randomly create packet flows
      const fromNode = networkNodes[Math.floor(Math.random() * 2)]; // computer or router
      const toNode = networkNodes[Math.floor(Math.random() * 3) + 2]; // servers or cloud
      const protocol = protocols[Math.floor(Math.random() * protocols.length)];

      const newFlow: PacketFlow = {
        id: Math.random().toString(36).substr(2, 9),
        from: fromNode.id,
        to: toNode.id,
        protocol,
        progress: 0,
      };

      setActiveFlows((prev) => [...prev.slice(-5), newFlow]);
    }, 800);

    return () => clearInterval(interval);
  }, [isCapturing]);

  return (
    <div className="bg-slate-900/30 rounded-lg border border-slate-800 p-6 h-[400px] relative overflow-hidden">
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(71 85 105 / 0.2) 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }} />
      
      <div className="relative h-full">
        {/* Render connections and animations */}
        {isCapturing && activeFlows.map((flow) => {
          const fromNode = networkNodes.find(n => n.id === flow.from);
          const toNode = networkNodes.find(n => n.id === flow.to);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <PacketFlowAnimation
              key={flow.id}
              from={fromNode}
              to={toNode}
              protocol={flow.protocol}
            />
          );
        })}

        {/* Render nodes */}
        {networkNodes.map((node) => (
          <NetworkNode key={node.id} node={node} />
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-sm rounded-lg border border-slate-700 p-3">
          <div className="text-xs font-semibold text-white mb-2">Protocol Colors</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)' }} />
              <span className="text-xs text-slate-300">TCP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" style={{ boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }} />
              <span className="text-xs text-slate-300">UDP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" style={{ boxShadow: '0 0 8px rgba(249, 115, 22, 0.5)' }} />
              <span className="text-xs text-slate-300">HTTP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" style={{ boxShadow: '0 0 8px rgba(168, 85, 247, 0.5)' }} />
              <span className="text-xs text-slate-300">DNS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" style={{ boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)' }} />
              <span className="text-xs text-slate-300">ICMP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
