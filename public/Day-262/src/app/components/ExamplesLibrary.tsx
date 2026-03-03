import { useState } from "react";
import { Search, Copy, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Example {
  id: string;
  category: string;
  name: string;
  pattern: string;
  description: string;
  examples: string[];
}

export function ExamplesLibrary() {
  const [searchQuery, setSearchQuery] = useState("");

  const examples: Example[] = [
    {
      id: "1",
      category: "Validation",
      name: "Email Address",
      pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      description: "Validates standard email addresses",
      examples: ["user@example.com", "john.doe@company.co.uk"],
    },
    {
      id: "2",
      category: "Validation",
      name: "Strong Password",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      description:
        "Requires at least 8 characters, uppercase, lowercase, digit, and special character",
      examples: ["Password123!", "SecureP@ssw0rd"],
    },
    {
      id: "3",
      category: "Web",
      name: "URL",
      pattern: "https?://[^\\s]+",
      description: "Matches HTTP and HTTPS URLs",
      examples: ["https://example.com", "http://github.com/user/repo"],
    },
    {
      id: "4",
      category: "Web",
      name: "IPv4 Address",
      pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
      description: "Matches IPv4 addresses",
      examples: ["192.168.1.1", "10.0.0.255"],
    },
    {
      id: "5",
      category: "Dates & Times",
      name: "Date (YYYY-MM-DD)",
      pattern: "\\d{4}-\\d{2}-\\d{2}",
      description: "Matches dates in YYYY-MM-DD format",
      examples: ["2026-02-28", "1990-01-15"],
    },
    {
      id: "6",
      category: "Dates & Times",
      name: "Time (24-hour)",
      pattern: "([01]?\\d|2[0-3]):[0-5]\\d",
      description: "Matches time in 24-hour format",
      examples: ["14:30", "09:05", "23:59"],
    },
    {
      id: "7",
      category: "Numbers",
      name: "Credit Card",
      pattern: "\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}",
      description: "Matches credit card numbers",
      examples: ["1234 5678 9012 3456", "1234-5678-9012-3456"],
    },
    {
      id: "8",
      category: "Numbers",
      name: "US Phone Number",
      pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}",
      description: "Matches US phone numbers in various formats",
      examples: ["(555) 123-4567", "555-123-4567", "5551234567"],
    },
    {
      id: "9",
      category: "Text",
      name: "Hashtag",
      pattern: "#[a-zA-Z0-9_]+",
      description: "Matches hashtags",
      examples: ["#regex", "#JavaScript2026"],
    },
    {
      id: "10",
      category: "Text",
      name: "Username",
      pattern: "^[a-zA-Z0-9_]{3,16}$",
      description: "Matches usernames (3-16 alphanumeric chars and underscores)",
      examples: ["john_doe", "user123", "alice_w"],
    },
  ];

  const categories = ["All", ...Array.from(new Set(examples.map((e) => e.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredExamples = examples.filter((example) => {
    const matchesSearch =
      example.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || example.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col">
      <div className="p-6 border-b border-[#3e3e42]">
        <h2 className="text-2xl font-semibold mb-4">Examples Library</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search examples..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#2d2d30] border border-[#3e3e42] rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <Tabs
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="flex-1 flex flex-col"
      >
        <TabsList className="w-full justify-start rounded-none bg-[#252526] border-b border-[#3e3e42] px-6">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredExamples.map((example) => (
                <div
                  key={example.id}
                  className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs text-blue-400 font-medium">
                        {example.category}
                      </span>
                      <h3 className="font-semibold text-lg mt-1">
                        {example.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {example.description}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Copy className="size-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ExternalLink className="size-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-[#1e1e1e] rounded-md p-3 mb-3">
                    <code className="text-yellow-400 font-mono text-xs break-all">
                      {example.pattern}
                    </code>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Examples:</p>
                    <div className="space-y-1">
                      {example.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="text-sm font-mono text-green-400 bg-[#1e1e1e] px-2 py-1 rounded"
                        >
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredExamples.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No examples found.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
