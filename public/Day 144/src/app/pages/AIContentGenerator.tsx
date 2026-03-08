import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import {
  Sparkles,
  Loader2,
  Copy,
  Download,
  RefreshCw,
  FileText,
  CheckCircle,
  Target,
  Wand2
} from 'lucide-react';
import { API_BASE_URL } from '../lib/supabase';
import { toast } from 'sonner';

const CONTENT_TYPES = [
  { value: 'blog', label: 'Blog Post', icon: '📝' },
  { value: 'product', label: 'Product Description', icon: '🛍️' },
  { value: 'meta', label: 'Meta Description', icon: '🔖' },
  { value: 'social', label: 'Social Media Post', icon: '📱' },
  { value: 'email', label: 'Email Copy', icon: '📧' },
  { value: 'landing', label: 'Landing Page', icon: '🎯' }
];

const TONES = ['Professional', 'Casual', 'Friendly', 'Persuasive', 'Informative', 'Enthusiastic'];

export function AIContentGenerator() {
  const { user, accessToken } = useAuth();
  const navigate = useNavigate();
  const [contentType, setContentType] = useState('blog');
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('Professional');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [metadata, setMetadata] = useState<any>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setGeneratedContent('');
    setMetadata(null);

    try {
      const response = await fetch(`${API_BASE_URL}/content/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          contentType,
          topic,
          keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
          tone,
          additionalInfo
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Generation failed');
      }

      const data = await response.json();
      setGeneratedContent(data.content);
      setMetadata(data.metadata);
      toast.success('Content generated successfully!');
    } catch (error: any) {
      console.error('Content generation error:', error);
      toast.error(error.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedContent);
    toast.success('Copied to clipboard!');
  }

  function downloadContent() {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Content downloaded!');
  }

  function regenerateContent() {
    const form = document.getElementById('generate-form') as HTMLFormElement;
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Content Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate SEO-optimized content with AI in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Generator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Content Settings
              </CardTitle>
              <CardDescription>
                Configure what type of content you want to generate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="generate-form" onSubmit={handleGenerate} className="space-y-4">
                {/* Content Type */}
                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {CONTENT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setContentType(type.value)}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          contentType === type.value
                            ? 'border-primary bg-primary/10'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-sm font-medium">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topic */}
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic / Title *</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Best SEO Practices for 2024"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>

                {/* Keywords */}
                <div className="space-y-2">
                  <Label htmlFor="keywords">Target Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="SEO, optimization, ranking (comma separated)"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>

                {/* Tone */}
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <div className="flex flex-wrap gap-2">
                    {TONES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone(t)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          tone === t
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Instructions (Optional)</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Any specific requirements or details to include..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? 'Generating...' : 'Generate Content'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <div className="space-y-6">
            {generatedContent && metadata && (
              <>
                {/* Metadata */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Content Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-primary">{metadata.wordCount}</div>
                        <div className="text-sm text-muted-foreground">Words</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{metadata.readingTime}</div>
                        <div className="text-sm text-muted-foreground">Reading Time</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{metadata.seoScore}/100</div>
                        <div className="text-sm text-muted-foreground">SEO Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{metadata.keywordDensity}%</div>
                        <div className="text-sm text-muted-foreground">Keyword Density</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Generated Content Display */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Generated Content
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={regenerateContent}
                          disabled={loading}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadContent}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap font-sans">
                        {generatedContent}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SEO Tips */}
                {metadata.seoTips && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="h-5 w-5" />
                        SEO Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {metadata.seoTips.map((tip: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {!generatedContent && (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center">
                  <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Content Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the form and click "Generate Content" to create AI-powered content
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
