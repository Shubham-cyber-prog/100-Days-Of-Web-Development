import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface QuickToolsProps {
  onInsertSnippet: (snippet: string) => void;
}

export function QuickTools({ onInsertSnippet }: QuickToolsProps) {
  const snippets = [
    { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
    { label: "URL", pattern: "https?://[^\\s]+" },
    { label: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}" },
    { label: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}" },
    { label: "IPv4 Address", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b" },
    { label: "Hex Color", pattern: "#[0-9A-Fa-f]{6}" },
    { label: "ZIP Code", pattern: "\\d{5}(-\\d{4})?" },
    { label: "Credit Card", pattern: "\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}" },
    { label: "Username", pattern: "^[a-zA-Z0-9_]{3,16}$" },
    { label: "Password (8+ chars)", pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$" },
  ];

  const characterClasses = [
    { label: "Any digit", pattern: "\\d" },
    { label: "Non-digit", pattern: "\\D" },
    { label: "Word character", pattern: "\\w" },
    { label: "Non-word", pattern: "\\W" },
    { label: "Whitespace", pattern: "\\s" },
    { label: "Non-whitespace", pattern: "\\S" },
    { label: "Any character", pattern: "." },
    { label: "Word boundary", pattern: "\\b" },
    { label: "Line start", pattern: "^" },
    { label: "Line end", pattern: "$" },
  ];

  const quantifiers = [
    { label: "0 or more", pattern: "*" },
    { label: "1 or more", pattern: "+" },
    { label: "0 or 1", pattern: "?" },
    { label: "Exactly n", pattern: "{n}" },
    { label: "n or more", pattern: "{n,}" },
    { label: "n to m", pattern: "{n,m}" },
  ];

  return (
    <div className="h-full bg-[#1e1e1e] border-l border-[#3e3e42]">
      <Tabs defaultValue="snippets" className="h-full flex flex-col">
        <TabsList className="w-full justify-start rounded-none bg-[#252526] border-b border-[#3e3e42] p-0">
          <TabsTrigger
            value="snippets"
            className="rounded-none data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-xs"
          >
            Snippets
          </TabsTrigger>
          <TabsTrigger
            value="classes"
            className="rounded-none data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-xs"
          >
            Characters
          </TabsTrigger>
          <TabsTrigger
            value="quantifiers"
            className="rounded-none data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-xs"
          >
            Quantifiers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="snippets" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Common Patterns
              </h3>
              {snippets.map((snippet, index) => (
                <div
                  key={index}
                  className="bg-[#252526] border border-[#3e3e42] rounded-md p-3 hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium">{snippet.label}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => onInsertSnippet(snippet.pattern)}
                    >
                      <Copy className="size-3" />
                    </Button>
                  </div>
                  <code className="text-xs text-yellow-400 font-mono break-all">
                    {snippet.pattern}
                  </code>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="classes" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Character Classes
              </h3>
              {characterClasses.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#252526] border border-[#3e3e42] rounded-md p-3 hover:border-blue-500 transition-colors"
                >
                  <div>
                    <span className="text-sm">{item.label}</span>
                    <code className="block text-xs text-yellow-400 font-mono mt-1">
                      {item.pattern}
                    </code>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onInsertSnippet(item.pattern)}
                  >
                    <Copy className="size-3" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="quantifiers" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Quantifiers
              </h3>
              {quantifiers.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#252526] border border-[#3e3e42] rounded-md p-3 hover:border-blue-500 transition-colors"
                >
                  <div>
                    <span className="text-sm">{item.label}</span>
                    <code className="block text-xs text-yellow-400 font-mono mt-1">
                      {item.pattern}
                    </code>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => onInsertSnippet(item.pattern)}
                  >
                    <Copy className="size-3" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
