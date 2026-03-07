import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Activity,
  AlertCircle,
} from "lucide-react";
import { KPICard } from "../common/KPICard";
import { InsightCard } from "../common/InsightCard";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
} from "recharts";

/**
 * Main Dashboard - Overview of Market Intelligence
 * 
 * Features:
 * - KPI Cards with AI confidence indicators
 * - Market growth forecast with AI predictions
 * - Trending industries bar chart
 * - Consumer sentiment pie chart
 * - Real-time competitor activity feed
 * - AI-generated summary panel
 * - Latest insights with actionable recommendations
 */
const marketGrowthData = [
  { month: "Jan", value: 4200, forecast: 4300 },
  { month: "Feb", value: 4500, forecast: 4600 },
  { month: "Mar", value: 4800, forecast: 4900 },
  { month: "Apr", value: 5200, forecast: 5300 },
  { month: "May", value: 5600, forecast: 5800 },
  { month: "Jun", value: 6100, forecast: 6400 },
];

const trendingIndustries = [
  { industry: "AI/ML", growth: 45, color: "#3b82f6" },
  { industry: "FinTech", growth: 38, color: "#14b8a6" },
  { industry: "HealthTech", growth: 32, color: "#8b5cf6" },
  { industry: "E-commerce", growth: 28, color: "#f59e0b" },
  { industry: "EdTech", growth: 25, color: "#ec4899" },
];

const sentimentData = [
  { name: "Positive", value: 65, color: "#10b981" },
  { name: "Neutral", value: 25, color: "#6b7280" },
  { name: "Negative", value: 10, color: "#ef4444" },
];

const competitorActivities = [
  {
    company: "TechCorp",
    action: "Launched new AI feature",
    impact: "High",
    time: "2 hours ago",
  },
  {
    company: "DataSolutions",
    action: "Price reduction announced",
    impact: "Medium",
    time: "5 hours ago",
  },
  {
    company: "MarketPro",
    action: "Acquired competitor",
    impact: "High",
    time: "1 day ago",
  },
  {
    company: "InsightHub",
    action: "New partnership announced",
    impact: "Low",
    time: "2 days ago",
  },
];

export function MainDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Market Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Last updated: Today at 2:45 PM
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Market Size"
          value="$4.2B"
          change="+12.5% vs last month"
          changeType="positive"
          icon={DollarSign}
          aiConfidence={94}
        />
        <KPICard
          title="Growth Rate"
          value="18.3%"
          change="+2.1% increase"
          changeType="positive"
          icon={TrendingUp}
          aiConfidence={89}
        />
        <KPICard
          title="Active Competitors"
          value="47"
          change="+3 new entries"
          changeType="neutral"
          icon={Users}
          aiConfidence={96}
        />
        <KPICard
          title="Market Opportunities"
          value="23"
          change="5 high-priority"
          changeType="positive"
          icon={Target}
          aiConfidence={87}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Growth Forecast */}
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Market Growth Forecast
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Actual vs AI Prediction
              </p>
            </div>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
              AI Powered
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={marketGrowthData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#14b8a6"
                fillOpacity={1}
                fill="url(#colorForecast)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Trending Industries */}
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Trending Industries
            </h3>
            <p className="text-sm text-gray-600 mt-1">Top 5 by growth rate</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trendingIndustries} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="industry" type="category" stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="growth" radius={[0, 8, 8, 0]}>
                {trendingIndustries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consumer Sentiment */}
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Consumer Sentiment
            </h3>
            <p className="text-sm text-gray-600 mt-1">Overall market mood</p>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
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
          <div className="grid grid-cols-3 gap-2 mt-4">
            {sentimentData.map((item) => (
              <div key={item.name} className="text-center">
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: item.color }}
                />
                <p className="text-xs text-gray-600">{item.name}</p>
                <p className="text-sm font-semibold text-gray-900">
                  {item.value}%
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Competitor Activity Feed */}
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Competitor Activity Feed
              </h3>
              <p className="text-sm text-gray-600 mt-1">Recent updates</p>
            </div>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {competitorActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="p-2 rounded-lg bg-white">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {activity.company}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.action}
                      </p>
                    </div>
                    <Badge
                      variant={
                        activity.impact === "High"
                          ? "destructive"
                          : activity.impact === "Medium"
                          ? "default"
                          : "secondary"
                      }
                      className="ml-2"
                    >
                      {activity.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Summary Panel */}
      <Card className="p-6 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                AI Summary
              </h3>
              <Badge className="bg-purple-500 text-white">Generated</Badge>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The market shows strong growth indicators with a 18.3% increase in
              overall market size. AI/ML and FinTech sectors are leading the
              trend with 45% and 38% growth respectively. Consumer sentiment
              remains predominantly positive at 65%, suggesting favorable market
              conditions. Competitor activity has increased, with 3 new market
              entries this month. Consider focusing on the 23 identified market
              opportunities, particularly the 5 high-priority segments in the
              AI/ML space.
            </p>
          </div>
        </div>
      </Card>

      {/* Insights Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Latest Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InsightCard
            title="Growing Demand in Healthcare AI"
            description="AI-powered healthcare solutions show 32% market growth. Customer interest has spiked in diagnostic tools."
            confidence={92}
            trend="up"
            category="Market Opportunity"
            action="View Details"
          />
          <InsightCard
            title="Competitor Price Changes Detected"
            description="DataSolutions reduced pricing by 15%. This may impact your competitive positioning in the mid-market segment."
            confidence={88}
            trend="down"
            category="Competitive Intelligence"
            action="Analyze Impact"
          />
          <InsightCard
            title="Emerging Customer Pain Point"
            description="Social listening reveals increasing frustration with data integration complexity across platforms."
            confidence={85}
            trend="up"
            category="Customer Insight"
            action="Explore Solution"
          />
          <InsightCard
            title="Seasonal Trend Pattern Identified"
            description="Q2 historically shows 23% higher engagement. Consider timing product launches accordingly."
            confidence={90}
            trend="neutral"
            category="Trend Analysis"
            action="View Forecast"
          />
        </div>
      </div>
    </div>
  );
}