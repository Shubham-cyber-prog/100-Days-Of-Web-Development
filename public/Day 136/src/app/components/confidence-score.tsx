import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";

interface ConfidenceScoreProps {
  score: number;
  label?: string;
  showBadge?: boolean;
  className?: string;
}

export function ConfidenceScore({
  score,
  label = "Confidence",
  showBadge = true,
  className,
}: ConfidenceScoreProps) {
  const getColor = () => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-orange-600";
  };

  const getBadgeColor = () => {
    if (score >= 90) return "bg-green-100 text-green-700";
    if (score >= 70) return "bg-yellow-100 text-yellow-700";
    return "bg-orange-100 text-orange-700";
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {showBadge ? (
          <Badge variant="secondary" className={getBadgeColor()}>
            {score}%
          </Badge>
        ) : (
          <span className={cn("text-sm", getColor())}>{score}%</span>
        )}
      </div>
      <Progress value={score} className="h-2" />
    </div>
  );
}