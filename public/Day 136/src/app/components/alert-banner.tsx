import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { LucideIcon } from "lucide-react";
import { cn } from "./ui/utils";

interface AlertBannerProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function AlertBanner({
  variant = "default",
  icon: Icon,
  title,
  description,
  action,
  className,
}: AlertBannerProps) {
  const variants = {
    default: "border-border",
    success: "border-green-200 bg-green-50 text-green-900",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
    error: "border-red-200 bg-red-50 text-red-900",
    info: "border-blue-200 bg-blue-50 text-blue-900",
  };

  const iconColors = {
    default: "text-foreground",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
    info: "text-blue-600",
  };

  return (
    <Alert className={cn(variants[variant], className)}>
      {Icon && <Icon className={cn("h-5 w-5", iconColors[variant])} />}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
      {action && <div className="mt-3">{action}</div>}
    </Alert>
  );
}