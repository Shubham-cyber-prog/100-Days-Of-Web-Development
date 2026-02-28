import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";

interface StatusBadgeProps {
  status: "flagged" | "safe" | "review" | "approved" | "rejected" | "pending" | "escalated";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    flagged: "bg-red-100 text-red-700 border-red-200",
    safe: "bg-green-100 text-green-700 border-green-200",
    review: "bg-yellow-100 text-yellow-700 border-yellow-200",
    approved: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    escalated: "bg-orange-100 text-orange-700 border-orange-200",
  };

  const labels = {
    flagged: "Flagged",
    safe: "Safe",
    review: "Under Review",
    approved: "Approved",
    rejected: "Rejected",
    pending: "Pending",
    escalated: "Escalated",
  };

  return (
    <Badge variant="outline" className={cn(variants[status], className)}>
      {labels[status]}
    </Badge>
  );
}