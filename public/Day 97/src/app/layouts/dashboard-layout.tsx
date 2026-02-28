import { Outlet, Link, useLocation } from "react-router";
import { useState } from "react";
import { Bell, Users, FileText, Calendar, BarChart3, Settings, Menu, X, Moon, Sun, LogOut, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const navigation = [
  { name: "Dashboard", href: "/app", icon: BarChart3 },
  { name: "Issues", href: "/app/issues", icon: FileText },
  { name: "Community Feed", href: "/app/feed", icon: Users },
  { name: "Events", href: "/app/events", icon: Calendar },
  { name: "Polls", href: "/app/polls", icon: BarChart3 },
  { name: "Admin", href: "/app/admin", icon: Shield },
];

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border">
            <div className="flex h-16 items-center justify-between px-6 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <Users className="size-5 text-white" />
                </div>
                <span className="font-semibold">Community Hub</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="size-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col border-r border-border bg-card">
        <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
          <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
            <Users className="size-5 text-white" />
          </div>
          <span className="font-semibold">Community Hub</span>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <header className="sticky top-0 z-40 h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="size-5" />
              </Button>
              <h1 className="text-lg font-semibold hidden sm:block">
                {navigation.find((item) => isActive(item.href))?.name || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 bg-accent">
                  3
                </Badge>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative size-9 rounded-full">
                    <Avatar className="size-9">
                      <AvatarImage src="" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>John Doe</span>
                      <span className="text-xs text-muted-foreground font-normal">john@community.hub</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="size-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="size-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
