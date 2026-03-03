import { Outlet } from "react-router";
import TopNav from "./TopNav";
import LeftSidebar from "./LeftSidebar";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
