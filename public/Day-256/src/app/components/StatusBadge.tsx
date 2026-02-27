import { Badge } from "./ui/badge";

interface StatusBadgeProps {
  status: "running" | "stopped" | "paused";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    running: "bg-green-500/20 text-green-400 border-green-500/50",
    stopped: "bg-gray-500/20 text-gray-400 border-gray-500/50",
    paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  };

  return (
    <Badge className={`${variants[status]} border capitalize`}>
      {status}
    </Badge>
  );
}
