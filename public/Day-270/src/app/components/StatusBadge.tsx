import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { RiskLevel } from "../types";

interface StatusBadgeProps {
  riskLevel: RiskLevel;
  size?: "sm" | "lg";
}

export function StatusBadge({ riskLevel, size = "lg" }: StatusBadgeProps) {
  const config = {
    safe: {
      icon: CheckCircle,
      label: "Safe",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      textColor: "text-green-700 dark:text-green-400",
      borderColor: "border-green-500",
    },
    suspicious: {
      icon: AlertTriangle,
      label: "Suspicious",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
      textColor: "text-yellow-700 dark:text-yellow-400",
      borderColor: "border-yellow-500",
    },
    "high-risk": {
      icon: XCircle,
      label: "High Risk",
      bgColor: "bg-red-100 dark:bg-red-900/20",
      textColor: "text-red-700 dark:text-red-400",
      borderColor: "border-red-500",
    },
  };

  const { icon: Icon, label, bgColor, textColor, borderColor } = config[riskLevel];

  if (size === "sm") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${bgColor} ${borderColor} ${textColor}`}
      >
        <Icon className="size-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl border-2 ${bgColor} ${borderColor} ${textColor}`}
    >
      <Icon className="size-8" />
      <span className="text-2xl font-semibold">{label}</span>
    </div>
  );
}
