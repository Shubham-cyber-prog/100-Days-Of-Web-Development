import { GitBranch, AlertCircle, Bell, Settings } from "lucide-react";

interface StatusBarProps {
  currentFile: string | null;
  lineNumber: number;
  columnNumber: number;
  onTogglePanel?: () => void;
}

export function StatusBar({ currentFile, lineNumber, columnNumber, onTogglePanel }: StatusBarProps) {
  return (
    <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-2 text-xs select-none">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 hover:bg-[#0098ff] px-1.5 py-0.5 rounded transition-colors">
          <GitBranch className="size-3" />
          <span>main</span>
        </button>
        
        <button className="flex items-center gap-1 hover:bg-[#0098ff] px-1.5 py-0.5 rounded transition-colors">
          <AlertCircle className="size-3" />
          <span>0</span>
          <span className="ml-1">0</span>
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {currentFile && (
          <>
            <span>Ln {lineNumber}, Col {columnNumber}</span>
            <span className="hidden md:inline">Spaces: 2</span>
            <span className="hidden lg:inline">UTF-8</span>
            <span className="hidden lg:inline">LF</span>
            <span className="hidden sm:inline">{getLanguageMode(currentFile)}</span>
          </>
        )}
        
        <button className="hover:bg-[#0098ff] px-1.5 py-0.5 rounded transition-colors hidden sm:inline-block">
          <Bell className="size-3" />
        </button>
        
        <button className="hover:bg-[#0098ff] px-1.5 py-0.5 rounded transition-colors">
          <Settings className="size-3" />
        </button>
      </div>
    </div>
  );
}

function getLanguageMode(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();
  const languageMap: Record<string, string> = {
    tsx: "TypeScript React",
    ts: "TypeScript",
    jsx: "JavaScript React",
    js: "JavaScript",
    json: "JSON",
    css: "CSS",
    html: "HTML",
    md: "Markdown",
    txt: "Plain Text",
  };
  return languageMap[ext || ""] || "Plain Text";
}