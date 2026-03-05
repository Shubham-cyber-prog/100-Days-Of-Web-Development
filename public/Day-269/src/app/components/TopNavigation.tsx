import { Search, Bell, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

export function TopNavigation() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-green-500">
            <span className="font-bold text-white">SA</span>
          </div>
          <span className="font-bold text-gray-900">Smart Attendance Tracker</span>
        </div>
      </div>
      
      <div className="flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search students, classes..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 transition hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-100"
          >
            <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
              <div className="flex h-full w-full items-center justify-center text-sm font-medium text-white">
                JD
              </div>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
              <div className="p-3 border-b border-gray-100">
                <div className="font-medium text-sm text-gray-900">John Doe</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
              <div className="p-1">
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <div className="my-1 h-px bg-gray-100"></div>
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition hover:bg-red-50">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
