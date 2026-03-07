import {
  Sparkles,
  TrendingUp,
  Users,
  Database,
  FileText,
  BarChart3,
} from "lucide-react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { KPICard } from "../common/KPICard";
import { InsightCard } from "../common/InsightCard";
import { StatCard } from "../common/StatCard";
import { MetricsDashboard } from "../common/MetricsDashboard";
import { QuickActions } from "../common/QuickActions";
import { ComparisonTable } from "../common/ComparisonTable";
import { DataTable } from "../common/DataTable";
import { NotificationPanel } from "../common/NotificationPanel";

export function ComponentShowcase() {
  const metrics = [
    { label: "Revenue", value: "$124K", change: 12.5 },
    { label: "Users", value: "8.5K", change: -2.3 },
    { label: "Conversion", value: "3.2%", change: 0.8 },
    { label: "Sessions", value: "45K", change: 18.2 },
  ];

  const comparisonData = [
    { feature: "Market Share", values: ["23%", "18%", "15%", "12%"] },
    { feature: "Growth Rate", values: ["+18%", "+14%", "+5%", "+25%"] },
    { feature: "AI Features", values: [true, false, true, true] },
    { feature: "API Access", values: [true, true, false, true] },
    { feature: "24/7 Support", values: [true, true, true, false] },
  ];

  const tableData = [
    { name: "TechCorp", traffic: "2.4M", growth: "+12%", sentiment: "85" },
    { name: "DataSolutions", traffic: "1.8M", growth: "+8%", sentiment: "78" },
    { name: "MarketPro", traffic: "1.5M", growth: "-3%", sentiment: "65" },
    { name: "InsightHub", traffic: "1.2M", growth: "+22%", sentiment: "92" },
  ];

  const tableColumns = [
    { key: "name", label: "Company", sortable: true },
    { key: "traffic", label: "Traffic", sortable: true },
    { key: "growth", label: "Growth", sortable: true },
    { key: "sentiment", label: "Sentiment", sortable: true },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">MarketAI</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Complete Component Library & Design System
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Production-ready components for AI-powered market research
        </p>
      </div>

      {/* Component Categories */}
      <Tabs defaultValue="cards" className="space-y-6">
        <TabsList className="bg-gray-100 grid grid-cols-5 w-full max-w-3xl mx-auto">
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="widgets">Widgets</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        {/* Cards Tab */}
        <TabsContent value="cards" className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              KPI Cards
            </h2>
            <p className="text-gray-600 mb-6">
              Display key performance indicators with AI confidence scores
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard
                title="Market Size"
                value="$4.2B"
                change="+12.5% vs last month"
                changeType="positive"
                icon={TrendingUp}
                aiConfidence={94}
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
                title="Data Sources"
                value="23"
                change="5 connected"
                changeType="positive"
                icon={Database}
                aiConfidence={92}
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Stat Cards
            </h2>
            <p className="text-gray-600 mb-6">
              Simple statistics with trend indicators
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Revenue Growth"
                value="$124K"
                description="Total revenue"
                icon={TrendingUp}
                trend={{ value: "+18%", direction: "up" }}
              />
              <StatCard
                title="User Engagement"
                value="8,549"
                description="Active users"
                icon={Users}
                trend={{ value: "-2.3%", direction: "down" }}
                variant="gradient"
              />
              <StatCard
                title="Reports Generated"
                value="1,234"
                description="This month"
                icon={FileText}
                trend={{ value: "Stable", direction: "neutral" }}
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Insight Cards
            </h2>
            <p className="text-gray-600 mb-6">
              AI-generated insights with confidence levels
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InsightCard
                title="Market Growth Opportunity"
                description="Healthcare AI showing 32% growth. Strong indicators for expansion in diagnostic tools segment."
                confidence={92}
                trend="up"
                category="Opportunity"
                action="View Details"
              />
              <InsightCard
                title="Competitive Alert"
                description="TechCorp launched new feature. Consider analyzing potential impact on market positioning."
                confidence={88}
                trend="down"
                category="Competitive"
                action="Analyze"
              />
            </div>
          </section>
        </TabsContent>

        {/* Widgets Tab */}
        <TabsContent value="widgets" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetricsDashboard
              title="Performance Metrics"
              metrics={metrics}
              period="vs last month"
            />
            <QuickActions />
          </div>
        </TabsContent>

        {/* Tables Tab */}
        <TabsContent value="tables" className="space-y-8">
          <ComparisonTable
            title="Competitor Feature Comparison"
            headers={["TechCorp", "DataSolutions", "MarketPro", "InsightHub"]}
            data={comparisonData}
          />

          <DataTable
            title="Competitor Traffic Analysis"
            columns={tableColumns}
            data={tableData}
            searchable={true}
          />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="flex justify-center">
            <NotificationPanel />
          </div>
        </TabsContent>

        {/* All Components Tab */}
        <TabsContent value="all" className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              All Components Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 rounded-2xl border border-gray-200">
                <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">KPI Cards</h3>
                <p className="text-sm text-gray-600">
                  Display metrics with AI confidence scores and trend indicators
                </p>
              </Card>
              <Card className="p-6 rounded-2xl border border-gray-200">
                <Sparkles className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Insight Cards
                </h3>
                <p className="text-sm text-gray-600">
                  AI-generated insights with categorization and actions
                </p>
              </Card>
              <Card className="p-6 rounded-2xl border border-gray-200">
                <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Stat Cards</h3>
                <p className="text-sm text-gray-600">
                  Simple statistics with icons and trend arrows
                </p>
              </Card>
              <Card className="p-6 rounded-2xl border border-gray-200">
                <Database className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Data Tables</h3>
                <p className="text-sm text-gray-600">
                  Sortable, searchable tables with pagination support
                </p>
              </Card>
              <Card className="p-6 rounded-2xl border border-gray-200">
                <Users className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Comparison Tables
                </h3>
                <p className="text-sm text-gray-600">
                  Side-by-side feature and metric comparisons
                </p>
              </Card>
              <Card className="p-6 rounded-2xl border border-gray-200">
                <FileText className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Quick Actions
                </h3>
                <p className="text-sm text-gray-600">
                  Frequently used actions in grid layout
                </p>
              </Card>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {/* Design Principles */}
      <section className="mt-12">
        <Card className="p-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-teal-50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Design Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                🎨 Visual Hierarchy
              </h3>
              <p className="text-sm text-gray-700">
                Clear information architecture with 16px rounded cards, soft
                shadows, and generous whitespace
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                🤖 AI-First Design
              </h3>
              <p className="text-sm text-gray-700">
                AI confidence indicators, predictive labels, and intelligent
                insights throughout
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                📱 Responsive Layout
              </h3>
              <p className="text-sm text-gray-700">
                Grid system optimized for desktop, tablet, and mobile viewports
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
