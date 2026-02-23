import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  Zap,
  Smartphone,
  Link,
  FileText,
  Globe,
  Clock,
  Image as ImageIcon,
  Search
} from 'lucide-react';

export function TechnicalAudit() {
  // Mock audit data
  const auditResults = {
    overallScore: 78,
    categories: {
      performance: {
        score: 85,
        items: [
          { name: 'Page Load Time', status: 'pass', value: '2.1s', description: 'Excellent load speed' },
          { name: 'Time to Interactive', status: 'pass', value: '3.2s', description: 'Good interactivity' },
          { name: 'First Contentful Paint', status: 'pass', value: '1.5s', description: 'Fast initial render' },
          { name: 'Largest Contentful Paint', status: 'warning', value: '2.8s', description: 'Could be improved' },
          { name: 'Cumulative Layout Shift', status: 'pass', value: '0.05', description: 'Minimal layout shift' }
        ]
      },
      security: {
        score: 90,
        items: [
          { name: 'HTTPS Enabled', status: 'pass', description: 'Site uses secure connection' },
          { name: 'SSL Certificate Valid', status: 'pass', description: 'Certificate is valid and trusted' },
          { name: 'Mixed Content', status: 'pass', description: 'No mixed HTTP/HTTPS content' },
          { name: 'Security Headers', status: 'warning', description: 'Some security headers missing' }
        ]
      },
      mobile: {
        score: 72,
        items: [
          { name: 'Mobile Friendly', status: 'pass', description: 'Site is mobile responsive' },
          { name: 'Viewport Configuration', status: 'pass', description: 'Proper viewport meta tag' },
          { name: 'Touch Elements', status: 'warning', description: 'Some touch targets too small' },
          { name: 'Font Sizes', status: 'pass', description: 'Readable font sizes on mobile' },
          { name: 'Mobile Page Speed', status: 'warning', description: 'Mobile load time could be faster' }
        ]
      },
      seo: {
        score: 68,
        items: [
          { name: 'Sitemap', status: 'pass', description: 'XML sitemap present' },
          { name: 'Robots.txt', status: 'pass', description: 'Robots.txt file found' },
          { name: 'Canonical Tags', status: 'warning', description: 'Some pages missing canonical tags' },
          { name: 'Structured Data', status: 'fail', description: 'No schema markup detected' },
          { name: 'Internal Linking', status: 'pass', description: 'Good internal link structure' },
          { name: 'Broken Links', status: 'fail', description: '5 broken links found' }
        ]
      },
      accessibility: {
        score: 75,
        items: [
          { name: 'Alt Text', status: 'warning', description: '12 images missing alt text' },
          { name: 'Heading Hierarchy', status: 'pass', description: 'Proper heading structure' },
          { name: 'Color Contrast', status: 'pass', description: 'Adequate color contrast' },
          { name: 'ARIA Labels', status: 'warning', description: 'Some interactive elements missing labels' },
          { name: 'Keyboard Navigation', status: 'pass', description: 'Site is keyboard accessible' }
        ]
      },
      content: {
        score: 82,
        items: [
          { name: 'Word Count', status: 'pass', description: 'Sufficient content on pages' },
          { name: 'Duplicate Content', status: 'pass', description: 'No duplicate content detected' },
          { name: 'Meta Descriptions', status: 'warning', description: '3 pages missing meta descriptions' },
          { name: 'Title Tags', status: 'pass', description: 'All pages have unique titles' },
          { name: 'H1 Tags', status: 'pass', description: 'Proper H1 usage across site' }
        ]
      }
    }
  };

  function getStatusIcon(status: string) {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  }

  function getScoreColor(score: number) {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Technical SEO Audit</h1>
          <p className="text-muted-foreground">
            Comprehensive technical analysis of your website's SEO health
          </p>
        </div>

        {/* Overall Score */}
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Overall Technical Score
                </h3>
                <div className={`text-6xl font-bold ${getScoreColor(auditResults.overallScore)}`}>
                  {auditResults.overallScore}
                  <span className="text-3xl text-muted-foreground">/100</span>
                </div>
                <Badge variant="secondary" className="mt-2">
                  Good Performance
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                <div className="text-center p-3 rounded-lg border">
                  <div className={`text-2xl font-bold ${getScoreColor(auditResults.categories.performance.score)}`}>
                    {auditResults.categories.performance.score}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Performance</div>
                </div>
                <div className="text-center p-3 rounded-lg border">
                  <div className={`text-2xl font-bold ${getScoreColor(auditResults.categories.security.score)}`}>
                    {auditResults.categories.security.score}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Security</div>
                </div>
                <div className="text-center p-3 rounded-lg border">
                  <div className={`text-2xl font-bold ${getScoreColor(auditResults.categories.mobile.score)}`}>
                    {auditResults.categories.mobile.score}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Mobile</div>
                </div>
                <div className="text-center p-3 rounded-lg border">
                  <div className={`text-2xl font-bold ${getScoreColor(auditResults.categories.seo.score)}`}>
                    {auditResults.categories.seo.score}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">SEO</div>
                </div>
                <div className="text-center p-3 rounded-lg border">
                  <div className={`text-2xl font-bold ${getScoreColor(auditResults.categories.accessibility.score)}`}>
                    {auditResults.categories.accessibility.score}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Accessibility</div>
                </div>
                <div className="text-center p-3 rounded-lg border">
                  <div className={`text-2xl font-bold ${getScoreColor(auditResults.categories.content.score)}`}>
                    {auditResults.categories.content.score}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Content</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="performance">
              <Zap className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="mobile">
              <Smartphone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Mobile</span>
            </TabsTrigger>
            <TabsTrigger value="seo">
              <Search className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility">
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Access</span>
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Performance Metrics
                    </CardTitle>
                    <CardDescription>Core Web Vitals and page speed analysis</CardDescription>
                  </div>
                  <Badge variant="default">Score: {auditResults.categories.performance.score}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditResults.categories.performance.items.map((item, index) => (
                    <div key={index} className="flex items-start justify-between p-3 rounded-lg border">
                      <div className="flex gap-3 flex-1">
                        {getStatusIcon(item.status)}
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{item.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Analysis
                    </CardTitle>
                    <CardDescription>SSL, HTTPS, and security headers</CardDescription>
                  </div>
                  <Badge variant="default">Score: {auditResults.categories.security.score}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditResults.categories.security.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mobile Tab */}
          <TabsContent value="mobile" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Mobile Optimization
                    </CardTitle>
                    <CardDescription>Mobile responsiveness and usability</CardDescription>
                  </div>
                  <Badge variant="secondary">Score: {auditResults.categories.mobile.score}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditResults.categories.mobile.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Technical SEO
                    </CardTitle>
                    <CardDescription>Sitemaps, robots.txt, and crawlability</CardDescription>
                  </div>
                  <Badge variant="secondary">Score: {auditResults.categories.seo.score}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditResults.categories.seo.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="accessibility" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Accessibility
                    </CardTitle>
                    <CardDescription>WCAG compliance and usability</CardDescription>
                  </div>
                  <Badge variant="secondary">Score: {auditResults.categories.accessibility.score}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditResults.categories.accessibility.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Content Quality
                    </CardTitle>
                    <CardDescription>Content structure and metadata</CardDescription>
                  </div>
                  <Badge variant="default">Score: {auditResults.categories.content.score}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditResults.categories.content.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Priority Actions */}
        <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Priority Actions Required
            </CardTitle>
            <CardDescription>Critical issues that need immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 rounded-lg border bg-background">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Fix Broken Links</div>
                  <div className="text-sm text-muted-foreground">
                    5 broken links found - these negatively impact user experience and SEO
                  </div>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg border bg-background">
                <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Add Structured Data</div>
                  <div className="text-sm text-muted-foreground">
                    No schema markup detected - add JSON-LD structured data for better search visibility
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
