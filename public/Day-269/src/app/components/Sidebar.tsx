import { LayoutDashboard, Users, BookOpen, ClipboardCheck, FileText, BarChart3, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  onMarkAttendance: () => void;
}

export function Sidebar({ onMarkAttendance }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Students", path: "/students" },
    { icon: BookOpen, label: "Classes", path: "/classes" },
    { icon: ClipboardCheck, label: "Attendance", path: "/attendance" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        <button
          onClick={onMarkAttendance}
          className="mb-6 w-full rounded-lg bg-gradient-to-r from-blue-500 to-green-500 py-3 font-medium text-white shadow-md transition hover:shadow-lg"
        >
          Mark Attendance
        </button>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
