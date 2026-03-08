import React, { useState } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { GameButton } from '../components/GameButton';
import { TowerCard, TowerType } from '../components/TowerCard';
import { PlayerProfile } from '../components/PlayerProfile';

interface ShopScreenProps {
  onNavigate: (screen: string) => void;
  playerData: {
    username: string;
    coins: number;
    gems: number;
  };
}

export function ShopScreen({ onNavigate, playerData }: ShopScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<'towers' | 'perks'>('towers');
  
  const towerUpgrades: (TowerType & { unlocked: boolean; upgradeCoins: number; upgradeGems: number })[] = [
    { 
      id: '1', 
      name: 'Laser Mk.1', 
      type: 'laser', 
      cost: 100, 
      damage: 25, 
      range: 3, 
      speed: 8, 
      level: 1,
      unlocked: true,
      upgradeCoins: 500,
      upgradeGems: 0
    },
    { 
      id: '2', 
      name: 'Laser Mk.2', 
      type: 'laser', 
      cost: 150, 
      damage: 40, 
      range: 4, 
      speed: 9, 
      level: 2,
      unlocked: true,
      upgradeCoins: 1000,
      upgradeGems: 50
    },
    { 
      id: '3', 
      name: 'Laser Mk.3', 
      type: 'laser', 
      cost: 200, 
      damage: 60, 
      range: 5, 
      speed: 10, 
      level: 3,
      unlocked: false,
      upgradeCoins: 2000,
      upgradeGems: 100
    },
    { 
      id: '4', 
      name: 'Flame Mk.1', 
      type: 'fire', 
      cost: 150, 
      damage: 40, 
      range: 2, 
      speed: 5, 
      level: 1,
      unlocked: true,
      upgradeCoins: 600,
      upgradeGems: 0
    },
    { 
      id: '5', 
      name: 'Flame Mk.2', 
      type: 'fire', 
      cost: 200, 
      damage: 65, 
      range: 3, 
      speed: 6, 
      level: 2,
      unlocked: false,
      upgradeCoins: 1200,
      upgradeGems: 75
    },
    { 
      id: '6', 
      name: 'Frost Mk.1', 
      type: 'ice', 
      cost: 120, 
      damage: 15, 
      range: 4, 
      speed: 6, 
      level: 1,
      unlocked: true,
      upgradeCoins: 550,
      upgradeGems: 0
    },
    { 
      id: '7', 
      name: 'Frost Mk.2', 
      type: 'ice', 
      cost: 180, 
      damage: 30, 
      range: 5, 
      speed: 7, 
      level: 2,
      unlocked: false,
      upgradeCoins: 1100,
      upgradeGems: 60
    },
    { 
      id: '8', 
      name: 'Cannon Mk.1', 
      type: 'cannon', 
      cost: 200, 
      damage: 60, 
      range: 5, 
      speed: 3, 
      level: 1,
      unlocked: true,
      upgradeCoins: 700,
      upgradeGems: 0
    },
  ];
  
  const perks = [
    { id: 1, name: 'Extra Health', description: '+5 Base Health', cost: 500, unlocked: true },
    { id: 2, name: 'Starting Bonus', description: '+200 Starting Coins', cost: 800, unlocked: true },
    { id: 3, name: 'Interest Rate', description: '+2% Coin Interest', cost: 1000, unlocked: false },
    { id: 4, name: 'Quick Build', description: '-10% Tower Cost', cost: 1500, unlocked: false },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <GameButton 
            variant="success" 
            size="medium"
            onClick={() => onNavigate('menu')}
          >
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </div>
          </GameButton>
          
          <h1 className="text-5xl font-bold uppercase tracking-wider bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Upgrades & Shop
          </h1>
          
          <div className="w-32">
            <PlayerProfile {...playerData} compact />
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex gap-4">
            <GameButton
              variant={selectedCategory === 'towers' ? 'success' : 'secondary'}
              size="medium"
              onClick={() => setSelectedCategory('towers')}
            >
              Tower Upgrades
            </GameButton>
            <GameButton
              variant={selectedCategory === 'perks' ? 'success' : 'secondary'}
              size="medium"
              onClick={() => setSelectedCategory('perks')}
            >
              Perks & Abilities
            </GameButton>
          </div>
        </div>
        
        {/* Tower Upgrades */}
        {selectedCategory === 'towers' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {towerUpgrades.map((tower) => (
                <div key={tower.id} className="relative">
                  {!tower.unlocked && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <div className="text-slate-300 font-bold">Locked</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-slate-800/70 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-4">
                    <TowerCard tower={tower} />
                    
                    <div className="mt-4">
                      {tower.unlocked ? (
                        <div className="text-center py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                          <div className="text-green-400 font-bold text-sm">✓ Unlocked</div>
                        </div>
                      ) : (
                        <>
                          <GameButton
                            variant="success"
                            size="small"
                            className="w-full mb-2"
                            disabled={playerData.coins < tower.upgradeCoins || playerData.gems < tower.upgradeGems}
                          >
                            Unlock
                          </GameButton>
                          <div className="flex items-center justify-center gap-3 text-xs">
                            <span className="flex items-center gap-1">
                              <span className="text-yellow-400">💰</span>
                              <span className="text-white font-bold">{tower.upgradeCoins}</span>
                            </span>
                            {tower.upgradeGems > 0 && (
                              <span className="flex items-center gap-1">
                                <span className="text-purple-400">💎</span>
                                <span className="text-white font-bold">{tower.upgradeGems}</span>
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Perks */}
        {selectedCategory === 'perks' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {perks.map((perk) => (
                <div 
                  key={perk.id}
                  className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-6"
                >
                  {!perk.unlocked && (
                    <div className="absolute top-4 right-4">
                      <Lock className="w-6 h-6 text-slate-500" />
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{perk.name}</h3>
                  <p className="text-slate-300 mb-4">{perk.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">💰</span>
                      <span className="text-xl font-bold text-white">{perk.cost}</span>
                    </div>
                    
                    {perk.unlocked ? (
                      <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
                        <span className="text-green-400 font-bold text-sm">✓ Unlocked</span>
                      </div>
                    ) : (
                      <GameButton
                        variant="success"
                        size="small"
                        disabled={playerData.coins < perk.cost}
                      >
                        Purchase
                      </GameButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
