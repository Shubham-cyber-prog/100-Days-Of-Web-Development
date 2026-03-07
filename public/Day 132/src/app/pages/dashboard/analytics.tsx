import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Activity, Users, MessageSquare, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
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

export default function AnalyticsPage() {
  const activityData = [
    { name: "Mon", tasks: 12, chats: 8, automations: 5 },
    { name: "Tue", tasks: 19, chats: 12, automations: 7 },
    { name: "Wed", tasks: 15, chats: 10, automations: 6 },
    { name: "Thu", tasks: 22, chats: 15, automations: 9 },
    { name: "Fri", tasks: 18, chats: 11, automations: 8 },
    { name: "Sat", tasks: 8, chats: 5, automations: 3 },
    { name: "Sun", tasks: 6, chats: 4, automations: 2 },
  ];

  const performanceData = [
    { name: "Week 1", productivity: 65 },
    { name: "Week 2", productivity: 72 },
    { name: "Week 3", productivity: 78 },
    { name: "Week 4", productivity: 85 },
  ];

  const categoryData = [
    { name: "Tasks", value: 45, color: "#4f46e5" },
    { name: "Chats", value: 30, color: "#06b6d4" },
    { name: "Automations", value: 25, color: "#8b5cf6" },
  ];

  const stats = [
    {
      label: "Total Activity",
      value: "1,248",
      change: "+12.5%",
      trending: "up",
      icon: Activity,
      color: "text-blue-600",
    },
    {
      label: "Active Users",
      value: "342",
      change: "+8.2%",
      trending: "up",
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "Conversations",
      value: "856",
      change: "+15.3%",
      trending: "up",
      icon: MessageSquare,
      color: "text-cyan-600",
    },
    {
      label: "Automations",
      value: "124",
      change: "-2.4%",
      trending: "down",
      icon: Zap,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">Insights and performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <Badge
                    variant={stat.trending === "up" ? "default" : "destructive"}
                    className="rounded-full"
                  >
                    {stat.trending === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Tasks, chats, and automations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorChats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAutomations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="tasks"
                  stroke="#4f46e5"
                  fill="url(#colorTasks)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="chats"
                  stroke="#06b6d4"
                  fill="url(#colorChats)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="automations"
                  stroke="#8b5cf6"
                  fill="url(#colorAutomations)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Trend */}
        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardHeader>
            <CardTitle>Productivity Trend</CardTitle>
            <CardDescription>Monthly performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="productivity"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ fill: "#4f46e5", r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Distribution */}
        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Usage Comparison */}
        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardHeader>
            <CardTitle>Daily Comparison</CardTitle>
            <CardDescription>Activity levels throughout the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="tasks" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                <Bar dataKey="chats" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                <Bar dataKey="automations" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold">Peak Performance</h3>
            </div>
            <p className="text-sm text-gray-600">
              Your productivity increased by 23% this week compared to last week.
            </p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold">Most Active Day</h3>
            </div>
            <p className="text-sm text-gray-600">
              Thursday had the highest activity with 46 total interactions.
            </p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold">Automation Impact</h3>
            </div>
            <p className="text-sm text-gray-600">
              Automations saved you an estimated 18 hours this week.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
