import { motion } from 'motion/react';

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
  animated?: boolean;
}

export function ConnectionLine({ from, to, color = '#9CA3AF', animated = true }: ConnectionLineProps) {
  // Calculate control points for a smooth curve
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  const path = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <motion.path
        d={path}
        stroke={color}
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </svg>
  );
}

interface ConnectionLinesProps {
  nodes: Array<{
    id: string;
    position: { x: number; y: number };
    connections?: string[];
  }>;
}

export function ConnectionLines({ nodes }: ConnectionLinesProps) {
  const lines: Array<{ from: { x: number; y: number }; to: { x: number; y: number } }> = [];

  nodes.forEach((node) => {
    if (node.connections) {
      node.connections.forEach((targetId) => {
        const targetNode = nodes.find((n) => n.id === targetId);
        if (targetNode) {
          lines.push({
            from: { x: node.position.x + 60, y: node.position.y + 20 },
            to: { x: targetNode.position.x + 60, y: targetNode.position.y + 20 },
          });
        }
      });
    }
  });

  return (
    <>
      {lines.map((line, index) => (
        <ConnectionLine key={index} from={line.from} to={line.to} />
      ))}
    </>
  );
}
