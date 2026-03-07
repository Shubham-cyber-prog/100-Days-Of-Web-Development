import { useState } from "react";
import { motion } from "motion/react";
import { Search, CheckCircle2, Circle, Settings, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Switch } from "../../components/ui/switch";

type Integration = {
  id: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  logo: string;
  color: string;
};

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "Slack",
      description: "Team communication and collaboration platform",
      category: "Communication",
      connected: true,
      logo: "💬",
      color: "from-[#4A154B] to-[#611f69]",
    },
    {
      id: "2",
      name: "Google Calendar",
      description: "Schedule and manage your events",
      category: "Productivity",
      connected: true,
      logo: "📅",
      color: "from-[#4285F4] to-[#34A853]",
    },
    {
      id: "3",
      name: "Notion",
      description: "All-in-one workspace for notes and docs",
      category: "Productivity",
      connected: false,
      logo: "📝",
      color: "from-[#000000] to-[#2e2e2e]",
    },
    {
      id: "4",
      name: "GitHub",
      description: "Code hosting and collaboration",
      category: "Development",
      connected: true,
      logo: "💻",
      color: "from-[#24292e] to-[#1a1f24]",
    },
    {
      id: "5",
      name: "Trello",
      description: "Visual project management tool",
      category: "Project Management",
      connected: false,
      logo: "📋",
      color: "from-[#0079BF] to-[#026aa7]",
    },
    {
      id: "6",
      name: "Zoom",
      description: "Video conferencing and meetings",
      category: "Communication",
      connected: false,
      logo: "🎥",
      color: "from-[#2D8CFF] to-[#0b5cff]",
    },
    {
      id: "7",
      name: "Dropbox",
      description: "Cloud storage and file sharing",
      category: "Storage",
      connected: true,
      logo: "📦",
      color: "from-[#0061FF] to-[#0047b3]",
    },
    {
      id: "8",
      name: "Spotify",
      description: "Music streaming and podcasts",
      category: "Entertainment",
      connected: false,
      logo: "🎵",
      color: "from-[#1DB954] to-[#1aa34a]",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredIntegrations = integrations.filter((integration) =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    integration.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const connectedCount = integrations.filter((i) => i.connected).length;
  const categories = Array.from(new Set(integrations.map((i) => i.category)));

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
          Integrations
        </h1>
        <p className="text-gray-600">Connect your favorite tools and platforms</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold mb-1">{connectedCount}</div>
            <div className="text-sm text-gray-600">Connected</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Circle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {integrations.length - connectedCount}
            </div>
            <div className="text-sm text-gray-600">Available</div>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold mb-1">{categories.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-2xl bg-white/50 border-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration, index) => (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl hover:shadow-xl transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {integration.logo}
                  </div>
                  {integration.connected ? (
                    <Badge className="bg-green-500 text-white rounded-full">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="rounded-full">
                      Available
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{integration.name}</CardTitle>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="rounded-full">
                    {integration.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/40">
                  <span className="text-sm font-medium">
                    {integration.connected ? "Disconnect" : "Connect"}
                  </span>
                  <Switch
                    checked={integration.connected}
                    onCheckedChange={() => toggleConnection(integration.id)}
                  />
                </div>
                {integration.connected && (
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl"
                    size="sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">No integrations found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
