import { useState } from "react";
import { Search, Trash2, Copy, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface SavedPattern {
  id: string;
  name: string;
  pattern: string;
  description: string;
  dateCreated: string;
  tags: string[];
}

export function SavedPatterns() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for saved patterns
  const savedPatterns: SavedPattern[] = [
    {
      id: "1",
      name: "Email Validation",
      pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      description: "Validates standard email addresses",
      dateCreated: "2026-02-20",
      tags: ["email", "validation"],
    },
    {
      id: "2",
      name: "Phone Number (US)",
      pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}",
      description: "Matches US phone numbers in various formats",
      dateCreated: "2026-02-18",
      tags: ["phone", "us"],
    },
    {
      id: "3",
      name: "URL Matcher",
      pattern: "https?://[^\\s]+",
      description: "Matches HTTP and HTTPS URLs",
      dateCreated: "2026-02-15",
      tags: ["url", "web"],
    },
    {
      id: "4",
      name: "Hex Color Code",
      pattern: "#[0-9A-Fa-f]{6}",
      description: "Matches 6-digit hex color codes",
      dateCreated: "2026-02-10",
      tags: ["color", "css"],
    },
  ];

  const filteredPatterns = savedPatterns.filter(
    (pattern) =>
      pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      <div className="p-6 border-b border-[#3e3e42]">
        <h2 className="text-2xl font-semibold mb-4">Saved Patterns</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2d2d30] border border-[#3e3e42] rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-4">
          {filteredPatterns.length > 0 ? (
            filteredPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{pattern.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {pattern.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-[#1e1e1e] rounded-md p-3 mb-3">
                  <code className="text-yellow-400 font-mono text-sm break-all">
                    /{pattern.pattern}/
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {pattern.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="size-3" />
                    <span>{pattern.dateCreated}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No saved patterns found.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
