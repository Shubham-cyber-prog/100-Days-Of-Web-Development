import { Link } from "react-router";
import { FileText, Users, Eye, HardDrive, Plus, Upload, UserPlus, TrendingUp, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const stats = [
  { icon: FileText, label: "Total Posts", value: "247", change: "+12%", trend: "up" },
  { icon: Users, label: "Active Users", value: "1,429", change: "+8%", trend: "up" },
  { icon: Eye, label: "Total Views", value: "54.2K", change: "+23%", trend: "up" },
  { icon: HardDrive, label: "Storage Used", value: "12.4 GB", change: "15.8 GB", trend: "neutral" },
];

const recentActivity = [
  { action: "New post published", user: "Sarah Chen", time: "2 minutes ago", type: "published" },
  { action: "User registered", user: "Mike Johnson", time: "15 minutes ago", type: "user" },
  { action: "Media uploaded", user: "Alex Kim", time: "1 hour ago", type: "media" },
  { action: "Post updated", user: "Emma Wilson", time: "2 hours ago", type: "draft" },
  { action: "Settings changed", user: "Admin", time: "3 hours ago", type: "settings" },
];

const draftContent = [
  { title: "Getting Started with React 19", author: "Sarah Chen", lastEdited: "2 hours ago", status: "draft" },
  { title: "10 Tips for Better UX Design", author: "Mike Johnson", lastEdited: "1 day ago", status: "draft" },
  { title: "Introduction to TypeScript", author: "Alex Kim", lastEdited: "2 days ago", status: "draft" },
  { title: "Building Scalable APIs", author: "Emma Wilson", lastEdited: "3 days ago", status: "draft" },
];

export function Dashboard() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/editor">
            <Button size="md">
              <Plus className="size-4" />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="relative overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl text-foreground mb-2">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.trend === "up" && <TrendingUp className="size-3 text-green-600" />}
                      <span className={stat.trend === "up" ? "text-sm text-green-600" : "text-sm text-muted-foreground"}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="size-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="size-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/editor">
              <Button variant="secondary" className="w-full justify-start" size="md">
                <Plus className="size-4" />
                New Post
              </Button>
            </Link>
            <Link to="/media">
              <Button variant="secondary" className="w-full justify-start" size="md">
                <Upload className="size-4" />
                Upload Media
              </Button>
            </Link>
            <Link to="/users">
              <Button variant="secondary" className="w-full justify-start" size="md">
                <UserPlus className="size-4" />
                Add User
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Draft Content Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Draft Content</CardTitle>
          <Link to="/content">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {draftContent.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex-1">
                  <p className="text-foreground mb-1">{item.title}</p>
                  <p className="text-sm text-muted-foreground">by {item.author}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{item.lastEdited}</span>
                  <Badge variant="draft">Draft</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
