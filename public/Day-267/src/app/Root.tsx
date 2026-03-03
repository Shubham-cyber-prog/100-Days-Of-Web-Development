import { Outlet } from 'react-router';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

export default function Root() {
  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}
