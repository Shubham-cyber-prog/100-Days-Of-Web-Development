import React from 'react';
import { Box, Activity, Trash2, Database } from 'lucide-react';
import { useSimulation } from '../store/SimulationContext';
import { Progress } from './ui/progress';

export const MemoryStats: React.FC = () => {
  const { stats } = useSimulation();

  const memoryPercentage = (stats.memoryUsage / stats.totalMemory) * 100;

  const statCards = [
    {
      label: 'Total Objects',
      value: stats.totalObjects,
      icon: Box,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Active Objects',
      value: stats.activeObjects,
      icon: Activity,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Garbage Objects',
      value: stats.garbageObjects,
      icon: Trash2,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      label: 'Memory Usage',
      value: `${stats.memoryUsage}B / ${stats.totalMemory}B`,
      icon: Database,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-zinc-400">{card.label}</span>
            <div className={`${card.bgColor} p-2 rounded`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </div>
          <p className="text-2xl font-semibold text-white mb-3">{card.value}</p>
          {card.label === 'Memory Usage' && (
            <div className="space-y-2">
              <Progress value={memoryPercentage} className="h-2" />
              <p className="text-xs text-zinc-500">{memoryPercentage.toFixed(1)}% used</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
