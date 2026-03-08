import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Zap,
  Loader2,
  Clock,
  Smartphone,
  Monitor,
  AlertCircle,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  Activity
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export function SiteSpeedMonitor() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/speed/analyze`, {
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
      toast.success('Speed analysis completed!');
    } catch (error: any) {
      console.error('Speed analysis error:', error);
      toast.error(error.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function getScoreColor(score: number) {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  }

  function getScoreBadge(score: number) {
    if (score >= 90) return <Badge className="bg-green-500">Good</Badge>;
    if (score >= 50) return <Badge className="bg-orange-500">Needs Improvement</Badge>;
    return <Badge variant="destructive">Poor</Badge>;
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Zap className="h-8 w-8 text-primary" />
            Site Speed Monitor
          </h1>
          <p className="text-muted-foreground mt-2">
            Analyze page load performance and Core Web Vitals
          </p>
        </div>

        {/* Analysis Form */}
        <Card>
          <CardHeader>
            <CardTitle>Check Page Speed</CardTitle>
            <CardDescription>
              Enter a URL to analyze its loading performance and Core Web Vitals
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
                {loading ? 'Analyzing Performance...' : 'Analyze Speed'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Performance Scores */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Desktop Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className={`text-6xl font-bold ${getScoreColor(results.desktop.score)}`}>
                      {results.desktop.score}
                    </div>
                    <div className="mt-2">{getScoreBadge(results.desktop.score)}</div>
                  </div>
                  <Progress value={results.desktop.score} className="h-3" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Mobile Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className={`text-6xl font-bold ${getScoreColor(results.mobile.score)}`}>
                      {results.mobile.score}
                    </div>
                    <div className="mt-2">{getScoreBadge(results.mobile.score)}</div>
                  </div>
                  <Progress value={results.mobile.score} className="h-3" />
                </CardContent>
              </Card>
            </div>

            {/* Core Web Vitals */}
            <Card>
              <CardHeader>
                <CardTitle>Core Web Vitals</CardTitle>
                <CardDescription>
                  Key metrics that measure real-world user experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {results.coreWebVitals.map((vital: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">{vital.name}</span>
                        {vital.status === 'good' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : vital.status === 'needs-improvement' ? (
                          <AlertCircle className="h-5 w-5 text-orange-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div className="text-2xl font-bold mb-1">{vital.value}</div>
                      <div className="text-xs text-muted-foreground">{vital.description}</div>
                      <Progress
                        value={vital.percentile}
                        className="mt-3 h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Load Time Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Load Time Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={results.loadTimeBreakdown}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" />
                    <XAxis key="x-axis" dataKey="phase" />
                    <YAxis key="y-axis" />
                    <Tooltip key="tooltip" />
                    <Legend key="legend" />
                    <Bar key="desktop-bar" dataKey="desktop" fill="#8b5cf6" name="Desktop (ms)" />
                    <Bar key="mobile-bar" dataKey="mobile" fill="#f97316" name="Mobile (ms)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={results.performanceTrend}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" />
                    <XAxis key="x-axis" dataKey="date" />
                    <YAxis key="y-axis" />
                    <Tooltip key="tooltip" />
                    <Legend key="legend" />
                    <Line key="desktop-line" type="monotone" dataKey="desktop" stroke="#8b5cf6" strokeWidth={2} name="Desktop Score" />
                    <Line key="mobile-line" type="monotone" dataKey="mobile" stroke="#f97316" strokeWidth={2} name="Mobile Score" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Optimization Opportunities
                </CardTitle>
                <CardDescription>
                  Suggestions to improve your page speed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.opportunities.map((opp: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{opp.title}</h4>
                          <p className="text-sm text-muted-foreground">{opp.description}</p>
                        </div>
                        <Badge variant={opp.impact === 'high' ? 'destructive' : opp.impact === 'medium' ? 'default' : 'secondary'}>
                          {opp.impact} impact
                        </Badge>
                      </div>
                      {opp.savings && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <Clock className="h-4 w-4" />
                          <span>Potential savings: {opp.savings}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Diagnostics */}
            <Card>
              <CardHeader>
                <CardTitle>Diagnostics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.diagnostics.map((diagnostic: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {diagnostic.passed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-orange-500" />
                        )}
                        <span className="text-sm">{diagnostic.name}</span>
                      </div>
                      <span className="text-sm font-medium">{diagnostic.value}</span>
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