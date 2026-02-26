import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardModule } from './components/modules/DashboardModule';
import { HospitalBranchesModule } from './components/modules/HospitalBranchesModule';
import { TraineesModule } from './components/modules/TraineesModule';
import { CoursesModule } from './components/modules/CoursesModule';
import { TrainersModule } from './components/modules/TrainersModule';
import { ScheduleModule } from './components/modules/ScheduleModule';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule />;
      case 'hospital-branches':
        return <HospitalBranchesModule />;
      case 'trainees':
        return <TraineesModule />;
      case 'courses':
        return <CoursesModule />;
      case 'trainers':
        return <TrainersModule />;
      case 'schedule':
        return <ScheduleModule />;
      default:
        return <DashboardModule />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <main className="flex-1 p-6 ml-64">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
}