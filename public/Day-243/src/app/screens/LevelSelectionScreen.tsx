import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { GameButton } from '../components/GameButton';
import { LevelCard, LevelData } from '../components/LevelCard';
import { PlayerProfile } from '../components/PlayerProfile';

interface LevelSelectionScreenProps {
  onNavigate: (screen: string) => void;
  onSelectLevel: (levelId: number) => void;
  playerData: {
    username: string;
    coins: number;
    gems: number;
  };
}

export function LevelSelectionScreen({ onNavigate, onSelectLevel, playerData }: LevelSelectionScreenProps) {
  const levels: LevelData[] = [
    { id: 1, unlocked: true, completed: true, stars: 3, difficulty: 'easy' },
    { id: 2, unlocked: true, completed: true, stars: 3, difficulty: 'easy' },
    { id: 3, unlocked: true, completed: true, stars: 2, difficulty: 'medium' },
    { id: 4, unlocked: true, completed: true, stars: 2, difficulty: 'medium' },
    { id: 5, unlocked: true, completed: true, stars: 1, difficulty: 'hard' },
    { id: 6, unlocked: true, completed: false, stars: 0, difficulty: 'hard' },
    { id: 7, unlocked: true, completed: false, stars: 0, difficulty: 'expert' },
    { id: 8, unlocked: true, completed: false, stars: 0, difficulty: 'expert' },
    { id: 9, unlocked: false, completed: false, stars: 0, difficulty: 'expert' },
    { id: 10, unlocked: false, completed: false, stars: 0, difficulty: 'expert' },
    { id: 11, unlocked: false, completed: false, stars: 0, difficulty: 'expert' },
    { id: 12, unlocked: false, completed: false, stars: 0, difficulty: 'expert' },
  ];
  
  const completedLevels = levels.filter(l => l.completed).length;
  const totalStars = levels.reduce((sum, l) => sum + l.stars, 0);
  const maxStars = levels.filter(l => l.unlocked).length * 3;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <GameButton 
            variant="secondary" 
            size="medium"
            onClick={() => onNavigate('menu')}
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </div>
          </GameButton>
          
          <h1 className="text-5xl font-bold uppercase tracking-wider bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Select Level
          </h1>
          
          <div className="w-32">
            <PlayerProfile {...playerData} compact />
          </div>
        </div>
        
        {/* Progress Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-slate-800/70 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{completedLevels}/{levels.length}</div>
                <div className="text-sm text-slate-400 uppercase">Levels Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{totalStars}/{maxStars}</div>
                <div className="text-sm text-slate-400 uppercase">Stars Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{Math.round((completedLevels / levels.length) * 100)}%</div>
                <div className="text-sm text-slate-400 uppercase">Progress</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-1000 shadow-[0_0_20px_rgba(168,85,247,0.8)]"
                style={{ width: `${(completedLevels / levels.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Levels Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {levels.map((level) => (
            <LevelCard 
              key={level.id} 
              level={level} 
              onClick={level.unlocked ? () => onSelectLevel(level.id) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
