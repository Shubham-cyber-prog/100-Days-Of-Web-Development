import { useState } from "react";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  CheckCircle,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { motion, AnimatePresence } from "motion/react";

interface Alert {
  id: string;
  type: "trend" | "competitor" | "warning" | "success";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    link: string;
  };
  confidence?: number;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "trend",
    title: "Emerging Market Trend Detected",
    message: "AI-powered analytics is trending up 34% in your sector. This could indicate new market opportunities.",
    timestamp: new Date(Date.now() - 15 * 60000),
    read: false,
    action: { label: "View Trends", link: "/app/trends" },
    confidence: 92,
  },
  {
    id: "2",
    type: "competitor",
    title: "Competitor Price Change",
    message: "TechCorp reduced their enterprise tier pricing by 15%. This may impact your competitive positioning.",
    timestamp: new Date(Date.now() - 45 * 60000),
    read: false,
    action: { label: "View Analysis", link: "/app/competitors" },
    confidence: 88,
  },
  {
    id: "3",
    type: "warning",
    title: "Customer Sentiment Decline",
    message: "Negative sentiment increased by 12% over the past week, primarily related to mobile app performance.",
    timestamp: new Date(Date.now() - 2 * 3600000),
    read: false,
    action: { label: "View Insights", link: "/app/insights" },
    confidence: 85,
  },
  {
    id: "4",
    type: "success",
    title: "Data Sync Completed",
    message: "Successfully synced 47 data sources. 234 new insights discovered and ready for analysis.",
    timestamp: new Date(Date.now() - 3 * 3600000),
    read: true,
    action: { label: "View Sources", link: "/app/sources" },
  },
  {
    id: "5",
    type: "trend",
    title: "Search Volume Spike",
    message: "Your brand search volume increased 28% this week, driven by recent product launch coverage.",
    timestamp: new Date(Date.now() - 5 * 3600000),
    read: true,
    confidence: 95,
  },
];

export function SmartAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = alerts.filter((a) => !a.read).length;

  const markAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, read: true } : alert))
    );
  };

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })));
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const getIcon = (type: Alert["type"]) => {
    switch (type) {
      case "trend":
        return TrendingUp;
      case "competitor":
        return Users;
      case "warning":
        return AlertTriangle;
      case "success":
        return CheckCircle;
    }
  };

  const getColor = (type: Alert["type"]) => {
    switch (type) {
      case "trend":
        return "text-blue-600 bg-blue-50";
      case "competitor":
        return "text-purple-600 bg-purple-50";
      case "warning":
        return "text-orange-600 bg-orange-50";
      case "success":
        return "text-green-600 bg-green-50";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
            >
              {unreadCount}
            </motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold">Smart Alerts</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs h-7"
            >
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[400px]">
          <AnimatePresence mode="popLayout">
            {alerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="p-3 bg-gray-100 rounded-full mb-3">
                  <Bell className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 font-medium">All caught up!</p>
                <p className="text-xs text-gray-500 mt-1">
                  No new alerts at the moment
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {alerts.map((alert) => {
                  const Icon = getIcon(alert.type);
                  const colorClass = getColor(alert.type);

                  return (
                    <motion.div
                      key={alert.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 hover:bg-gray-50 transition-colors relative ${
                        !alert.read ? "bg-blue-50/30" : ""
                      }`}
                    >
                      {!alert.read && (
                        <span className="absolute top-4 left-2 h-2 w-2 bg-blue-600 rounded-full" />
                      )}

                      <div className="flex gap-3">
                        <div className={`p-2 rounded-lg ${colorClass} h-fit mt-0.5`}>
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-medium text-gray-900 leading-snug">
                              {alert.title}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => dismissAlert(alert.id)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 flex-shrink-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>

                          <p className="text-xs text-gray-600 leading-relaxed mb-2">
                            {alert.message}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {formatTime(alert.timestamp)}
                            </span>
                            {alert.confidence && (
                              <Badge variant="secondary" className="text-xs h-5">
                                {alert.confidence}% confidence
                              </Badge>
                            )}
                          </div>

                          {alert.action && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                markAsRead(alert.id);
                                setIsOpen(false);
                                window.location.href = alert.action!.link;
                              }}
                              className="mt-2 h-7 text-xs gap-1"
                            >
                              {alert.action.label}
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>

        <div className="p-3 border-t bg-gray-50">
          <Button variant="ghost" className="w-full text-xs h-8">
            View all alerts
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
