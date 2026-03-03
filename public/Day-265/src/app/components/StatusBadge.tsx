import { Circle, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface StatusBadgeProps {
  status: 'running' | 'completed' | 'failed' | 'idle';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const configs = {
    running: {
      icon: Loader2,
      label: 'Running',
      className: 'bg-blue-50 text-blue-700 border-blue-200',
      iconClassName: 'text-blue-600 animate-spin'
    },
    completed: {
      icon: CheckCircle2,
      label: 'Completed',
      className: 'bg-green-50 text-green-700 border-green-200',
      iconClassName: 'text-green-600'
    },
    failed: {
      icon: XCircle,
      label: 'Failed',
      className: 'bg-red-50 text-red-700 border-red-200',
      iconClassName: 'text-red-600'
    },
    idle: {
      icon: Circle,
      label: 'Idle',
      className: 'bg-gray-50 text-gray-700 border-gray-200',
      iconClassName: 'text-gray-600'
    }
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${config.className}`}>
      <Icon className={`w-3.5 h-3.5 ${config.iconClassName}`} />
      {config.label}
    </span>
  );
}
