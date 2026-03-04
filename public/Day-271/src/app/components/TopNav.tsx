import React from 'react';
import { Play, Pause, SkipForward, RotateCcw, Settings } from 'lucide-react';
import { useSimulation } from '../store/SimulationContext';
import { GCAlgorithm } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export const TopNav: React.FC = () => {
  const {
    algorithm,
    setAlgorithm,
    simulation,
    startSimulation,
    pauseSimulation,
    stepSimulation,
    resetSimulation,
    setSpeed,
  } = useSimulation();

  return (
    <div className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GC</span>
          </div>
          <h1 className="text-xl font-semibold text-white">Garbage Collection Visualizer</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-400">Algorithm:</label>
          <Select value={algorithm} onValueChange={(value) => setAlgorithm(value as GCAlgorithm)}>
            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mark-sweep">Mark and Sweep</SelectItem>
              <SelectItem value="reference-counting">Reference Counting</SelectItem>
              <SelectItem value="generational">Generational GC</SelectItem>
              <SelectItem value="copying">Copying GC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-8 w-px bg-zinc-700" />

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={simulation.isRunning && !simulation.isPaused ? 'secondary' : 'default'}
            onClick={simulation.isRunning ? pauseSimulation : startSimulation}
            className="gap-2"
          >
            {simulation.isRunning && !simulation.isPaused ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start
              </>
            )}
          </Button>

          <Button size="sm" variant="outline" onClick={stepSimulation} className="gap-2">
            <SkipForward className="w-4 h-4" />
            Step
          </Button>

          <Button size="sm" variant="outline" onClick={resetSimulation} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="h-8 w-px bg-zinc-700" />

        <div className="flex items-center gap-3 min-w-[200px]">
          <label className="text-sm text-zinc-400 whitespace-nowrap">Speed:</label>
          <Slider
            value={[simulation.speed]}
            onValueChange={([value]) => setSpeed(value)}
            min={0.5}
            max={3}
            step={0.5}
            className="w-32"
          />
          <span className="text-sm text-zinc-300 w-8">{simulation.speed}x</span>
        </div>

        <Button size="sm" variant="ghost">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
