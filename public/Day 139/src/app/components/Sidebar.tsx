import React, { useState } from 'react';
import { Home, BookOpen, Video, Calendar, MessageSquare, Settings, ChevronLeft, ChevronRight, Users, BarChart } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface SidebarProps {
  role: 'student' | 'instructor' | 'admin';
}

export function Sidebar({ role }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const studentLinks = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'My Courses', path: '/courses' },
    { icon: Video, label: 'Lessons', path: '/lessons' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: MessageSquare, label: 'Discussions', path: '/discussions' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  const instructorLinks = [
    { icon: Home, label: 'Dashboard', path: '/instructor' },
    { icon: BookOpen, label: 'Courses', path: '/instructor/courses' },
    { icon: Users, label: 'Students', path: '/instructor/students' },
    { icon: BarChart, label: 'Analytics', path: '/instructor/analytics' },
    { icon: MessageSquare, label: 'Discussions', path: '/discussions' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  const adminLinks = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
    { icon: BarChart, label: 'Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  const links = role === 'student' ? studentLinks : role === 'instructor' ? instructorLinks : adminLinks;
  
  return (
    <div className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl text-indigo-600">LearnHub</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
      
      <nav className="flex-1 px-3">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-colors ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
