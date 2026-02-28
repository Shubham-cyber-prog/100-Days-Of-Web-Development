import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  Trash2,
  Loader2,
  Search,
  Target,
  Globe
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';

export function KeywordTracker() {
  const { accessToken } = useAuth();
  const [keywords, setKeywords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState({
    keyword: '',
    url: '',
    targetLocation: 'Global'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (accessToken) {
      fetchKeywords();
    }
  }, [accessToken]);

  async function fetchKeywords() {
    try {
      const response = await fetch(`${API_BASE_URL}/keywords/list`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setKeywords(data.keywords || []);
      }
    } catch (error) {
      console.error('Error fetching keywords:', error);
      toast.error('Failed to fetch keywords');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddKeyword() {
    if (!newKeyword.keyword.trim() || !newKeyword.url.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/keywords/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(newKeyword)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add keyword');
      }

      setKeywords([data, ...keywords]);
      setNewKeyword({ keyword: '', url: '', targetLocation: 'Global' });
      setAddDialogOpen(false);
      toast.success('Keyword added successfully!');
    } catch (error: any) {
      console.error('Error adding keyword:', error);
      toast.error(error.message || 'Failed to add keyword');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteKeyword(keywordId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/keywords/${keywordId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete keyword');
      }

      setKeywords(keywords.filter((k) => k.id !== keywordId));
      toast.success('Keyword deleted');
    } catch (error: any) {
      console.error('Error deleting keyword:', error);
      toast.error(error.message || 'Failed to delete keyword');
    }
  }

  function getRankChange(keyword: any) {
    if (!keyword.previousRank) return null;
    const change = keyword.previousRank - keyword.currentRank;
    return change;
  }

  function getTrendIcon(keyword: any) {
    const change = getRankChange(keyword);
    if (change === null) return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  }

  // Mock chart data for demonstration
  const mockChartData = [
    { date: 'Week 1', rank: 45 },
    { date: 'Week 2', rank: 38 },
    { date: 'Week 3', rank: 32 },
    { date: 'Week 4', rank: 28 },
    { date: 'Week 5', rank: 22 },
    { date: 'Week 6', rank: 18 },
    { date: 'Week 7', rank: 15 },
    { date: 'Week 8', rank: 12 }
  ];

  const avgRank = keywords.length > 0
    ? Math.round(keywords.reduce((acc, k) => acc + k.currentRank, 0) / keywords.length)
    : 0;

  const topRanked = keywords.filter(k => k.currentRank <= 10).length;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Keyword Tracker</h1>
            <p className="text-muted-foreground">
              Monitor your keyword rankings and track performance over time
            </p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Keyword
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Keyword</DialogTitle>
                <DialogDescription>
                  Track a new keyword's ranking for your website
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="keyword">Keyword</Label>
                  <Input
                    id="keyword"
                    placeholder="seo optimization tools"
                    value={newKeyword.keyword}
                    onChange={(e) =>
                      setNewKeyword({ ...newKeyword, keyword: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">Target URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com/page"
                    value={newKeyword.url}
                    onChange={(e) => setNewKeyword({ ...newKeyword, url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Target Location</Label>
                  <Input
                    id="location"
                    placeholder="Global, US, UK, etc."
                    value={newKeyword.targetLocation}
                    onChange={(e) =>
                      setNewKeyword({ ...newKeyword, targetLocation: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setAddDialogOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddKeyword} disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Keyword
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="h-4 w-4" />
                Tracked Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{keywords.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {keywords.length === 0 ? 'Start tracking keywords' : 'Active keywords'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Average Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgRank || '-'}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {avgRank ? 'Mean ranking position' : 'No data yet'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Search className="h-4 w-4" />
                Top 10 Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{topRanked}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Keywords in top 10
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ranking Trend Chart */}
        {keywords.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Average Ranking Trend</CardTitle>
              <CardDescription>Historical performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis reversed domain={[1, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rank"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Keywords List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Keywords</CardTitle>
            <CardDescription>
              {keywords.length === 0
                ? 'No keywords tracked yet. Add your first keyword to get started.'
                : `Tracking ${keywords.length} keyword${keywords.length !== 1 ? 's' : ''}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              </div>
            ) : keywords.length === 0 ? (
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">No keywords yet</p>
                <Button onClick={() => setAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Keyword
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {keywords.map((keyword) => {
                  const rankChange = getRankChange(keyword);
                  return (
                    <div
                      key={keyword.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{keyword.keyword}</h3>
                          {getTrendIcon(keyword)}
                          {rankChange !== null && rankChange !== 0 && (
                            <Badge
                              variant={rankChange > 0 ? 'default' : 'destructive'}
                              className="text-xs"
                            >
                              {rankChange > 0 ? '+' : ''}
                              {rankChange}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1 truncate">
                            <Globe className="h-3 w-3" />
                            {keyword.targetLocation}
                          </span>
                          <span className="truncate">{keyword.url}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground mb-1">Position</div>
                          <Badge
                            variant={
                              keyword.currentRank <= 10
                                ? 'default'
                                : keyword.currentRank <= 30
                                ? 'secondary'
                                : 'outline'
                            }
                            className="text-lg font-bold"
                          >
                            #{keyword.currentRank}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteKeyword(keyword.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3">Keyword Tracking Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Track 10-20 keywords that are most relevant to your business
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Mix high-volume and long-tail keywords for balanced strategy
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Monitor competitor keywords to identify opportunities
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                Review rankings weekly to track trends and make adjustments
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
