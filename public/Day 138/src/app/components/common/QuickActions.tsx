import { FileText, TrendingUp, Users, Download, Sparkles, Database } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

interface QuickAction {
  label: string;
  icon: React.ElementType;
  variant?: "default" | "gradient";
  onClick?: () => void;
}

const actions: QuickAction[] = [
  {
    label: "Generate Report",
    icon: FileText,
    variant: "gradient",
  },
  {
    label: "Analyze Trends",
    icon: TrendingUp,
  },
  {
    label: "Compare Competitors",
    icon: Users,
  },
  {
    label: "Export Data",
    icon: Download,
  },
  {
    label: "AI Insights",
    icon: Sparkles,
    variant: "gradient",
  },
  {
    label: "Add Data Source",
    icon: Database,
  },
];

export function QuickActions() {
  return (
    <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant={action.variant === "gradient" ? "default" : "outline"}
              className={`h-20 flex flex-col gap-2 ${
                action.variant === "gradient"
                  ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                  : "hover:border-blue-300 hover:bg-blue-50"
              }`}
              onClick={action.onClick}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}
