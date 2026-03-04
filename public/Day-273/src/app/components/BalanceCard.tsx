import { Card } from "./ui/card";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";

interface BalanceCardProps {
  title: string;
  amount: number;
  type: "owed" | "owe" | "total";
}

export default function BalanceCard({ title, amount, type }: BalanceCardProps) {
  const isPositive = amount >= 0;
  const isOwe = type === "owe";
  
  const bgColor = type === "owed" ? "bg-emerald-50" : type === "owe" ? "bg-red-50" : "bg-blue-50";
  const textColor = type === "owed" ? "text-emerald-600" : type === "owe" ? "text-red-600" : "text-blue-600";
  const iconBg = type === "owed" ? "bg-emerald-100" : type === "owe" ? "bg-red-100" : "bg-blue-100";

  const Icon = type === "owed" ? ArrowUp : type === "owe" ? ArrowDown : DollarSign;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className={`text-3xl font-bold ${textColor}`}>
            ${Math.abs(amount).toFixed(2)}
          </p>
        </div>
        <div className={`${iconBg} ${textColor} p-3 rounded-full`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
