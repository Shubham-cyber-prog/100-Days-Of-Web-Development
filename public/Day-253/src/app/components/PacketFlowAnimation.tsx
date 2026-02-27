import { motion } from 'motion/react';
import { NetworkNode, Protocol } from '../types/packet';
import { getProtocolColor } from '../utils/mockData';

interface PacketFlowAnimationProps {
  from: NetworkNode;
  to: NetworkNode;
  protocol: Protocol;
}

export function PacketFlowAnimation({ from, to, protocol }: PacketFlowAnimationProps) {
  const color = getProtocolColor(protocol);

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id={`gradient-${from.id}-${to.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Connection line */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth="2"
        opacity="0.2"
      />

      {/* Animated packet */}
      <motion.circle
        cx={from.x}
        cy={from.y}
        r="4"
        fill={color}
        initial={{ cx: from.x, cy: from.y, opacity: 1 }}
        animate={{
          cx: to.x,
          cy: to.y,
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          filter: `drop-shadow(0 0 4px ${color})`,
        }}
      />

      {/* Flowing gradient line */}
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={`url(#gradient-${from.id}-${to.id})`}
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </svg>
  );
}
