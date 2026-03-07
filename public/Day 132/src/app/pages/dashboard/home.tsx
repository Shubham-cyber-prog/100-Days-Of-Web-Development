import { motion } from "motion/react";
import {
  Bot,
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
  MessageSquare,
  Calendar,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";

export default function DashboardHome() {
  const tasks = [
    { id: 1, title: "Review Q1 analytics report", status: "in-progress", priority: "high" },
    { id: 2, title: "Schedule team meeting", status: "pending", priority: "medium" },
    { id: 3, title: "Update documentation", status: "completed", priority: "low" },
    { id: 4, title: "Prepare presentation slides", status: "in-progress", priority: "high" },
  ];

  const aiSuggestions = [
    { icon: MessageSquare, title: "Reply to 3 unread messages", action: "View" },
    { icon: Calendar, title: "Schedule meeting with marketing team", action: "Schedule" },
    { icon: Zap, title: "Automate weekly report generation", action: "Setup" },
  ];

  const activities = [
    { time: "10 min ago", text: "Completed task: Project review", type: "success" },
    { time: "1 hour ago", text: "New integration connected: Slack", type: "info" },
    { time: "2 hours ago", text: "AI automation triggered", type: "info" },
    { time: "3 hours ago", text: "Chat conversation started", type: "default" },
  ];

  const quickActions = [
    { icon: MessageSquare, label: "New Chat", color: "from-[#4f46e5] to-[#7c3aed]" },
    { icon: CheckCircle2, label: "Add Task", color: "from-[#06b6d4] to-[#0891b2]" },
    { icon: Zap, label: "Run Automation", color: "from-[#8b5cf6] to-[#6366f1]" },
    { icon: Calendar, label: "Schedule", color: "from-[#ec4899] to-[#d946ef]" },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
            Welcome back, John!
          </h1>
          <p className="text-gray-600">Here's what's happening with your AI assistant today.</p>
        </div>
        <div className="hidden md:block">
          <Button className="rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:opacity-90 shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Ask AI Anything
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Tasks Completed", value: "24", change: "+12%", icon: CheckCircle2, color: "text-green-600" },
          { label: "Active Chats", value: "8", change: "+3", icon: MessageSquare, color: "text-blue-600" },
          { label: "Automations", value: "12", change: "Running", icon: Zap, color: "text-purple-600" },
          { label: "Time Saved", value: "18h", change: "This week", icon: Clock, color: "text-cyan-600" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <Badge variant="secondary" className="rounded-full">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Tasks</CardTitle>
                  <CardDescription>4 tasks to complete</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="rounded-xl">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 hover:bg-white/80 transition-all"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-500"
                        : task.status === "in-progress"
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <div className="flex-1">
                    <p className={task.status === "completed" ? "line-through text-gray-400" : ""}>
                      {task.title}
                    </p>
                  </div>
                  <Badge
                    variant={task.priority === "high" ? "destructive" : "secondary"}
                    className="rounded-full"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#4f46e5]" />
                <CardTitle>AI Suggestions</CardTitle>
              </div>
              <CardDescription>Smart recommendations to boost your productivity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#4f46e5]/5 to-[#06b6d4]/5 border border-[#4f46e5]/10 hover:border-[#4f46e5]/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
                      <suggestion.icon className="w-5 h-5 text-white" />
                    </div>
                    <span>{suggestion.title}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-xl text-[#4f46e5]">
                    {suggestion.action}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} text-white hover:opacity-90 transition-all shadow-lg flex flex-col items-center gap-2`}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Recent events and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "info"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                    {index < activities.length - 1 && (
                      <div className="absolute left-1/2 top-4 bottom-0 w-px bg-gray-200 -translate-x-1/2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progress Widget */}
          <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Tasks</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Goals</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Automation</span>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
