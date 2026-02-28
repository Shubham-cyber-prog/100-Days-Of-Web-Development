import { Link, useLocation } from 'react-router';
import { LayoutDashboard, ClipboardCheck, FileText, Calendar, User } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { path: '/assignments', icon: FileText, label: 'Assignments' },
  { path: '/events', icon: Calendar, label: 'Events' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-border h-screen sticky top-0">
      <div className="p-6">
        <h1 className="font-semibold text-secondary">Smart Campus</h1>
      </div>
      
      <nav className="px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 mb-1 rounded-xl transition-colors
                ${isActive 
                  ? 'bg-primary text-white' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
