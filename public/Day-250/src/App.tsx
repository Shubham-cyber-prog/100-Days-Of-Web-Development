import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardModule } from './components/modules/DashboardModule';
import { HospitalBranchesModule } from './components/modules/HospitalBranchesModule';
import { TraineesModule } from './components/modules/TraineesModule';
import { CoursesModule } from './components/modules/CoursesModule';
import { TrainersModule } from './components/modules/TrainersModule';
import { ScheduleModule } from './components/modules/ScheduleModule';
import { ReportsAnalyticsModule } from './components/modules/ReportsAnalyticsModule';
import { CertificateGeneratorModule } from './components/modules/CertificateGeneratorModule';
import { AttendanceTrackingModule } from './components/modules/AttendanceTrackingModule';
import { ResourceLibraryModule } from './components/modules/ResourceLibraryModule';
import { UserPermissionsModule } from './components/modules/UserPermissionsModule';

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
      case 'reports-analytics':
        return <ReportsAnalyticsModule />;
      case 'certificates':
        return <CertificateGeneratorModule />;
      case 'attendance':
        return <AttendanceTrackingModule />;
      case 'resources':
        return <ResourceLibraryModule />;
      case 'permissions':
        return <UserPermissionsModule />;
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