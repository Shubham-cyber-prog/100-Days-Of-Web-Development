import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSimulation } from '../store/SimulationContext';
import { MemoryObject } from '../types';

const ObjectNode: React.FC<{ object: MemoryObject; isSelected: boolean; onClick: () => void }> = ({
  object,
  isSelected,
  onClick,
}) => {
  const getColor = () => {
    switch (object.state) {
      case 'active':
        return {
          bg: '#10b981',
          border: '#34d399',
          glow: 'rgba(16, 185, 129, 0.4)',
        };
      case 'new':
        return {
          bg: '#3b82f6',
          border: '#60a5fa',
          glow: 'rgba(59, 130, 246, 0.4)',
        };
      case 'candidate':
        return {
          bg: '#f59e0b',
          border: '#fbbf24',
          glow: 'rgba(245, 158, 11, 0.4)',
        };
      case 'garbage':
        return {
          bg: '#ef4444',
          border: '#f87171',
          glow: 'rgba(239, 68, 68, 0.4)',
        };
      default:
        return {
          bg: '#6b7280',
          border: '#9ca3af',
          glow: 'rgba(107, 114, 128, 0.4)',
        };
    }
  };

  const colors = getColor();
  const radius = Math.max(30, Math.min(60, object.size / 10));

  return (
    <motion.g
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {isSelected && (
        <motion.circle
          cx={object.position.x}
          cy={object.position.y}
          r={radius + 10}
          fill="none"
          stroke={colors.border}
          strokeWidth="3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        />
      )}
      
      <motion.circle
        cx={object.position.x}
        cy={object.position.y}
        r={radius}
        fill={colors.bg}
        stroke={colors.border}
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{
          scale: object.state === 'new' ? [1, 1.2, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 1,
            repeat: object.state === 'new' ? 3 : 0,
          },
        }}
        style={{
          filter: `drop-shadow(0 0 ${isSelected ? 20 : 10}px ${colors.glow})`,
        }}
      />
      
      {object.isRoot && (
        <text
          x={object.position.x}
          y={object.position.y - radius - 10}
          textAnchor="middle"
          fill="#a855f7"
          fontSize="20"
        >
          ⚡
        </text>
      )}
      
      <text
        x={object.position.x}
        y={object.position.y + 5}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {object.id.split('-')[0]}
      </text>
      
      <text
        x={object.position.x}
        y={object.position.y + radius + 15}
        textAnchor="middle"
        fill="#a1a1aa"
        fontSize="10"
        fontFamily="monospace"
      >
        {object.size}B
      </text>
    </motion.g>
  );
};

const ReferenceArrow: React.FC<{
  from: MemoryObject;
  to: MemoryObject;
}> = ({ from, to }) => {
  const angle = Math.atan2(to.position.y - from.position.y, to.position.x - from.position.x);
  const fromRadius = Math.max(30, Math.min(60, from.size / 10));
  const toRadius = Math.max(30, Math.min(60, to.size / 10));

  const x1 = from.position.x + Math.cos(angle) * fromRadius;
  const y1 = from.position.y + Math.sin(angle) * fromRadius;
  const x2 = to.position.x - Math.cos(angle) * (toRadius + 10);
  const y2 = to.position.y - Math.sin(angle) * (toRadius + 10);

  return (
    <g>
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#52525b"
        strokeWidth="2"
        strokeDasharray="5,5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.polygon
        points={`${x2},${y2} ${x2 - 10 * Math.cos(angle - 0.5)},${
          y2 - 10 * Math.sin(angle - 0.5)
        } ${x2 - 10 * Math.cos(angle + 0.5)},${y2 - 10 * Math.sin(angle + 0.5)}`}
        fill="#52525b"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      />
    </g>
  );
};

export const HeapVisualization: React.FC = () => {
  const { objects, selectedObjectId, selectObject, simulation } = useSimulation();
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-lg px-4 py-2">
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span className="text-zinc-400">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-zinc-400">New</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-zinc-400">Candidate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-zinc-400">Garbage</span>
            </div>
          </div>
        </div>
      </div>

      {simulation.currentPhase !== 'idle' && (
        <div className="absolute top-4 right-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/50 rounded-lg px-4 py-2"
          >
            <span className="text-emerald-400 text-sm font-medium">
              {simulation.currentPhase === 'mark' && '🔍 Marking reachable objects...'}
              {simulation.currentPhase === 'sweep' && '🧹 Sweeping garbage...'}
              {simulation.currentPhase === 'compact' && '📦 Compacting memory...'}
            </span>
          </motion.div>
        </div>
      )}

      <svg ref={svgRef} width="100%" height="600" className="bg-zinc-950">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Draw references first (so they're behind nodes) */}
        {objects.map((obj) =>
          obj.references.map((refId) => {
            const target = objects.find((o) => o.id === refId);
            if (!target) return null;
            return <ReferenceArrow key={`${obj.id}-${refId}`} from={obj} to={target} />;
          })
        )}

        {/* Draw nodes */}
        {objects.map((obj) => (
          <ObjectNode
            key={obj.id}
            object={obj}
            isSelected={selectedObjectId === obj.id}
            onClick={() => selectObject(obj.id)}
          />
        ))}
      </svg>

      {objects.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-zinc-500 text-lg">No objects in heap</p>
            <p className="text-zinc-600 text-sm mt-2">Click "Add Object" to start</p>
          </div>
        </div>
      )}
    </div>
  );
};
