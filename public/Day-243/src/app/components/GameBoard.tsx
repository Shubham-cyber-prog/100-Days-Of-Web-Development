import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

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

interface PlacedTower {
  id: string;
  position: number;
  type: 'laser' | 'fire' | 'ice' | 'cannon';
  damage: number;
  range: number;
  speed: number;
  lastShot: number;
  target: string | null;
}

interface Projectile {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  type: 'laser' | 'fire' | 'ice' | 'cannon';
}

interface GameBoardProps {
  gridSize?: number;
  placedTowers: PlacedTower[];
  onTowerPlace?: (position: number) => void;
  selectedTowerType: 'laser' | 'fire' | 'ice' | 'cannon' | null;
  enemies: Enemy[];
  projectiles: Projectile[];
  tileSize: number;
}

export function GameBoard({ 
  gridSize = 10, 
  placedTowers, 
  onTowerPlace, 
  selectedTowerType,
  enemies,
  projectiles,
  tileSize
}: GameBoardProps) {
  const tiles = Array.from({ length: gridSize * gridSize }, (_, i) => i);
  
  // Define the path for enemies
  const pathTiles = [0, 1, 2, 3, 13, 23, 33, 43, 44, 45, 46, 56, 66, 76, 86, 87, 88, 89, 99];
  
  const getTileColor = (index: number) => {
    if (placedTowers.some(t => t.position === index)) return 'bg-slate-700/80';
    if (pathTiles.includes(index)) return 'bg-cyan-900/30 border-cyan-500/30';
    return 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/70';
  };
  
  const getTowerIcon = (index: number) => {
    const tower = placedTowers.find(t => t.position === index);
    if (!tower) return null;
    
    const icons = {
      laser: '⚡',
      fire: '🔥',
      ice: '❄️',
      cannon: '🛡️'
    };
    
    return (
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        className="absolute inset-0 flex items-center justify-center text-2xl z-10"
      >
        {icons[tower.type]}
      </motion.div>
    );
  };
  
  const handleTileClick = (index: number) => {
    if (!onTowerPlace || !selectedTowerType) return;
    if (pathTiles.includes(index)) return; // Can't place on path
    if (placedTowers.some(t => t.position === index)) return; // Can't place on existing tower
    
    onTowerPlace(index);
  };
  
  const getEnemyIcon = (type: string) => {
    const icons = {
      basic: '👾',
      fast: '🚀',
      tank: '🛸',
      boss: '👹'
    };
    return icons[type as keyof typeof icons] || '👾';
  };
  
  const getEnemyColor = (type: string) => {
    const colors = {
      basic: 'text-red-400',
      fast: 'text-yellow-400',
      tank: 'text-purple-400',
      boss: 'text-orange-500'
    };
    return colors[type as keyof typeof colors] || 'text-red-400';
  };
  
  return (
    <div className="relative">
      <div 
        className="grid gap-1 bg-slate-900/50 p-4 rounded-xl border-2 border-slate-700 relative"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `${tileSize * gridSize + 32}px`,
          height: `${tileSize * gridSize + 32}px`
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile}
            onClick={() => handleTileClick(tile)}
            className={`relative border transition-all ${getTileColor(tile)} ${
              selectedTowerType && !pathTiles.includes(tile) && !placedTowers.some(t => t.position === tile)
                ? 'cursor-pointer'
                : ''
            }`}
            style={{ width: `${tileSize}px`, height: `${tileSize}px` }}
          >
            {getTowerIcon(tile)}
          </div>
        ))}
        
        {/* Render Enemies */}
        {enemies.map((enemy) => (
          <motion.div
            key={enemy.id}
            className={`absolute text-3xl z-20 ${getEnemyColor(enemy.type)}`}
            style={{
              left: `${enemy.position.x}px`,
              top: `${enemy.position.y}px`,
              width: `${tileSize}px`,
              height: `${tileSize}px`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {getEnemyIcon(enemy.type)}
              {/* Health Bar */}
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all duration-200"
                  style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Render Projectiles */}
        {projectiles.map((projectile) => {
          const colors = {
            laser: 'bg-cyan-400',
            fire: 'bg-orange-500',
            ice: 'bg-blue-400',
            cannon: 'bg-purple-500'
          };
          
          return (
            <motion.div
              key={projectile.id}
              className={`absolute w-2 h-2 rounded-full ${colors[projectile.type]} shadow-lg z-30`}
              initial={{ 
                left: `${projectile.from.x}px`, 
                top: `${projectile.from.y}px`,
                scale: 1
              }}
              animate={{ 
                left: `${projectile.to.x}px`, 
                top: `${projectile.to.y}px`,
                scale: 0.5
              }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          );
        })}
      </div>
    </div>
  );
}
