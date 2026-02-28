import { Menu, Minus, Square, X } from "lucide-react";

interface TitleBarProps {
  onToggleSidebar: () => void;
}

export function TitleBar({ onToggleSidebar }: TitleBarProps) {
  const menuItems = ["File", "Edit", "View", "Run", "Terminal", "Help"];

  return (
    <div className="h-9 bg-[#3c3c3c] flex items-center justify-between px-2 text-[#cccccc] text-xs select-none border-b border-[#2b2b2b]">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleSidebar}
          className="p-1 hover:bg-[#505050] rounded transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-4" />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="size-5 bg-[#007acc] rounded flex items-center justify-center text-white text-xs font-semibold">
            VS
          </div>
          <span className="font-medium hidden sm:inline">VS Code Clone (Browser)</span>
        </div>

        <div className="hidden lg:flex items-center gap-1 ml-2">
          {menuItems.map((item) => (
            <button
              key={item}
              className="px-2 py-1 hover:bg-[#505050] rounded transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Right section - Window controls */}
      <div className="flex items-center">
        <button className="p-2 hover:bg-[#505050] transition-colors" aria-label="Minimize">
          <Minus className="size-3.5" />
        </button>
        <button className="p-2 hover:bg-[#505050] transition-colors" aria-label="Maximize">
          <Square className="size-3.5" />
        </button>
        <button className="p-2 hover:bg-[#e81123] transition-colors" aria-label="Close">
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}