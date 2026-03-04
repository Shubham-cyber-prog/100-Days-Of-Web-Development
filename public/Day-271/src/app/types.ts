export type GCAlgorithm = 'mark-sweep' | 'reference-counting' | 'generational' | 'copying';

export type ObjectState = 'active' | 'candidate' | 'garbage' | 'new';

export interface MemoryObject {
  id: string;
  size: number;
  state: ObjectState;
  references: string[];
  referenceCount: number;
  position: { x: number; y: number };
  generation?: number; // For generational GC
  isRoot?: boolean;
}

export interface GCLog {
  id: string;
  timestamp: number;
  type: 'allocation' | 'reference-created' | 'reference-removed' | 'gc-started' | 'gc-completed' | 'object-collected' | 'memory-reclaimed';
  message: string;
  objectId?: string;
}

export interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  speed: number;
  currentPhase: 'idle' | 'mark' | 'sweep' | 'compact';
}

export interface MemoryStats {
  totalObjects: number;
  activeObjects: number;
  garbageObjects: number;
  memoryUsage: number;
  totalMemory: number;
}
