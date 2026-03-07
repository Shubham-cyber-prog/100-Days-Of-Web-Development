import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";
import { 
  Shield, 
  CheckCircle2,
  AlertCircle,
  XCircle,
  Mail,
  Search,
  TrendingUp,
  Award,
  AlertTriangle,
  Info,
  Sparkles
} from "lucide-react";

export default function DeliverabilityPage() {
  const [activeTab, setActiveTab] = useState("checker");
  const [emailContent, setEmailContent] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!emailSubject || !emailContent) {
      toast.error("Please enter both subject and content");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      const spamScore = Math.floor(Math.random() * 30) + 5;
      const deliverabilityScore = 100 - spamScore - 5;
      
      setAnalysisResult({
        overallScore: deliverabilityScore,
        spamScore: spamScore,
        issues: [
          { severity: "high", message: "Subject contains spammy words: 'FREE', 'ACT NOW'", fix: "Use more subtle language" },
          { severity: "medium", message: "Too many exclamation marks (3)", fix: "Limit to 1 exclamation mark" },
          { severity: "low", message: "Image-to-text ratio is high", fix: "Add more text content" },
        ],
        passed: [
          "Valid sender domain",
          "DKIM authentication present",
          "SPF record configured",
          "No broken links detected",
          "Unsubscribe link present",
        ],
        suggestions: [
          "Add a physical mailing address",
          "Reduce use of promotional language",
          "Balance text and images (60/40 ratio)",
          "Personalize the subject line",
        ],
      });
      
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 2000);
  };

  const domainHealth = {
    status: "Excellent",
    score: 94,
    metrics: [
      { name: "Sender Reputation", score: 96, status: "excellent" },
      { name: "IP Reputation", score: 92, status: "excellent" },
      { name: "Domain Authentication", score: 100, status: "excellent" },
      { name: "Complaint Rate", score: 88, status: "good" },
      { name: "Bounce Rate", score: 94, status: "excellent" },
    ],
    authentication: [
      { name: "SPF", status: "pass", description: "Sender Policy Framework configured" },
      { name: "DKIM", status: "pass", description: "DomainKeys Identified Mail active" },
      { name: "DMARC", status: "pass", description: "Domain-based Message Authentication configured" },
      { name: "BIMI", status: "warning", description: "Brand Indicators for Message Identification not configured" },
    ],
  };

  const recentCampaigns = [
    { name: "Summer Sale Newsletter", deliverability: 96, inbox: 94, spam: 4, bounced: 2 },
    { name: "Product Launch", deliverability: 92, inbox: 90, spam: 6, bounced: 4 },
    { name: "Weekly Update", deliverability: 98, inbox: 97, spam: 2, bounced: 1 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    if (score >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600" />
            Deliverability Checker
          </h1>
          <p className="text-muted-foreground mt-1">
            Analyze spam scores and ensure inbox delivery
          </p>
        </div>
      </div>

      {/* Domain Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-green-600" />
            <Badge className="bg-green-600">Excellent</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Overall Health</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{domainHealth.score}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-muted-foreground">Inbox Placement</p>
          <p className="text-3xl font-bold mt-1">94%</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="text-sm text-muted-foreground">Sender Rep.</p>
          <p className="text-3xl font-bold mt-1">96/100</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-muted-foreground">Authentication</p>
          <p className="text-3xl font-bold mt-1">3/4</p>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="checker">Spam Checker</TabsTrigger>
          <TabsTrigger value="health">Domain Health</TabsTrigger>
          <TabsTrigger value="history">Campaign History</TabsTrigger>
        </TabsList>

        {/* Spam Checker Tab */}
        <TabsContent value="checker" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-indigo-600" />
                Email Content Analysis
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">Email Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Enter your email subject line"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Email Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your email HTML or text content here..."
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    className="mt-1 min-h-[200px]"
                  />
                </div>

                <Button 
                  onClick={handleAnalyze} 
                  className="w-full gap-2"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Analyze Deliverability
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
              
              {!analysisResult ? (
                <div className="flex items-center justify-center h-[300px] text-center">
                  <div>
                    <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Enter your email content and click "Analyze" to see results
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Deliverability Score</p>
                    <div className={`text-5xl font-bold mb-3 ${getScoreColor(analysisResult.overallScore)}`}>
                      {analysisResult.overallScore}
                    </div>
                    <Progress 
                      value={analysisResult.overallScore} 
                      className="h-3"
                    />
                    <p className="text-sm mt-3 text-muted-foreground">
                      Spam Risk: {analysisResult.spamScore}%
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Passed</p>
                      <p className="text-2xl font-bold text-green-600">
                        {analysisResult.passed.length}
                      </p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Issues</p>
                      <p className="text-2xl font-bold text-red-600">
                        {analysisResult.issues.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Detailed Results */}
          {analysisResult && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Issues Found */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Issues Found
                </h3>
                <div className="space-y-3">
                  {analysisResult.issues.map((issue: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        {issue.severity === "high" ? (
                          <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        ) : issue.severity === "medium" ? (
                          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={
                              issue.severity === "high" ? "destructive" :
                              issue.severity === "medium" ? "default" :
                              "secondary"
                            }>
                              {issue.severity}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium mb-1">{issue.message}</p>
                          <p className="text-xs text-muted-foreground">
                            💡 Fix: {issue.fix}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Passed Checks */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Passed Checks
                </h3>
                <div className="space-y-2">
                  {analysisResult.passed.map((check: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{check}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Suggestions</h4>
                  <div className="space-y-2">
                    {analysisResult.suggestions.map((suggestion: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Domain Health Tab */}
        <TabsContent value="health" className="space-y-6 mt-4">
          {/* Metrics */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Sender Reputation Metrics</h2>
            <div className="space-y-4">
              {domainHealth.metrics.map((metric) => (
                <div key={metric.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{metric.name}</span>
                    <span className={`font-bold ${getScoreColor(metric.score)}`}>
                      {metric.score}/100
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={metric.score} className="flex-1" />
                    <Badge variant={
                      metric.status === "excellent" ? "default" :
                      metric.status === "good" ? "secondary" :
                      "outline"
                    }>
                      {metric.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Authentication */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Email Authentication</h2>
            <div className="space-y-3">
              {domainHealth.authentication.map((auth) => (
                <div key={auth.name} className="flex items-start gap-3 p-4 border rounded-lg">
                  {auth.status === "pass" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{auth.name}</span>
                      <Badge variant={auth.status === "pass" ? "default" : "secondary"}>
                        {auth.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{auth.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Campaign History Tab */}
        <TabsContent value="history" className="space-y-6 mt-4">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Campaign Deliverability</h2>
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <Card key={campaign.name} className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <div className={`text-2xl font-bold ${getScoreColor(campaign.deliverability)}`}>
                      {campaign.deliverability}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Inbox</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${campaign.inbox}%` }} />
                        </div>
                        <span className="font-semibold">{campaign.inbox}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground mb-1">Spam</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${campaign.spam * 10}%` }} />
                        </div>
                        <span className="font-semibold">{campaign.spam}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground mb-1">Bounced</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${campaign.bounced * 10}%` }} />
                        </div>
                        <span className="font-semibold">{campaign.bounced}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
