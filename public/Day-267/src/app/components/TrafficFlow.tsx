import { motion } from 'motion/react';
import { Service } from '../types/service';

interface TrafficFlowProps {
  from: Service;
  to: Service;
}

export function TrafficFlow({ from, to }: TrafficFlowProps) {
  const fromX = from.position.x + 72; // center of node (width/2)
  const fromY = from.position.y + 40;
  const toX = to.position.x + 72;
  const toY = to.position.y + 40;

  const pathData = `M ${fromX} ${fromY} Q ${(fromX + toX) / 2} ${
    (fromY + toY) / 2 - 30
  } ${toX} ${toY}`;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      <motion.path
        d={pathData}
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.circle
        r="4"
        fill="#3b82f6"
        initial={{ offsetDistance: "0%", scale: 0 }}
        animate={{
          offsetDistance: "100%",
          scale: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          offsetPath: `path('${pathData}')`,
        }}
      />
    </svg>
  );
}
