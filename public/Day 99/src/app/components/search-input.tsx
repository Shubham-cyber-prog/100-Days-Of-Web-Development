import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SearchInput() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search for songs, artists, albums..."
        className="pl-10 bg-accent/50 border-0 rounded-full"
      />
    </div>
  );
}
