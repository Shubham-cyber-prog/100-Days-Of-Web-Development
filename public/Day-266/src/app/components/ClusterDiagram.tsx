import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { mockNodes, mockPods } from "../data/mockData";

interface ClusterDiagramProps {
  onSelectResource: (resource: any) => void;
}

export function ClusterDiagram({ onSelectResource }: ClusterDiagramProps) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Group pods by node
  const podsByNode = mockPods.reduce((acc, pod) => {
    if (!acc[pod.node]) acc[pod.node] = [];
    acc[pod.node].push(pod);
    return acc;
  }, {} as Record<string, typeof mockPods>);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running": return "bg-green-500";
      case "Ready": return "bg-green-500";
      case "Pending": return "bg-yellow-500";
      case "Failed": return "bg-red-500";
      case "Succeeded": return "bg-blue-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="relative h-full bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden">
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button 
          onClick={handleZoomIn}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button 
          onClick={handleZoomOut}
          className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg p-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>

      <div 
        ref={containerRef}
        className="w-full h-full overflow-auto p-8"
      >
        <div 
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
          className="transition-transform duration-200"
        >
          {/* Control Plane Section */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-slate-400 mb-4">Control Plane</h3>
            <div className="flex gap-4">
              <ControlPlaneComponent name="API Server" />
              <ControlPlaneComponent name="Scheduler" />
              <ControlPlaneComponent name="Controller Manager" />
              <ControlPlaneComponent name="etcd" />
            </div>
          </div>

          {/* Animated traffic flow lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="trafficGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Connection lines */}
            <motion.line
              x1="20%"
              y1="120"
              x2="20%"
              y2="280"
              stroke="url(#trafficGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>

          {/* Worker Nodes Section */}
          <div>
            <h3 className="text-sm font-semibold text-slate-400 mb-4">Worker Nodes</h3>
            <div className="grid grid-cols-2 gap-6">
              {mockNodes.filter(node => node.role === "worker").map((node) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                  onClick={() => onSelectResource({ type: "node", data: node })}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(node.status)}`} />
                      <span className="font-semibold text-sm">{node.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">{node.pods} pods</span>
                  </div>

                  {/* Pod grid inside node */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {(podsByNode[node.name] || []).slice(0, 8).map((pod) => (
                      <motion.div
                        key={pod.id}
                        whileHover={{ scale: 1.1 }}
                        className="aspect-square bg-slate-900 border border-slate-700 rounded flex items-center justify-center relative group"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectResource({ type: "pod", data: pod });
                        }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(pod.status)}`} />
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {pod.name.split('-').slice(0, 2).join('-')}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Node stats */}
                  <div className="flex gap-4 text-xs">
                    <div>
                      <div className="text-slate-500">CPU</div>
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500"
                            style={{ width: `${node.cpu}%` }}
                          />
                        </div>
                        <span>{node.cpu}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Memory</div>
                      <div className="flex items-center gap-1">
                        <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyan-500"
                            style={{ width: `${node.memory}%` }}
                          />
                        </div>
                        <span>{node.memory}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Services Layer */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-slate-400 mb-4">Services</h3>
            <div className="flex gap-4 flex-wrap">
              <ServiceComponent name="nginx-service" type="LoadBalancer" />
              <ServiceComponent name="redis-master" type="ClusterIP" />
              <ServiceComponent name="api-service" type="ClusterIP" />
              <ServiceComponent name="frontend" type="NodePort" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlPlaneComponent({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex-1"
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </motion.div>
  );
}

function ServiceComponent({ name, type }: { name: string; type: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-4 py-3"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-cyan-500" />
        <span className="text-sm font-medium">{name}</span>
      </div>
      <div className="text-xs text-slate-500">{type}</div>
    </motion.div>
  );
}
