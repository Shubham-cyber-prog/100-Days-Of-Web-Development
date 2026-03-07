import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  MessageSquare,
  CheckSquare,
  Puzzle,
  TrendingUp,
  Settings,
  Search,
  Bell,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Bot },
    { path: "/dashboard/chat", label: "Chat", icon: MessageSquare, badge: "3" },
    { path: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/dashboard/integrations", label: "Integrations", icon: Puzzle },
    { path: "/dashboard/analytics", label: "Analytics", icon: TrendingUp },
    { path: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fb] via-[#f0f1f9] to-[#e8eaf6]">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-screen w-70 backdrop-blur-xl bg-white/80 border-r border-white/40 shadow-xl z-40"
          >
            <div className="flex flex-col h-full p-6">
              {/* Logo */}
              <div className="flex items-center justify-between mb-8">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-semibold bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
                    AI Assistant
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link key={item.path} to={item.path}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl transition-all ${
                          active
                            ? "bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white shadow-lg shadow-indigo-500/30"
                            : "hover:bg-white/60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.badge && !active && (
                          <Badge className="bg-[#06b6d4] text-white rounded-full px-2 py-0.5">
                            {item.badge}
                          </Badge>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              {/* User Profile */}
              <div className="pt-6 border-t border-white/40">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-2xl" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-xl">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-xl text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-70" : "ml-0"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 flex-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-xl"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search anything..."
                  className="pl-10 rounded-2xl bg-white/50 border-2 focus:border-[#4f46e5] transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-xl relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#06b6d4] rounded-full" />
              </Button>
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
