import {
  TrendingUp,
  FileText,
  Eye,
  Users,
  FolderOpen,
  Clock,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const stats = [
  {
    title: "Total Articles",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Views",
    value: "45.2K",
    change: "+18.2%",
    trend: "up",
    icon: Eye,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
  },
  {
    title: "Contributors",
    value: "48",
    change: "+4.3%",
    trend: "up",
    icon: Users,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950",
  },
  {
    title: "Categories",
    value: "24",
    change: "-2.1%",
    trend: "down",
    icon: FolderOpen,
    color: "text-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950",
  },
];

const recentArticles = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    category: "Development",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    views: 2453,
    status: "published",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    category: "Development",
    author: {
      name: "Michael Torres",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    views: 1876,
    status: "published",
    lastUpdated: "5 hours ago",
  },
  {
    id: 3,
    title: "Database Optimization Techniques",
    category: "Backend",
    author: {
      name: "Emily Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    views: 3241,
    status: "published",
    lastUpdated: "1 day ago",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    category: "Design",
    author: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
    views: 1543,
    status: "draft",
    lastUpdated: "2 days ago",
  },
  {
    id: 5,
    title: "API Security Best Practices",
    category: "Security",
    author: {
      name: "Lisa Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    },
    views: 2987,
    status: "published",
    lastUpdated: "3 days ago",
  },
];

const activities = [
  {
    id: 1,
    type: "published",
    user: "Sarah Chen",
    action: "published",
    target: "Getting Started with React Hooks",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "edited",
    user: "Michael Torres",
    action: "edited",
    target: "Advanced TypeScript Patterns",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "commented",
    user: "Emily Johnson",
    action: "commented on",
    target: "Database Optimization Techniques",
    time: "6 hours ago",
  },
  {
    id: 4,
    type: "created",
    user: "David Kim",
    action: "created",
    target: "UI/UX Design Principles",
    time: "1 day ago",
  },
];

export function DashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-semibold mb-2">Dashboard</h1>
        <p className="text-muted-foreground text-[14px]">
          Welcome back! Here's what's happening with your knowledge base.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[13px] text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-[28px] font-semibold mb-2">
                      {stat.value}
                    </h3>
                    <div className="flex items-center gap-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`text-[13px] font-medium ${
                          stat.trend === "up"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-[13px] text-muted-foreground ml-1">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Articles */}
        <div className="lg:col-span-2">
          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-[18px]">Recent Articles</CardTitle>
              <Button variant="ghost" size="sm" className="text-[13px]">
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="px-6 py-4 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-[14px] truncate">
                            {article.title}
                          </h4>
                          <Badge
                            variant={
                              article.status === "published"
                                ? "default"
                                : "secondary"
                            }
                            className="text-[11px] px-2 py-0"
                          >
                            {article.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarImage src={article.author.avatar} />
                              <AvatarFallback>
                                {article.author.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span>{article.author.name}</span>
                          </div>
                          <span>•</span>
                          <span>{article.category}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-[12px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.lastUpdated}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <div>
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-[18px]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] mb-1">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-muted-foreground">
                        {" "}
                        {activity.action}{" "}
                      </span>
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-[12px] text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full text-[13px]">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}