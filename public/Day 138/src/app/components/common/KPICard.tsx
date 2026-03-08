import { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  trend?: "up" | "down";
  aiConfidence?: number;
}

export function KPICard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  aiConfidence,
}: KPICardProps) {
  const changeColors = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50",
  };

  return (
    <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        {aiConfidence && (
          <Badge
            variant="outline"
            className="text-xs bg-purple-50 text-purple-700 border-purple-200"
          >
            AI {aiConfidence}%
          </Badge>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-sm font-medium ${changeColors[changeType]}`}>
            {change}
          </p>
        )}
      </div>
    </Card>
  );
}
