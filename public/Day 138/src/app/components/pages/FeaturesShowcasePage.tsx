import {
  Sparkles,
  MessageSquare,
  Bookmark,
  Download,
  Bell,
  StickyNote,
  CheckCircle,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion } from "motion/react";

export function FeaturesShowcasePage() {
  const features = [
    {
      icon: MessageSquare,
      title: "AI Chat Assistant",
      description:
        "Interactive AI-powered assistant that helps you query data, analyze trends, and get instant insights. Ask questions in natural language and receive intelligent, context-aware responses.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      status: "Active",
      stats: [
        { label: "Response Time", value: "<2s" },
        { label: "Accuracy", value: "94%" },
        { label: "Queries Today", value: "127" },
      ],
      location: "Bottom-right floating button",
    },
    {
      icon: Bell,
      title: "Smart Alerts System",
      description:
        "Real-time notifications for significant market changes, competitor activities, and emerging trends. AI-powered confidence scoring helps prioritize which alerts need immediate attention.",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      status: "5 Active Alerts",
      stats: [
        { label: "Active Alerts", value: "5" },
        { label: "Avg Confidence", value: "89%" },
        { label: "Response Rate", value: "78%" },
      ],
      location: "Top navigation bar (bell icon)",
    },
    {
      icon: Bookmark,
      title: "Saved Reports & Bookmarks",
      description:
        "Save and organize your favorite analyses, reports, and insights for quick access. Tag, categorize, and star important items to build your personal knowledge library.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      status: "4 Saved Items",
      stats: [
        { label: "Total Saved", value: "4" },
        { label: "Favorites", value: "2" },
        { label: "Last Accessed", value: "1h ago" },
      ],
      location: "Top navigation bar (bookmark icon)",
    },
    {
      icon: Download,
      title: "Export Functionality",
      description:
        "Export any report or analysis in multiple formats: PDF (with full charts), CSV (raw data for further analysis), or PNG (high-quality screenshots). Perfect for presentations and sharing.",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      status: "Ready",
      stats: [
        { label: "Exports Today", value: "12" },
        { label: "Most Popular", value: "PDF" },
        { label: "Avg Size", value: "2.3MB" },
      ],
      location: "Top navigation bar (export button)",
    },
    {
      icon: StickyNote,
      title: "Collaborative Annotations",
      description:
        "Add sticky notes, highlights, and comments directly on reports. Perfect for team collaboration - leave feedback, ask questions, and create threaded discussions on specific data points.",
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-yellow-50",
      status: "3 Active Notes",
      stats: [
        { label: "Total Notes", value: "3" },
        { label: "Replies", value: "1" },
        { label: "Contributors", value: "3" },
      ],
      location: "Top navigation bar (annotations button)",
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">New Features Showcase</h1>
            <p className="text-gray-600 mt-1">
              5 powerful new capabilities to supercharge your market research
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Badge className="bg-gradient-to-r from-blue-500 to-teal-500 text-white border-0 px-4 py-1.5">
            <Zap className="h-3 w-3 mr-1" />
            All Features Live
          </Badge>
          <Badge variant="outline" className="px-4 py-1.5">
            5 New Features
          </Badge>
          <Badge variant="outline" className="px-4 py-1.5">
            AI-Powered
          </Badge>
          <Badge variant="outline" className="px-4 py-1.5">
            Team Collaboration
          </Badge>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="space-y-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Icon & Title */}
                  <div className="lg:w-64 flex-shrink-0">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-4 bg-gradient-to-br ${feature.color} rounded-xl shadow-lg`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={`${feature.bgColor} border-0`}
                        >
                          {feature.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Description & Stats */}
                  <div className="flex-1">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {feature.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                        >
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Location:</span> {feature.location}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 group hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 hover:border-blue-300"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Active
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* How to Use Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 border-2 border-blue-100"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          Getting Started
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Try the AI Chat Assistant
                </h4>
                <p className="text-sm text-gray-600">
                  Click the floating chat button in the bottom-right corner. Ask questions
                  like "What are the latest market trends?" or "Show competitor analysis"
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Check Smart Alerts</h4>
                <p className="text-sm text-gray-600">
                  Click the bell icon in the top navigation to see important market changes
                  and competitor activities with AI confidence scores
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Save Important Reports</h4>
                <p className="text-sm text-gray-600">
                  Use the bookmark icon to save any page or report for quick access later.
                  Star your favorites for easy retrieval
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Export Your Analysis
                </h4>
                <p className="text-sm text-gray-600">
                  Click the Export button to download reports as PDF, CSV, or PNG. Perfect
                  for presentations and stakeholder sharing
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
                5
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Collaborate with Annotations
                </h4>
                <p className="text-sm text-gray-600">
                  Enable annotations mode, click anywhere to add sticky notes, and create
                  threaded discussions with your team
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-blue-200 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Pro Tip</span>
              </div>
              <p className="text-sm text-gray-600">
                All these features work together! For example, you can add annotations to a
                report, save it for later, set up alerts for similar trends, and export the
                annotated version as a PDF.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">5</div>
          <div className="text-xs text-gray-500">New Features</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
          <div className="text-xs text-gray-500">AI-Powered</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">3</div>
          <div className="text-xs text-gray-500">Export Formats</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">Real-time</div>
          <div className="text-xs text-gray-500">Notifications</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-1">Team</div>
          <div className="text-xs text-gray-500">Collaboration</div>
        </Card>
      </motion.div>
    </div>
  );
}
