import {
  Sparkles,
  TrendingUp,
  Users,
  Database,
  Download,
  Share2,
  Bell,
  Settings,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { KPICard } from "../common/KPICard";
import { InsightCard } from "../common/InsightCard";
import { StatCard } from "../common/StatCard";
import { EmptyState } from "../common/EmptyState";
import { LoadingState } from "../common/LoadingState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function DesignSystemPage() {
  return (
    <div className="p-6 space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Design System Components
        </h1>
        <p className="text-gray-600">
          Production-ready components with variants for the MarketAI platform
        </p>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Buttons</h2>
        <Card className="p-6 rounded-2xl border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <Button>Default Button</Button>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              Outline Button
            </Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive</Button>
            <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
              Gradient Button
            </Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              With Icon
            </Button>
          </div>
        </Card>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Badges</h2>
        <Card className="p-6 rounded-2xl border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              Success
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              Info
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
              AI Powered
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
              Warning
            </Badge>
          </div>
        </Card>
      </section>

      {/* KPI Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">KPI Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Total Revenue"
            value="$124.5K"
            change="+12.5% vs last month"
            changeType="positive"
            icon={TrendingUp}
            aiConfidence={94}
          />
          <KPICard
            title="Active Users"
            value="8,549"
            change="-2.3% decrease"
            changeType="negative"
            icon={Users}
            aiConfidence={87}
          />
          <KPICard
            title="Data Sources"
            value="47"
            change="3 new this week"
            changeType="neutral"
            icon={Database}
            aiConfidence={92}
          />
        </div>
      </section>

      {/* Stat Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Stat Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Market Size"
            value="$4.2B"
            description="Total addressable market"
            icon={TrendingUp}
            trend={{ value: "+18%", direction: "up" }}
          />
          <StatCard
            title="Competitors Tracked"
            value={47}
            description="Active monitoring"
            icon={Users}
            trend={{ value: "+3", direction: "up" }}
            variant="gradient"
          />
          <StatCard
            title="Insights Generated"
            value="1,234"
            description="This month"
            icon={Sparkles}
            trend={{ value: "Stable", direction: "neutral" }}
          />
        </div>
      </section>

      {/* Insight Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Insight Cards</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InsightCard
            title="Market Growth Opportunity"
            description="AI/ML sector showing strong indicators for expansion. Consider increasing investment in this vertical."
            confidence={92}
            trend="up"
            category="Opportunity"
            action="View Details"
          />
          <InsightCard
            title="Competitor Activity Alert"
            description="TechCorp launched new feature competing directly with your core offering. Monitor impact closely."
            confidence={88}
            trend="down"
            category="Competitive"
            action="Analyze"
          />
        </div>
      </section>

      {/* Form Elements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Form Elements</h2>
        <Card className="p-6 rounded-2xl border border-gray-200 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Email Address</Label>
              <Input type="email" placeholder="name@example.com" className="mt-2" />
            </div>
            <div>
              <Label>Select Option</Label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <Label>Enable notifications</Label>
              <p className="text-sm text-gray-600">
                Receive alerts about market changes
              </p>
            </div>
            <Switch />
          </div>
        </Card>
      </section>

      {/* Tabs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Tabs</h2>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card className="p-6 rounded-2xl border border-gray-200">
              <p className="text-gray-700">Overview content goes here</p>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card className="p-6 rounded-2xl border border-gray-200">
              <p className="text-gray-700">Analytics content goes here</p>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card className="p-6 rounded-2xl border border-gray-200">
              <p className="text-gray-700">Reports content goes here</p>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">States</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Empty State
            </h3>
            <EmptyState
              icon={Database}
              title="No data sources connected"
              description="Connect your first data source to start generating insights"
              actionLabel="Add Data Source"
              onAction={() => console.log("Add clicked")}
            />
          </Card>
          <Card className="p-6 rounded-2xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Loading State
            </h3>
            <LoadingState message="Analyzing market data..." />
          </Card>
        </div>
      </section>

      {/* Icon Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Icon Buttons</h2>
        <Card className="p-6 rounded-2xl border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <Button size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline">
              <Bell className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
            >
              <Sparkles className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </section>

      {/* Color Palette */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Color Palette</h2>
        <Card className="p-6 rounded-2xl border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-20 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 mb-2" />
              <p className="text-sm font-medium text-gray-900">
                Primary Gradient
              </p>
              <p className="text-xs text-gray-600">Blue to Teal</p>
            </div>
            <div>
              <div className="h-20 rounded-xl bg-green-500 mb-2" />
              <p className="text-sm font-medium text-gray-900">Success</p>
              <p className="text-xs text-gray-600">#10b981</p>
            </div>
            <div>
              <div className="h-20 rounded-xl bg-red-500 mb-2" />
              <p className="text-sm font-medium text-gray-900">Error</p>
              <p className="text-xs text-gray-600">#ef4444</p>
            </div>
            <div>
              <div className="h-20 rounded-xl bg-purple-500 mb-2" />
              <p className="text-sm font-medium text-gray-900">AI Accent</p>
              <p className="text-xs text-gray-600">#8b5cf6</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
