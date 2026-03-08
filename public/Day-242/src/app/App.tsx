import { useState } from 'react';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { TerminalDashboard } from './components/TerminalDashboard';
import { SettingsScreen } from './components/SettingsScreen';
import { SavedSessionsScreen } from './components/SavedSessionsScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { FilesScreen } from './components/FilesScreen';
import { NewSessionModal } from './components/NewSessionModal';

export default function App() {
  const [activeView, setActiveView] = useState('terminals');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewTerminal = () => {
    setIsModalOpen(true);
  };

  const handleCreateSession = (name: string, shell: string) => {
    console.log('Creating session:', name, shell);
    // In a real app, this would create a new terminal session
  };

  const handleSettingsClick = () => {
    setActiveView('settings');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'terminals':
        return <TerminalDashboard onNewTerminal={handleNewTerminal} />;
      case 'sessions':
        return <SavedSessionsScreen />;
      case 'files':
        return <FilesScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <TerminalDashboard onNewTerminal={handleNewTerminal} />;
    }
  };

  return (
    <div className="size-full flex flex-col bg-zinc-950">
      <TopNav 
        workspaceName="My Workspace" 
        onSettingsClick={handleSettingsClick}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          activeView={activeView}
          onViewChange={setActiveView}
          onNewTerminal={handleNewTerminal}
        />
        
        {renderContent()}
      </div>

      <NewSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateSession={handleCreateSession}
      />
    </div>
  );
}
