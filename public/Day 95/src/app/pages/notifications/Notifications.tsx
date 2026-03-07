import { Bell, Check, Trash2, Filter, Mail, MessageSquare, UserPlus, FileText, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useState } from "react";
import { Card } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface Notification {
  id: string;
  type: "message" | "user" | "system" | "alert";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notificationIcons = {
  message: MessageSquare,
  user: UserPlus,
  system: FileText,
  alert: AlertCircle,
};

const notificationColors = {
  message: "bg-blue-50 text-blue-600",
  user: "bg-green-50 text-green-600",
  system: "bg-purple-50 text-purple-600",
  alert: "bg-red-50 text-red-600",
};

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "New message from Sarah",
      description: "Hey! I reviewed your latest project proposal...",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "user",
      title: "New team member joined",
      description: "Alex Johnson has joined your workspace",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "system",
      title: "Project update",
      description: "Website Redesign project has been moved to In Progress",
      time: "4 hours ago",
      read: true,
    },
    {
      id: "4",
      type: "alert",
      title: "Payment reminder",
      description: "Your subscription will renew in 3 days",
      time: "1 day ago",
      read: false,
    },
    {
      id: "5",
      type: "message",
      title: "Comment on your task",
      description: "Michael commented: 'Great work on the dashboard!'",
      time: "2 days ago",
      read: true,
    },
    {
      id: "6",
      type: "system",
      title: "Backup completed",
      description: "Your weekly data backup was successful",
      time: "3 days ago",
      read: true,
    },
    {
      id: "7",
      type: "user",
      title: "Profile view",
      description: "15 people viewed your profile this week",
      time: "5 days ago",
      read: true,
    },
    {
      id: "8",
      type: "alert",
      title: "Security update",
      description: "New sign-in from Chrome on Windows",
      time: "1 week ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-600 mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="w-4 h-4 mr-2" />
            Mark all read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-slate-400" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread Only</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="user">User Activity</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="alert">Alerts</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary">{filteredNotifications.length} items</Badge>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="p-12 text-center">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">No notifications</h3>
            <p className="text-slate-600">You're all caught up!</p>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notificationIcons[notification.type];
            const iconColor = notificationColors[notification.type];
            
            return (
              <Card
                key={notification.id}
                className={`p-4 transition-all hover:shadow-md ${
                  !notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {notification.title}
                          {!notification.read && (
                            <Badge className="ml-2 bg-blue-500 text-white" variant="default">
                              New
                            </Badge>
                          )}
                        </h3>
                        <p className="text-slate-600 text-sm">{notification.description}</p>
                        <p className="text-slate-400 text-xs mt-2">{notification.time}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markAsRead(notification.id)}
                            className="hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNotification(notification.id)}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
