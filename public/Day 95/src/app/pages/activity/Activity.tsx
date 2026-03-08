import { Activity, User, FileEdit, Trash2, UserPlus, Settings, Download, Upload } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState } from "react";

interface ActivityLog {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  action: string;
  target: string;
  type: "create" | "update" | "delete" | "login" | "upload" | "download";
  timestamp: string;
  details?: string;
}

const activityIcons = {
  create: UserPlus,
  update: FileEdit,
  delete: Trash2,
  login: User,
  upload: Upload,
  download: Download,
};

const activityColors = {
  create: "bg-green-50 text-green-600",
  update: "bg-blue-50 text-blue-600",
  delete: "bg-red-50 text-red-600",
  login: "bg-purple-50 text-purple-600",
  upload: "bg-orange-50 text-orange-600",
  download: "bg-teal-50 text-teal-600",
};

export default function ActivityPage() {
  const [timeFilter, setTimeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const activities: ActivityLog[] = [
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        initials: "SJ",
      },
      action: "Created",
      target: "new project 'Mobile App Redesign'",
      type: "create",
      timestamp: "2 minutes ago",
      details: "Added 5 team members and set initial milestones",
    },
    {
      id: "2",
      user: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
        initials: "MC",
      },
      action: "Updated",
      target: "task status in 'Website Redesign'",
      type: "update",
      timestamp: "15 minutes ago",
      details: "Changed status from 'In Progress' to 'Completed'",
    },
    {
      id: "3",
      user: {
        name: "Emily Davis",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
        initials: "ED",
      },
      action: "Uploaded",
      target: "3 design files to 'Brand Guidelines'",
      type: "upload",
      timestamp: "1 hour ago",
      details: "Files: logo-final.svg, brand-colors.pdf, typography.pdf",
    },
    {
      id: "4",
      user: {
        name: "Alex Thompson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        initials: "AT",
      },
      action: "Logged in",
      target: "from new device",
      type: "login",
      timestamp: "2 hours ago",
      details: "Chrome on MacOS, Location: San Francisco, CA",
    },
    {
      id: "5",
      user: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        initials: "SJ",
      },
      action: "Downloaded",
      target: "monthly report",
      type: "download",
      timestamp: "3 hours ago",
      details: "Format: PDF, Size: 2.4 MB",
    },
    {
      id: "6",
      user: {
        name: "Admin User",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
        initials: "AU",
      },
      action: "Deleted",
      target: "user account 'John Doe'",
      type: "delete",
      timestamp: "5 hours ago",
      details: "Reason: Account inactivity for 90 days",
    },
    {
      id: "7",
      user: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
        initials: "MC",
      },
      action: "Created",
      target: "5 new tasks in 'Q1 Planning'",
      type: "create",
      timestamp: "1 day ago",
      details: "Assigned to various team members with due dates",
    },
    {
      id: "8",
      user: {
        name: "Emily Davis",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
        initials: "ED",
      },
      action: "Updated",
      target: "team settings",
      type: "update",
      timestamp: "2 days ago",
      details: "Modified permissions for 3 team members",
    },
  ];

  const filteredActivities = activities.filter(activity => {
    if (typeFilter !== "all" && activity.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Activity Log</h1>
          <p className="text-slate-600 mt-1">
            Track all actions and changes in your workspace
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-slate-400" />
          <Badge variant="secondary">{filteredActivities.length} activities</Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="create">Created</SelectItem>
              <SelectItem value="update">Updated</SelectItem>
              <SelectItem value="delete">Deleted</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="upload">Upload</SelectItem>
              <SelectItem value="download">Download</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Activity Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

        <div className="space-y-6">
          {filteredActivities.map((activity, index) => {
            const Icon = activityIcons[activity.type];
            const iconColor = activityColors[activity.type];

            return (
              <div key={activity.id} className="relative pl-20">
                {/* Timeline dot */}
                <div className={`absolute left-0 w-16 h-16 rounded-xl flex items-center justify-center ${iconColor} border-4 border-white shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>

                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback>{activity.user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900">{activity.user.name}</p>
                        <p className="text-sm text-slate-500">{activity.timestamp}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {activity.type}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-slate-700">
                      <span className="font-medium">{activity.action}</span>{" "}
                      <span className="text-slate-600">{activity.target}</span>
                    </p>
                    {activity.details && (
                      <p className="text-sm text-slate-500 bg-slate-50 rounded-lg p-3">
                        {activity.details}
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {filteredActivities.length === 0 && (
        <Card className="p-12 text-center">
          <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 mb-2">No activity found</h3>
          <p className="text-slate-600">Try adjusting your filters</p>
        </Card>
      )}
    </div>
  );
}
