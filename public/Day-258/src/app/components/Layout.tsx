import { Outlet } from 'react-router';
import { TopNavigation } from './TopNavigation';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopNavigation />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 ml-64 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}