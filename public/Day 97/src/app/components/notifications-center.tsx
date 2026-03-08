import { useState } from "react";
import { Bell, Check, X, MessageSquare, UserPlus, AlertCircle, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Separator } from "./ui/separator";

interface Notification {
  id: string;
  type: "comment" | "mention" | "issue" | "event" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "comment",
    title: "New comment on your issue",
    message: "Sarah Miller commented on 'Broken streetlight on Oak Avenue'",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "mention",
    title: "You were mentioned",
    message: "John Doe mentioned you in 'Community Cleanup Drive'",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "issue",
    title: "Issue status updated",
    message: "Your reported issue has been assigned to Public Works Dept.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "event",
    title: "Event reminder",
    message: "Town Hall Meeting starts in 3 days",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "New feature available",
    message: "Check out the new global search feature (Cmd/Ctrl + K)",
    time: "1 day ago",
    read: true,
  },
];

const notificationIcons = {
  comment: MessageSquare,
  mention: UserPlus,
  issue: AlertCircle,
  event: Calendar,
  system: Bell,
};

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 bg-accent">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="size-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => {
                const Icon = notificationIcons[notification.type];
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.read ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`shrink-0 size-10 rounded-full flex items-center justify-center ${
                          !notification.read
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="size-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              onClick={() => removeNotification(notification.id)}
                            >
                              <X className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
        <Separator />
        <div className="p-2">
          <Button variant="ghost" className="w-full justify-center text-sm" size="sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
