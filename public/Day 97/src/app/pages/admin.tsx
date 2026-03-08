import { Users, FileText, TrendingUp, Activity, MoreHorizontal, Search, Shield, Ban, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const adminStats = [
  { title: "Total Users", value: "1,284", change: "+18%", icon: Users, color: "text-primary" },
  { title: "Total Issues", value: "342", change: "+12%", icon: FileText, color: "text-accent" },
  { title: "Active Events", value: "24", change: "+8%", icon: Activity, color: "text-secondary" },
  { title: "Engagement Rate", value: "87%", change: "+5%", icon: TrendingUp, color: "text-success" },
];

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", joinedDate: "Jan 15, 2025", avatar: "JD" },
  { id: 2, name: "Sarah Miller", email: "sarah@example.com", role: "Moderator", status: "Active", joinedDate: "Jan 20, 2025", avatar: "SM" },
  { id: 3, name: "Mike Chen", email: "mike@example.com", role: "Member", status: "Active", joinedDate: "Feb 1, 2026", avatar: "MC" },
  { id: 4, name: "Emily Rodriguez", email: "emily@example.com", role: "Member", status: "Active", joinedDate: "Feb 5, 2026", avatar: "ER" },
  { id: 5, name: "David Kim", email: "david@example.com", role: "Member", status: "Suspended", joinedDate: "Feb 10, 2026", avatar: "DK" },
];

const pendingIssues = [
  { id: 1, title: "Broken streetlight on Oak Avenue", reporter: "John Doe", category: "Infrastructure", priority: "High", reportedDate: "Feb 20, 2026" },
  { id: 2, title: "Graffiti on park bench", reporter: "Mike Chen", category: "Environment", priority: "Low", reportedDate: "Feb 19, 2026" },
  { id: 3, title: "Noise complaint - Construction", reporter: "Emily Rodriguez", category: "Safety", priority: "High", reportedDate: "Feb 18, 2026" },
  { id: 4, name: "Pothole near community center", reporter: "Sarah Miller", category: "Infrastructure", priority: "Medium", reportedDate: "Feb 17, 2026" },
];

const activityData = [
  { month: "Aug", users: 845, issues: 120, events: 15 },
  { month: "Sep", users: 923, issues: 145, events: 18 },
  { month: "Oct", users: 1034, issues: 167, events: 22 },
  { month: "Nov", users: 1156, issues: 189, events: 20 },
  { month: "Dec", users: 1198, issues: 234, events: 28 },
  { month: "Jan", users: 1245, issues: 298, events: 31 },
  { month: "Feb", users: 1284, issues: 342, events: 24 },
];

const userEngagementData = [
  { name: "Active Daily", value: 45, color: "#4f46e5" },
  { name: "Active Weekly", value: 32, color: "#14b8a6" },
  { name: "Inactive", value: 23, color: "#f97316" },
];

const systemLogs = [
  { id: 1, action: "User created", user: "John Doe", timestamp: "2h ago", status: "success" },
  { id: 2, action: "Issue reported", user: "Sarah Miller", timestamp: "3h ago", status: "success" },
  { id: 3, action: "Login failed", user: "Unknown", timestamp: "4h ago", status: "error" },
  { id: 4, action: "Event created", user: "Mike Chen", timestamp: "5h ago", status: "success" },
  { id: 5, action: "Poll closed", user: "System", timestamp: "6h ago", status: "info" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-success text-success-foreground";
    case "Suspended": return "bg-error text-error-foreground";
    case "Pending": return "bg-warning text-warning-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-error text-error-foreground";
    case "Medium": return "bg-warning text-warning-foreground";
    case "Low": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getLogStatusColor = (status: string) => {
  switch (status) {
    case "success": return "bg-success text-success-foreground";
    case "error": return "bg-error text-error-foreground";
    case "info": return "bg-info text-info-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Shield className="size-6 text-primary" />
        <div>
          <h1>Admin Panel</h1>
          <p className="text-muted-foreground">Manage users, moderate content, and view analytics</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat, index) => {
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
        {/* Growth Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>User, issue, and event trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="issues" stroke="hsl(var(--accent))" strokeWidth={2} />
                <Line type="monotone" dataKey="events" stroke="hsl(var(--secondary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
            <CardDescription>Activity distribution across users</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userEngagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {userEngagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {userEngagementData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="size-3 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Logs</CardTitle>
            <CardDescription>Latest system activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <Badge className={getLogStatusColor(log.status)} variant="secondary">
                    {log.status}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.user} • {log.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tables */}
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="issues">Issue Moderation</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Manage community members and permissions</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-9 bg-input-background w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarImage src="" alt={user.name} />
                            <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)} variant="secondary">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.joinedDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Shield className="size-4 mr-2" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Ban className="size-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Issues</CardTitle>
                  <CardDescription>Review and moderate reported issues</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search issues..."
                    className="pl-9 bg-input-background w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Reported Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium max-w-xs truncate">{issue.title}</TableCell>
                      <TableCell>{issue.reporter}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{issue.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(issue.priority)} variant="secondary">
                          {issue.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{issue.reportedDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <CheckCircle2 className="size-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Assign to Department
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
