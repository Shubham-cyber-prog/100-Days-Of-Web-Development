import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tag,
  BarChart3,
  Users,
  Settings,
  Search,
  Plus,
  Bell,
  Menu,
  X,
  ChevronLeft,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Articles", href: "/articles", icon: FileText },
  { name: "Categories", href: "/categories", icon: FolderOpen },
  { name: "Tags", href: "/tags", icon: Tag },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Team", href: "/team", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen bg-card border-r border-border transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-64"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-[15px] font-semibold">Knowledge Base</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronLeft
                className={`w-5 h-5 transition-transform ${
                  sidebarCollapsed ? "rotate-180" : ""
                }`}
              />
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      } ${sidebarCollapsed ? "justify-center" : ""}`}
                      title={sidebarCollapsed ? item.name : undefined}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {!sidebarCollapsed && (
                        <span className="text-[14px]">{item.name}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="bg-muted rounded-xl p-4">
                <h4 className="text-[13px] font-semibold mb-1">Need Help?</h4>
                <p className="text-[12px] text-muted-foreground mb-3">
                  Check our documentation
                </p>
                <Link to="/docs">
                  <Button size="sm" variant="outline" className="w-full text-[12px] h-8 mb-2">
                    View Docs
                  </Button>
                </Link>
                <Link to="/style-guide">
                  <Button size="sm" variant="ghost" className="w-full text-[12px] h-8">
                    Style Guide
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 h-16 bg-card border-b border-border backdrop-blur-sm bg-card/95">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles, categories, tags..."
                  className="pl-10 bg-muted border-0 h-10 rounded-xl"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="gap-2 rounded-xl h-10"
                onClick={() => navigate("/editor")}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Article</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl"
              >
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px]">
                  3
                </Badge>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:bg-muted rounded-xl px-2 py-1.5 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-[14px]">John Doe</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <span>John Doe</span>
                      <span className="text-[12px] font-normal text-muted-foreground">
                        john@example.com
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}