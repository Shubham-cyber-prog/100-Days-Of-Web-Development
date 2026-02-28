import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Server,
  Gauge,
  HardDrive,
  Network,
  ScrollText,
  Settings,
  Plus,
} from "lucide-react";
import { useState } from "react";
import CreateVMModal from "./CreateVMModal";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/virtual-machines", label: "Virtual Machines", icon: Server },
  { path: "/resource-allocation", label: "Resource Allocation", icon: Gauge },
  { path: "/storage", label: "Storage", icon: HardDrive },
  { path: "/network", label: "Network", icon: Network },
  { path: "/logs", label: "Logs", icon: ScrollText },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function LeftSidebar() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Virtual Machine
          </button>
        </div>
      </aside>

      <CreateVMModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </>
  );
}
