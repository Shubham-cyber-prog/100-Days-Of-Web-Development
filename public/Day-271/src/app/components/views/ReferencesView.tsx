import React from 'react';
import { useSimulation } from '../../store/SimulationContext';
import { Button } from '../ui/button';
import { ArrowRight, Trash2 } from 'lucide-react';

export const ReferencesView: React.FC = () => {
  const { objects, removeReference, selectObject } = useSimulation();

  const references = objects.flatMap((obj) =>
    obj.references.map((refId) => ({
      from: obj.id,
      to: refId,
      fromState: obj.state,
    }))
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">References</h2>
        <p className="text-zinc-400">Object reference connections in the heap</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  From Object
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Direction
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  To Object
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {references.map((ref, index) => (
                <tr key={index} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-sm font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                      onClick={() => selectObject(ref.from)}
                    >
                      {ref.from}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <ArrowRight className="w-5 h-5 text-zinc-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                      onClick={() => selectObject(ref.to)}
                    >
                      {ref.to}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeReference(ref.from, ref.to)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {references.length === 0 && (
          <div className="flex items-center justify-center h-40 text-zinc-500">
            <p>No references between objects</p>
          </div>
        )}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">Reference Graph Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-zinc-400">Total References</p>
            <p className="text-2xl font-semibold text-white mt-1">{references.length}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Objects with References</p>
            <p className="text-2xl font-semibold text-white mt-1">
              {objects.filter((o) => o.references.length > 0).length}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-400">Isolated Objects</p>
            <p className="text-2xl font-semibold text-white mt-1">
              {objects.filter((o) => o.references.length === 0 && o.referenceCount === 0).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
