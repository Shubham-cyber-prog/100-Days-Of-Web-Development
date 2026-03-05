import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  FileText,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/students', label: 'Students', icon: Users },
  { path: '/classes', label: 'Classes', icon: BookOpen },
  { path: '/attendance', label: 'Attendance', icon: ClipboardCheck },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Layout() {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-40 h-16">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">Smart Attendance Tracker</h1>
            </div>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search students, classes..."
                className="pl-10 pr-4 py-2 w-80 bg-slate-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    Settings
                  </a>
                  <hr className="my-2 border-slate-200" />
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-slate-100">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 z-30">
        <div className="flex flex-col h-full">
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4">
            <Link
              to="/mark-attendance"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all shadow-md"
            >
              <ClipboardCheck className="w-5 h-5" />
              <span className="font-medium">Mark Attendance</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 mt-16 p-6">
        <Outlet />
      </main>
    </div>
  );
}
