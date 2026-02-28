import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  MessageSquare,
  FileText,
  Database,
  Settings,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const navItems = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/trends", label: "Market Trends", icon: TrendingUp },
  { path: "/app/competitors", label: "Competitors", icon: Users },
  { path: "/app/insights", label: "Customer Insights", icon: MessageSquare },
  { path: "/app/reports", label: "Report Generator", icon: FileText },
  { path: "/app/sources", label: "Data Sources", icon: Database },
];

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col hidden md:flex`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">MarketAI</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8 p-0"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <div
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-teal-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-gray-200">
          <Link to="/app/settings">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium">Settings</span>
              )}
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
          <div className="flex-1 max-w-xl mr-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search insights, reports, competitors..."
                className="pl-10 hidden sm:block"
              />
              <Button variant="ghost" size="sm" className="sm:hidden">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-blue-500 to-teal-500 border-2 border-white text-xs">
                3
              </Badge>
            </Button>

            {/* User Profile */}
            <div className="flex items-center gap-2 md:gap-3">
              <Avatar className="h-8 w-8 md:h-10 md:w-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">
                  John Doe
                </div>
                <div className="text-xs text-gray-500">Analyst</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 hover:scale-110 transition-transform duration-200"
            size="icon"
          >
            <Sparkles className="w-6 h-6" />
            <span className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Ask AI Analyst</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}