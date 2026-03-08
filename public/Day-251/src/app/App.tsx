import { useState } from 'react';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { EmptyState } from './components/EmptyState';
import { CreateVMModal } from './components/CreateVMModal';
import { VMRunningView } from './components/VMRunningView';
import { SettingsScreen } from './components/SettingsScreen';

interface VM {
  id: string;
  name: string;
  os: string;
  status: 'Running' | 'Stopped';
  lastUsed: string;
  ram: string;
  cpu: string;
  disk: string;
  cpuUsage?: number;
  ramUsage?: number;
}

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedVM, setSelectedVM] = useState<VM | null>(null);
  const [vmStatus, setVmStatus] = useState<'Running' | 'Stopped' | 'Loading'>('Stopped');
  
  const [vms, setVms] = useState<VM[]>([
    {
      id: '1',
      name: 'dev-ubuntu-server',
      os: 'Ubuntu 22.04 LTS',
      status: 'Running',
      lastUsed: '2 hours ago',
      ram: '4 GB',
      cpu: '2 Cores',
      disk: '50 GB',
      cpuUsage: 45,
      ramUsage: 62,
    },
    {
      id: '2',
      name: 'windows-test-env',
      os: 'Windows 11 Pro',
      status: 'Stopped',
      lastUsed: '1 day ago',
      ram: '8 GB',
      cpu: '4 Cores',
      disk: '100 GB',
      cpuUsage: 0,
      ramUsage: 0,
    },
    {
      id: '3',
      name: 'debian-web-server',
      os: 'Debian 11',
      status: 'Stopped',
      lastUsed: '3 days ago',
      ram: '2 GB',
      cpu: '1 Core',
      disk: '30 GB',
      cpuUsage: 0,
      ramUsage: 0,
    },
  ]);

  const handleCreateVM = (config: any) => {
    const osNames: { [key: string]: string } = {
      'ubuntu-22': 'Ubuntu 22.04 LTS',
      'ubuntu-20': 'Ubuntu 20.04 LTS',
      'debian': 'Debian 11',
      'windows-11': 'Windows 11',
      'windows-10': 'Windows 10',
      'custom': 'Custom ISO',
    };

    const newVM: VM = {
      id: Date.now().toString(),
      name: config.name,
      os: osNames[config.os] || config.os,
      status: 'Stopped',
      lastUsed: 'Just now',
      ram: `${config.ram} GB`,
      cpu: `${config.cpu} Core${config.cpu > 1 ? 's' : ''}`,
      disk: `${config.disk} GB`,
      cpuUsage: 0,
      ramUsage: 0,
    };

    setVms([...vms, newVM]);
  };

  const handleStartVM = (id: string) => {
    const vm = vms.find((v) => v.id === id);
    if (vm) {
      setSelectedVM(vm);
      setVmStatus('Loading');
      setActiveView('vm-running');
      
      setTimeout(() => {
        setVmStatus('Running');
        setVms(vms.map((v) => (v.id === id ? { ...v, status: 'Running' as const } : v)));
      }, 2000);
    }
  };

  const handleStopVM = () => {
    if (selectedVM) {
      setVmStatus('Stopped');
      setVms(vms.map((v) => (v.id === selectedVM.id ? { ...v, status: 'Stopped' as const } : v)));
    }
  };

  const handleRestartVM = () => {
    if (selectedVM) {
      setVmStatus('Loading');
      setTimeout(() => {
        setVmStatus('Running');
      }, 2000);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
      case 'machines':
        if (vms.length === 0) {
          return <EmptyState onCreateVM={() => setShowCreateModal(true)} />;
        }
        return (
          <Dashboard
            onCreateVM={() => setShowCreateModal(true)}
            onStartVM={handleStartVM}
            vms={vms}
          />
        );
      case 'vm-running':
        return selectedVM ? (
          <VMRunningView vm={selectedVM} vmStatus={vmStatus} />
        ) : (
          <Dashboard
            onCreateVM={() => setShowCreateModal(true)}
            onStartVM={handleStartVM}
            vms={vms}
          />
        );
      case 'settings':
        return <SettingsScreen />;
      case 'templates':
        return (
          <div className="h-full flex items-center justify-center bg-[#1a1a1a]">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Templates</h2>
              <p className="text-gray-400">Pre-configured VM templates coming soon</p>
            </div>
          </div>
        );
      case 'storage':
        return (
          <div className="h-full flex items-center justify-center bg-[#1a1a1a]">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Storage Management</h2>
              <p className="text-gray-400">Manage your storage and ISO files</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onCreateVM={() => setShowCreateModal(true)} onStartVM={handleStartVM} vms={vms} />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#1a1a1a]">
      <TopNav
        vmStatus={vmStatus}
        onStart={handleStartVM}
        onStop={handleStopVM}
        onRestart={handleRestartVM}
        onSettings={() => setActiveView('settings')}
        showVMControls={activeView === 'vm-running'}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 overflow-hidden">{renderContent()}</div>
      </div>

      {showCreateModal && (
        <CreateVMModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateVM}
        />
      )}
    </div>
  );
}

export default App;
