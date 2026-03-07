import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { 
  FlaskConical, 
  Plus, 
  Play, 
  Pause, 
  TrendingUp, 
  Mail, 
  MousePointerClick,
  Target,
  Trophy,
  BarChart3
} from "lucide-react";

interface ABTest {
  id: string;
  name: string;
  status: "draft" | "running" | "completed";
  testType: "subject" | "content" | "sender" | "time";
  variantA: {
    name: string;
    content: string;
    sent: number;
    opens: number;
    clicks: number;
  };
  variantB: {
    name: string;
    content: string;
    sent: number;
    opens: number;
    clicks: number;
  };
  winningVariant?: "A" | "B";
  startDate?: string;
  endDate?: string;
}

export default function ABTestingPage() {
  const [activeTab, setActiveTab] = useState("tests");
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: "1",
      name: "Subject Line Test - Summer Sale",
      status: "running",
      testType: "subject",
      variantA: {
        name: "Variant A: Emoji Subject",
        content: "🌞 Summer Sale: Save 50% Today!",
        sent: 5000,
        opens: 1250,
        clicks: 375,
      },
      variantB: {
        name: "Variant B: Plain Subject",
        content: "Exclusive Summer Sale - 50% Off Everything",
        sent: 5000,
        opens: 1450,
        clicks: 420,
      },
      winningVariant: "B",
      startDate: "2026-03-05",
    },
    {
      id: "2",
      name: "CTA Button Color Test",
      status: "completed",
      testType: "content",
      variantA: {
        name: "Variant A: Green CTA",
        content: "Shop Now (Green Button)",
        sent: 3000,
        opens: 900,
        clicks: 270,
      },
      variantB: {
        name: "Variant B: Blue CTA",
        content: "Shop Now (Blue Button)",
        sent: 3000,
        opens: 900,
        clicks: 315,
      },
      winningVariant: "B",
      startDate: "2026-03-01",
      endDate: "2026-03-04",
    },
    {
      id: "3",
      name: "Sender Name Test",
      status: "draft",
      testType: "sender",
      variantA: {
        name: "Variant A: Personal Name",
        content: "From: Sarah from Marketing",
        sent: 0,
        opens: 0,
        clicks: 0,
      },
      variantB: {
        name: "Variant B: Company Name",
        content: "From: Marketing Team",
        sent: 0,
        opens: 0,
        clicks: 0,
      },
    },
  ]);

  const [newTest, setNewTest] = useState({
    name: "",
    testType: "subject",
    variantAContent: "",
    variantBContent: "",
    audience: "",
    duration: "7",
  });

  const calculateWinner = (test: ABTest) => {
    const aRate = test.variantA.sent > 0 ? (test.variantA.clicks / test.variantA.sent) * 100 : 0;
    const bRate = test.variantB.sent > 0 ? (test.variantB.clicks / test.variantB.sent) * 100 : 0;
    return aRate > bRate ? "A" : "B";
  };

  const getPerformanceMetrics = (variant: ABTest["variantA"]) => {
    const openRate = variant.sent > 0 ? ((variant.opens / variant.sent) * 100).toFixed(1) : "0";
    const clickRate = variant.sent > 0 ? ((variant.clicks / variant.sent) * 100).toFixed(1) : "0";
    const ctr = variant.opens > 0 ? ((variant.clicks / variant.opens) * 100).toFixed(1) : "0";
    
    return { openRate, clickRate, ctr };
  };

  const handleCreateTest = () => {
    if (!newTest.name || !newTest.variantAContent || !newTest.variantBContent) {
      toast.error("Please fill in all required fields");
      return;
    }

    const test: ABTest = {
      id: Date.now().toString(),
      name: newTest.name,
      status: "draft",
      testType: newTest.testType as any,
      variantA: {
        name: "Variant A",
        content: newTest.variantAContent,
        sent: 0,
        opens: 0,
        clicks: 0,
      },
      variantB: {
        name: "Variant B",
        content: newTest.variantBContent,
        sent: 0,
        opens: 0,
        clicks: 0,
      },
    };

    setTests([test, ...tests]);
    setShowCreateModal(false);
    setNewTest({
      name: "",
      testType: "subject",
      variantAContent: "",
      variantBContent: "",
      audience: "",
      duration: "7",
    });
    toast.success("A/B test created successfully!");
  };

  const handleStartTest = (testId: string) => {
    setTests(tests.map(t => 
      t.id === testId ? { ...t, status: "running" as const, startDate: new Date().toISOString().split('T')[0] } : t
    ));
    toast.success("A/B test started!");
  };

  const handleStopTest = (testId: string) => {
    setTests(tests.map(t => 
      t.id === testId ? { 
        ...t, 
        status: "completed" as const, 
        endDate: new Date().toISOString().split('T')[0],
        winningVariant: calculateWinner(t)
      } : t
    ));
    toast.success("A/B test completed!");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-indigo-600" />
            A/B Testing
          </h1>
          <p className="text-muted-foreground mt-1">
            Optimize your campaigns with data-driven testing
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create A/B Test
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tests</p>
              <p className="text-2xl font-bold mt-1">{tests.length}</p>
            </div>
            <FlaskConical className="w-8 h-8 text-indigo-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Running</p>
              <p className="text-2xl font-bold mt-1">{tests.filter(t => t.status === "running").length}</p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold mt-1">{tests.filter(t => t.status === "completed").length}</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Improvement</p>
              <p className="text-2xl font-bold mt-1">+18.5%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tests">All Tests</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4 mt-4">
          {tests.map((test) => {
            const metricsA = getPerformanceMetrics(test.variantA);
            const metricsB = getPerformanceMetrics(test.variantB);
            const winner = test.winningVariant || (test.status === "running" ? calculateWinner(test) : undefined);

            return (
              <Card key={test.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{test.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={
                        test.status === "running" ? "default" : 
                        test.status === "completed" ? "secondary" : 
                        "outline"
                      }>
                        {test.status}
                      </Badge>
                      <Badge variant="outline">{test.testType} test</Badge>
                      {test.startDate && (
                        <span className="text-sm text-muted-foreground">
                          Started: {test.startDate}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {test.status === "draft" && (
                      <Button onClick={() => handleStartTest(test.id)} size="sm" className="gap-2">
                        <Play className="w-4 h-4" />
                        Start Test
                      </Button>
                    )}
                    {test.status === "running" && (
                      <Button onClick={() => handleStopTest(test.id)} size="sm" variant="outline" className="gap-2">
                        <Pause className="w-4 h-4" />
                        Stop Test
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Variant A */}
                  <div className={`p-4 border rounded-lg ${winner === "A" ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{test.variantA.name}</h4>
                      {winner === "A" && (
                        <Badge className="bg-green-600">
                          <Trophy className="w-3 h-3 mr-1" />
                          Winner
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mb-4 p-3 bg-background rounded border">
                      {test.variantA.content}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Open Rate</p>
                        <p className="text-lg font-semibold">{metricsA.openRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Click Rate</p>
                        <p className="text-lg font-semibold">{metricsA.clickRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">CTR</p>
                        <p className="text-lg font-semibold">{metricsA.ctr}%</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                      {test.variantA.sent.toLocaleString()} sent · {test.variantA.opens.toLocaleString()} opens · {test.variantA.clicks.toLocaleString()} clicks
                    </div>
                  </div>

                  {/* Variant B */}
                  <div className={`p-4 border rounded-lg ${winner === "B" ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{test.variantB.name}</h4>
                      {winner === "B" && (
                        <Badge className="bg-green-600">
                          <Trophy className="w-3 h-3 mr-1" />
                          Winner
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mb-4 p-3 bg-background rounded border">
                      {test.variantB.content}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Open Rate</p>
                        <p className="text-lg font-semibold">{metricsB.openRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Click Rate</p>
                        <p className="text-lg font-semibold">{metricsB.clickRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">CTR</p>
                        <p className="text-lg font-semibold">{metricsB.ctr}%</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                      {test.variantB.sent.toLocaleString()} sent · {test.variantB.opens.toLocaleString()} opens · {test.variantB.clicks.toLocaleString()} clicks
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="insights" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Key Insights
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                  <p className="font-semibold text-indigo-900 dark:text-indigo-100">
                    Plain subject lines perform better
                  </p>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                    Tests show 16% higher open rates without emojis
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="font-semibold text-green-900 dark:text-green-100">
                    Blue CTAs outperform green
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    17% increase in click-through rates with blue buttons
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                    Morning sends get more engagement
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Peak performance between 9-11 AM
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Best Practices
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="font-medium">Test one element at a time</p>
                    <p className="text-sm text-muted-foreground">Focus on subject, content, or timing separately</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="font-medium">Use a 50/50 split</p>
                    <p className="text-sm text-muted-foreground">Equal distribution ensures valid results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="font-medium">Run tests for at least 1 week</p>
                    <p className="text-sm text-muted-foreground">Account for day-of-week variations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="font-medium">Need statistical significance</p>
                    <p className="text-sm text-muted-foreground">Minimum 1,000 recipients per variant</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Test Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Create New A/B Test</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="testName">Test Name *</Label>
                <Input
                  id="testName"
                  placeholder="e.g., Summer Sale Subject Line Test"
                  value={newTest.name}
                  onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="testType">Test Type *</Label>
                <Select value={newTest.testType} onValueChange={(value) => setNewTest({ ...newTest, testType: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subject">Subject Line</SelectItem>
                    <SelectItem value="content">Email Content</SelectItem>
                    <SelectItem value="sender">Sender Name</SelectItem>
                    <SelectItem value="time">Send Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="variantA">Variant A *</Label>
                <Input
                  id="variantA"
                  placeholder="First version to test"
                  value={newTest.variantAContent}
                  onChange={(e) => setNewTest({ ...newTest, variantAContent: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="variantB">Variant B *</Label>
                <Input
                  id="variantB"
                  placeholder="Second version to test"
                  value={newTest.variantBContent}
                  onChange={(e) => setNewTest({ ...newTest, variantBContent: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={newTest.audience} onValueChange={(value) => setNewTest({ ...newTest, audience: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subscribers</SelectItem>
                    <SelectItem value="engaged">Engaged Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Test Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newTest.duration}
                  onChange={(e) => setNewTest({ ...newTest, duration: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleCreateTest} className="flex-1">
                  Create Test
                </Button>
                <Button onClick={() => setShowCreateModal(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
