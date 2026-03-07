import { TrendingUp, Users, Eye, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const pageViewsData = [
  { name: "Mon", views: 2400 },
  { name: "Tue", views: 1398 },
  { name: "Wed", views: 9800 },
  { name: "Thu", views: 3908 },
  { name: "Fri", views: 4800 },
  { name: "Sat", views: 3800 },
  { name: "Sun", views: 4300 },
];

const userGrowthData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 1100 },
  { name: "May", users: 1400 },
  { name: "Jun", users: 1700 },
];

const topPages = [
  { title: "Getting Started with React 19", views: 12453, change: "+23%" },
  { title: "10 Tips for Better UX Design", views: 8921, change: "+15%" },
  { title: "Introduction to TypeScript", views: 7234, change: "+8%" },
  { title: "Building Scalable APIs", views: 5678, change: "+12%" },
];

export function Analytics() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your content performance and user engagement.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Eye, label: "Total Views", value: "54.2K", change: "+12.5%" },
          { icon: Users, label: "Visitors", value: "12.4K", change: "+8.2%" },
          { icon: TrendingUp, label: "Engagement Rate", value: "68%", change: "+5.1%" },
          { icon: Clock, label: "Avg. Session", value: "4m 32s", change: "+2.3%" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl text-foreground mb-2">{stat.value}</p>
                    <span className="text-sm text-green-600">{stat.change}</span>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pageViewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="views" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-primary)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="text-foreground">{page.title}</p>
                  <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                </div>
                <span className="text-sm text-green-600">{page.change}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
