import { Outlet } from "react-router";
import { Toaster } from "./ui/sonner";
import { TopNav } from "./navigation/TopNav";
import { LeftSidebar } from "./navigation/LeftSidebar";
import { useState } from "react";

export function Root() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen flex-col bg-slate-50">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
