import { TrendingUp, AlertTriangle, Calendar, Users, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const statsCards = [
  {
    title: "Active Issues",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: AlertTriangle,
    color: "text-accent",
  },
  {
    title: "Upcoming Events",
    value: "8",
    change: "+3",
    trend: "up",
    icon: Calendar,
    color: "text-secondary",
  },
  {
    title: "Community Members",
    value: "1,284",
    change: "+18%",
    trend: "up",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Resolved This Month",
    value: "156",
    change: "+23%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-success",
  },
];

const recentIssues = [
  { id: 1, title: "Broken streetlight on Oak Avenue", status: "In Progress", priority: "High", reporter: "John D.", time: "2h ago" },
  { id: 2, title: "Pothole near community center", status: "Open", priority: "Medium", reporter: "Sarah M.", time: "5h ago" },
  { id: 3, title: "Graffiti on park bench", status: "Assigned", priority: "Low", reporter: "Mike C.", time: "1d ago" },
  { id: 4, title: "Noise complaint - Construction site", status: "Open", priority: "High", reporter: "Emily R.", time: "2d ago" },
];

const upcomingEvents = [
  { id: 1, title: "Community Clean-up Day", date: "Feb 24, 2026", attendees: 48, time: "9:00 AM" },
  { id: 2, title: "Town Hall Meeting", date: "Feb 26, 2026", attendees: 124, time: "6:00 PM" },
  { id: 3, title: "Neighborhood Watch", date: "Feb 28, 2026", attendees: 32, time: "7:00 PM" },
];

const activePoll = {
  question: "Should we install new benches in Central Park?",
  totalVotes: 342,
  options: [
    { name: "Yes", votes: 234, percentage: 68 },
    { name: "No", votes: 108, percentage: 32 },
  ],
  endsIn: "2 days",
};

const activityData = [
  { day: "Mon", issues: 12, events: 3 },
  { day: "Tue", issues: 19, events: 5 },
  { day: "Wed", issues: 15, events: 4 },
  { day: "Thu", issues: 22, events: 7 },
  { day: "Fri", issues: 18, events: 6 },
  { day: "Sat", issues: 8, events: 9 },
  { day: "Sun", issues: 6, events: 8 },
];

const issuesByCategory = [
  { name: "Infrastructure", value: 45, color: "#4f46e5" },
  { name: "Safety", value: 30, color: "#14b8a6" },
  { name: "Environment", value: 15, color: "#f97316" },
  { name: "Other", value: 10, color: "#eab308" },
];

const recentActivity = [
  { user: "Sarah Johnson", action: "reported", item: "Broken streetlight", time: "2h ago", avatar: "SJ" },
  { user: "Michael Chen", action: "commented on", item: "Park maintenance", time: "3h ago", avatar: "MC" },
  { user: "Emily Rodriguez", action: "created event", item: "Community BBQ", time: "5h ago", avatar: "ER" },
  { user: "David Kim", action: "voted in", item: "Park bench poll", time: "6h ago", avatar: "DK" },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-error text-error-foreground";
    case "Medium": return "bg-warning text-warning-foreground";
    case "Low": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open": return "bg-info text-info-foreground";
    case "In Progress": return "bg-warning text-warning-foreground";
    case "Assigned": return "bg-secondary text-secondary-foreground";
    case "Resolved": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening in your community.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`size-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                    <Icon className="size-5" />
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="size-3" />
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Issues reported and events created this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar dataKey="issues" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="events" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>Latest issues reported by community members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="flex flex-col gap-2 pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{issue.title}</p>
                      <p className="text-sm text-muted-foreground">by {issue.reporter} • {issue.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(issue.priority)} variant="secondary">
                      {issue.priority}
                    </Badge>
                    <Badge className={getStatusColor(issue.status)} variant="secondary">
                      {issue.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">View all issues</Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Don't miss these community gatherings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <Users className="size-3" />
                      {event.attendees} attending
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">View all events</Button>
          </CardContent>
        </Card>

        {/* Active Poll */}
        <Card>
          <CardHeader>
            <CardTitle>Active Poll</CardTitle>
            <CardDescription>Make your voice heard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-4">{activePoll.question}</p>
                <div className="space-y-3">
                  {activePoll.options.map((option, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{option.name}</span>
                        <span className="text-muted-foreground">{option.votes} votes ({option.percentage}%)</span>
                      </div>
                      <Progress value={option.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="size-3" />
                  Ends in {activePoll.endsIn}
                </div>
                <div className="text-sm text-muted-foreground">{activePoll.totalVotes} total votes</div>
              </div>
              <Button className="w-full">Vote Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Issues by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
            <CardDescription>Distribution of reported issues</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={issuesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {issuesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {issuesByCategory.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="size-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="text-sm text-muted-foreground">{category.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions from community members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src="" alt={activity.user} />
                    <AvatarFallback>{activity.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.item}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <MessageSquare className="size-4 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
