import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import {
  CheckSquare,
  Filter,
  Keyboard,
  Download,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: CheckSquare,
    title: "Bulk Actions",
    description: "Select and process multiple moderation items simultaneously",
    color: "from-blue-500 to-cyan-500",
    benefits: [
      "Process multiple items with one click",
      "Checkbox selection in table",
      "Floating action bar",
      "Ctrl+A to select all",
    ],
    demo: "/queue",
  },
  {
    icon: Filter,
    title: "Advanced Filters & Presets",
    description: "Create sophisticated filter combinations and save them",
    color: "from-purple-500 to-pink-500",
    benefits: [
      "Filter by 4+ criteria",
      "Save filter presets",
      "Quick preset access",
      "Default presets included",
    ],
    demo: "/queue",
  },
  {
    icon: Keyboard,
    title: "Keyboard Shortcuts",
    description: "Navigate and take actions faster with keyboard shortcuts",
    color: "from-green-500 to-emerald-500",
    benefits: [
      "Press ? for shortcuts list",
      "Ctrl+K for search",
      "A/R/E for actions",
      "Arrow keys navigation",
    ],
    demo: "/queue",
  },
  {
    icon: Download,
    title: "Export & Reporting",
    description: "Download your moderation data for analysis and compliance",
    color: "from-orange-500 to-red-500",
    benefits: [
      "CSV for analysis",
      "PDF for reports",
      "Custom field selection",
      "Date range filtering",
    ],
    demo: "/queue",
  },
  {
    icon: Activity,
    title: "Real-time Activity Feed",
    description: "Stay informed with live updates of team moderation actions",
    color: "from-indigo-500 to-purple-500",
    benefits: [
      "Live updates every 5s",
      "See who's moderating",
      "Team statistics",
      "Top moderators board",
    ],
    demo: "/activity",
  },
];

export default function FeaturesShowcase() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">5 New Features Added</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl mb-4"
        >
          Enhanced Moderation Experience
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Professional-grade tools to handle content moderation at scale with
          your team
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-sm text-muted-foreground flex-1">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link to={feature.demo}>
                    <Button variant="outline" className="w-full group">
                      Try it now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Comparison Section */}
      <Card>
        <CardHeader>
          <CardTitle>Before vs After</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <span className="text-muted-foreground">Before</span>
              </h3>
              <div className="space-y-2">
                {[
                  "Process one item at a time",
                  "Basic filtering only",
                  "Mouse-only navigation",
                  "Manual data export",
                  "No team visibility",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-muted" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Badge variant="default" className="bg-green-500">
                  After
                </Badge>
              </h3>
              <div className="space-y-2">
                {[
                  "Bulk actions on multiple items",
                  "Advanced filters + saved presets",
                  "Full keyboard shortcuts",
                  "One-click CSV/PDF export",
                  "Real-time activity feed",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckSquare className="w-3 h-3 text-white" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Guide */}
      <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-200">
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: "1",
                title: "Navigate",
                desc: "Go to Moderation Queue",
              },
              {
                step: "2",
                title: "Filter",
                desc: "Apply or save presets",
              },
              {
                step: "3",
                title: "Select",
                desc: "Use checkboxes or Ctrl+A",
              },
              {
                step: "4",
                title: "Act",
                desc: "Keyboard or bulk actions",
              },
              {
                step: "5",
                title: "Export",
                desc: "Download reports",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-background"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                  {item.step}
                </div>
                <div className="font-semibold mb-1">{item.title}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Link to="/queue">
              <Button size="lg" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Try Enhanced Queue
              </Button>
            </Link>
            <Link to="/activity">
              <Button size="lg" variant="outline" className="gap-2">
                <Activity className="w-4 h-4" />
                View Team Activity
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Pro Tips 💡</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Save your most-used filter combinations as presets",
              "Learn keyboard shortcuts - press ? to see the list",
              "Use Ctrl+A to quickly select all pending items",
              "Export data weekly for compliance tracking",
              "Monitor the Activity Feed to see team performance",
              "Use bulk actions during peak moderation hours",
            ].map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg bg-accent/50"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                  {i + 1}
                </div>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
