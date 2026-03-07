import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  mockTrendData,
  mockCategoryData,
  mockActivityData,
} from "../data/mock-data";
import { motion } from "motion/react";
import { Badge } from "../components/ui/badge";

const radarData = [
  { category: "Toxicity", value: 85, fullMark: 100 },
  { category: "Spam", value: 92, fullMark: 100 },
  { category: "Harassment", value: 78, fullMark: 100 },
  { category: "Hate Speech", value: 88, fullMark: 100 },
  { category: "Policy", value: 95, fullMark: 100 },
];

const accuracyTrend = [
  { week: "Week 1", accuracy: 89.5 },
  { week: "Week 2", accuracy: 91.2 },
  { week: "Week 3", accuracy: 90.8 },
  { week: "Week 4", accuracy: 92.1 },
  { week: "Week 5", accuracy: 93.4 },
  { week: "Week 6", accuracy: 94.2 },
];

export default function AIInsights() {
  const insightCards = [
    {
      title: "Model Accuracy",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg Processing Time",
      value: "2.3s",
      change: "-0.4s",
      trend: "up",
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "False Positive Rate",
      value: "5.8%",
      change: "+0.3%",
      trend: "down",
      icon: AlertCircle,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Auto-Resolution Rate",
      value: "76.4%",
      change: "+4.2%",
      trend: "up",
      icon: CheckCircle2,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl mb-1">AI Insights</h1>
        <p className="text-muted-foreground">
          Performance analytics and detection trends
        </p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insightCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      {card.title}
                    </p>
                    <h3 className="text-3xl mb-2">{card.value}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      {card.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span
                        className={
                          card.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {card.change}
                      </span>
                      <span className="text-muted-foreground">this month</span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}
                  >
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Accuracy Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={accuracyTrend}>
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis domain={[85, 100]} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#colorAccuracy)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Model Performance by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Model Performance by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="category" stroke="#9ca3af" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
                <Radar
                  name="Accuracy"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>24-Hour Activity Heatmap</CardTitle>
          <Badge variant="secondary">Last 24 hours</Badge>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="flags" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Detection Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Detection Volume by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockCategoryData}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="category" type="category" stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Moderation Comparison</CardTitle>
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
                  dot={{ fill: "#6366f1", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="approved"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", r: 4 }}
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
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Increase Toxicity Detection Threshold",
                description:
                  "Consider raising the confidence threshold for toxicity from 70% to 75% to reduce false positives.",
                impact: "High",
                type: "optimization",
              },
              {
                title: "Review Spam Detection Rules",
                description:
                  "Recent patterns suggest updating spam detection keywords to catch new promotional tactics.",
                impact: "Medium",
                type: "update",
              },
              {
                title: "Peak Hour Staffing",
                description:
                  "Activity peaks between 2pm-6pm. Consider additional moderator coverage during these hours.",
                impact: "Medium",
                type: "resource",
              },
            ].map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{rec.title}</h4>
                      <Badge
                        variant={
                          rec.impact === "High" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {rec.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {rec.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
