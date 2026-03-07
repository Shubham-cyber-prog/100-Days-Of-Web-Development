import { useState, useEffect } from "react";
import { Search, FileText, Users, Calendar, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

interface SearchItem {
  id: string;
  title: string;
  type: "issue" | "post" | "event" | "poll";
  description?: string;
  url: string;
}

const mockSearchData: SearchItem[] = [
  {
    id: "1",
    title: "Broken streetlight on Oak Avenue",
    type: "issue",
    description: "Infrastructure issue reported 2 hours ago",
    url: "/app/issues",
  },
  {
    id: "2",
    title: "Pothole near community center",
    type: "issue",
    description: "Infrastructure issue reported 5 hours ago",
    url: "/app/issues",
  },
  {
    id: "3",
    title: "Community Cleanup Drive",
    type: "post",
    description: "Join us for the quarterly cleanup",
    url: "/app/feed",
  },
  {
    id: "4",
    title: "Town Hall Meeting",
    type: "event",
    description: "March 15, 2026 at 6:00 PM",
    url: "/app/events",
  },
  {
    id: "5",
    title: "New Park Equipment",
    type: "poll",
    description: "Vote on playground equipment",
    url: "/app/polls",
  },
  {
    id: "6",
    title: "Summer Festival Planning",
    type: "event",
    description: "March 22, 2026 at 3:00 PM",
    url: "/app/events",
  },
  {
    id: "7",
    title: "Speed Limit Discussion",
    type: "poll",
    description: "Should we reduce speed limits?",
    url: "/app/polls",
  },
  {
    id: "8",
    title: "Excessive noise from construction site",
    type: "issue",
    description: "Safety issue reported 2 days ago",
    url: "/app/issues",
  },
];

const typeIcons = {
  issue: FileText,
  post: Users,
  event: Calendar,
  poll: TrendingUp,
};

interface GlobalSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function GlobalSearch({ open, setOpen }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const filteredData = query
    ? mockSearchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : mockSearchData;

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  const handleSelect = (url: string) => {
    setOpen(false);
    navigate(url);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search issues, posts, events, polls..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedData).map(([type, items]) => (
          <CommandGroup key={type} heading={type.charAt(0).toUpperCase() + type.slice(1) + "s"}>
            {items.map((item) => {
              const Icon = typeIcons[item.type as keyof typeof typeIcons];
              return (
                <CommandItem
                  key={item.id}
                  value={item.title}
                  onSelect={() => handleSelect(item.url)}
                >
                  <Icon className="mr-2 size-4" />
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    )}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
