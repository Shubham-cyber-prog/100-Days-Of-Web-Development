import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import {
  Link as LinkIcon,
  ExternalLink,
  TrendingUp,
  Loader2,
  Search,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

export function BacklinkChecker() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [savedBacklinks, setSavedBacklinks] = useState<any[]>([]);

  if (!user) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    if (accessToken) {
      fetchSavedBacklinks();
    }
  }, [accessToken]);

  async function fetchSavedBacklinks() {
    try {
      const response = await fetch(`${API_BASE_URL}/backlinks/list`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSavedBacklinks(data.backlinks || []);
      }
    } catch (error) {
      console.error('Error fetching backlinks:', error);
    }
  }

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/backlinks/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Analysis failed');
      }

      const data = await response.json();
      setResults(data);
      toast.success('Backlink analysis completed!');
      fetchSavedBacklinks();
    } catch (error: any) {
      console.error('Backlink analysis error:', error);
      toast.error(error.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const qualityColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <LinkIcon className="h-8 w-8 text-primary" />
            Backlink Checker
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze your backlink profile and track link building progress
          </p>
        </div>

        {/* Analysis Form */}
        <Card>
          <CardHeader>
            <CardTitle>Check Backlinks</CardTitle>
            <CardDescription>
              Enter a website URL to analyze its backlink profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Analyzing Backlinks...' : 'Analyze Backlinks'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{results.totalBacklinks}</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Backlinks</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">{results.domainAuthority}</div>
                    <div className="text-sm text-muted-foreground mt-1">Domain Authority</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">{results.referringDomains}</div>
                    <div className="text-sm text-muted-foreground mt-1">Referring Domains</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">{results.trustFlow}</div>
                    <div className="text-sm text-muted-foreground mt-1">Trust Flow</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Backlink Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={results.growthData}>
                      <CartesianGrid key="grid" strokeDasharray="3 3" />
                      <XAxis key="x-axis" dataKey="month" />
                      <YAxis key="y-axis" />
                      <Tooltip key="tooltip" />
                      <Line key="line" type="monotone" dataKey="backlinks" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Link Quality Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={results.qualityDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {results.qualityDistribution.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={qualityColors[index % qualityColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Backlinks */}
            <Card>
              <CardHeader>
                <CardTitle>Top Backlinks</CardTitle>
                <CardDescription>
                  Your most valuable backlinks ranked by domain authority
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.topBacklinks.map((backlink: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <a
                              href={backlink.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary hover:underline flex items-center gap-1"
                            >
                              {backlink.sourceDomain}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            {backlink.isDofollow ? (
                              <Badge variant="default" className="text-xs">DoFollow</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">NoFollow</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{backlink.anchorText}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>DA: {backlink.domainAuthority}</span>
                            <span>•</span>
                            <span>{backlink.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {backlink.quality === 'high' && <Award className="h-5 w-5 text-green-500" />}
                          {backlink.quality === 'medium' && <CheckCircle className="h-5 w-5 text-blue-500" />}
                          {backlink.quality === 'low' && <AlertTriangle className="h-5 w-5 text-orange-500" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Anchor Text Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Anchor Text Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.anchorTextData}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" />
                    <XAxis key="x-axis" dataKey="text" />
                    <YAxis key="y-axis" />
                    <Tooltip key="tooltip" />
                    <Bar key="bar" dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Link Building Recommendations
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

        {/* Recent Analyses */}
        {savedBacklinks.length > 0 && !results && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Backlink Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedBacklinks.slice(0, 5).map((analysis: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                    <div>
                      <div className="font-medium">{analysis.url}</div>
                      <div className="text-sm text-muted-foreground">{analysis.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{analysis.totalBacklinks} backlinks</div>
                      <div className="text-xs text-muted-foreground">DA: {analysis.domainAuthority}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}