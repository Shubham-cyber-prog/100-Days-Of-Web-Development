import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Search,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Shield,
  Zap,
  ExternalLink
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';

export function WebsiteAnalyzer() {
  const { accessToken } = useAuth();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleAnalyze() {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    // Validate URL
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const response = await fetch(`${API_BASE_URL}/seo/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ url: fullUrl })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
      toast.success('Analysis complete!');
    } catch (error: any) {
      console.error('Analysis error:', error);
      toast.error(error.message || 'Failed to analyze website');
    } finally {
      setLoading(false);
    }
  }

  function getScoreColor(score: number) {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  }

  function getScoreLabel(score: number) {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Improvement';
    return 'Poor';
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Website SEO Analyzer</h1>
          <p className="text-muted-foreground">
            Analyze any website for SEO issues and get AI-powered optimization recommendations
          </p>
        </div>

        {/* Analysis Form */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Website URL</CardTitle>
            <CardDescription>
              Provide the URL of the website you want to analyze
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  disabled={loading}
                />
              </div>
              <Button onClick={handleAnalyze} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Score Card */}
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      Overall SEO Score
                    </h3>
                    <div className={`text-6xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}
                      <span className="text-3xl text-muted-foreground">/100</span>
                    </div>
                    <Badge
                      variant={result.score >= 80 ? 'default' : result.score >= 60 ? 'secondary' : 'destructive'}
                      className="mt-2"
                    >
                      {getScoreLabel(result.score)}
                    </Badge>
                  </div>
                  <div className="flex-1 w-full max-w-md">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Title Tag</span>
                          <span className="font-medium">{result.title ? '✓' : '✗'}</span>
                        </div>
                        <Progress value={result.title ? 100 : 0} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Meta Description</span>
                          <span className="font-medium">{result.metaDescription ? '✓' : '✗'}</span>
                        </div>
                        <Progress value={result.metaDescription ? 100 : 0} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Heading Structure</span>
                          <span className="font-medium">
                            {result.headingStructure.h1 > 0 ? '✓' : '✗'}
                          </span>
                        </div>
                        <Progress value={result.headingStructure.h1 > 0 ? 100 : 0} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for detailed results */}
            <Tabs defaultValue="issues" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>

              {/* Issues Tab */}
              <TabsContent value="issues" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Issues Found</CardTitle>
                    <CardDescription>
                      {result.issues.length} issue(s) detected that need attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {result.issues.length === 0 ? (
                      <Alert>
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>
                          No critical issues found! Your website has good SEO fundamentals.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-3">
                        {result.issues.map((issue: any, index: number) => (
                          <Alert
                            key={index}
                            variant={issue.type === 'error' ? 'destructive' : 'default'}
                          >
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="flex items-center justify-between">
                              <span>{issue.message}</span>
                              <Badge
                                variant={
                                  issue.priority === 'high'
                                    ? 'destructive'
                                    : issue.priority === 'medium'
                                    ? 'default'
                                    : 'secondary'
                                }
                              >
                                {issue.priority}
                              </Badge>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* AI Suggestions Tab */}
              <TabsContent value="suggestions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      AI-Powered Recommendations
                    </CardTitle>
                    <CardDescription>
                      Intelligent suggestions to improve your SEO score
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.aiSuggestions?.suggestions?.map((suggestion: string, index: number) => (
                        <div
                          key={index}
                          className="flex gap-3 p-3 rounded-lg border bg-muted/50"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <p className="text-sm">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Heading Structure
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">H1 Tags</span>
                          <span className="font-medium">{result.headingStructure.h1}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">H2 Tags</span>
                          <span className="font-medium">{result.headingStructure.h2}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">H3 Tags</span>
                          <span className="font-medium">{result.headingStructure.h3}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        Images
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Images</span>
                          <span className="font-medium">{result.imageCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">With Alt Text</span>
                          <span className="font-medium">{result.imagesWithAlt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Missing Alt</span>
                          <span className="font-medium text-red-500">
                            {result.imageCount - result.imagesWithAlt}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        {result.url.startsWith('https://') ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span>HTTPS Enabled</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <span>HTTPS Not Enabled</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {new Date(result.analyzedAt).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Metadata Tab */}
              <TabsContent value="metadata" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Metadata</CardTitle>
                    <CardDescription>Title tag and meta description analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-base font-semibold">Title Tag</Label>
                      <div className="mt-2 p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          {result.title || <span className="text-red-500">Missing title tag</span>}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Length: {result.title?.length || 0} characters
                        {result.title && (result.title.length < 30 || result.title.length > 60) && (
                          <span className="text-orange-500"> (Optimal: 30-60 characters)</span>
                        )}
                      </p>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Meta Description</Label>
                      <div className="mt-2 p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          {result.metaDescription || (
                            <span className="text-red-500">Missing meta description</span>
                          )}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Length: {result.metaDescription?.length || 0} characters
                        {result.metaDescription &&
                          (result.metaDescription.length < 120 ||
                            result.metaDescription.length > 160) && (
                            <span className="text-orange-500">
                              {' '}
                              (Optimal: 120-160 characters)
                            </span>
                          )}
                      </p>
                    </div>

                    <div>
                      <Label className="text-base font-semibold">Analyzed URL</Label>
                      <div className="mt-2 p-3 bg-muted rounded-lg flex items-center justify-between">
                        <p className="text-sm truncate flex-1">{result.url}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(result.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
