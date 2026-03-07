import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Pause, ChevronUp, Play } from 'lucide-react';
import { GameButton } from '../components/GameButton';
import { TowerCard, TowerType } from '../components/TowerCard';
import { GameBoard } from '../components/GameBoard';
import { GameModal } from '../components/GameModal';

interface PlacedTower {
  id: string;
  position: number;
  type: 'laser' | 'fire' | 'ice' | 'cannon';
  damage: number;
  range: number;
  speed: number;
  lastShot: number;
  target: string | null;
  cost: number;
}

interface Enemy {
  id: string;
  type: 'basic' | 'fast' | 'tank' | 'boss';
  health: number;
  maxHealth: number;
  speed: number;
  pathIndex: number;
  position: { x: number; y: number };
  reward: number;
}

interface Projectile {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'laser' | 'fire' | 'ice' | 'cannon';
  enemyId: string;
  damage: number;
}

interface GameplayScreenProps {
  onNavigate: (screen: string) => void;
  levelId: number;
}

const TILE_SIZE = 50;
const GRID_SIZE = 10;
const PATH_TILES = [0, 1, 2, 3, 13, 23, 33, 43, 44, 45, 46, 56, 66, 76, 86, 87, 88, 89, 99];

// Convert tile index to pixel position
const tileToPosition = (tileIndex: number) => {
  const col = tileIndex % GRID_SIZE;
  const row = Math.floor(tileIndex / GRID_SIZE);
  return {
    x: col * TILE_SIZE + TILE_SIZE / 2 + 16,
    y: row * TILE_SIZE + TILE_SIZE / 2 + 16
  };
};

export function GameplayScreen({ onNavigate, levelId }: GameplayScreenProps) {
  const [selectedTowerType, setSelectedTowerType] = useState<'laser' | 'fire' | 'ice' | 'cannon' | null>(null);
  const [placedTowers, setPlacedTowers] = useState<PlacedTower[]>([]);
  const [selectedPlacedTower, setSelectedPlacedTower] = useState<PlacedTower | null>(null);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  
  const [health, setHealth] = useState(20);
  const [coins, setCoins] = useState(400);
  const [wave, setWave] = useState(1);
  const [enemiesDefeated, setEnemiesDefeated] = useState(0);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [waveInProgress, setWaveInProgress] = useState(false);
  
  const totalWaves = 10;
  
  const availableTowers: TowerType[] = [
    { id: '1', name: 'Laser', type: 'laser', cost: 100, damage: 25, range: 3, speed: 1000, level: 1 },
    { id: '2', name: 'Flame', type: 'fire', cost: 150, damage: 40, range: 2, speed: 1500, level: 1 },
    { id: '3', name: 'Frost', type: 'ice', cost: 120, damage: 15, range: 4, speed: 800, level: 1 },
    { id: '4', name: 'Cannon', type: 'cannon', cost: 200, damage: 80, range: 5, speed: 2000, level: 1 },
  ];
  
  // Spawn wave of enemies
  const spawnWave = useCallback(() => {
    if (waveInProgress) return;
    
    setWaveInProgress(true);
    const enemyCount = 5 + wave * 2;
    const newEnemies: Enemy[] = [];
    
    for (let i = 0; i < enemyCount; i++) {
      const enemyTypes: Array<{ type: 'basic' | 'fast' | 'tank' | 'boss', health: number, speed: number, reward: number }> = [
        { type: 'basic', health: 50 + wave * 10, speed: 1, reward: 10 },
        { type: 'fast', health: 30 + wave * 5, speed: 1.5, reward: 15 },
        { type: 'tank', health: 100 + wave * 20, speed: 0.5, reward: 25 },
      ];
      
      // Add boss every 3 waves
      if (wave % 3 === 0 && i === enemyCount - 1) {
        enemyTypes.push({ type: 'boss', health: 300 + wave * 50, speed: 0.3, reward: 100 });
      }
      
      const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      const startPos = tileToPosition(PATH_TILES[0]);
      
      setTimeout(() => {
        setEnemies(prev => [...prev, {
          id: `enemy-${wave}-${i}-${Date.now()}`,
          type: enemyType.type,
          health: enemyType.health,
          maxHealth: enemyType.health,
          speed: enemyType.speed,
          pathIndex: 0,
          position: startPos,
          reward: enemyType.reward
        }]);
      }, i * 1000);
    }
  }, [wave, waveInProgress]);
  
  // Move enemies along path
  useEffect(() => {
    if (isPaused || !isPlaying) return;
    
    const interval = setInterval(() => {
      setEnemies(prev => {
        const updated = prev.map(enemy => {
          const nextIndex = enemy.pathIndex + 1;
          
          if (nextIndex >= PATH_TILES.length) {
            // Enemy reached the end
            setHealth(h => {
              const newHealth = h - 1;
              if (newHealth <= 0) {
                setGameOver(true);
                setIsPlaying(false);
              }
              return Math.max(0, newHealth);
            });
            return null;
          }
          
          const targetPos = tileToPosition(PATH_TILES[nextIndex]);
          
          return {
            ...enemy,
            pathIndex: nextIndex,
            position: targetPos
          };
        }).filter(Boolean) as Enemy[];
        
        return updated;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [isPaused, isPlaying]);
  
  // Tower shooting logic
  useEffect(() => {
    if (isPaused || !isPlaying) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      
      setPlacedTowers(prev => {
        return prev.map(tower => {
          // Check if tower can shoot
          if (now - tower.lastShot < tower.speed) return tower;
          
          // Find enemies in range
          const towerPos = tileToPosition(tower.position);
          const enemiesInRange = enemies.filter(enemy => {
            const dx = enemy.position.x - towerPos.x;
            const dy = enemy.position.y - towerPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= tower.range * TILE_SIZE;
          });
          
          if (enemiesInRange.length === 0) return { ...tower, target: null };
          
          // Target the enemy furthest along the path
          const target = enemiesInRange.reduce((furthest, current) => 
            current.pathIndex > furthest.pathIndex ? current : furthest
          );
          
          // Create projectile
          setProjectiles(prev => [...prev, {
            id: `proj-${now}-${Math.random()}`,
            from: towerPos,
            to: target.position,
            type: tower.type,
            enemyId: target.id,
            damage: tower.damage
          }]);
          
          return {
            ...tower,
            lastShot: now,
            target: target.id
          };
        });
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [enemies, isPaused, isPlaying]);
  
  // Handle projectile hits
  useEffect(() => {
    if (projectiles.length === 0) return;
    
    const timeout = setTimeout(() => {
      projectiles.forEach(proj => {
        setEnemies(prev => {
          return prev.map(enemy => {
            if (enemy.id === proj.enemyId) {
              const newHealth = enemy.health - proj.damage;
              
              if (newHealth <= 0) {
                // Enemy defeated
                setCoins(c => c + enemy.reward);
                setEnemiesDefeated(d => d + 1);
                return null;
              }
              
              return { ...enemy, health: newHealth };
            }
            return enemy;
          }).filter(Boolean) as Enemy[];
        });
      });
      
      setProjectiles([]);
    }, 200);
    
    return () => clearTimeout(timeout);
  }, [projectiles]);
  
  // Check for wave completion
  useEffect(() => {
    if (waveInProgress && enemies.length === 0 && isPlaying) {
      setWaveInProgress(false);
      
      if (wave >= totalWaves) {
        setVictory(true);
        setIsPlaying(false);
      }
    }
  }, [enemies.length, waveInProgress, wave, isPlaying]);
  
  const handlePlaceTower = (position: number) => {
    if (!selectedTowerType) return;
    
    const towerData = availableTowers.find(t => t.type === selectedTowerType);
    if (!towerData) return;
    
    if (coins < towerData.cost) return;
    
    setCoins(coins - towerData.cost);
    setPlacedTowers([...placedTowers, {
      id: `tower-${Date.now()}`,
      position,
      type: selectedTowerType,
      damage: towerData.damage,
      range: towerData.range,
      speed: towerData.speed,
      lastShot: 0,
      target: null,
      cost: towerData.cost
    }]);
    
    setSelectedTowerType(null);
  };
  
  const handleUpgradeTower = () => {
    if (!selectedPlacedTower) return;
    
    const upgradeCost = Math.floor(selectedPlacedTower.cost * 0.5);
    if (coins < upgradeCost) return;
    
    setCoins(coins - upgradeCost);
    setPlacedTowers(prev => prev.map(t => {
      if (t.id === selectedPlacedTower.id) {
        return {
          ...t,
          damage: Math.floor(t.damage * 1.5),
          range: t.range + 0.5,
          cost: t.cost + upgradeCost
        };
      }
      return t;
    }));
    
    setSelectedPlacedTower(null);
  };
  
  const handleSellTower = () => {
    if (!selectedPlacedTower) return;
    
    setCoins(coins + Math.floor(selectedPlacedTower.cost * 0.7));
    setPlacedTowers(prev => prev.filter(t => t.id !== selectedPlacedTower.id));
    setSelectedPlacedTower(null);
  };
  
  const handleStartWave = () => {
    if (!waveInProgress && enemies.length === 0) {
      setIsPlaying(true);
      spawnWave();
    }
  };
  
  const handleNextWave = () => {
    if (!waveInProgress && enemies.length === 0 && wave < totalWaves) {
      setWave(wave + 1);
      setCoins(coins + 50); // Bonus for completing wave
      handleStartWave();
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-900/90 backdrop-blur-sm border-b-2 border-slate-700 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            {/* Health */}
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-2">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              <span className="text-white font-bold text-lg">{health}/20</span>
            </div>
            
            {/* Coins */}
            <div className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg px-4 py-2">
              <span className="text-yellow-400 text-xl">💰</span>
              <span className="text-white font-bold text-lg">{coins}</span>
            </div>
            
            {/* Wave */}
            <div className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg px-4 py-2">
              <span className="text-cyan-400 text-xl">🌊</span>
              <span className="text-white font-bold text-lg">Wave {wave}/{totalWaves}</span>
            </div>
            
            {/* Enemies Defeated */}
            <div className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/50 rounded-lg px-4 py-2">
              <span className="text-purple-400 text-xl">💀</span>
              <span className="text-white font-bold text-lg">{enemiesDefeated}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-cyan-400 font-bold uppercase tracking-wider">Level {levelId}</div>
            
            {!waveInProgress && enemies.length === 0 && !gameOver && !victory && (
              <GameButton 
                variant="success" 
                size="small"
                onClick={wave === 1 && !isPlaying ? handleStartWave : handleNextWave}
              >
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  <span>{wave === 1 && !isPlaying ? 'Start' : 'Next Wave'}</span>
                </div>
              </GameButton>
            )}
            
            <GameButton 
              variant="secondary" 
              size="small"
              onClick={() => setIsPaused(true)}
              disabled={!isPlaying}
            >
              <div className="flex items-center gap-2">
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </div>
            </GameButton>
          </div>
        </div>
      </div>
      
      {/* Main Game Area */}
      <div className="flex-1 flex p-4 gap-4 max-w-7xl mx-auto w-full">
        {/* Game Board */}
        <div className="flex-1 flex items-center justify-center">
          <GameBoard 
            gridSize={GRID_SIZE}
            placedTowers={placedTowers}
            onTowerPlace={handlePlaceTower}
            selectedTowerType={selectedTowerType}
            enemies={enemies}
            projectiles={projectiles}
            tileSize={TILE_SIZE}
          />
        </div>
        
        {/* Right Sidebar - Tower Details */}
        <div className="w-72 bg-slate-800/70 backdrop-blur-sm border-2 border-slate-700 rounded-xl p-4">
          {selectedPlacedTower ? (
            <div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider text-center">Tower Info</h3>
              
              <TowerCard tower={{
                id: selectedPlacedTower.id,
                name: selectedPlacedTower.type.charAt(0).toUpperCase() + selectedPlacedTower.type.slice(1),
                type: selectedPlacedTower.type,
                cost: selectedPlacedTower.cost,
                damage: selectedPlacedTower.damage,
                range: selectedPlacedTower.range,
                speed: selectedPlacedTower.speed,
                level: 1
              }} />
              
              <div className="mt-4 space-y-3">
                <GameButton 
                  variant="success" 
                  size="medium"
                  onClick={handleUpgradeTower}
                  disabled={coins < Math.floor(selectedPlacedTower.cost * 0.5)}
                  className="w-full"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ChevronUp className="w-5 h-5" />
                    <span>Upgrade - 💰 {Math.floor(selectedPlacedTower.cost * 0.5)}</span>
                  </div>
                </GameButton>
                
                <GameButton 
                  variant="danger" 
                  size="medium"
                  onClick={handleSellTower}
                  className="w-full"
                >
                  <span>Sell - 💰 {Math.floor(selectedPlacedTower.cost * 0.7)}</span>
                </GameButton>
                
                <GameButton 
                  variant="secondary" 
                  size="small"
                  onClick={() => setSelectedPlacedTower(null)}
                  className="w-full"
                >
                  Close
                </GameButton>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 mt-20">
              <div className="text-4xl mb-4">🏰</div>
              <p className="text-sm mb-4">Select a tower type below to place on the grid</p>
              {selectedTowerType && (
                <div className="bg-cyan-500/20 border border-cyan-500 rounded-lg p-3 text-cyan-300 text-xs">
                  Click on an empty tile to place tower
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Tower Selection Panel */}
      <div className="bg-slate-900/90 backdrop-blur-sm border-t-2 border-slate-700 p-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-bold text-cyan-400 mb-3 uppercase tracking-wider">Available Towers</h3>
          <div className="grid grid-cols-4 gap-4">
            {availableTowers.map((tower) => (
              <TowerCard
                key={tower.id}
                tower={tower}
                onClick={() => {
                  setSelectedTowerType(tower.type);
                  setSelectedPlacedTower(null);
                }}
                selected={selectedTowerType === tower.type}
                compact
                disabled={coins < tower.cost}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Pause Modal */}
      <GameModal
        isOpen={isPaused}
        onClose={() => setIsPaused(false)}
        title="Game Paused"
        actions={
          <>
            <GameButton variant="success" size="large" onClick={() => setIsPaused(false)}>
              Resume Game
            </GameButton>
            <GameButton variant="secondary" size="medium" onClick={() => {
              setIsPaused(false);
              window.location.reload();
            }}>
              Restart Level
            </GameButton>
            <GameButton variant="danger" size="medium" onClick={() => onNavigate('menu')}>
              Main Menu
            </GameButton>
          </>
        }
      >
        <div className="text-center text-slate-300">
          <p className="mb-4">Level {levelId} - Wave {wave}/{totalWaves}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-800 rounded-lg p-3">
              <div className="text-cyan-400 font-bold mb-1">Health</div>
              <div className="text-white text-xl">{health}/20</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-3">
              <div className="text-yellow-400 font-bold mb-1">Coins</div>
              <div className="text-white text-xl">{coins}</div>
            </div>
          </div>
        </div>
      </GameModal>
      
      {/* Game Over Modal */}
      <GameModal
        isOpen={gameOver}
        onClose={() => {}}
        title="Game Over"
        closeButton={false}
        actions={
          <>
            <GameButton variant="secondary" size="large" onClick={() => window.location.reload()}>
              Try Again
            </GameButton>
            <GameButton variant="primary" size="medium" onClick={() => onNavigate('menu')}>
              Main Menu
            </GameButton>
          </>
        }
      >
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">💀</div>
          <p className="text-slate-300 text-lg">You survived {wave} waves!</p>
          <div className="bg-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Waves Survived:</span>
              <span className="text-white font-bold">{wave}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Enemies Defeated:</span>
              <span className="text-white font-bold">{enemiesDefeated}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Coins Earned:</span>
              <span className="text-yellow-400 font-bold">{coins}</span>
            </div>
          </div>
        </div>
      </GameModal>
      
      {/* Victory Modal */}
      <GameModal
        isOpen={victory}
        onClose={() => {}}
        title="Victory!"
        closeButton={false}
        actions={
          <>
            <GameButton variant="success" size="large" onClick={() => onNavigate('levels')}>
              Next Level
            </GameButton>
            <GameButton variant="primary" size="medium" onClick={() => onNavigate('menu')}>
              Main Menu
            </GameButton>
          </>
        }
      >
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-slate-300 text-lg">Level {levelId} Complete!</p>
          <div className="bg-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Waves Completed:</span>
              <span className="text-white font-bold">{totalWaves}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Enemies Defeated:</span>
              <span className="text-white font-bold">{enemiesDefeated}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Final Health:</span>
              <span className="text-green-400 font-bold">{health}/20</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Coins Remaining:</span>
              <span className="text-yellow-400 font-bold">{coins}</span>
            </div>
          </div>
        </div>
      </GameModal>
    </div>
  );
}
