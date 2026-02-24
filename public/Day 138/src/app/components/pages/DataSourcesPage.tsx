import { useState } from "react";
import { Database, CheckCircle, XCircle, RefreshCw, Plus } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { EmptyState } from "../common/EmptyState";

const dataSources = [
  {
    name: "Google Analytics",
    category: "Web Analytics",
    status: "connected",
    lastSync: "5 minutes ago",
    records: "1.2M events",
    enabled: true,
    logo: "GA",
  },
  {
    name: "Twitter API",
    category: "Social Media",
    status: "connected",
    lastSync: "12 minutes ago",
    records: "450K tweets",
    enabled: true,
    logo: "TW",
  },
  {
    name: "Salesforce",
    category: "CRM",
    status: "connected",
    lastSync: "1 hour ago",
    records: "85K contacts",
    enabled: true,
    logo: "SF",
  },
  {
    name: "LinkedIn",
    category: "Social Media",
    status: "syncing",
    lastSync: "Syncing now...",
    records: "Updating...",
    enabled: true,
    logo: "LI",
  },
  {
    name: "HubSpot",
    category: "Marketing",
    status: "error",
    lastSync: "2 days ago",
    records: "Connection failed",
    enabled: false,
    logo: "HS",
  },
  {
    name: "Reddit API",
    category: "Social Media",
    status: "connected",
    lastSync: "30 minutes ago",
    records: "320K posts",
    enabled: true,
    logo: "RD",
  },
];

const availableSources = [
  { name: "Facebook Ads", category: "Advertising", logo: "FB" },
  { name: "Instagram", category: "Social Media", logo: "IG" },
  { name: "Google Search Console", category: "SEO", logo: "GS" },
  { name: "Mixpanel", category: "Product Analytics", logo: "MP" },
  { name: "Stripe", category: "Payment", logo: "ST" },
  { name: "Zendesk", category: "Support", logo: "ZD" },
];

export function DataSourcesPage() {
  const [sources, setSources] = useState(dataSources);
  const [showAvailable, setShowAvailable] = useState(false);

  const toggleSource = (index: number) => {
    const newSources = [...sources];
    newSources[index].enabled = !newSources[index].enabled;
    setSources(newSources);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        );
      case "syncing":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Syncing
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Sources</h1>
          <p className="text-gray-600 mt-1">
            Manage integrations and sync status
          </p>
        </div>
        <Button
          onClick={() => setShowAvailable(!showAvailable)}
          className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Data Source
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Sources</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {sources.length}
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Connected</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {sources.filter((s) => s.status === "connected").length}
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Syncing</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {sources.filter((s) => s.status === "syncing").length}
          </p>
        </Card>

        <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-50 to-orange-50">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Errors</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {sources.filter((s) => s.status === "error").length}
          </p>
        </Card>
      </div>

      {/* Connected Sources */}
      <Card className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Connected Data Sources
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Manage your active integrations
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {sources.map((source, index) => (
            <div
              key={index}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    {source.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {source.name}
                      </h4>
                      {getStatusBadge(source.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          {source.category}
                        </Badge>
                      </span>
                      <span>Last sync: {source.lastSync}</span>
                      <span>{source.records}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Switch
                    checked={source.enabled}
                    onCheckedChange={() => toggleSource(index)}
                  />
                  {source.status === "error" ? (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reconnect
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Available Sources */}
      {showAvailable && (
        <Card className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Available Integrations
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Connect new data sources to your analysis
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {availableSources.map((source, index) => (
              <Card
                key={index}
                className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 font-bold text-sm">
                    {source.logo}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {source.name}
                    </h4>
                    <p className="text-xs text-gray-600">{source.category}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Connect
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Sync Schedule */}
      <Card className="p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sync Schedule
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div>
              <p className="font-medium text-gray-900">Auto-sync frequency</p>
              <p className="text-sm text-gray-600">
                Automatically sync data from all sources
              </p>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Every 15 minutes</option>
              <option>Every hour</option>
              <option>Every 6 hours</option>
              <option>Daily</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
            <div>
              <p className="font-medium text-gray-900">
                Sync during off-peak hours
              </p>
              <p className="text-sm text-gray-600">
                Reduce load during business hours
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>
    </div>
  );
}
