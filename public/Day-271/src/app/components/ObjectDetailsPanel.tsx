import React from 'react';
import { X } from 'lucide-react';
import { useSimulation } from '../store/SimulationContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const ObjectDetailsPanel: React.FC = () => {
  const { objects, selectedObjectId, selectObject } = useSimulation();

  const selectedObject = objects.find((o) => o.id === selectedObjectId);

  if (!selectedObject) {
    return (
      <div className="w-80 bg-zinc-900 border-l border-zinc-800 p-6">
        <div className="flex items-center justify-center h-full text-zinc-500">
          <p>Select an object to view details</p>
        </div>
      </div>
    );
  }

  const getStateColor = (state: string) => {
    switch (state) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'new':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'candidate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'garbage':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/50';
    }
  };

  const incomingRefs = objects.filter((o) => o.references.includes(selectedObject.id));

  return (
    <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Object Details</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => selectObject(null)}
          className="h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Object ID</label>
          <p className="text-white font-mono mt-1">{selectedObject.id}</p>
        </div>

        <div>
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Memory Size</label>
          <p className="text-white font-mono mt-1">{selectedObject.size} bytes</p>
        </div>

        <div>
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Reference Count</label>
          <p className="text-white font-mono mt-1">{selectedObject.referenceCount}</p>
        </div>

        <div>
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Status</label>
          <div className="mt-2">
            <Badge className={getStateColor(selectedObject.state)}>
              {selectedObject.state === 'active' && '🟢 Reachable'}
              {selectedObject.state === 'new' && '🔵 Newly Allocated'}
              {selectedObject.state === 'candidate' && '🟡 Candidate for Cleanup'}
              {selectedObject.state === 'garbage' && '🔴 Garbage'}
            </Badge>
          </div>
        </div>

        {selectedObject.isRoot && (
          <div>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
              ⚡ Root Object
            </Badge>
          </div>
        )}

        <div>
          <label className="text-xs text-zinc-500 uppercase tracking-wider">
            Outgoing References ({selectedObject.references.length})
          </label>
          <div className="mt-2 space-y-2">
            {selectedObject.references.length === 0 ? (
              <p className="text-sm text-zinc-600">No outgoing references</p>
            ) : (
              selectedObject.references.map((refId) => (
                <div
                  key={refId}
                  className="bg-zinc-800 p-3 rounded border border-zinc-700 cursor-pointer hover:border-emerald-500 transition-colors"
                  onClick={() => selectObject(refId)}
                >
                  <p className="text-sm font-mono text-white">{refId}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <label className="text-xs text-zinc-500 uppercase tracking-wider">
            Incoming References ({incomingRefs.length})
          </label>
          <div className="mt-2 space-y-2">
            {incomingRefs.length === 0 ? (
              <p className="text-sm text-zinc-600">No incoming references</p>
            ) : (
              incomingRefs.map((obj) => (
                <div
                  key={obj.id}
                  className="bg-zinc-800 p-3 rounded border border-zinc-700 cursor-pointer hover:border-emerald-500 transition-colors"
                  onClick={() => selectObject(obj.id)}
                >
                  <p className="text-sm font-mono text-white">{obj.id}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <label className="text-xs text-zinc-500 uppercase tracking-wider">Position</label>
          <p className="text-white font-mono mt-1 text-sm">
            x: {Math.round(selectedObject.position.x)}, y: {Math.round(selectedObject.position.y)}
          </p>
        </div>
      </div>
    </div>
  );
};
