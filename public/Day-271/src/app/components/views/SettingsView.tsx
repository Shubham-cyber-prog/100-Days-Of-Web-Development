import React from 'react';
import { useSimulation } from '../../store/SimulationContext';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

export const SettingsView: React.FC = () => {
  const { algorithm } = useSimulation();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-2">Settings</h2>
        <p className="text-zinc-400">Configure visualization and simulation preferences</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-white mb-4">Visualization Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-labels" className="text-white">Show Object Labels</Label>
                <p className="text-sm text-zinc-500 mt-1">Display object IDs and sizes in the heap visualization</p>
              </div>
              <Switch id="show-labels" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-references" className="text-white">Show References</Label>
                <p className="text-sm text-zinc-500 mt-1">Display arrows showing object references</p>
              </div>
              <Switch id="show-references" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="animate-gc" className="text-white">Animate GC Cycles</Label>
                <p className="text-sm text-zinc-500 mt-1">Show animations during mark and sweep phases</p>
              </div>
              <Switch id="animate-gc" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-grid" className="text-white">Show Grid</Label>
                <p className="text-sm text-zinc-500 mt-1">Display background grid in heap visualization</p>
              </div>
              <Switch id="show-grid" defaultChecked />
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-800" />

        <div>
          <h3 className="font-semibold text-white mb-4">Simulation Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-gc" className="text-white">Auto-run GC</Label>
                <p className="text-sm text-zinc-500 mt-1">Automatically trigger garbage collection cycles</p>
              </div>
              <Switch id="auto-gc" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="log-events" className="text-white">Log Events</Label>
                <p className="text-sm text-zinc-500 mt-1">Record detailed event logs during simulation</p>
              </div>
              <Switch id="log-events" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sound-effects" className="text-white">Sound Effects</Label>
                <p className="text-sm text-zinc-500 mt-1">Play audio feedback for GC operations</p>
              </div>
              <Switch id="sound-effects" />
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-800" />

        <div>
          <h3 className="font-semibold text-white mb-4">Algorithm Information</h3>
          
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
            <p className="text-sm text-zinc-300 mb-2">
              <span className="font-medium text-white">Current Algorithm:</span> {algorithm}
            </p>
            
            <div className="mt-4 space-y-3">
              {algorithm === 'mark-sweep' && (
                <div>
                  <p className="text-sm font-medium text-emerald-400 mb-1">Mark and Sweep</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    A two-phase algorithm that first marks all reachable objects from root references,
                    then sweeps through memory to collect unmarked (unreachable) objects.
                  </p>
                </div>
              )}
              
              {algorithm === 'reference-counting' && (
                <div>
                  <p className="text-sm font-medium text-emerald-400 mb-1">Reference Counting</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Maintains a count of references to each object. When the count reaches zero,
                    the object is immediately eligible for collection. Cannot handle circular references.
                  </p>
                </div>
              )}
              
              {algorithm === 'generational' && (
                <div>
                  <p className="text-sm font-medium text-emerald-400 mb-1">Generational GC</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Divides objects into generations based on age. Most objects die young, so this
                    algorithm focuses on collecting newer objects more frequently.
                  </p>
                </div>
              )}
              
              {algorithm === 'copying' && (
                <div>
                  <p className="text-sm font-medium text-emerald-400 mb-1">Copying GC</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Divides memory into two spaces. During collection, live objects are copied to
                    the other space, compacting memory and eliminating fragmentation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">About</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The Garbage Collection Visualizer is an educational tool designed to help understand
          how different garbage collection algorithms work. It provides interactive visualizations
          of memory management, object references, and collection phases.
        </p>
        <p className="text-xs text-zinc-600 mt-4">Version 1.0.0</p>
      </div>
    </div>
  );
};
