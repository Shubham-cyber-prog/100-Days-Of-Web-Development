import React from 'react';
import { User } from 'lucide-react';

interface PlayerProfileProps {
  username: string;
  coins: number;
  gems: number;
  compact?: boolean;
}

export function PlayerProfile({ username, coins, gems, compact = false }: PlayerProfileProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-3 py-1.5">
          <span className="text-yellow-400">💰</span>
          <span className="text-white font-bold">{coins.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/50 rounded-lg px-3 py-1.5">
          <span className="text-purple-400">💎</span>
          <span className="text-white font-bold">{gems.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-4">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Player</div>
          <div className="text-xl font-bold text-white">{username}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">💰</span>
          </div>
          <div className="text-center text-xs text-slate-300 mb-1">Coins</div>
          <div className="text-center text-xl font-bold text-white">{coins.toLocaleString()}</div>
        </div>
        
        <div className="bg-purple-500/20 border border-purple-500/50 rounded-lg p-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">💎</span>
          </div>
          <div className="text-center text-xs text-slate-300 mb-1">Gems</div>
          <div className="text-center text-xl font-bold text-white">{gems.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
