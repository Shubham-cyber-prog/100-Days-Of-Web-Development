import { Card } from "../components/ui/card";
import { mockActivities } from "../data/mockData";
import { Receipt, CheckCircle, Users, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Activity() {
  const getIcon = (type: typeof mockActivities[0]["type"]) => {
    switch (type) {
      case "expense_added":
        return <Receipt className="h-5 w-5" />;
      case "payment_settled":
        return <CheckCircle className="h-5 w-5" />;
      case "group_created":
        return <Users className="h-5 w-5" />;
      case "expense_edited":
        return <Edit className="h-5 w-5" />;
    }
  };

  const getColor = (type: typeof mockActivities[0]["type"]) => {
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Feed</h1>
        <p className="text-gray-600">Recent activities and updates</p>
      </div>

      <Card className="divide-y divide-gray-200">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${getColor(activity.type)}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
