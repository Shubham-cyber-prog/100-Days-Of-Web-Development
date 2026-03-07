import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Users } from "lucide-react";
import { Group } from "../data/mockData";
import { toast } from "sonner";

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  const isOwed = group.balance > 0;
  const balanceText = group.balance > 0 
    ? `you are owed $${group.balance.toFixed(2)}`
    : group.balance < 0
    ? `you owe $${Math.abs(group.balance).toFixed(2)}`
    : "all settled up";

  const handleSettleUp = () => {
    toast.success(`Opening settlement for ${group.name}`);
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-2xl">
          {group.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{group.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-3 w-3" />
            <span>{group.members} members</span>
            <span>•</span>
            <span className={
              isOwed 
                ? "text-emerald-600" 
                : group.balance < 0 
                ? "text-red-600" 
                : "text-gray-600"
            }>
              {balanceText}
            </span>
          </div>
        </div>

        {group.balance !== 0 && (
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleSettleUp}
            className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
          >
            Settle Up
          </Button>
        )}
      </div>
    </Card>
  );
}
