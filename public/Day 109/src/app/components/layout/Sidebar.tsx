import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Palette,
} from "lucide-react";
import { clsx } from "clsx";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Content", path: "/content" },
  { icon: Image, label: "Media", path: "/media" },
  { icon: Users, label: "Users", path: "/users" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: Palette, label: "Design System", path: "/design-system" },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={clsx(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="size-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <FileText className="size-4 text-sidebar-primary-foreground" />
            </div>
            <span className="text-sidebar-foreground">Custom CMS</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="size-8 flex items-center justify-center rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex items-center gap-3 px-3 h-10 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="size-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div
          className={clsx(
            "flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer",
            isCollapsed && "justify-center"
          )}
        >
          <div className="size-8 bg-sidebar-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sidebar-primary-foreground text-sm">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm text-sidebar-foreground truncate">John Doe</div>
              <div className="text-xs text-muted-foreground truncate">admin@cms.com</div>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button className="w-full mt-2 flex items-center gap-3 px-3 h-10 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
