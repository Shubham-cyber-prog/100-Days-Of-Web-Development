import { Link, useLocation } from "react-router";
import { LayoutDashboard, Smartphone, FileText, History, AlertCircle, ScrollText, Settings, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

interface LeftSidebarProps {
  isOpen: boolean;
}

const navItems = [
  { path: "/", label: "Sync Overview", icon: LayoutDashboard },
  { path: "/devices", label: "Devices", icon: Smartphone },
  { path: "/files", label: "Files", icon: FileText },
  { path: "/version-history", label: "Version History", icon: History },
  { path: "/conflicts", label: "Conflicts", icon: AlertCircle },
  { path: "/logs", label: "Logs", icon: ScrollText },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function LeftSidebar({ isOpen }: LeftSidebarProps) {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6">
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </div>
    </aside>
  );
}
