import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { TopNavigation } from "./TopNavigation";
import { useState } from "react";

export function RootLayout() {
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onMarkAttendance={() => setShowMarkAttendance(true)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavigation />
        <main className="flex-1 overflow-auto">
          <Outlet context={{ showMarkAttendance, setShowMarkAttendance }} />
        </main>
      </div>
    </div>
  );
}
