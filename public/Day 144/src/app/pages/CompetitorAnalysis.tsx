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
  Users,
  TrendingUp,
  TrendingDown,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Target,
  Award,
  Minus
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export function CompetitorAnalysis() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [yourUrl, setYourUrl] = useState('');
  const [competitorUrl, setCompetitorUrl] = useState('');
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
      const response = await fetch(`${API_BASE_URL}/competitor/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          yourUrl,
          competitorUrl
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Analysis failed');
      }

      const data = await response.json();
      setResults(data);
      toast.success('Competitor analysis completed!');
    } catch (error: any) {
      console.error('Competitor analysis error:', error);
      toast.error(error.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function getComparisonIcon(yourScore: number, competitorScore: number) {
    if (yourScore > competitorScore) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (yourScore < competitorScore) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  }

  function getComparisonBadge(yourScore: number, competitorScore: number) {
    const diff = yourScore - competitorScore;
    if (diff > 10) return <Badge className="bg-green-500">You're ahead</Badge>;
    if (diff < -10) return <Badge variant="destructive">Behind</Badge>;
    return <Badge variant="secondary">Close match</Badge>;
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Competitor Analysis
          </h1>
          <p className="text-muted-foreground mt-2">
            Compare your website's SEO performance against competitors
          </p>
        </div>

        {/* Analysis Form */}
        <Card>
          <CardHeader>
            <CardTitle>Compare Websites</CardTitle>
            <CardDescription>
              Enter your website URL and a competitor's URL to see how you stack up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAnalyze} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="your-url">Your Website URL</Label>
                  <Input
                    id="your-url"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={yourUrl}
                    onChange={(e) => setYourUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competitor-url">Competitor URL</Label>
                  <Input
                    id="competitor-url"
                    type="url"
                    placeholder="https://competitor.com"
                    value={competitorUrl}
                    onChange={(e) => setCompetitorUrl(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Analyzing...' : 'Compare Websites'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Overall Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Overall SEO Score Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Your Website</span>
                      <span className="text-2xl font-bold text-primary">{results.yourSite.score}/100</span>
                    </div>
                    <Progress value={results.yourSite.score} className="h-3" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Competitor</span>
                      <span className="text-2xl font-bold text-orange-500">{results.competitorSite.score}/100</span>
                    </div>
                    <Progress value={results.competitorSite.score} className="h-3" />
                  </div>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg flex items-center justify-between">
                  <span className="font-medium">Winner</span>
                  {results.yourSite.score > results.competitorSite.score ? (
                    <Badge className="bg-green-500 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Your Website
                    </Badge>
                  ) : results.yourSite.score < results.competitorSite.score ? (
                    <Badge variant="destructive" className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Competitor
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Tie</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Radar Chart Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Metrics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={results.radarData}>
                    <PolarGrid key="grid" />
                    <PolarAngleAxis key="angle-axis" dataKey="metric" />
                    <PolarRadiusAxis key="radius-axis" angle={90} domain={[0, 100]} />
                    <Radar key="your-site" name="Your Site" dataKey="yourSite" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                    <Radar key="competitor" name="Competitor" dataKey="competitor" stroke="#f97316" fill="#f97316" fillOpacity={0.5} />
                    <Legend key="legend" />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.detailedMetrics.map((metric: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          {metric.name}
                          {getComparisonIcon(metric.yourScore, metric.competitorScore)}
                        </h4>
                        {getComparisonBadge(metric.yourScore, metric.competitorScore)}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Your Site</div>
                          <div className="font-medium">{metric.yourValue}</div>
                          <Progress value={metric.yourScore} className="mt-2 h-2" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Competitor</div>
                          <div className="font-medium">{metric.competitorValue}</div>
                          <Progress value={metric.competitorScore} className="mt-2 h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>
                  Strategies to outrank your competitor
                </CardDescription>
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