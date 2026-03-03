import { NavLink } from "react-router";
import { 
  LayoutDashboard, 
  Server, 
  Box, 
  Layers, 
  Network, 
  Route, 
  FolderTree, 
  FileText, 
  Settings,
  Plus
} from "lucide-react";

const navItems = [
  { path: "/", label: "Cluster Overview", icon: LayoutDashboard },
  { path: "/nodes", label: "Nodes", icon: Server },
  { path: "/pods", label: "Pods", icon: Box },
  { path: "/deployments", label: "Deployments", icon: Layers },
  { path: "/services", label: "Services", icon: Network },
  { path: "/ingress", label: "Ingress", icon: Route },
  { path: "/namespaces", label: "Namespaces", icon: FolderTree },
  { path: "/logs", label: "Logs", icon: FileText },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Connect Cluster
        </button>
      </div>

      <nav className="flex-1 px-2 py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-slate-800 text-blue-400"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
