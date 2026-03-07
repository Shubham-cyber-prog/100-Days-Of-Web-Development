import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Mail, TrendingUp, Users, MousePointerClick, ArrowUpRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const performanceData = [
  { date: "Jan 15", opens: 2400, clicks: 1200 },
  { date: "Jan 16", opens: 1398, clicks: 900 },
  { date: "Jan 17", opens: 4800, clicks: 2100 },
  { date: "Jan 18", opens: 3908, clicks: 1800 },
  { date: "Jan 19", opens: 4800, clicks: 2400 },
  { date: "Jan 20", opens: 3800, clicks: 2100 },
  { date: "Jan 21", opens: 5300, clicks: 2700 },
];

const recentCampaigns = [
  { id: 1, name: "Spring Sale Launch", status: "Sent", openRate: "45.2%", sent: "15,432", date: "2 hours ago" },
  { id: 2, name: "Product Update Newsletter", status: "Sent", openRate: "38.7%", sent: "12,891", date: "1 day ago" },
  { id: 3, name: "Customer Feedback Request", status: "Scheduled", openRate: "-", sent: "8,234", date: "Tomorrow at 9 AM" },
  { id: 4, name: "Weekly Digest #42", status: "Draft", openRate: "-", sent: "-", date: "Not scheduled" },
];

const aiSuggestions = [
  {
    title: "Optimize Send Time",
    description: "Send your next campaign at 10 AM for 15% better open rates",
    type: "timing",
  },
  {
    title: "Segment High Engagers",
    description: "Create a segment of users with 50%+ open rate (2,341 contacts)",
    type: "audience",
  },
  {
    title: "A/B Test Subject Lines",
    description: "Test emoji vs no-emoji subject lines for better performance",
    type: "content",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your email marketing overview
          </p>
        </div>
        <Button onClick={() => navigate("/generate")} className="gap-2">
          <Sparkles className="w-4 h-4" />
          Generate Email
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-secondary" />
              <span className="text-secondary">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.3%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-secondary" />
              <span className="text-secondary">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.7%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-secondary" />
              <span className="text-secondary">+3.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,891</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-secondary" />
              <span className="text-secondary">+1,234</span> new this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Opens and clicks over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorOpens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="opens"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorOpens)"
                  />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorClicks)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <CardTitle>AI Suggestions</CardTitle>
            </div>
            <CardDescription>
              Optimize your campaigns with AI insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer group"
              >
                <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">
                  {suggestion.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {suggestion.description}
                </p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Suggestions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
          <CardDescription>Your latest email campaigns and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => navigate("/campaigns")}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{campaign.name}</h4>
                    <p className="text-sm text-muted-foreground">{campaign.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-medium">{campaign.openRate}</p>
                    <p className="text-xs text-muted-foreground">Open Rate</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{campaign.sent}</p>
                    <p className="text-xs text-muted-foreground">Sent</p>
                  </div>
                  <Badge
                    variant={
                      campaign.status === "Sent"
                        ? "default"
                        : campaign.status === "Scheduled"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4">
            View All Campaigns
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
