import { Outlet, Link, useLocation } from "react-router";
import {
  Code2,
  Save,
  Download,
  Settings as SettingsIcon,
  User,
  Plus,
  BookOpen,
  Library,
  FileText,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export function Layout() {
  const location = useLocation();
  const [regexFlavor, setRegexFlavor] = useState("javascript");

  useEffect(() => {
    // Ensure dark mode is active
    document.documentElement.classList.add('dark');
  }, []);

  const navItems = [
    { path: "/", label: "Builder", icon: Code2 },
    { path: "/saved", label: "Saved Patterns", icon: Save },
    { path: "/examples", label: "Examples Library", icon: Library },
    { path: "/cheatsheet", label: "Cheatsheet", icon: BookOpen },
    { path: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#252526] border-r border-[#3e3e42] flex flex-col">
        <div className="p-4 border-b border-[#3e3e42]">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="size-6 text-blue-400" />
            <h1 className="font-semibold text-lg">Online Regex Builder</h1>
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Plus className="size-4 mr-2" />
            Create New Regex
          </Button>
        </div>
        <nav className="flex-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md mb-1 transition-colors ${
                  isActive
                    ? "bg-[#37373d] text-white"
                    : "text-gray-300 hover:bg-[#2a2d2e]"
                }`}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-14 bg-[#252526] border-b border-[#3e3e42] flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-300">
              <FileText className="size-4 mr-2" />
              New Pattern
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300">
              <Save className="size-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300">
              <Download className="size-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Select value={regexFlavor} onValueChange={setRegexFlavor}>
              <SelectTrigger className="w-40 bg-[#3c3c3c] border-[#3e3e42]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="pcre">PCRE</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="text-gray-300">
              <SettingsIcon className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300">
              <User className="size-5" />
            </Button>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}