import { useState } from "react";
import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { SidebarMenu } from "./sidebar-menu";
import { PlayerControls } from "./player-controls";

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <SidebarMenu isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="md:ml-64 pb-24 pt-4 min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
      
      <PlayerControls currentSong={{ title: "Current Song", artist: "Artist Name" }} />
    </div>
  );
}
