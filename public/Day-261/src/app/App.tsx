import { useState } from 'react';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { EmulatorView } from './components/emulator-view';
import { TerminalPanel } from './components/terminal-panel';
import { CreateInstanceModal } from './components/create-instance-modal';

export type EmulatorStatus = 'stopped' | 'running' | 'paused';

export interface EmulatorInstance {
  name: string;
  os: string;
  cpu: string;
  memory: string;
  storage: string;
  uptime: number;
}

function App() {
  const [status, setStatus] = useState<EmulatorStatus>('stopped');
  const [currentView, setCurrentView] = useState<string>('emulator');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEmulator, setSelectedEmulator] = useState('Linux Ubuntu 22.04');
  const [instance, setInstance] = useState<EmulatorInstance>({
    name: 'ubuntu-instance-01',
    os: 'Linux Ubuntu 22.04',
    cpu: '4 cores',
    memory: '8 GB',
    storage: '50 GB',
    uptime: 0
  });

  const handleStart = () => {
    setStatus('running');
  };

  const handlePause = () => {
    setStatus('paused');
  };

  const handleRestart = () => {
    setStatus('stopped');
    setTimeout(() => setStatus('running'), 500);
  };

  const handleStop = () => {
    setStatus('stopped');
  };

  const handleCreateInstance = (newInstance: EmulatorInstance) => {
    setInstance(newInstance);
    setSelectedEmulator(newInstance.os);
    setShowCreateModal(false);
    setStatus('stopped');
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col">
      <Navbar 
        status={status}
        selectedEmulator={selectedEmulator}
        onSelectEmulator={setSelectedEmulator}
        onStart={handleStart}
        onPause={handlePause}
        onRestart={handleRestart}
        onStop={handleStop}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentView={currentView}
          onViewChange={setCurrentView}
          onCreateInstance={() => setShowCreateModal(true)}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <EmulatorView 
            status={status}
            instance={instance}
            currentView={currentView}
          />
          
          <TerminalPanel status={status} />
        </main>
      </div>

      <CreateInstanceModal 
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateInstance}
      />
    </div>
  );
}

export default App;
