import { useState } from "react";
import { Filter, Download, TrendingUp, Calendar } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const trendData = [
  { month: "Jan", saas: 4200, ecommerce: 3800, healthcare: 2900, fintech: 3500 },
  { month: "Feb", saas: 4500, ecommerce: 3900, healthcare: 3100, fintech: 3700 },
  { month: "Mar", saas: 4800, ecommerce: 4100, healthcare: 3400, fintech: 4000 },
  { month: "Apr", saas: 5200, ecommerce: 4300, healthcare: 3800, fintech: 4400 },
  { month: "May", saas: 5600, ecommerce: 4600, healthcare: 4200, fintech: 4900 },
  { month: "Jun", saas: 6100, ecommerce: 5000, healthcare: 4700, fintech: 5500 },
  { month: "Jul", saas: 6500, ecommerce: 5300, healthcare: 5100, fintech: 6000 },
];

const predictions = [
  {
    title: "SaaS Market Expansion",
    description: "Expected 28% growth in Q3 2026 driven by remote work adoption",
    confidence: 94,
    timeframe: "Next 3 months",
    impact: "High",
  },
  {
    title: "E-commerce Seasonal Peak",
    description: "Holiday shopping season will drive 45% increase in transactions",
    confidence: 89,
    timeframe: "Q4 2026",
    impact: "Very High",
  },
  {
    title: "Healthcare Tech Adoption",
    description: "Telemedicine platforms expected to grow 35% as regulations ease",
    confidence: 87,
    timeframe: "Next 6 months",
    impact: "High",
  },
  {
    title: "FinTech Investment Surge",
    description: "Crypto and DeFi sectors attracting major institutional interest",
    confidence: 82,
    timeframe: "Next 12 months",
    impact: "Medium",
  },
];

export function MarketTrendsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [timeframe, setTimeframe] = useState("6m");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Trends</h1>
          <p className="text-gray-600 mt-1">
            Track industry trends and AI-powered predictions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Industry
              </label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global</SelectItem>
                  <SelectItem value="na">North America</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="apac">Asia Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Timeframe
              </label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Last Month</SelectItem>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Chart */}
      <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Industry Trend Comparison
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Market size trends across industries (in millions)
            </p>
          </div>
          <Badge className="bg-purple-100 text-purple-700">AI Analysis</Badge>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="saas"
              stroke="#3b82f6"
              strokeWidth={3}
              name="SaaS"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="ecommerce"
              stroke="#14b8a6"
              strokeWidth={3}
              name="E-commerce"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="healthcare"
              stroke="#8b5cf6"
              strokeWidth={3}
              name="Healthcare"
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="fintech"
              stroke="#f59e0b"
              strokeWidth={3}
              name="FinTech"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="emerging">Emerging Trends</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {predictions.map((prediction, index) => (
              <Card
                key={index}
                className="p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200"
                  >
                    {prediction.confidence}% confident
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {prediction.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {prediction.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {prediction.timeframe}
                  </div>
                  <Badge
                    variant={
                      prediction.impact === "Very High" || prediction.impact === "High"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {prediction.impact} Impact
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emerging">
          <Card className="p-6 rounded-2xl border border-gray-200">
            <div className="space-y-4">
              {[
                {
                  trend: "AI-Powered Customer Service",
                  growth: "+156%",
                  mentions: "2.3K",
                },
                {
                  trend: "Sustainable Tech Solutions",
                  growth: "+142%",
                  mentions: "1.8K",
                },
                {
                  trend: "Web3 Integration",
                  growth: "+128%",
                  mentions: "1.5K",
                },
                {
                  trend: "Zero-Trust Security",
                  growth: "+115%",
                  mentions: "1.2K",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.trend}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.mentions} mentions this week
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {item.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="historical">
          <Card className="p-6 rounded-2xl border border-gray-200">
            <p className="text-gray-600 text-center py-8">
              Historical trend analysis data will be displayed here
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
