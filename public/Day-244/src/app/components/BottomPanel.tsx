import { ChevronUp, X, Terminal as TerminalIcon } from "lucide-react";
import { useState } from "react";

interface BottomPanelProps {
  isVisible: boolean;
  onToggle: () => void;
}

export function BottomPanel({ isVisible, onToggle }: BottomPanelProps) {
  const [activeTab, setActiveTab] = useState<"terminal" | "output" | "problems" | "debug">("terminal");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to VS Code Clone Terminal",
    "Type 'help' for available commands",
    "",
  ]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      const newHistory = [
        ...terminalHistory,
        `$ ${terminalInput}`,
        `Command '${terminalInput}' executed (simulated)`,
        "",
      ];
      setTerminalHistory(newHistory);
      setTerminalInput("");
    }
  };

  if (!isVisible) {
    return null;
  }

  const tabs = [
    { id: "terminal" as const, label: "Terminal", icon: TerminalIcon },
    { id: "output" as const, label: "Output" },
    { id: "problems" as const, label: "Problems" },
    { id: "debug" as const, label: "Debug Console" },
  ];

  return (
    <div className="h-48 md:h-64 bg-[#1e1e1e] border-t border-[#2b2b2b] flex flex-col">
      {/* Panel tabs */}
      <div className="flex items-center justify-between bg-[#252526] border-b border-[#2b2b2b]">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
                  activeTab === tab.id
                    ? "text-white border-b-2 border-[#007acc]"
                    : "text-[#969696] hover:text-white"
                }`}
              >
                {Icon && <Icon className="size-3.5" />}
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-1 px-2">
          <button
            onClick={onToggle}
            className="p-1 hover:bg-[#505050] rounded transition-colors text-[#cccccc]"
            title="Hide Panel"
          >
            <ChevronUp className="size-4" />
          </button>
          <button
            className="p-1 hover:bg-[#505050] rounded transition-colors text-[#cccccc]"
            title="Close Panel"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-auto custom-scrollbar p-2">
        {activeTab === "terminal" && (
          <div className="font-mono text-xs text-[#cccccc] h-full flex flex-col">
            <div className="flex-1 overflow-auto">
              {terminalHistory.map((line, index) => (
                <div key={index} className="leading-5">
                  {line || "\u00A0"}
                </div>
              ))}
            </div>
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-2">
              <span className="text-[#4ec9b0]">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-[#cccccc]"
                placeholder="Enter command..."
                autoFocus
              />
            </form>
          </div>
        )}

        {activeTab === "output" && (
          <div className="font-mono text-xs text-[#cccccc]">
            <div className="opacity-50">No output available</div>
          </div>
        )}

        {activeTab === "problems" && (
          <div className="text-xs text-[#cccccc]">
            <div className="opacity-50">No problems detected</div>
          </div>
        )}

        {activeTab === "debug" && (
          <div className="font-mono text-xs text-[#cccccc]">
            <div className="opacity-50">Debug console is ready</div>
          </div>
        )}
      </div>
    </div>
  );
}