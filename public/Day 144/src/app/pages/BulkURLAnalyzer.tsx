import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Layers,
  Loader2,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Upload
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export function BulkURLAnalyzer() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [urls, setUrls] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [currentlyAnalyzing, setCurrentlyAnalyzing] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    
    const urlList = urls.split('\n').map(u => u.trim()).filter(u => u);
    
    if (urlList.length === 0) {
      toast.error('Please enter at least one URL');
      return;
    }

    if (urlList.length > 50) {
      toast.error('Maximum 50 URLs allowed per batch');
      return;
    }

    setLoading(true);
    setProgress(0);
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/bulk/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ urls: urlList })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Analysis failed');
      }

      // Stream results
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'progress') {
                setProgress(data.progress);
                setCurrentlyAnalyzing(data.url);
              } else if (data.type === 'complete') {
                setResults(data.results);
              }
            }
          }
        }
      }

      toast.success(`Successfully analyzed ${urlList.length} URLs!`);
    } catch (error: any) {
      console.error('Bulk analysis error:', error);
      toast.error(error.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
      setProgress(0);
      setCurrentlyAnalyzing('');
    }
  }

  function exportResults() {
    if (!results) return;

    const csv = [
      ['URL', 'SEO Score', 'Status', 'Title', 'Meta Description', 'Issues'].join(','),
      ...results.urlResults.map((r: any) => 
        [
          r.url,
          r.score,
          r.status,
          `"${r.title || 'N/A'}"`,
          `"${r.metaDescription || 'N/A'}"`,
          r.issueCount
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-seo-analysis-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Results exported!');
  }

  const statusColors = ['#22c55e', '#f59e0b', '#ef4444'];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Layers className="h-8 w-8 text-primary" />
            Bulk URL Analyzer
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze multiple pages at once to get comprehensive site-wide insights
          </p>
        </div>

        {/* Analysis Form */}
        <Card>
          <CardHeader>
            <CardTitle>Enter URLs to Analyze</CardTitle>
            <CardDescription>
              Enter one URL per line (maximum 50 URLs per batch)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="urls">URLs</Label>
                <Textarea
                  id="urls"
                  placeholder="https://example.com&#10;https://example.com/about&#10;https://example.com/products"
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  rows={10}
                  disabled={loading}
                  className="font-mono text-sm"
                />
                <div className="text-sm text-muted-foreground">
                  {urls.split('\n').filter(u => u.trim()).length} URLs entered
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Analyzing...' : 'Analyze All URLs'}
              </Button>
            </form>

            {/* Progress */}
            {loading && (
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                {currentlyAnalyzing && (
                  <p className="text-sm text-muted-foreground truncate">
                    Analyzing: {currentlyAnalyzing}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{results.totalAnalyzed}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Analyzed</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{results.averageScore}</div>
                    <div className="text-sm text-muted-foreground mt-1">Average Score</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">{results.passedCount}</div>
                    <div className="text-sm text-muted-foreground mt-1">Passed (≥80)</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">{results.failedCount}</div>
                    <div className="text-sm text-muted-foreground mt-1">Failed (&lt;50)</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.scoreDistribution}>
                      <CartesianGrid key="grid" strokeDasharray="3 3" />
                      <XAxis key="x-axis" dataKey="range" />
                      <YAxis key="y-axis" />
                      <Tooltip key="tooltip" />
                      <Bar key="bar" dataKey="count" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={results.statusOverview}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {results.statusOverview.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Issues */}
            <Card>
              <CardHeader>
                <CardTitle>Most Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.commonIssues.map((issue: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <span className="text-sm">{issue.description}</span>
                      </div>
                      <Badge variant="secondary">{issue.count} URLs</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* URL Results Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Detailed Results</CardTitle>
                  <Button variant="outline" size="sm" onClick={exportResults}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.urlResults.map((result: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {result.status === 'good' && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                            {result.status === 'warning' && <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />}
                            {result.status === 'error' && <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />}
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary hover:underline truncate"
                            >
                              {result.url}
                            </a>
                          </div>
                          {result.title && (
                            <p className="text-sm text-muted-foreground truncate">{result.title}</p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold">{result.score}</div>
                          <div className="text-xs text-muted-foreground">{result.issueCount} issues</div>
                        </div>
                      </div>
                      <Progress value={result.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Site-Wide Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}