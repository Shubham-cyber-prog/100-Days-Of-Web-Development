import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  BarChart3,
  Settings,
  Plus,
  Search,
  Palette,
} from "lucide-react";

const commands = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/", keywords: "home overview" },
  { icon: FileText, label: "Content", path: "/content", keywords: "posts articles" },
  { icon: Image, label: "Media", path: "/media", keywords: "images files uploads" },
  { icon: Users, label: "Users", path: "/users", keywords: "members team" },
  { icon: BarChart3, label: "Analytics", path: "/analytics", keywords: "stats metrics" },
  { icon: Settings, label: "Settings", path: "/settings", keywords: "preferences config" },
  { icon: Palette, label: "Design System", path: "/design-system", keywords: "components ui" },
  { icon: Plus, label: "New Post", path: "/editor", keywords: "create write" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {commands.map((cmd) => {
            const Icon = cmd.icon;
            return (
              <CommandItem
                key={cmd.path}
                onSelect={() => handleSelect(cmd.path)}
                keywords={[cmd.keywords]}
              >
                <Icon className="mr-2 size-4" />
                <span>{cmd.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
