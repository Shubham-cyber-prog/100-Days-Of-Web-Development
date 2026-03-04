import React from 'react';
import { MemoryStats } from '../MemoryStats';
import { HeapVisualization } from '../HeapVisualization';
import { GCLogsPanel } from '../GCLogsPanel';

export const MemoryOverview: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Memory Overview</h2>
        <p className="text-zinc-400">
          Interactive visualization of heap memory and garbage collection
        </p>
      </div>

      <MemoryStats />

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Heap Memory Visualization</h3>
        <HeapVisualization />
      </div>

      <GCLogsPanel />
    </div>
  );
};
