import React from 'react';
import { Outlet } from 'react-router';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { ObjectDetailsPanel } from './ObjectDetailsPanel';
import { SimulationProvider } from '../store/SimulationContext';

export const DashboardLayout: React.FC = () => {
  return (
    <SimulationProvider>
      <div className="h-screen flex flex-col bg-zinc-950">
        <TopNav />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <ObjectDetailsPanel />
        </div>
      </div>
    </SimulationProvider>
  );
};
