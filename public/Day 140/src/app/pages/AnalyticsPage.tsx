import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, TrendingUp, TrendingDown, Calendar } from "lucide-react";

const openRateTrendData = [
  { date: "Week 1", openRate: 38, clickRate: 15 },
  { date: "Week 2", openRate: 41, clickRate: 17 },
  { date: "Week 3", openRate: 39, clickRate: 16 },
  { date: "Week 4", openRate: 45, clickRate: 19 },
  { date: "Week 5", openRate: 43, clickRate: 18 },
  { date: "Week 6", openRate: 47, clickRate: 20 },
  { date: "Week 7", openRate: 44, clickRate: 19 },
  { date: "Week 8", openRate: 49, clickRate: 21 },
];

const clickPerformanceData = [
  { campaign: "Spring Sale", clicks: 2340 },
  { campaign: "Newsletter #42", clicks: 1890 },
  { campaign: "Product Update", clicks: 2100 },
  { campaign: "Valentine's", clicks: 2890 },
  { campaign: "Flash Sale", clicks: 2450 },
];

const engagementData = [
  { name: "Highly Engaged", value: 35, color: "#22C55E" },
  { name: "Moderately Engaged", value: 45, color: "#4F46E5" },
  { name: "Low Engagement", value: 15, color: "#F59E0B" },
  { name: "Inactive", value: 5, color: "#EF4444" },
];

const deviceData = [
  { device: "Mobile", opens: 12500 },
  { device: "Desktop", opens: 8900 },
  { device: "Tablet", opens: 3400 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track performance and gain insights from your campaigns
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px] bg-background border">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Opens</CardDescription>
            <CardTitle className="text-3xl">124,892</CardTitle>
            <div className="flex items-center gap-1 text-sm text-secondary">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Clicks</CardDescription>
            <CardTitle className="text-3xl">48,234</CardTitle>
            <div className="flex items-center gap-1 text-sm text-secondary">
              <TrendingUp className="w-4 h-4" />
              <span>+8.3%</span>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg Open Rate</CardDescription>
            <CardTitle className="text-3xl">42.3%</CardTitle>
            <div className="flex items-center gap-1 text-sm text-secondary">
              <TrendingUp className="w-4 h-4" />
              <span>+5.2%</span>
            </div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Unsubscribe Rate</CardDescription>
            <CardTitle className="text-3xl">0.8%</CardTitle>
            <div className="flex items-center gap-1 text-sm text-secondary">
              <TrendingDown className="w-4 h-4" />
              <span>-0.3%</span>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Open Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Open & Click Rate Trend</CardTitle>
            <CardDescription>Performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={openRateTrendData}>
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="openRate"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    name="Open Rate %"
                    dot={{ fill: "#4F46E5", r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clickRate"
                    stroke="#22C55E"
                    strokeWidth={2}
                    name="Click Rate %"
                    dot={{ fill: "#22C55E", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Click Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Campaigns by Clicks</CardTitle>
            <CardDescription>Best performing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clickPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="campaign" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="clicks" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Audience Engagement</CardTitle>
            <CardDescription>Distribution by engagement level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {engagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Opens by Device</CardTitle>
            <CardDescription>Device usage breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis type="number" stroke="#64748B" fontSize={12} />
                  <YAxis type="category" dataKey="device" stroke="#64748B" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="opens" fill="#22C55E" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
          <CardDescription>AI-powered recommendations based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
              <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Open rates are improving</h4>
                <p className="text-sm text-muted-foreground">
                  Your open rates have increased by 12.5% over the last 30 days. Keep up the great subject lines!
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
              <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Mobile optimization working</h4>
                <p className="text-sm text-muted-foreground">
                  50% of your opens are on mobile devices. Your responsive design is paying off.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
              <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Consider re-engagement campaign</h4>
                <p className="text-sm text-muted-foreground">
                  5% of your audience is inactive. Try a re-engagement campaign to win them back.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
