import { useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { CommandPalette } from "../ui/CommandPalette";

export function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
      <Toaster position="top-right" richColors />
    </div>
  );
}