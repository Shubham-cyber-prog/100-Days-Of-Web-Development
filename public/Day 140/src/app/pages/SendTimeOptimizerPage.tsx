import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import { 
  Clock, 
  Calendar,
  TrendingUp,
  Zap,
  Users,
  Globe,
  Brain,
  BarChart3,
  Sun,
  Moon,
  Sunrise,
  Sunset
} from "lucide-react";

export default function SendTimeOptimizerPage() {
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [selectedTimezone, setSelectedTimezone] = useState("auto");

  const timeSlots = [
    { time: "6:00 AM", score: 45, engagement: "Low", icon: Sunrise },
    { time: "7:00 AM", score: 62, engagement: "Medium", icon: Sunrise },
    { time: "8:00 AM", score: 78, engagement: "High", icon: Sun },
    { time: "9:00 AM", score: 92, engagement: "Very High", icon: Sun },
    { time: "10:00 AM", score: 88, engagement: "High", icon: Sun },
    { time: "11:00 AM", score: 82, engagement: "High", icon: Sun },
    { time: "12:00 PM", score: 70, engagement: "Medium", icon: Sun },
    { time: "1:00 PM", score: 58, engagement: "Medium", icon: Sun },
    { time: "2:00 PM", score: 65, engagement: "Medium", icon: Sun },
    { time: "3:00 PM", score: 72, engagement: "High", icon: Sun },
    { time: "4:00 PM", score: 68, engagement: "Medium", icon: Sunset },
    { time: "5:00 PM", score: 55, engagement: "Medium", icon: Sunset },
    { time: "6:00 PM", score: 48, engagement: "Low", icon: Moon },
    { time: "7:00 PM", score: 42, engagement: "Low", icon: Moon },
    { time: "8:00 PM", score: 38, engagement: "Low", icon: Moon },
  ];

  const dayOfWeek = [
    { day: "Monday", score: 82, opens: "28.5%", clicks: "4.2%" },
    { day: "Tuesday", score: 92, opens: "31.2%", clicks: "5.1%" },
    { day: "Wednesday", score: 88, opens: "30.1%", clicks: "4.8%" },
    { day: "Thursday", score: 85, opens: "29.3%", clicks: "4.5%" },
    { day: "Friday", score: 75, opens: "25.8%", clicks: "3.9%" },
    { day: "Saturday", score: 45, opens: "15.2%", clicks: "2.1%" },
    { day: "Sunday", score: 38, opens: "12.8%", clicks: "1.8%" },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Peak Engagement Time",
      time: "Tuesday at 9:00 AM",
      confidence: 92,
      reason: "Based on 6 months of data, this time shows highest open and click rates",
      impact: "+31% open rate",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    },
    {
      id: 2,
      title: "Secondary Peak",
      time: "Wednesday at 10:00 AM",
      confidence: 88,
      reason: "Strong alternative with consistent performance",
      impact: "+28% open rate",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      id: 3,
      title: "Avoid This Time",
      time: "Weekend afternoons",
      confidence: 95,
      reason: "Lowest engagement across all segments",
      impact: "-65% engagement",
      icon: Moon,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
    },
  ];

  const segmentInsights = [
    { segment: "Engaged Users", bestTime: "9:00 AM", timezone: "EST", openRate: "45.2%" },
    { segment: "Inactive Users", bestTime: "2:00 PM", timezone: "EST", openRate: "18.5%" },
    { segment: "New Subscribers", bestTime: "10:00 AM", timezone: "PST", openRate: "38.9%" },
    { segment: "VIP Customers", bestTime: "8:00 AM", timezone: "EST", openRate: "52.1%" },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800";
    if (score >= 70) return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800";
    if (score >= 50) return "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800";
    return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800";
  };

  const handleApplyOptimalTime = () => {
    toast.success("Optimal send time applied to campaign!");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Clock className="w-8 h-8 text-indigo-600" />
            Send Time Optimizer
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered recommendations for optimal email send times
          </p>
        </div>
        <Button onClick={handleApplyOptimalTime} className="gap-2">
          <Brain className="w-4 h-4" />
          Apply Optimal Time
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Audience Segment</label>
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subscribers</SelectItem>
                <SelectItem value="engaged">Engaged Users</SelectItem>
                <SelectItem value="inactive">Inactive Users</SelectItem>
                <SelectItem value="new">New Subscribers</SelectItem>
                <SelectItem value="vip">VIP Customers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Timezone</label>
            <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect</SelectItem>
                <SelectItem value="est">Eastern (EST)</SelectItem>
                <SelectItem value="cst">Central (CST)</SelectItem>
                <SelectItem value="mst">Mountain (MST)</SelectItem>
                <SelectItem value="pst">Pacific (PST)</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Top Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <Card key={rec.id} className={`p-6 ${rec.bgColor} border-2`}>
              <div className="flex items-start gap-3">
                <Icon className={`w-6 h-6 ${rec.color} flex-shrink-0 mt-1`} />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{rec.title}</h3>
                  <p className="text-2xl font-bold mb-2">{rec.time}</p>
                  <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{rec.impact}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {rec.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Time of Day Analysis */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          Hourly Performance Analysis
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Engagement scores by time of day (higher is better)
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {timeSlots.map((slot) => {
            const Icon = slot.icon;
            return (
              <Card key={slot.time} className={`p-4 ${getScoreBg(slot.score)}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${getScoreColor(slot.score)}`} />
                  <span className="font-semibold text-sm">{slot.time}</span>
                </div>
                <div className="text-2xl font-bold mb-1 ${getScoreColor(slot.score)}">
                  {slot.score}
                </div>
                <Badge variant="outline" className="text-xs">
                  {slot.engagement}
                </Badge>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Day of Week Performance */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          Day of Week Performance
        </h2>
        
        <div className="space-y-3">
          {dayOfWeek.map((day) => (
            <div key={day.day} className="flex items-center gap-4">
              <div className="w-32 font-semibold">{day.day}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full ${day.score >= 85 ? 'bg-green-500' : day.score >= 70 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                      style={{ width: `${day.score}%` }}
                    />
                  </div>
                  <span className={`font-bold w-12 text-right ${getScoreColor(day.score)}`}>
                    {day.score}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Opens:</span>
                  <span className="font-semibold ml-2">{day.opens}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Clicks:</span>
                  <span className="font-semibold ml-2">{day.clicks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Segment-Specific Insights */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          Segment-Specific Best Times
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {segmentInsights.map((insight) => (
            <Card key={insight.segment} className="p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">{insight.segment}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Time:</span>
                  <span className="font-semibold">{insight.bestTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timezone:</span>
                  <span className="font-semibold">{insight.timezone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Open Rate:</span>
                  <span className="font-semibold text-green-600">{insight.openRate}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          AI-Powered Insights
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
            <div>
              <p className="font-medium">Your audience is most active on Tuesday mornings</p>
              <p className="text-sm text-muted-foreground">
                92% of your top-performing campaigns were sent on Tuesdays between 9-11 AM
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
            <div>
              <p className="font-medium">Avoid weekend sends for this audience</p>
              <p className="text-sm text-muted-foreground">
                Weekend campaigns show 65% lower engagement compared to weekdays
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
            <div>
              <p className="font-medium">Timezone optimization recommended</p>
              <p className="text-sm text-muted-foreground">
                Your audience spans 4 timezones - consider timezone-based sending for 15% lift
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
            <div>
              <p className="font-medium">Frequency optimization</p>
              <p className="text-sm text-muted-foreground">
                Your current send frequency (3x/week) is optimal - don't increase
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Ready to optimize your next campaign?</h3>
            <p className="text-sm text-muted-foreground">Apply these insights to improve performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Full Report
            </Button>
            <Button>
              <Zap className="w-4 h-4 mr-2" />
              Schedule Campaign
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
