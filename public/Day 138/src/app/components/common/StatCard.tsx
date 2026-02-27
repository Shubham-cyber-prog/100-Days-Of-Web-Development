import { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  variant?: "default" | "gradient";
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-gray-600",
  };

  return (
    <Card
      className={`p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow ${
        variant === "gradient"
          ? "bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && (
          <div
            className={`p-3 rounded-xl ${
              variant === "gradient"
                ? "bg-white/50"
                : "bg-gradient-to-br from-blue-50 to-teal-50"
            }`}
          >
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
      </div>
      {(description || trend) && (
        <div className="flex items-center justify-between text-sm">
          {description && <span className="text-gray-600">{description}</span>}
          {trend && (
            <span className={`font-medium ${trendColors[trend.direction]}`}>
              {trend.value}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}
