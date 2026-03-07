import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  CheckCircle,
  XCircle,
  Flag,
  Clock,
  Activity,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface ActivityItem {
  id: string;
  moderator: string;
  action: "approved" | "rejected" | "escalated";
  contentId: string;
  contentPreview: string;
  timestamp: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    moderator: "Sarah Chen",
    action: "approved",
    contentId: "CT-2847",
    contentPreview: "Comment about product quality...",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    moderator: "Mike Johnson",
    action: "rejected",
    contentId: "CT-2846",
    contentPreview: "Spam message with promotional content...",
    timestamp: "5 minutes ago",
  },
  {
    id: "3",
    moderator: "Emily Davis",
    action: "escalated",
    contentId: "CT-2845",
    contentPreview: "Potentially harmful content requiring review...",
    timestamp: "8 minutes ago",
  },
  {
    id: "4",
    moderator: "John Smith",
    action: "approved",
    contentId: "CT-2844",
    contentPreview: "User feedback about service improvements...",
    timestamp: "12 minutes ago",
  },
  {
    id: "5",
    moderator: "Sarah Chen",
    action: "rejected",
    contentId: "CT-2843",
    contentPreview: "Inappropriate language detected in comment...",
    timestamp: "15 minutes ago",
  },
];

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [realtimeCount, setRealtimeCount] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeCount((prev) => prev + 1);

      // Simulate new activity every 15 seconds
      if (realtimeCount % 3 === 0) {
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          moderator: ["Sarah Chen", "Mike Johnson", "Emily Davis"][
            Math.floor(Math.random() * 3)
          ],
          action: ["approved", "rejected", "escalated"][
            Math.floor(Math.random() * 3)
          ] as ActivityItem["action"],
          contentId: `CT-${Math.floor(Math.random() * 9000) + 1000}`,
          contentPreview: "New content flagged for review...",
          timestamp: "Just now",
        };

        setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [realtimeCount]);

  const getActionIcon = (action: ActivityItem["action"]) => {
    switch (action) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "escalated":
        return <Flag className="w-4 h-4 text-orange-600" />;
    }
  };

  const getActionColor = (action: ActivityItem["action"]) => {
    switch (action) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "escalated":
        return "bg-orange-50 text-orange-700 border-orange-200";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Live Activity Feed
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {activity.moderator
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1">
                      <span className="font-medium text-sm">
                        {activity.moderator}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1">
                        {activity.action}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getActionColor(activity.action)}`}
                    >
                      {getActionIcon(activity.action)}
                      <span className="ml-1 capitalize">{activity.action}</span>
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground truncate mb-1">
                    {activity.contentPreview}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      {activity.contentId}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 p-3 bg-accent/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Activity Today</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-semibold">+{activities.length} actions</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}