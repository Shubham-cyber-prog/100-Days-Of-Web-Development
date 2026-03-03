import { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { RegexEditor } from "./RegexEditor";
import { TestTextArea } from "./TestTextArea";
import { ExplanationPanel } from "./ExplanationPanel";
import { QuickTools } from "./QuickTools";

interface Match {
  index: number;
  text: string;
  start: number;
  end: number;
  groups?: string[];
}

export function Builder() {
  const [pattern, setPattern] = useState("");
  const [testText, setTestText] = useState("Example email: john.doe@example.com\nPhone: (555) 123-4567\nWebsite: https://www.example.com\nDate: 2026-02-28");
  const [flags, setFlags] = useState({
    caseInsensitive: false,
    global: true,
    multiline: false,
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setIsValid(true);
      setError("");
      return;
    }

    try {
      const flagString =
        (flags.caseInsensitive ? "i" : "") +
        (flags.global ? "g" : "") +
        (flags.multiline ? "m" : "");
      const regex = new RegExp(pattern, flagString);
      setIsValid(true);
      setError("");

      if (testText) {
        const foundMatches: Match[] = [];
        let match;
        const globalRegex = new RegExp(pattern, flagString + (flags.global ? "" : "g"));

        while ((match = globalRegex.exec(testText)) !== null) {
          foundMatches.push({
            index: foundMatches.length + 1,
            text: match[0],
            start: match.index,
            end: match.index + match[0].length,
            groups: match.slice(1),
          });
          if (!flags.global) break;
        }

        setMatches(foundMatches);
      } else {
        setMatches([]);
      }
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid regex pattern");
      setMatches([]);
    }
  }, [pattern, testText, flags]);

  return (
    <div className="h-full flex">
      <PanelGroup direction="horizontal">
        {/* Left Panel - Regex Editor and Test Text */}
        <Panel defaultSize={70} minSize={40}>
          <PanelGroup direction="vertical">
            {/* Regex Editor */}
            <Panel defaultSize={25} minSize={20}>
              <RegexEditor
                pattern={pattern}
                onPatternChange={setPattern}
                flags={flags}
                onFlagsChange={setFlags}
                isValid={isValid}
                error={error}
              />
            </Panel>
            <PanelResizeHandle className="h-1 bg-[#3e3e42] hover:bg-blue-600 transition-colors" />
            {/* Test Text Area */}
            <Panel defaultSize={40} minSize={20}>
              <TestTextArea
                testText={testText}
                onTestTextChange={setTestText}
                matches={matches}
              />
            </Panel>
            <PanelResizeHandle className="h-1 bg-[#3e3e42] hover:bg-blue-600 transition-colors" />
            {/* Explanation and Matches Panel */}
            <Panel defaultSize={35} minSize={20}>
              <ExplanationPanel pattern={pattern} matches={matches} />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-1 bg-[#3e3e42] hover:bg-blue-600 transition-colors" />
        {/* Right Sidebar - Quick Tools */}
        <Panel defaultSize={30} minSize={20} maxSize={40}>
          <QuickTools onInsertSnippet={(snippet) => setPattern(pattern + snippet)} />
        </Panel>
      </PanelGroup>
    </div>
  );
}