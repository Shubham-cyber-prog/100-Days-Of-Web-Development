import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Report Generated",
    message: "Your Q1 market analysis report is ready to download",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Competitor Activity",
    message: "TechCorp launched a new feature in your market segment",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "Data Sync Complete",
    message: "Google Analytics data has been updated",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "success",
    title: "Insight Alert",
    message: "New market opportunity detected in Healthcare AI",
    time: "3 hours ago",
    read: true,
  },
];

export function NotificationPanel() {
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <Card className="w-96 rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          <Badge className="bg-blue-600 text-white">
            {notifications.filter((n) => !n.read).length}
          </Badge>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
              !notification.read ? "bg-blue-50/30" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {notification.title}
                  </h4>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <Button variant="ghost" className="w-full">
          Mark all as read
        </Button>
      </div>
    </Card>
  );
}
