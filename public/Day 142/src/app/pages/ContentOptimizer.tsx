import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Loader2,
  FileText,
  Zap,
  CheckCircle2,
  TrendingUp,
  Target,
  Hash,
  Plus,
  X
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';

export function ContentOptimizer() {
  const { accessToken } = useAuth();
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  function addKeyword() {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  }

  function removeKeyword(keyword: string) {
    setKeywords(keywords.filter((k) => k !== keyword));
  }

  async function handleOptimize() {
    if (!content.trim()) {
      toast.error('Please enter some content to optimize');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/content/optimize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          content,
          targetKeywords: keywords
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Content optimization failed');
      }

      setResult(data);
      toast.success('Content analysis complete!');
    } catch (error: any) {
      console.error('Optimization error:', error);
      toast.error(error.message || 'Failed to optimize content');
    } finally {
      setLoading(false);
    }
  }

  function getReadabilityLabel(score: number) {
    if (score >= 80) return { label: 'Very Easy', color: 'text-green-500' };
    if (score >= 60) return { label: 'Easy', color: 'text-blue-500' };
    if (score >= 40) return { label: 'Moderate', color: 'text-yellow-500' };
    if (score >= 20) return { label: 'Difficult', color: 'text-orange-500' };
    return { label: 'Very Difficult', color: 'text-red-500' };
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Optimizer</h1>
          <p className="text-muted-foreground">
            Optimize your content for SEO with AI-powered analysis and recommendations
          </p>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Content</CardTitle>
            <CardDescription>
              Paste your article, blog post, or webpage content below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Paste your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {content.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>

            <div>
              <Label>Target Keywords (Optional)</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Enter keyword and press Add"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                />
                <Button type="button" onClick={addKeyword}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="gap-2">
                      <Hash className="h-3 w-3" />
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Button onClick={handleOptimize} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Optimize Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Word Count
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{result.wordCount}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {result.wordCount >= 1500 ? 'Excellent length' : 'Consider adding more content'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Readability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold ${getReadabilityLabel(parseFloat(result.readabilityScore)).color}`}>
                    {result.readabilityScore}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getReadabilityLabel(parseFloat(result.readabilityScore)).label}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Sentences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{result.sentenceCount}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Avg: {result.averageSentenceLength} words/sentence
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Characters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {result.charCount.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Total characters</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="suggestions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
                <TabsTrigger value="keywords">Keyword Analysis</TabsTrigger>
              </TabsList>

              {/* Suggestions Tab */}
              <TabsContent value="suggestions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      AI-Powered Optimization Suggestions
                    </CardTitle>
                    <CardDescription>
                      Recommendations to improve your content's SEO performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.optimizationSuggestions?.map((suggestion: string, index: number) => (
                        <div
                          key={index}
                          className="flex gap-3 p-4 rounded-lg border bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium mb-1">Suggestion {index + 1}</p>
                            <p className="text-sm text-muted-foreground">{suggestion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Content Best Practices */}
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Content Best Practices</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg border">
                        {result.wordCount >= 1500 ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Target className="h-5 w-5 text-orange-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">Content Length</p>
                          <p className="text-xs text-muted-foreground">
                            {result.wordCount >= 1500
                              ? 'Excellent! Long-form content ranks better'
                              : `Aim for 1500+ words (currently ${result.wordCount})`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg border">
                        {parseFloat(result.averageSentenceLength) <= 20 ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Target className="h-5 w-5 text-orange-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">Sentence Length</p>
                          <p className="text-xs text-muted-foreground">
                            {parseFloat(result.averageSentenceLength) <= 20
                              ? 'Good! Sentences are concise and readable'
                              : 'Consider shortening sentences for better readability'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg border">
                        {parseFloat(result.readabilityScore) >= 60 ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Target className="h-5 w-5 text-orange-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">Readability Score</p>
                          <p className="text-xs text-muted-foreground">
                            {parseFloat(result.readabilityScore) >= 60
                              ? 'Easy to read for most audiences'
                              : 'Simplify language for better accessibility'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Keywords Tab */}
              <TabsContent value="keywords" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Density Analysis</CardTitle>
                    <CardDescription>
                      How often your target keywords appear in the content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {result.keywordDensities?.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No target keywords specified</p>
                        <p className="text-sm mt-1">
                          Add keywords above to analyze their density
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {result.keywordDensities?.map((kd: any, index: number) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{kd.keyword}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {kd.count} occurrences • {kd.density}% density
                              </div>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  parseFloat(kd.density) >= 1 && parseFloat(kd.density) <= 3
                                    ? 'bg-green-500'
                                    : 'bg-orange-500'
                                }`}
                                style={{ width: `${Math.min(parseFloat(kd.density) * 20, 100)}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {parseFloat(kd.density) >= 1 && parseFloat(kd.density) <= 3
                                ? 'Optimal keyword density (1-3%)'
                                : parseFloat(kd.density) < 1
                                ? 'Increase keyword usage'
                                : 'Reduce keyword usage to avoid stuffing'}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Keyword Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Optimization Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex gap-3">
                        <TrendingUp className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="font-medium">Maintain 1-3% Keyword Density</p>
                          <p className="text-muted-foreground">
                            Use keywords naturally without overstuffing
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <FileText className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="font-medium">Place Keywords Strategically</p>
                          <p className="text-muted-foreground">
                            Include in title, first paragraph, headings, and conclusion
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Target className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="font-medium">Use Semantic Variations</p>
                          <p className="text-muted-foreground">
                            Include related keywords and synonyms for better context
                          </p>
                        </div>
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
