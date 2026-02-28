import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FolderOpen, PlusCircle, LogOut, DollarSign, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLink {
  label: string;
  to: string;
  icon: React.ElementType;
}

const clientLinks: SidebarLink[] = [
  { label: "Dashboard", to: "/client/dashboard", icon: LayoutDashboard },
  { label: "My Projects", to: "/client/dashboard", icon: FolderOpen },
  { label: "Post Project", to: "/client/dashboard", icon: PlusCircle },
];

const freelancerLinks: SidebarLink[] = [
  { label: "Dashboard", to: "/freelancer/dashboard", icon: LayoutDashboard },
  { label: "Browse Projects", to: "/freelancer/dashboard", icon: Search },
  { label: "Earnings", to: "/freelancer/dashboard", icon: DollarSign },
];

const DashboardSidebar = ({ role }: { role: "client" | "freelancer" }) => {
  const location = useLocation();
  const links = role === "client" ? clientLinks : freelancerLinks;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/" className="font-display text-lg font-bold text-gradient">FreelanceHub</Link>
      </div>
      <nav className="p-4 space-y-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.label}
              to={link.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 left-0 w-64 px-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut size={18} />
          Log Out
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
