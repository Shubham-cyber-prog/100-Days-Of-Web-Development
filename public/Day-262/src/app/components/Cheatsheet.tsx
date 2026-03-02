import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Cheatsheet() {
  const characterClasses = [
    { pattern: ".", description: "Any character except newline" },
    { pattern: "\\d", description: "Any digit (0-9)" },
    { pattern: "\\D", description: "Any non-digit" },
    { pattern: "\\w", description: "Word character (a-z, A-Z, 0-9, _)" },
    { pattern: "\\W", description: "Non-word character" },
    { pattern: "\\s", description: "Whitespace (space, tab, newline)" },
    { pattern: "\\S", description: "Non-whitespace" },
    { pattern: "[abc]", description: "Any of a, b, or c" },
    { pattern: "[^abc]", description: "Not a, b, or c" },
    { pattern: "[a-z]", description: "Character between a and z" },
    { pattern: "[A-Z]", description: "Character between A and Z" },
    { pattern: "[0-9]", description: "Digit between 0 and 9" },
  ];

  const anchors = [
    { pattern: "^", description: "Start of string or line" },
    { pattern: "$", description: "End of string or line" },
    { pattern: "\\b", description: "Word boundary" },
    { pattern: "\\B", description: "Not word boundary" },
    { pattern: "\\A", description: "Start of string" },
    { pattern: "\\Z", description: "End of string" },
  ];

  const quantifiers = [
    { pattern: "*", description: "0 or more times (greedy)" },
    { pattern: "+", description: "1 or more times (greedy)" },
    { pattern: "?", description: "0 or 1 time (optional)" },
    { pattern: "{n}", description: "Exactly n times" },
    { pattern: "{n,}", description: "n or more times" },
    { pattern: "{n,m}", description: "Between n and m times" },
    { pattern: "*?", description: "0 or more times (lazy)" },
    { pattern: "+?", description: "1 or more times (lazy)" },
    { pattern: "??", description: "0 or 1 time (lazy)" },
  ];

  const groups = [
    { pattern: "(abc)", description: "Capturing group" },
    { pattern: "(?:abc)", description: "Non-capturing group" },
    { pattern: "(?<name>abc)", description: "Named capturing group" },
    { pattern: "\\1", description: "Backreference to group 1" },
    { pattern: "(?=abc)", description: "Positive lookahead" },
    { pattern: "(?!abc)", description: "Negative lookahead" },
    { pattern: "(?<=abc)", description: "Positive lookbehind" },
    { pattern: "(?<!abc)", description: "Negative lookbehind" },
  ];

  const flags = [
    { flag: "i", description: "Case insensitive matching" },
    { flag: "g", description: "Global matching (find all matches)" },
    { flag: "m", description: "Multiline mode (^ and $ match line breaks)" },
    { flag: "s", description: "Dot matches newline" },
    { flag: "u", description: "Unicode mode" },
    { flag: "y", description: "Sticky mode" },
  ];

  const specialCharacters = [
    { pattern: "\\", description: "Escape special character" },
    { pattern: ".", description: "Any character" },
    { pattern: "*", description: "0 or more quantifier" },
    { pattern: "+", description: "1 or more quantifier" },
    { pattern: "?", description: "0 or 1 quantifier" },
    { pattern: "|", description: "Alternation (OR)" },
    { pattern: "^", description: "Start anchor" },
    { pattern: "$", description: "End anchor" },
    { pattern: "()", description: "Grouping" },
    { pattern: "[]", description: "Character class" },
    { pattern: "{}", description: "Quantifier" },
  ];

  return (
    <div className="h-full bg-[#1e1e1e]">
      <div className="p-6 border-b border-[#3e3e42]">
        <h2 className="text-2xl font-semibold">Regex Cheatsheet</h2>
        <p className="text-gray-400 text-sm mt-2">
          Quick reference for regular expression syntax
        </p>
      </div>

      <Tabs defaultValue="characters" className="flex-1">
        <TabsList className="w-full justify-start rounded-none bg-[#252526] border-b border-[#3e3e42] px-6">
          <TabsTrigger value="characters">Character Classes</TabsTrigger>
          <TabsTrigger value="anchors">Anchors</TabsTrigger>
          <TabsTrigger value="quantifiers">Quantifiers</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="flags">Flags</TabsTrigger>
          <TabsTrigger value="special">Special Chars</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <TabsContent value="characters" className="p-6 m-0">
            <div className="space-y-3">
              {characterClasses.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 flex items-start gap-4"
                >
                  <code className="text-yellow-400 font-mono text-lg min-w-[100px]">
                    {item.pattern}
                  </code>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="anchors" className="p-6 m-0">
            <div className="space-y-3">
              {anchors.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 flex items-start gap-4"
                >
                  <code className="text-yellow-400 font-mono text-lg min-w-[100px]">
                    {item.pattern}
                  </code>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quantifiers" className="p-6 m-0">
            <div className="space-y-3">
              {quantifiers.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 flex items-start gap-4"
                >
                  <code className="text-yellow-400 font-mono text-lg min-w-[100px]">
                    {item.pattern}
                  </code>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="groups" className="p-6 m-0">
            <div className="space-y-3">
              {groups.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 flex items-start gap-4"
                >
                  <code className="text-yellow-400 font-mono text-lg min-w-[120px]">
                    {item.pattern}
                  </code>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flags" className="p-6 m-0">
            <div className="space-y-3">
              {flags.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 flex items-start gap-4"
                >
                  <code className="text-yellow-400 font-mono text-lg min-w-[100px]">
                    {item.flag}
                  </code>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="special" className="p-6 m-0">
            <div className="space-y-3">
              {specialCharacters.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#252526] border border-[#3e3e42] rounded-lg p-4 flex items-start gap-4"
                >
                  <code className="text-yellow-400 font-mono text-lg min-w-[100px]">
                    {item.pattern}
                  </code>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
