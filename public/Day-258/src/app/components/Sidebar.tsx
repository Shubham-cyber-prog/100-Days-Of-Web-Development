import { NavLink } from 'react-router';
import { LayoutDashboard, Layers, Upload, Download, FileText, BarChart3, Settings, Plus } from 'lucide-react';
import { useState } from 'react';
import { AddResourceModal } from './AddResourceModal';

export function Sidebar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'queue' | 'producer' | 'consumer'>('queue');

  const openModal = (type: 'queue' | 'producer' | 'consumer') => {
    setModalType(type);
    setModalOpen(true);
  };

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Simulator Dashboard' },
    { to: '/queues', icon: Layers, label: 'Queues' },
    { to: '/producers', icon: Upload, label: 'Producers' },
    { to: '/consumers', icon: Download, label: 'Consumers' },
    { to: '/logs', icon: FileText, label: 'Message Logs' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      <aside className="w-64 bg-slate-900 border-r border-slate-800 fixed left-0 top-16 bottom-0 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 space-y-2 border-t border-slate-800 mt-4">
          <button
            onClick={() => openModal('queue')}
            className="w-full flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
          >
            <Plus size={16} />
            <span>Create Queue</span>
          </button>
          <button
            onClick={() => openModal('producer')}
            className="w-full flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm"
          >
            <Plus size={16} />
            <span>Add Producer</span>
          </button>
          <button
            onClick={() => openModal('consumer')}
            className="w-full flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm"
          >
            <Plus size={16} />
            <span>Add Consumer</span>
          </button>
        </div>
      </aside>

      <AddResourceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </>
  );
}
