import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useState } from "react";
import { Link } from "react-router";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  mockDashboardStats,
  mockFlaggedContent,
  mockTrendData,
  mockConfidenceData,
  mockCategoryData,
} from "../data/mock-data";

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"];

export default function Dashboard() {
  const stats = mockDashboardStats;
  const recentFlags = mockFlaggedContent.slice(0, 5);

  const statCards = [
    {
      title: "Total Flagged",
      value: stats.totalFlagged.toLocaleString(),
      icon: AlertTriangle,
      trend: "+12.5%",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: Clock,
      trend: "-8.2%",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Approved Today",
      value: stats.approvedToday,
      icon: CheckCircle,
      trend: "+5.4%",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Rejected Today",
      value: stats.rejectedToday,
      icon: XCircle,
      trend: "+18.9%",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of content moderation activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl mb-2">{stat.value}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-green-500">{stat.trend}</span>
                      <span className="text-muted-foreground">vs last week</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Moderation Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Moderation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="flagged"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ fill: "#6366f1" }}
                />
                <Line
                  type="monotone"
                  dataKey="approved"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981" }}
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444" }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-sm text-muted-foreground">Flagged</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-muted-foreground">Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-muted-foreground">Rejected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Confidence Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>AI Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockConfidenceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ range, percent }) =>
                    `${range} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {mockConfidenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Feed */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Flags</CardTitle>
            <Badge variant="outline" className="gap-1">
              <Activity className="w-3 h-3" />
              Live
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFlags.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {item.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{item.user.name}</span>
                      <Badge
                        variant="outline"
                        className={getSeverityColor(item.severity)}
                      >
                        {item.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="text-foreground font-medium">
                          {item.flagType}
                        </span>
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Confidence
                      </span>
                      <Badge
                        variant="secondary"
                        className={
                          item.confidence >= 90
                            ? "bg-green-100 text-green-700"
                            : item.confidence >= 70
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {item.confidence}%
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All in Queue
            </Button>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Violation Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCategoryData.map((category, index) => (
                <div key={category.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{category.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.count}
                    </span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                AI Accuracy Rate
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl">{stats.accuracyRate}%</span>
                <span className="text-sm text-green-500 mb-1">+2.1%</span>
              </div>
              <Progress value={stats.accuracyRate} className="h-2" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                Avg Response Time
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl">{stats.avgResponseTime}</span>
                <span className="text-sm text-green-500 mb-1">-15%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                False Positive Rate
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl">5.8%</span>
                <span className="text-sm text-red-500 mb-1">+0.3%</span>
              </div>
              <Progress value={5.8} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}