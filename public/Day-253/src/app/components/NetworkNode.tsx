import { Monitor, Router, Server, Cloud } from 'lucide-react';
import { NetworkNode as NetworkNodeType } from '../types/packet';

interface NetworkNodeProps {
  node: NetworkNodeType;
}

export function NetworkNode({ node }: NetworkNodeProps) {
  const getIcon = () => {
    switch (node.type) {
      case 'computer':
        return <Monitor className="w-6 h-6" />;
      case 'router':
        return <Router className="w-6 h-6" />;
      case 'server':
        return <Server className="w-6 h-6" />;
      case 'cloud':
        return <Cloud className="w-6 h-6" />;
    }
  };

  const getColor = () => {
    switch (node.type) {
      case 'computer':
        return 'from-cyan-500 to-blue-600';
      case 'router':
        return 'from-purple-500 to-pink-600';
      case 'server':
        return 'from-orange-500 to-red-600';
      case 'cloud':
        return 'from-emerald-500 to-teal-600';
    }
  };

  return (
    <div
      className="absolute"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getColor()} flex items-center justify-center text-white shadow-lg`}
          style={{
            boxShadow: `0 0 20px rgba(6, 182, 212, 0.3)`,
          }}
        >
          {getIcon()}
        </div>
        <div className="text-center">
          <div className="text-xs font-medium text-white">{node.label}</div>
          {node.ip && <div className="text-xs text-slate-500 font-mono">{node.ip}</div>}
        </div>
      </div>
    </div>
  );
}
