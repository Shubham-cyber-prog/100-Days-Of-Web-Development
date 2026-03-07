import React, { useState } from 'react';
import { MainMenuScreen } from './screens/MainMenuScreen';
import { LevelSelectionScreen } from './screens/LevelSelectionScreen';
import { GameplayScreen } from './screens/GameplayScreen';
import { ShopScreen } from './screens/ShopScreen';

type Screen = 'menu' | 'levels' | 'gameplay' | 'shop';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  
  const playerData = {
    username: 'Commander_X',
    coins: 2450,
    gems: 150,
  };
  
  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };
  
  const handleSelectLevel = (levelId: number) => {
    setSelectedLevel(levelId);
    setCurrentScreen('gameplay');
  };
  
  return (
    <div className="min-h-screen">
      {currentScreen === 'menu' && (
        <MainMenuScreen 
          onNavigate={handleNavigate}
          playerData={playerData}
        />
      )}
      
      {currentScreen === 'levels' && (
        <LevelSelectionScreen 
          onNavigate={handleNavigate}
          onSelectLevel={handleSelectLevel}
          playerData={playerData}
        />
      )}
      
      {currentScreen === 'gameplay' && (
        <GameplayScreen 
          onNavigate={handleNavigate}
          levelId={selectedLevel}
        />
      )}
      
      {currentScreen === 'shop' && (
        <ShopScreen 
          onNavigate={handleNavigate}
          playerData={playerData}
        />
      )}
    </div>
  );
}
