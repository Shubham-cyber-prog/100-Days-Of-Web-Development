import { MessageSquare, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const sentimentData = [
  { name: "Very Positive", value: 35, color: "#10b981" },
  { name: "Positive", value: 30, color: "#6ee7b7" },
  { name: "Neutral", value: 25, color: "#9ca3af" },
  { name: "Negative", value: 7, color: "#fbbf24" },
  { name: "Very Negative", value: 3, color: "#ef4444" },
];

const topicsData = [
  { topic: "Pricing", mentions: 1245, sentiment: 72 },
  { topic: "Features", mentions: 1120, sentiment: 88 },
  { topic: "Support", mentions: 980, sentiment: 91 },
  { topic: "Performance", mentions: 850, sentiment: 85 },
  { topic: "UX Design", mentions: 720, sentiment: 79 },
  { topic: "Integration", mentions: 650, sentiment: 68 },
];

const sentimentTrend = [
  { week: "Week 1", positive: 68, neutral: 22, negative: 10 },
  { week: "Week 2", positive: 70, neutral: 20, negative: 10 },
  { week: "Week 3", positive: 65, neutral: 25, negative: 10 },
  { week: "Week 4", positive: 72, neutral: 19, negative: 9 },
];

const wordCloudData = [
  { text: "Easy to use", size: 48, sentiment: "positive" },
  { text: "Great support", size: 42, sentiment: "positive" },
  { text: "Fast", size: 38, sentiment: "positive" },
  { text: "Expensive", size: 36, sentiment: "negative" },
  { text: "Intuitive", size: 34, sentiment: "positive" },
  { text: "Reliable", size: 32, sentiment: "positive" },
  { text: "Complex setup", size: 30, sentiment: "negative" },
  { text: "Powerful features", size: 28, sentiment: "positive" },
  { text: "Good value", size: 26, sentiment: "positive" },
  { text: "Slow loading", size: 24, sentiment: "negative" },
  { text: "Beautiful design", size: 22, sentiment: "positive" },
  { text: "Missing features", size: 20, sentiment: "negative" },
];

const clusters = [
  {
    name: "Product Experience",
    size: 2340,
    sentiment: 82,
    topics: ["UX", "Features", "Performance"],
  },
  {
    name: "Customer Service",
    size: 1890,
    sentiment: 91,
    topics: ["Support", "Response Time", "Help Docs"],
  },
  {
    name: "Pricing & Value",
    size: 1650,
    sentiment: 68,
    topics: ["Cost", "Plans", "ROI"],
  },
  {
    name: "Technical Implementation",
    size: 1420,
    sentiment: 74,
    topics: ["Setup", "Integration", "API"],
  },
];

export function CustomerInsightsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Customer Insights
          </h1>
          <p className="text-gray-600 mt-1">
            AI-powered sentiment analysis and topic clustering
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Mentions</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">5,565</p>
          <p className="text-sm text-green-600 mt-2">+18% vs last period</p>
        </Card>

        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <ThumbsUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Positive Sentiment</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">65%</p>
          <p className="text-sm text-green-600 mt-2">+3% improvement</p>
        </Card>

        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-gray-50 to-slate-50">
              <Minus className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Neutral Sentiment</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">25%</p>
          <p className="text-sm text-gray-600 mt-2">Stable</p>
        </Card>

        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-50 to-orange-50">
              <ThumbsDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Negative Sentiment</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">10%</p>
          <p className="text-sm text-red-600 mt-2">-2% reduction</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution */}
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Sentiment Distribution
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Overall customer sentiment breakdown
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {sentimentData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-semibold text-gray-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Sentiment Trend */}
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Sentiment Trend
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Weekly sentiment evolution
            </p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sentimentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="positive"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="neutral"
                stroke="#9ca3af"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="negative"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Topics Analysis */}
      <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Top Discussion Topics
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Most mentioned topics with sentiment scores
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topicsData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis dataKey="topic" type="category" stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="mentions" fill="#3b82f6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {topicsData.map((topic) => (
            <div key={topic.topic} className="text-center">
              <p className="text-sm font-medium text-gray-900">
                {topic.topic}
              </p>
              <Badge
                className={`mt-2 ${
                  topic.sentiment > 80
                    ? "bg-green-100 text-green-700"
                    : topic.sentiment > 70
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {topic.sentiment}% positive
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Word Cloud & Clusters */}
      <Tabs defaultValue="wordcloud" className="space-y-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="wordcloud">Word Cloud</TabsTrigger>
          <TabsTrigger value="clusters">Topic Clusters</TabsTrigger>
        </TabsList>

        <TabsContent value="wordcloud">
          <Card className="p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Customer Feedback Word Cloud
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Most frequently mentioned terms
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center items-center py-8">
              {wordCloudData.map((word, index) => (
                <span
                  key={index}
                  style={{ fontSize: `${word.size}px` }}
                  className={`font-semibold ${
                    word.sentiment === "positive"
                      ? "text-green-600"
                      : word.sentiment === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                  } hover:opacity-80 transition-opacity cursor-pointer`}
                >
                  {word.text}
                </span>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="clusters">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clusters.map((cluster, index) => (
              <Card
                key={index}
                className="p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cluster.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {cluster.size.toLocaleString()} mentions
                    </p>
                  </div>
                  <Badge
                    className={`${
                      cluster.sentiment > 85
                        ? "bg-green-100 text-green-700"
                        : cluster.sentiment > 75
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {cluster.sentiment}% positive
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {cluster.topics.map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                      style={{ width: `${cluster.sentiment}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
