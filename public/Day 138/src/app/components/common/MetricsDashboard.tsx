import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface Metric {
  label: string;
  value: string | number;
  change: number;
  unit?: string;
}

interface MetricsDashboardProps {
  title: string;
  metrics: Metric[];
  period?: string;
}

export function MetricsDashboard({
  title,
  metrics,
  period = "vs last month",
}: MetricsDashboardProps) {
  const getTrendIcon = (change: number) => {
    if (change > 0)
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (change < 0)
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600 bg-green-50";
    if (change < 0) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  return (
    <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Badge variant="outline" className="text-xs">
          {period}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
          >
            <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-bold text-gray-900">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-sm text-gray-600">{metric.unit}</span>
              )}
            </div>
            <div className={`flex items-center gap-1 text-sm ${getTrendColor(metric.change)} px-2 py-1 rounded-md w-fit`}>
              {getTrendIcon(metric.change)}
              <span className="font-medium">
                {metric.change > 0 ? "+" : ""}
                {metric.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
