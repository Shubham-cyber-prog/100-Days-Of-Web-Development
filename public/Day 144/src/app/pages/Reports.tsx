import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  FileBarChart,
  Download,
  Share2,
  Calendar,
  TrendingUp,
  ExternalLink,
  FileText,
  Loader2
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';

export function Reports() {
  const { accessToken } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      fetchHistory();
    }
  }, [accessToken]);

  async function fetchHistory() {
    try {
      const response = await fetch(`${API_BASE_URL}/seo/history`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHistory(data.history || []);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleDownloadReport(report: any) {
    toast.success('Report download started');
    // In a real app, this would generate and download a PDF
  }

  function handleShareReport(report: any) {
    const shareUrl = `${window.location.origin}/reports/${report.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Report link copied to clipboard!');
  }

  function getScoreColor(score: number) {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  function getScoreBadgeVariant(score: number): "default" | "secondary" | "destructive" {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">SEO Reports</h1>
          <p className="text-muted-foreground">
            View, download, and share your SEO analysis reports
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{history.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Generated reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {history.length > 0
                  ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)
                  : 0}
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Across all analyses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Latest Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {history.length > 0 ? history[0].score : '-'}
                {history.length > 0 && <span className="text-lg text-muted-foreground">/100</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {history.length > 0 ? 'Most recent analysis' : 'No data yet'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analysis History</CardTitle>
                <CardDescription>
                  All your SEO analysis reports in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-12">
                    <FileBarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-4">No reports yet</p>
                    <p className="text-sm text-muted-foreground">
                      Run website analyses to generate reports
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((report) => (
                      <div
                        key={report.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-semibold truncate">{report.url}</h3>
                            <Badge variant={getScoreBadgeVariant(report.score)}>
                              Score: {report.score}/100
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(report.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              SEO Analysis
                            </span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            <div className={`h-1.5 flex-1 rounded ${getScoreColor(report.score)}`} />
                            <div className="h-1.5 flex-1 rounded bg-muted" />
                            <div className="h-1.5 flex-1 rounded bg-muted" />
                            <div className="h-1.5 flex-1 rounded bg-muted" />
                            <div className="h-1.5 flex-1 rounded bg-muted" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadReport(report)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShareReport(report)}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>
                  Automatically generated reports on a schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">No scheduled reports</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Set up automated reports to track SEO performance over time
                  </p>
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shared" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shared Reports</CardTitle>
                <CardDescription>
                  Reports shared with your team or clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Share2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">No shared reports</p>
                  <p className="text-sm text-muted-foreground">
                    Share reports with others using the share button
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Report Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Features</CardTitle>
              <CardDescription>What's included in your SEO reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <FileBarChart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Comprehensive Analysis</p>
                    <p className="text-muted-foreground">
                      Detailed SEO metrics, issues, and recommendations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Performance Tracking</p>
                    <p className="text-muted-foreground">
                      Track improvements and changes over time
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">PDF Export</p>
                    <p className="text-muted-foreground">
                      Download professional PDF reports for clients
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Share2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Easy Sharing</p>
                    <p className="text-muted-foreground">
                      Generate shareable links for team collaboration
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Upgrade for More</CardTitle>
              <CardDescription>Unlock advanced reporting features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  White-label reports with your branding
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Automated scheduled report delivery
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Custom report templates
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Historical data comparison
                </p>
              </div>
              <Button className="w-full">
                Upgrade to Pro
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
