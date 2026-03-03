import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";

interface Match {
  index: number;
  text: string;
  start: number;
  end: number;
  groups?: string[];
}

interface ExplanationPanelProps {
  pattern: string;
  matches: Match[];
}

export function ExplanationPanel({ pattern, matches }: ExplanationPanelProps) {
  const explainPattern = (regex: string) => {
    if (!regex) return [];

    const explanations: { token: string; description: string }[] = [];

    // Basic character classes
    if (regex.includes("\\d")) {
      explanations.push({ token: "\\d", description: "Matches any digit (0-9)" });
    }
    if (regex.includes("\\D")) {
      explanations.push({
        token: "\\D",
        description: "Matches any non-digit character",
      });
    }
    if (regex.includes("\\w")) {
      explanations.push({
        token: "\\w",
        description: "Matches any word character (a-z, A-Z, 0-9, _)",
      });
    }
    if (regex.includes("\\W")) {
      explanations.push({
        token: "\\W",
        description: "Matches any non-word character",
      });
    }
    if (regex.includes("\\s")) {
      explanations.push({
        token: "\\s",
        description: "Matches any whitespace character",
      });
    }
    if (regex.includes("\\S")) {
      explanations.push({
        token: "\\S",
        description: "Matches any non-whitespace character",
      });
    }
    if (regex.includes(".")) {
      explanations.push({
        token: ".",
        description: "Matches any character except newline",
      });
    }

    // Anchors
    if (regex.includes("^")) {
      explanations.push({
        token: "^",
        description: "Matches the start of a line",
      });
    }
    if (regex.includes("$")) {
      explanations.push({ token: "$", description: "Matches the end of a line" });
    }
    if (regex.includes("\\b")) {
      explanations.push({ token: "\\b", description: "Matches a word boundary" });
    }

    // Quantifiers
    if (regex.includes("*")) {
      explanations.push({
        token: "*",
        description: "Matches 0 or more occurrences",
      });
    }
    if (regex.includes("+")) {
      explanations.push({
        token: "+",
        description: "Matches 1 or more occurrences",
      });
    }
    if (regex.includes("?")) {
      explanations.push({
        token: "?",
        description: "Matches 0 or 1 occurrence (optional)",
      });
    }

    // Groups
    if (regex.includes("(")) {
      explanations.push({
        token: "(...)",
        description: "Capturing group",
      });
    }
    if (regex.includes("(?:")) {
      explanations.push({
        token: "(?:...)",
        description: "Non-capturing group",
      });
    }

    // Character sets
    if (regex.includes("[")) {
      explanations.push({
        token: "[...]",
        description: "Matches any single character in the set",
      });
    }

    if (regex.includes("|")) {
      explanations.push({
        token: "|",
        description: "Alternation (OR operator)",
      });
    }

    return explanations;
  };

  const explanations = explainPattern(pattern);

  return (
    <div className="h-full bg-[#1e1e1e]">
      <Tabs defaultValue="explanation" className="h-full flex flex-col">
        <TabsList className="w-full justify-start rounded-none bg-[#252526] border-b border-[#3e3e42] p-0">
          <TabsTrigger
            value="explanation"
            className="rounded-none data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Explanation
          </TabsTrigger>
          <TabsTrigger
            value="matches"
            className="rounded-none data-[state=active]:bg-[#1e1e1e] data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Matches ({matches.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="explanation" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {pattern ? (
                <>
                  <h3 className="font-medium mb-3">Pattern Breakdown</h3>
                  {explanations.length > 0 ? (
                    <div className="space-y-3">
                      {explanations.map((exp, index) => (
                        <div
                          key={index}
                          className="bg-[#252526] rounded-md p-3 border border-[#3e3e42]"
                        >
                          <code className="text-yellow-400 font-mono">
                            {exp.token}
                          </code>
                          <p className="text-sm text-gray-300 mt-1">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Enter a regex pattern to see its explanation.
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  Enter a regex pattern to see its breakdown and explanation.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="matches" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {matches.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-[#3e3e42]">
                      <tr className="text-left">
                        <th className="pb-2 font-medium text-gray-400">#</th>
                        <th className="pb-2 font-medium text-gray-400">
                          Matched Text
                        </th>
                        <th className="pb-2 font-medium text-gray-400">Start</th>
                        <th className="pb-2 font-medium text-gray-400">End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matches.map((match) => (
                        <tr
                          key={match.index}
                          className="border-b border-[#3e3e42]/50"
                        >
                          <td className="py-2 text-gray-400">{match.index}</td>
                          <td className="py-2 font-mono text-yellow-400 break-all max-w-xs">
                            {match.text}
                          </td>
                          <td className="py-2 font-mono text-blue-400">
                            {match.start}
                          </td>
                          <td className="py-2 font-mono text-blue-400">
                            {match.end}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No matches found. Try adding test text and a regex pattern.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
