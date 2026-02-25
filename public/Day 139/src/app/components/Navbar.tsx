import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Badge } from './ui/Badge';

interface NavbarProps {
  userName: string;
  userRole: 'Student' | 'Instructor' | 'Admin';
}

export function Navbar({ userName, userRole }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses, lessons, discussions..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 ml-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
              <h3 className="mb-3">Notifications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <p className="text-sm">New assignment posted in Web Development</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-xl">
                  <p className="text-sm">Quiz deadline approaching</p>
                  <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm">{userName}</p>
            <Badge variant="info" className="text-xs">{userRole}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
