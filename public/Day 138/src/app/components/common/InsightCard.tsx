import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface InsightCardProps {
  title: string;
  description: string;
  confidence: number;
  trend?: "up" | "down" | "neutral";
  category?: string;
  action?: string;
}

export function InsightCard({
  title,
  description,
  confidence,
  trend = "neutral",
  category,
  action,
}: InsightCardProps) {
  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  return (
    <Card className="p-5 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{title}</h3>
              {getTrendIcon()}
            </div>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200"
            >
              {confidence}% confident
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            {category && (
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            )}
            {action && (
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                {action} →
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
