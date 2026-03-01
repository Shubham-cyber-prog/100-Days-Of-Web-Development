import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "open" | "in-progress" | "completed";
}

const statusConfig = {
  open: { label: "Open", className: "bg-accent text-accent-foreground" },
  "in-progress": { label: "In Progress", className: "bg-warning/15 text-warning" },
  completed: { label: "Completed", className: "bg-success/15 text-success" },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", config.className)}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
