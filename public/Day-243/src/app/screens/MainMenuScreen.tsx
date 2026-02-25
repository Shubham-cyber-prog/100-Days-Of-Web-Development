import React from 'react';
import { Play, Map, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { GameButton } from '../components/GameButton';
import { PlayerProfile } from '../components/PlayerProfile';

interface MainMenuScreenProps {
  onNavigate: (screen: string) => void;
  playerData: {
    username: string;
    coins: number;
    gems: number;
  };
}

export function MainMenuScreen({ onNavigate, playerData }: MainMenuScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Player Profile - Top Right */}
        <div className="absolute top-8 right-8">
          <PlayerProfile {...playerData} />
        </div>
        
        {/* Game Title */}
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl font-bold mb-4 uppercase tracking-wider">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
              Tower
            </span>
          </h1>
          <h1 className="text-7xl md:text-8xl font-bold mb-6 uppercase tracking-wider">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
              Defense
            </span>
          </h1>
          <p className="text-cyan-400 text-xl tracking-widest uppercase">Protect • Build • Conquer</p>
        </div>
        
        {/* Menu Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <GameButton 
            variant="primary" 
            size="large"
            onClick={() => onNavigate('levels')}
          >
            <div className="flex items-center justify-center gap-3">
              <Play className="w-6 h-6" />
              <span>Play Game</span>
            </div>
          </GameButton>
          
          <GameButton 
            variant="secondary" 
            size="large"
            onClick={() => onNavigate('levels')}
          >
            <div className="flex items-center justify-center gap-3">
              <Map className="w-6 h-6" />
              <span>Levels</span>
            </div>
          </GameButton>
          
          <GameButton 
            variant="success" 
            size="large"
            onClick={() => onNavigate('shop')}
          >
            <div className="flex items-center justify-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <span>Upgrades</span>
            </div>
          </GameButton>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <GameButton 
              variant="primary" 
              size="medium"
              onClick={() => {}}
            >
              <div className="flex items-center justify-center gap-2">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </div>
            </GameButton>
            
            <GameButton 
              variant="danger" 
              size="medium"
              onClick={() => {}}
            >
              <div className="flex items-center justify-center gap-2">
                <LogOut className="w-5 h-5" />
                <span>Exit</span>
              </div>
            </GameButton>
          </div>
        </div>
        
        {/* Version Info */}
        <div className="absolute bottom-8 text-slate-500 text-sm">
          Version 1.0.0 • © 2026 Tower Defense
        </div>
      </div>
    </div>
  );
}
