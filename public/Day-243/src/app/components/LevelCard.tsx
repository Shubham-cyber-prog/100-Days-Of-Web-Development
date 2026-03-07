import React from 'react';
import { Lock, Star } from 'lucide-react';

export interface LevelData {
  id: number;
  unlocked: boolean;
  completed: boolean;
  stars: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}

interface LevelCardProps {
  level: LevelData;
  onClick?: () => void;
}

export function LevelCard({ level, onClick }: LevelCardProps) {
  const difficultyColors = {
    easy: 'from-green-500 to-emerald-600',
    medium: 'from-yellow-500 to-orange-500',
    hard: 'from-orange-500 to-red-600',
    expert: 'from-purple-600 to-pink-600'
  };
  
  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    expert: 'Expert'
  };
  
  if (!level.unlocked) {
    return (
      <div className="relative bg-slate-900/50 backdrop-blur-sm border-2 border-slate-800 rounded-xl p-6 text-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="w-12 h-12 text-slate-700" />
        </div>
        <div className="opacity-30">
          <div className="text-2xl font-bold text-slate-400 mb-2">{level.id}</div>
          <div className="text-xs text-slate-500">Locked</div>
        </div>
      </div>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6 text-center transition-all hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] group"
    >
      <div className="text-4xl font-bold text-white mb-3">{level.id}</div>
      
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${difficultyColors[level.difficulty]} mb-3`}>
        {difficultyLabels[level.difficulty]}
      </div>
      
      <div className="flex items-center justify-center gap-1">
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= level.stars
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-slate-700 text-slate-700'
            }`}
          />
        ))}
      </div>
      
      {level.completed && (
        <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">✓</span>
        </div>
      )}
    </button>
  );
}
