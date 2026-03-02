import { X } from "lucide-react";

interface EditorTab {
  id: string;
  name: string;
  content: string;
  language: string;
}

interface EditorAreaProps {
  tabs: EditorTab[];
  activeTab: string | null;
  onTabChange: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export function EditorArea({ tabs, activeTab, onTabChange, onTabClose }: EditorAreaProps) {
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="flex bg-[#2d2d2d] border-b border-[#2b2b2b] overflow-x-auto custom-scrollbar-horizontal">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer border-r border-[#2b2b2b] group min-w-[120px] ${
                activeTab === tab.id
                  ? "bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]"
                  : "text-[#969696] hover:bg-[#2a2a2a]"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="flex-1 truncate">{tab.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-[#505050] rounded p-0.5 transition-opacity"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Editor content */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        {activeTabData ? (
          <CodeEditor content={activeTabData.content} language={activeTabData.language} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function CodeEditor({ content, language }: { content: string; language: string }) {
  const lines = content.split("\n");

  return (
    <div className="flex h-full">
      {/* Line numbers */}
      <div className="bg-[#1e1e1e] text-[#858585] text-xs font-mono px-3 py-4 select-none border-r border-[#2b2b2b] min-w-[50px] text-right">
        {lines.map((_, index) => (
          <div key={index} className="leading-6">
            {index + 1}
          </div>
        ))}
      </div>

      {/* Code content */}
      <div className="flex-1 px-4 py-4">
        <pre className="text-xs font-mono leading-6">
          <code className="text-[#d4d4d4]">
            {lines.map((line, index) => (
              <div key={index} className="hover:bg-[#2a2d2e] px-2 -mx-2">
                {highlightSyntax(line, language)}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full text-[#858585] flex-col gap-4">
      <div className="text-6xl opacity-20">VS</div>
      <div className="text-center">
        <p className="text-sm mb-2">No file selected</p>
        <p className="text-xs opacity-70">Select a file from the Explorer to begin editing</p>
      </div>
    </div>
  );
}

function highlightSyntax(line: string, language: string): React.ReactNode {
  if (!line.trim()) return "\u00A0"; // Non-breaking space for empty lines

  // Simple syntax highlighting for common patterns
  const patterns = [
    // Comments
    { regex: /(\/\/.*$|\/\*[\s\S]*?\*\/)/g, color: "#6a9955" },
    // Strings
    { regex: /("[^"]*"|'[^']*'|`[^`]*`)/g, color: "#ce9178" },
    // Keywords
    { 
      regex: /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type|async|await|default|extends|implements)\b/g, 
      color: "#569cd6" 
    },
    // Functions
    { regex: /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, color: "#dcdcaa" },
    // Numbers
    { regex: /\b(\d+)\b/g, color: "#b5cea8" },
    // JSX/TSX tags
    { regex: /(<\/?[a-zA-Z][a-zA-Z0-9]*>|<[a-zA-Z][a-zA-Z0-9]*\s|\/>)/g, color: "#4ec9b0" },
  ];

  let parts: Array<{ text: string; color?: string }> = [{ text: line }];

  patterns.forEach(({ regex, color }) => {
    const newParts: Array<{ text: string; color?: string }> = [];
    
    parts.forEach((part) => {
      if (part.color) {
        newParts.push(part);
        return;
      }

      let lastIndex = 0;
      const matches = [...part.text.matchAll(regex)];

      matches.forEach((match) => {
        if (match.index !== undefined) {
          if (match.index > lastIndex) {
            newParts.push({ text: part.text.slice(lastIndex, match.index) });
          }
          newParts.push({ text: match[0], color });
          lastIndex = match.index + match[0].length;
        }
      });

      if (lastIndex < part.text.length) {
        newParts.push({ text: part.text.slice(lastIndex) });
      }
    });

    parts = newParts.length > 0 ? newParts : parts;
  });

  return (
    <>
      {parts.map((part, index) => (
        <span key={index} style={{ color: part.color || "#d4d4d4" }}>
          {part.text}
        </span>
      ))}
    </>
  );
}
