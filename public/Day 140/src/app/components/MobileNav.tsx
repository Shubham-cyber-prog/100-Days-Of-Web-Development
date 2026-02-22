import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Sparkles, Mail, Users, BarChart3 } from "lucide-react";
import { cn } from "./ui/utils";

const mobileNavItems = [
  { name: "Home", href: "/", icon: LayoutDashboard },
  { name: "Generate", href: "/generate", icon: Sparkles },
  { name: "Campaigns", href: "/campaigns", icon: Mail },
  { name: "Audience", href: "/audience", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t">
      <div className="grid grid-cols-5 h-16">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.href)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", active && "fill-primary/20")} />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
