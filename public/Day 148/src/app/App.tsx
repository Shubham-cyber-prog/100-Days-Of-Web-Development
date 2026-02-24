import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { UploadDocument } from './components/UploadDocument';
import { SummarizationWorkspace } from './components/SummarizationWorkspace';
import { SummaryResult } from './components/SummaryResult';
import { History } from './components/History';
import { Settings } from './components/Settings';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Page titles for the top bar
  const pageTitles: { [key: string]: string } = {
    dashboard: 'Dashboard',
    upload: 'Upload Document',
    workspace: 'Summarization Workspace',
    result: 'Summary Result',
    history: 'Document History',
    settings: 'Settings',
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <div className="flex-1 flex flex-col">
        <TopBar title={pageTitles[currentPage]} />
        
        <main className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
          {currentPage === 'upload' && <UploadDocument onNavigate={handleNavigate} />}
          {currentPage === 'workspace' && <SummarizationWorkspace onNavigate={handleNavigate} />}
          {currentPage === 'result' && <SummaryResult />}
          {currentPage === 'history' && <History />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
