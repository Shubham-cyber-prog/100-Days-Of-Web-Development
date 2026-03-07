import { Home, Library, Music, X } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface SidebarMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/library", icon: Library, label: "Library" },
    { to: "/player", icon: Music, label: "Player" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 bottom-20 w-64 bg-card border-r border-border z-40 transition-transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <span className="font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex flex-col gap-2 p-4">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
