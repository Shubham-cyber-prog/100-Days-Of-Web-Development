import { useState } from "react";
import { Users, TrendingUp, Eye, Heart, ExternalLink } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const competitors = [
  {
    name: "TechCorp",
    logo: "TC",
    traffic: "2.4M",
    trafficGrowth: "+12%",
    engagement: "4.2/5",
    sentiment: "Positive",
    sentimentScore: 85,
    growth: "+18%",
    marketShare: "23%",
  },
  {
    name: "DataSolutions",
    logo: "DS",
    traffic: "1.8M",
    trafficGrowth: "+8%",
    engagement: "3.9/5",
    sentiment: "Positive",
    sentimentScore: 78,
    growth: "+14%",
    marketShare: "18%",
  },
  {
    name: "MarketPro",
    logo: "MP",
    traffic: "1.5M",
    trafficGrowth: "-3%",
    engagement: "3.6/5",
    sentiment: "Neutral",
    sentimentScore: 65,
    growth: "+5%",
    marketShare: "15%",
  },
  {
    name: "InsightHub",
    logo: "IH",
    traffic: "1.2M",
    trafficGrowth: "+22%",
    engagement: "4.5/5",
    sentiment: "Very Positive",
    sentimentScore: 92,
    growth: "+25%",
    marketShare: "12%",
  },
  {
    name: "AnalyticEdge",
    logo: "AE",
    traffic: "980K",
    trafficGrowth: "+6%",
    engagement: "3.8/5",
    sentiment: "Positive",
    sentimentScore: 73,
    growth: "+9%",
    marketShare: "10%",
  },
];

const radarData = [
  {
    metric: "Features",
    TechCorp: 85,
    DataSolutions: 78,
    MarketPro: 72,
    YourProduct: 88,
  },
  {
    metric: "Price",
    TechCorp: 65,
    DataSolutions: 80,
    MarketPro: 75,
    YourProduct: 82,
  },
  {
    metric: "Support",
    TechCorp: 88,
    DataSolutions: 75,
    MarketPro: 68,
    YourProduct: 90,
  },
  {
    metric: "UX",
    TechCorp: 82,
    DataSolutions: 70,
    MarketPro: 65,
    YourProduct: 92,
  },
  {
    metric: "Performance",
    TechCorp: 90,
    DataSolutions: 85,
    MarketPro: 78,
    YourProduct: 87,
  },
  {
    metric: "Innovation",
    TechCorp: 78,
    DataSolutions: 72,
    MarketPro: 68,
    YourProduct: 85,
  },
];

export function CompetitorAnalysisPage() {
  const [selectedCompetitors, setSelectedCompetitors] = useState([
    "TechCorp",
    "DataSolutions",
    "MarketPro",
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Competitor Analysis
          </h1>
          <p className="text-gray-600 mt-1">
            Track and compare competitor performance metrics
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
          Add Competitor
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Tracked Competitors</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">47</p>
          <p className="text-sm text-green-600 mt-2">+3 this month</p>
        </Card>

        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Avg Traffic Growth</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">+11.8%</p>
          <p className="text-sm text-gray-600 mt-2">Industry average</p>
        </Card>

        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-teal-50">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Avg Sentiment Score</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">78.6</p>
          <p className="text-sm text-green-600 mt-2">Positive overall</p>
        </Card>

        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-50 to-red-50">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Market Leader</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">23%</p>
          <p className="text-sm text-gray-600 mt-2">TechCorp share</p>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Competitor Comparison
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Key metrics across top competitors
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Market Share</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitors.map((competitor) => (
                <TableRow key={competitor.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                        {competitor.logo}
                      </div>
                      <span className="font-medium text-gray-900">
                        {competitor.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">
                        {competitor.traffic}
                      </div>
                      <div
                        className={`text-sm ${
                          competitor.trafficGrowth.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {competitor.trafficGrowth}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        parseInt(competitor.growth) > 15
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }
                    >
                      {competitor.growth}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-gray-900">
                        {competitor.engagement}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {competitor.sentiment}
                      </div>
                      <div className="text-xs text-gray-600">
                        {competitor.sentimentScore}/100
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">
                      {competitor.marketShare}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Radar Comparison Chart */}
      <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Multi-Dimensional Comparison
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Performance metrics across key dimensions
          </p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
            <PolarRadiusAxis stroke="#6b7280" />
            <Radar
              name="Your Product"
              dataKey="YourProduct"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="TechCorp"
              dataKey="TechCorp"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name="DataSolutions"
              dataKey="DataSolutions"
              stroke="#14b8a6"
              fill="#14b8a6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name="MarketPro"
              dataKey="MarketPro"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Competitor Updates
          </h3>
          <p className="text-sm text-gray-600 mt-1">Latest activity detected</p>
        </div>
        <div className="space-y-4">
          {[
            {
              company: "TechCorp",
              update: "Launched new AI-powered analytics feature",
              time: "2 hours ago",
              impact: "High",
            },
            {
              company: "InsightHub",
              update: "Announced partnership with Microsoft Azure",
              time: "5 hours ago",
              impact: "Medium",
            },
            {
              company: "DataSolutions",
              update: "Released pricing update - 15% reduction",
              time: "1 day ago",
              impact: "High",
            },
            {
              company: "MarketPro",
              update: "Published case study on Fortune 500 client",
              time: "2 days ago",
              impact: "Low",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
                {activity.company.substring(0, 2)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {activity.company}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.update}
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
  );
}
