import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import FriendCard from "../components/FriendCard";
import { mockFriends } from "../data/mockData";
import { toast } from "sonner";

export default function Friends() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Friends</h1>
          <p className="text-gray-600">Manage your friends and balances</p>
        </div>
        <Button 
          className="bg-emerald-500 hover:bg-emerald-600"
          onClick={() => toast.success("Add friend modal would open")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Friend
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockFriends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  );
}
