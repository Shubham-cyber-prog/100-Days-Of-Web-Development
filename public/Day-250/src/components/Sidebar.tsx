import { BarChart3, Building2, GraduationCap, BookOpen, Users, Calendar, Home } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'hospital-branches', label: 'Hospital Branches', icon: Building2 },
  { id: 'trainees', label: 'Trainees', icon: GraduationCap },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'trainers', label: 'Trainers', icon: Users },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
];

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-12 ${
                isActive 
                  ? 'bg-teal-600 text-white hover:bg-teal-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => onModuleChange(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 bg-teal-50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart3 className="h-5 w-5 text-teal-600" />
          <span className="text-sm text-teal-800">Training Network</span>
        </div>
        <p className="text-xs text-teal-600">15 active branches</p>
        <div className="mt-2 w-full bg-teal-200 rounded-full h-2">
          <div className="w-4/5 bg-teal-600 h-2 rounded-full"></div>
        </div>
      </div>
    </aside>
  );
}