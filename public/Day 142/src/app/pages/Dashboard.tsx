import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';

export function Dashboard() {
  const { user, accessToken, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

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

  // Mock data for charts
  const rankingData = [
    { date: 'Jan 15', position: 45 },
    { date: 'Jan 20', position: 38 },
    { date: 'Jan 25', position: 32 },
    { date: 'Feb 1', position: 28 },
    { date: 'Feb 5', position: 22 },
    { date: 'Feb 10', position: 18 },
    { date: 'Feb 15', position: 15 },
    { date: 'Feb 20', position: 12 }
  ];

  const trafficData = [
    { month: 'Sep', visitors: 2400 },
    { month: 'Oct', visitors: 3200 },
    { month: 'Nov', visitors: 4100 },
    { month: 'Dec', visitors: 5200 },
    { month: 'Jan', visitors: 6800 },
    { month: 'Feb', visitors: 8500 }
  ];

  const issueDistribution = [
    { name: 'Critical', value: 3, color: '#ef4444' },
    { name: 'Warning', value: 12, color: '#f59e0b' },
    { name: 'Info', value: 8, color: '#3b82f6' }
  ];

  const avgScore = history.length > 0
    ? Math.round(history.slice(0, 5).reduce((acc, item) => acc + item.score, 0) / Math.min(5, history.length))
    : 0;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.user_metadata?.name || 'User'}! Here's your SEO performance overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average SEO Score</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgScore}/100</div>
              <Progress value={avgScore} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {history.length > 0 ? 'Based on recent analyses' : 'No analyses yet'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Keyword Rankings</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <div className="flex items-center gap-1 mt-2 text-green-500">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+18%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs. last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8.5K</div>
              <div className="flex items-center gap-1 mt-2 text-green-500">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+25%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs. last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">23</div>
              <div className="flex items-center gap-1 mt-2 text-red-500">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm font-medium">3 Critical</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Needs attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Keyword Ranking Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Keyword Position Trend</CardTitle>
              <CardDescription>Average ranking position over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rankingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis reversed />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="position"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Traffic Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Organic Traffic Growth</CardTitle>
              <CardDescription>Monthly visitors from search engines</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Issues and Recent Analyses */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Issue Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Issue Distribution</CardTitle>
              <CardDescription>Breakdown by severity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={issueDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {issueDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {issueDistribution.map((issue) => (
                  <div key={issue.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: issue.color }}
                      />
                      <span className="text-sm">{issue.name}</span>
                    </div>
                    <span className="text-sm font-medium">{issue.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Analyses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Analyses</CardTitle>
              <CardDescription>Your latest SEO audits</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : history.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No analyses yet</p>
                  <Button onClick={() => navigate('/analyzer')}>
                    Start First Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.url}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge
                        variant={item.score >= 80 ? 'default' : item.score >= 60 ? 'secondary' : 'destructive'}
                      >
                        {item.score}/100
                      </Badge>
                    </div>
                  ))}
                  {history.length > 5 && (
                    <Button variant="outline" className="w-full" onClick={() => navigate('/reports')}>
                      View All
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Quick SEO Scan
                </h3>
                <p className="text-muted-foreground">
                  Analyze any website in seconds with our AI-powered SEO scanner
                </p>
              </div>
              <Button size="lg" onClick={() => navigate('/analyzer')}>
                Start Scanning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
