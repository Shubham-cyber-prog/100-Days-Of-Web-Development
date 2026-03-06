import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Friend } from "../data/mockData";
import { toast } from "sonner";

interface FriendCardProps {
  friend: Friend;
}

export default function FriendCard({ friend }: FriendCardProps) {
  const isOwed = friend.balance > 0;
  const balanceText = isOwed 
    ? `owes you $${friend.balance.toFixed(2)}`
    : friend.balance < 0
    ? `you owe $${Math.abs(friend.balance).toFixed(2)}`
    : "settled up";

  const handleSettleUp = () => {
    toast.success(`Settle up request sent to ${friend.name}`);
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={friend.avatar} />
          <AvatarFallback>{friend.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{friend.name}</h3>
          <p className={`text-sm ${
            isOwed 
              ? "text-emerald-600" 
              : friend.balance < 0 
              ? "text-red-600" 
              : "text-gray-600"
          }`}>
            {balanceText}
          </p>
        </div>

        {friend.balance !== 0 && (
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
