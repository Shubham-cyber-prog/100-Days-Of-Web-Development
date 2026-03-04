import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import GroupCard from "../components/GroupCard";
import { mockGroups } from "../data/mockData";
import { toast } from "sonner";

export default function Groups() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Groups</h1>
          <p className="text-gray-600">Manage your expense groups</p>
        </div>
        <Button 
          className="bg-emerald-500 hover:bg-emerald-600"
          onClick={() => toast.success("Create group modal would open")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockGroups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
