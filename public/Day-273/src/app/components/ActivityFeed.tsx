import { Card } from "./ui/card";
import { Activity } from "../data/mockData";
import { Receipt, CheckCircle, Users, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "expense_added":
        return <Receipt className="h-4 w-4" />;
      case "payment_settled":
        return <CheckCircle className="h-4 w-4" />;
      case "group_created":
        return <Users className="h-4 w-4" />;
      case "expense_edited":
        return <Edit className="h-4 w-4" />;
    }
  };

  const getColor = (type: Activity["type"]) => {
    switch (type) {
      case "expense_added":
        return "bg-blue-100 text-blue-600";
      case "payment_settled":
        return "bg-emerald-100 text-emerald-600";
      case "group_created":
        return "bg-purple-100 text-purple-600";
      case "expense_edited":
        return "bg-orange-100 text-orange-600";
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${getColor(activity.type)}`}>
              {getIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
