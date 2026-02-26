import React from 'react';
import { Zap, Flame, Snowflake, Shield } from 'lucide-react';

export interface TowerType {
  id: string;
  name: string;
  type: 'laser' | 'fire' | 'ice' | 'cannon';
  cost: number;
  damage: number;
  range: number;
  speed: number;
  level: number;
}

interface TowerCardProps {
  tower: TowerType;
  onClick?: () => void;
  selected?: boolean;
  compact?: boolean;
  disabled?: boolean;
}

export function TowerCard({ tower, onClick, selected = false, compact = false, disabled = false }: TowerCardProps) {
  const iconMap = {
    laser: Zap,
    fire: Flame,
    ice: Snowflake,
    cannon: Shield
  };
  
  const colorMap = {
    laser: 'from-cyan-500 to-blue-600',
    fire: 'from-orange-500 to-red-600',
    ice: 'from-blue-400 to-cyan-300',
    cannon: 'from-purple-500 to-pink-600'
  };
  
  const glowMap = {
    laser: 'shadow-[0_0_20px_rgba(6,182,212,0.6)]',
    fire: 'shadow-[0_0_20px_rgba(249,115,22,0.6)]',
    ice: 'shadow-[0_0_20px_rgba(96,165,250,0.6)]',
    cannon: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]'
  };
  
  const Icon = iconMap[tower.type];
  
  if (compact) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-lg p-3 transition-all hover:scale-105 ${
          selected ? `border-cyan-400 ${glowMap[tower.type]}` : 'border-slate-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className={`w-12 h-12 mx-auto rounded-lg bg-gradient-to-br ${colorMap[tower.type]} flex items-center justify-center mb-2`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-300 mb-1">{tower.name}</div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-yellow-400">💰</span>
            <span className="text-xs font-bold text-white">{tower.cost}</span>
          </div>
        </div>
      </button>
    );
  }
  
  return (
    <div
      onClick={onClick}
      className={`relative bg-slate-800/70 backdrop-blur-sm border-2 rounded-xl p-4 transition-all hover:scale-105 ${
        selected ? `border-cyan-400 ${glowMap[tower.type]}` : 'border-slate-700'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className={`w-20 h-20 mx-auto rounded-xl bg-gradient-to-br ${colorMap[tower.type]} flex items-center justify-center mb-3 ${glowMap[tower.type]}`}>
        <Icon className="w-10 h-10 text-white" />
      </div>
      
      <h3 className="text-center text-white font-bold mb-2">{tower.name}</h3>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-slate-300">
          <span>Damage:</span>
          <span className="text-white font-bold">{tower.damage}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Range:</span>
          <span className="text-white font-bold">{tower.range}</span>
        </div>
        <div className="flex justify-between text-slate-300">
          <span>Speed:</span>
          <span className="text-white font-bold">{tower.speed}</span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-2 bg-slate-900/50 rounded-lg py-2">
        <span className="text-yellow-400">💰</span>
        <span className="text-lg font-bold text-white">{tower.cost}</span>
      </div>
      
      {tower.level > 1 && (
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">
          Lv.{tower.level}
        </div>
      )}
    </div>
  );
}
