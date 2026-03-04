import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MemoryObject, GCLog, SimulationState, MemoryStats, GCAlgorithm, ObjectState } from '../types';

interface SimulationContextType {
  objects: MemoryObject[];
  logs: GCLog[];
  simulation: SimulationState;
  stats: MemoryStats;
  algorithm: GCAlgorithm;
  selectedObjectId: string | null;
  setAlgorithm: (algorithm: GCAlgorithm) => void;
  addObject: () => void;
  removeObject: (id: string) => void;
  addReference: (fromId: string, toId: string) => void;
  removeReference: (fromId: string, toId: string) => void;
  startSimulation: () => void;
  pauseSimulation: () => void;
  stepSimulation: () => void;
  resetSimulation: () => void;
  setSpeed: (speed: number) => void;
  selectObject: (id: string | null) => void;
  runGCCycle: () => void;
}

const SimulationContext = createContext<SimulationContextType | null>(null);

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
};

const INITIAL_OBJECTS: MemoryObject[] = [
  {
    id: 'root-1',
    size: 256,
    state: 'active',
    references: ['obj-1', 'obj-2'],
    referenceCount: 0,
    position: { x: 100, y: 100 },
    isRoot: true,
  },
  {
    id: 'obj-1',
    size: 128,
    state: 'active',
    references: ['obj-3'],
    referenceCount: 1,
    position: { x: 300, y: 150 },
  },
  {
    id: 'obj-2',
    size: 192,
    state: 'active',
    references: ['obj-3'],
    referenceCount: 1,
    position: { x: 300, y: 250 },
  },
  {
    id: 'obj-3',
    size: 64,
    state: 'active',
    references: [],
    referenceCount: 2,
    position: { x: 500, y: 200 },
  },
  {
    id: 'obj-4',
    size: 512,
    state: 'garbage',
    references: ['obj-5'],
    referenceCount: 0,
    position: { x: 700, y: 150 },
  },
  {
    id: 'obj-5',
    size: 256,
    state: 'garbage',
    references: ['obj-4'],
    referenceCount: 1,
    position: { x: 900, y: 200 },
  },
];

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [objects, setObjects] = useState<MemoryObject[]>(INITIAL_OBJECTS);
  const [logs, setLogs] = useState<GCLog[]>([]);
  const [simulation, setSimulation] = useState<SimulationState>({
    isRunning: false,
    isPaused: false,
    speed: 1,
    currentPhase: 'idle',
  });
  const [algorithm, setAlgorithm] = useState<GCAlgorithm>('mark-sweep');
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const addLog = useCallback((type: GCLog['type'], message: string, objectId?: string) => {
    const log: GCLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      type,
      message,
      objectId,
    };
    setLogs((prev) => [log, ...prev].slice(0, 100)); // Keep last 100 logs
  }, []);

  const calculateStats = useCallback((objs: MemoryObject[]): MemoryStats => {
    const totalObjects = objs.length;
    const activeObjects = objs.filter((o) => o.state === 'active' || o.state === 'new').length;
    const garbageObjects = objs.filter((o) => o.state === 'garbage').length;
    const memoryUsage = objs.reduce((sum, o) => sum + o.size, 0);
    const totalMemory = 4096; // 4KB total memory

    return {
      totalObjects,
      activeObjects,
      garbageObjects,
      memoryUsage,
      totalMemory,
    };
  }, []);

  const stats = calculateStats(objects);

  const addObject = useCallback(() => {
    const newId = `obj-${Date.now()}`;
    const newObject: MemoryObject = {
      id: newId,
      size: Math.floor(Math.random() * 256) + 64,
      state: 'new',
      references: [],
      referenceCount: 0,
      position: {
        x: Math.random() * 800 + 100,
        y: Math.random() * 400 + 100,
      },
    };
    
    setObjects((prev) => [...prev, newObject]);
    addLog('allocation', `Object ${newId} allocated with ${newObject.size} bytes`, newId);

    // Change state to active after animation
    setTimeout(() => {
      setObjects((prev) =>
        prev.map((o) => (o.id === newId ? { ...o, state: 'active' as ObjectState } : o))
      );
    }, 1000);
  }, [addLog]);

  const removeObject = useCallback((id: string) => {
    setObjects((prev) => {
      const updated = prev.filter((o) => o.id !== id);
      // Remove references to this object
      return updated.map((o) => ({
        ...o,
        references: o.references.filter((ref) => ref !== id),
      }));
    });
    addLog('object-collected', `Object ${id} removed from heap`, id);
  }, [addLog]);

  const addReference = useCallback((fromId: string, toId: string) => {
    setObjects((prev) =>
      prev.map((o) => {
        if (o.id === fromId && !o.references.includes(toId)) {
          return { ...o, references: [...o.references, toId] };
        }
        if (o.id === toId) {
          return { ...o, referenceCount: o.referenceCount + 1 };
        }
        return o;
      })
    );
    addLog('reference-created', `Reference created: ${fromId} → ${toId}`);
  }, [addLog]);

  const removeReference = useCallback((fromId: string, toId: string) => {
    setObjects((prev) =>
      prev.map((o) => {
        if (o.id === fromId) {
          return { ...o, references: o.references.filter((ref) => ref !== toId) };
        }
        if (o.id === toId) {
          return { ...o, referenceCount: Math.max(0, o.referenceCount - 1) };
        }
        return o;
      })
    );
    addLog('reference-removed', `Reference removed: ${fromId} ⚡ ${toId}`);
  }, [addLog]);

  const markAndSweep = useCallback(() => {
    addLog('gc-started', 'Mark and Sweep GC cycle started');
    setSimulation((prev) => ({ ...prev, currentPhase: 'mark' }));

    // Mark phase
    setTimeout(() => {
      setObjects((prev) => {
        const marked = new Set<string>();
        const roots = prev.filter((o) => o.isRoot);
        
        // BFS to mark reachable objects
        const queue = [...roots];
        while (queue.length > 0) {
          const current = queue.shift()!;
          if (!marked.has(current.id)) {
            marked.add(current.id);
            const referenced = prev.filter((o) => current.references.includes(o.id));
            queue.push(...referenced);
          }
        }

        return prev.map((o) => ({
          ...o,
          state: marked.has(o.id) ? 'active' : 'candidate' as ObjectState,
        }));
      });

      addLog('gc-started', 'Mark phase completed');
      setSimulation((prev) => ({ ...prev, currentPhase: 'sweep' }));

      // Sweep phase
      setTimeout(() => {
        setObjects((prev) => {
          const garbage = prev.filter((o) => o.state === 'candidate');
          const memoryReclaimed = garbage.reduce((sum, o) => sum + o.size, 0);
          
          if (garbage.length > 0) {
            addLog('memory-reclaimed', `Swept ${garbage.length} objects, reclaimed ${memoryReclaimed} bytes`);
          }

          return prev.map((o) => ({
            ...o,
            state: o.state === 'candidate' ? 'garbage' as ObjectState : o.state,
          }));
        });

        addLog('gc-completed', 'Mark and Sweep GC cycle completed');
        setSimulation((prev) => ({ ...prev, currentPhase: 'idle' }));
      }, 1000 / simulation.speed);
    }, 1000 / simulation.speed);
  }, [addLog, simulation.speed]);

  const referenceCountingGC = useCallback(() => {
    addLog('gc-started', 'Reference Counting GC cycle started');
    setSimulation((prev) => ({ ...prev, currentPhase: 'sweep' }));

    setTimeout(() => {
      setObjects((prev) => {
        const garbage = prev.filter((o) => o.referenceCount === 0 && !o.isRoot);
        const memoryReclaimed = garbage.reduce((sum, o) => sum + o.size, 0);

        if (garbage.length > 0) {
          addLog('memory-reclaimed', `Collected ${garbage.length} objects with zero references, reclaimed ${memoryReclaimed} bytes`);
        }

        return prev.map((o) => ({
          ...o,
          state: o.referenceCount === 0 && !o.isRoot ? 'garbage' as ObjectState : o.state,
        }));
      });

      addLog('gc-completed', 'Reference Counting GC cycle completed');
      setSimulation((prev) => ({ ...prev, currentPhase: 'idle' }));
    }, 1000 / simulation.speed);
  }, [addLog, simulation.speed]);

  const runGCCycle = useCallback(() => {
    if (simulation.currentPhase !== 'idle') return;

    switch (algorithm) {
      case 'mark-sweep':
        markAndSweep();
        break;
      case 'reference-counting':
        referenceCountingGC();
        break;
      case 'generational':
        markAndSweep(); // Simplified
        break;
      case 'copying':
        markAndSweep(); // Simplified
        break;
    }
  }, [algorithm, simulation.currentPhase, markAndSweep, referenceCountingGC]);

  const startSimulation = useCallback(() => {
    setSimulation((prev) => ({ ...prev, isRunning: true, isPaused: false }));
  }, []);

  const pauseSimulation = useCallback(() => {
    setSimulation((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const stepSimulation = useCallback(() => {
    runGCCycle();
  }, [runGCCycle]);

  const resetSimulation = useCallback(() => {
    setObjects(INITIAL_OBJECTS);
    setLogs([]);
    setSimulation({
      isRunning: false,
      isPaused: false,
      speed: 1,
      currentPhase: 'idle',
    });
    addLog('gc-started', 'Simulation reset');
  }, [addLog]);

  const setSpeed = useCallback((speed: number) => {
    setSimulation((prev) => ({ ...prev, speed }));
  }, []);

  const selectObject = useCallback((id: string | null) => {
    setSelectedObjectId(id);
  }, []);

  // Auto-run GC cycle when simulation is running
  useEffect(() => {
    if (!simulation.isRunning || simulation.isPaused) return;

    const interval = setInterval(() => {
      runGCCycle();
    }, 3000 / simulation.speed);

    return () => clearInterval(interval);
  }, [simulation.isRunning, simulation.isPaused, simulation.speed, runGCCycle]);

  const value: SimulationContextType = {
    objects,
    logs,
    simulation,
    stats,
    algorithm,
    selectedObjectId,
    setAlgorithm,
    addObject,
    removeObject,
    addReference,
    removeReference,
    startSimulation,
    pauseSimulation,
    stepSimulation,
    resetSimulation,
    setSpeed,
    selectObject,
    runGCCycle,
  };

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
};
