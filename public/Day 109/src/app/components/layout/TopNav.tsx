import { useState } from "react";
import { Search, Bell, Moon, Sun, ChevronDown } from "lucide-react";
import { Input } from "../ui/Input";
import { clsx } from "clsx";

export function TopNav() {
  const [isDark, setIsDark] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="size-10 flex items-center justify-center rounded-lg hover:bg-accent text-foreground transition-colors relative">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="size-10 flex items-center justify-center rounded-lg hover:bg-accent text-foreground transition-colors"
        >
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-3 h-10 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="size-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm">JD</span>
            </div>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-1 z-50">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors">
                Profile
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors">
                Settings
              </button>
              <div className="border-t border-border my-1" />
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-accent text-destructive transition-colors">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
