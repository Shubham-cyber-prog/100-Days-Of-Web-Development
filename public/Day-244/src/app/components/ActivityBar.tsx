import { 
  Files, 
  Search, 
  GitBranch, 
  Play, 
  Package, 
  Settings,
  Code
} from "lucide-react";

type ActivityTab = "explorer" | "search" | "source-control" | "run" | "extensions" | "settings";

interface ActivityBarProps {
  activeTab: ActivityTab;
  onTabChange: (tab: ActivityTab) => void;
}

export function ActivityBar({ activeTab, onTabChange }: ActivityBarProps) {
  const activities = [
    { id: "explorer" as ActivityTab, icon: Files, label: "Explorer" },
    { id: "search" as ActivityTab, icon: Search, label: "Search" },
    { id: "source-control" as ActivityTab, icon: GitBranch, label: "Source Control" },
    { id: "run" as ActivityTab, icon: Play, label: "Run and Debug" },
    { id: "extensions" as ActivityTab, icon: Package, label: "Extensions" },
  ];

  return (
    <div className="w-12 bg-[#333333] flex flex-col items-center py-2 border-r border-[#2b2b2b]">
      {/* Top activities */}
      <div className="flex flex-col gap-1 flex-1">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const isActive = activeTab === activity.id;
          
          return (
            <button
              key={activity.id}
              onClick={() => onTabChange(activity.id)}
              className={`p-3 relative transition-colors group ${
                isActive 
                  ? "text-white" 
                  : "text-[#858585] hover:text-white"
              }`}
              title={activity.label}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white" />
              )}
              <Icon className="size-6" />
            </button>
          );
        })}
      </div>

      {/* Bottom settings */}
      <button
        onClick={() => onTabChange("settings")}
        className={`p-3 transition-colors ${
          activeTab === "settings"
            ? "text-white"
            : "text-[#858585] hover:text-white"
        }`}
        title="Settings"
      >
        <Settings className="size-6" />
      </button>
    </div>
  );
}
