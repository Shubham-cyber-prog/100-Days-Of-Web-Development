import React from 'react';
import { useSimulation } from '../../store/SimulationContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

export const ObjectsView: React.FC = () => {
  const { objects, selectObject, removeObject } = useSimulation();

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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Objects</h2>
        <p className="text-zinc-400">All objects currently in the heap memory</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Object ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  References
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Ref Count
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {objects.map((obj) => (
                <tr
                  key={obj.id}
                  className="hover:bg-zinc-800/50 cursor-pointer transition-colors"
                  onClick={() => selectObject(obj.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-white">{obj.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-zinc-300 font-mono">{obj.size} bytes</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStateColor(obj.state)}>{obj.state}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-zinc-300">{obj.references.length}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-zinc-300">{obj.referenceCount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {obj.isRoot ? (
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                        Root
                      </Badge>
                    ) : (
                      <span className="text-sm text-zinc-500">Regular</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!obj.isRoot && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeObject(obj.id);
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {objects.length === 0 && (
          <div className="flex items-center justify-center h-40 text-zinc-500">
            <p>No objects in heap</p>
          </div>
        )}
      </div>
    </div>
  );
};
