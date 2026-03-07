import { useState } from "react";
import {
  TrendingUp,
  Eye,
  Users,
  Clock,
  ArrowUpRight,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const viewsData = [
  { date: "Feb 17", views: 4200, uniqueVisitors: 2800 },
  { date: "Feb 18", views: 3800, uniqueVisitors: 2500 },
  { date: "Feb 19", views: 5100, uniqueVisitors: 3200 },
  { date: "Feb 20", views: 4600, uniqueVisitors: 3000 },
  { date: "Feb 21", views: 5800, uniqueVisitors: 3800 },
  { date: "Feb 22", views: 6200, uniqueVisitors: 4100 },
  { date: "Feb 23", views: 5400, uniqueVisitors: 3600 },
];

const categoryData = [
  { name: "Development", value: 45, color: "#4f46e5" },
  { name: "Backend", value: 32, color: "#10b981" },
  { name: "Design", value: 28, color: "#ec4899" },
  { name: "Security", value: 19, color: "#ef4444" },
  { name: "DevOps", value: 24, color: "#f59e0b" },
];

const engagementData = [
  { month: "Oct", articles: 12, views: 24000, avgTime: 4.2 },
  { month: "Nov", articles: 18, views: 32000, avgTime: 4.5 },
  { month: "Dec", articles: 22, views: 41000, avgTime: 4.8 },
  { month: "Jan", articles: 28, views: 52000, avgTime: 5.1 },
  { month: "Feb", articles: 35, views: 67000, avgTime: 5.4 },
];

const topArticles = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    views: 12453,
    change: "+23%",
  },
  {
    id: 2,
    title: "Database Optimization Techniques",
    views: 10241,
    change: "+18%",
  },
  {
    id: 3,
    title: "API Security Best Practices",
    views: 8987,
    change: "+15%",
  },
  {
    id: 4,
    title: "Advanced TypeScript Patterns",
    views: 7876,
    change: "+12%",
  },
  {
    id: 5,
    title: "CSS Grid Layout Masterclass",
    views: 6198,
    change: "+9%",
  },
];

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold mb-2">Analytics</h1>
          <p className="text-muted-foreground text-[14px]">
            Track your knowledge base performance and insights
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[13px] text-muted-foreground mb-1">
                  Total Views
                </p>
                <h3 className="text-[28px] font-semibold mb-2">67.2K</h3>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-[13px] font-medium text-emerald-600">
                    +18.2%
                  </span>
                  <span className="text-[13px] text-muted-foreground ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[13px] text-muted-foreground mb-1">
                  Unique Visitors
                </p>
                <h3 className="text-[28px] font-semibold mb-2">24.5K</h3>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-[13px] font-medium text-emerald-600">
                    +15.3%
                  </span>
                  <span className="text-[13px] text-muted-foreground ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[13px] text-muted-foreground mb-1">
                  Avg. Read Time
                </p>
                <h3 className="text-[28px] font-semibold mb-2">5.4m</h3>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-[13px] font-medium text-emerald-600">
                    +6.7%
                  </span>
                  <span className="text-[13px] text-muted-foreground ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[13px] text-muted-foreground mb-1">
                  Engagement Rate
                </p>
                <h3 className="text-[28px] font-semibold mb-2">73%</h3>
                <div className="flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-[13px] font-medium text-emerald-600">
                    +4.1%
                  </span>
                  <span className="text-[13px] text-muted-foreground ml-1">
                    vs last period
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Views Chart */}
        <div className="lg:col-span-2">
          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-[18px]">Views Over Time</CardTitle>
              <Tabs defaultValue="views" className="h-9">
                <TabsList className="h-9 bg-muted">
                  <TabsTrigger value="views" className="text-[12px] h-7 px-3">
                    Views
                  </TabsTrigger>
                  <TabsTrigger value="visitors" className="text-[12px] h-7 px-3">
                    Visitors
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={viewsData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    stroke="#9ca3af"
                  />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Category Distribution */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-[18px]">Articles by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-[13px]">{category.name}</span>
                  </div>
                  <span className="text-[13px] font-medium">{category.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Trends and Top Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-[18px]">Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="articles" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Articles */}
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-[18px]">Top Performing Articles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topArticles.map((article, index) => (
              <div
                key={article.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-semibold text-[14px] text-primary shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium truncate">
                    {article.title}
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    {article.views.toLocaleString()} views
                  </p>
                </div>
                <div className="text-[13px] font-medium text-emerald-600">
                  {article.change}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}