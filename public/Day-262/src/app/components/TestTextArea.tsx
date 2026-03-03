import { useMemo } from "react";

interface Match {
  index: number;
  text: string;
  start: number;
  end: number;
  groups?: string[];
}

interface TestTextAreaProps {
  testText: string;
  onTestTextChange: (text: string) => void;
  matches: Match[];
}

export function TestTextArea({
  testText,
  onTestTextChange,
  matches,
}: TestTextAreaProps) {
  const highlightedText = useMemo(() => {
    if (!testText || matches.length === 0) {
      return testText;
    }

    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      if (match.start > lastIndex) {
        parts.push({ text: testText.slice(lastIndex, match.start), isMatch: false });
      }
      parts.push({ text: testText.slice(match.start, match.end), isMatch: true });
      lastIndex = match.end;
    });

    if (lastIndex < testText.length) {
      parts.push({ text: testText.slice(lastIndex), isMatch: false });
    }

    return parts;
  }, [testText, matches]);

  return (
    <div className="h-full bg-[#1e1e1e] border-b border-[#3e3e42] flex flex-col">
      <div className="p-4 border-b border-[#3e3e42] flex items-center justify-between">
        <h2 className="font-semibold">Test Text</h2>
        <div className="text-sm">
          <span className="text-gray-400">Matches: </span>
          <span className="text-blue-400 font-semibold">{matches.length}</span>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto relative">
        {testText ? (
          <div className="absolute inset-4 font-mono text-sm whitespace-pre-wrap break-words pointer-events-none">
            {Array.isArray(highlightedText) ? (
              highlightedText.map((part, index) => (
                <span
                  key={index}
                  className={
                    part.isMatch
                      ? "bg-yellow-500/30 border-b-2 border-yellow-500"
                      : ""
                  }
                >
                  {part.text}
                </span>
              ))
            ) : (
              highlightedText
            )}
          </div>
        ) : null}
        <textarea
          value={testText}
          onChange={(e) => onTestTextChange(e.target.value)}
          placeholder="Paste your test text here..."
          className="w-full h-full bg-transparent resize-none focus:outline-none font-mono text-sm text-transparent caret-gray-100"
          style={{
            caretColor: "#f3f4f6",
          }}
        />
      </div>
    </div>
  );
}
