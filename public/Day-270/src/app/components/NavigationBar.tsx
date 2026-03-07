import { Shield, History, Settings, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface NavigationBarProps {
  onHistoryClick: () => void;
}

export function NavigationBar({ onHistoryClick }: NavigationBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-red-100 dark:bg-red-900/20 p-2">
              <Shield className="size-6 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Phishing URL Detection Tool
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Analyze URLs for potential security threats
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onHistoryClick}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <History className="size-4" />
              History
            </button>

            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>

            <button
              className="rounded-lg p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Settings"
            >
              <Settings className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}