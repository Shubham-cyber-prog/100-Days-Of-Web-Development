'use client'
import { cn } from "@/app/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  percentage: number;
  caption?: string;
  icon?: React.ReactNode;
};

const StatsCard = ({
  title,
  value,
  percentage,
  caption,
  icon,
}: StatsCardProps) => {
  const isPositive = percentage >= 0;

  return (
    <div className="text-black bg-white p-6 rounded-xl shadow-sm w-full flex flex-col gap-2 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        {icon && (
          <div className="text-indigo-600 bg-indigo-100 rounded-full p-2">
            {icon}
          </div>
        )}
      </div>

      <div className="text-3xl font-bold">{value}</div>

      <div className="flex items-center gap-1 text-sm">
        <div
          className={cn(
            "flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium",
            isPositive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-1" />
          )}
          {Math.abs(percentage)}%
        </div>
        {caption && <span className="text-gray-800">· {caption}</span>}
      </div>
    </div>
  );
};

export default StatsCard;
