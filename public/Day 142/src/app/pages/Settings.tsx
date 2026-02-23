import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  User,
  Bell,
  CreditCard,
  Key,
  Zap,
  Mail,
  Shield,
  Save,
  ExternalLink,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';

export function Settings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
    company: '',
    website: ''
  });

  const [notifications, setNotifications] = useState({
    emailReports: true,
    weeklyDigest: true,
    rankingChanges: true,
    criticalIssues: true,
    productUpdates: false
  });

  const [apiKey, setApiKey] = useState('sk_test_••••••••••••••••••••••••');

  function handleSaveProfile() {
    toast.success('Profile updated successfully!');
  }

  function handleSaveNotifications() {
    toast.success('Notification preferences saved!');
  }

  function handleGenerateApiKey() {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
    toast.success('New API key generated!');
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="api">
              <Key className="h-4 w-4 mr-2" />
              API
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  />
                </div>
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">
                      Update your password regularly for security
                    </p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email-reports" className="text-base">Email Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive SEO analysis reports via email
                    </p>
                  </div>
                  <Switch
                    id="email-reports"
                    checked={notifications.emailReports}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailReports: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="weekly-digest" className="text-base">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Weekly summary of your SEO performance
                    </p>
                  </div>
                  <Switch
                    id="weekly-digest"
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, weeklyDigest: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="ranking-changes" className="text-base">Ranking Changes</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when keyword rankings change
                    </p>
                  </div>
                  <Switch
                    id="ranking-changes"
                    checked={notifications.rankingChanges}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, rankingChanges: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="critical-issues" className="text-base">Critical Issues</Label>
                    <p className="text-sm text-muted-foreground">
                      Alerts for critical SEO problems
                    </p>
                  </div>
                  <Switch
                    id="critical-issues"
                    checked={notifications.criticalIssues}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, criticalIssues: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="product-updates" className="text-base">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      News about new features and updates
                    </p>
                  </div>
                  <Switch
                    id="product-updates"
                    checked={notifications.productUpdates}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, productUpdates: checked })
                    }
                  />
                </div>
                <Button onClick={handleSaveNotifications} className="mt-4">
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">Free Plan</h3>
                      <Badge>Current</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      5 analyses per month • Basic features
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$0</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Upgrade to Pro</h4>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Unlimited SEO analyses
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Advanced AI suggestions
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Priority support
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      PDF report exports
                    </p>
                  </div>
                  <Button className="w-full">
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro - $29/month
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No payment method on file</p>
                  <p className="text-sm mt-1">Add a payment method to upgrade your plan</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No billing history</p>
                  <p className="text-sm mt-1">Your payment history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Key</CardTitle>
                <CardDescription>
                  Use this key to access SEO Pro API programmatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Your API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      value={apiKey}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(apiKey);
                        toast.success('API key copied to clipboard!');
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                <Button variant="destructive" onClick={handleGenerateApiKey}>
                  <Key className="mr-2 h-4 w-4" />
                  Generate New Key
                </Button>
                <div className="p-4 rounded-lg border bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    <strong>Warning:</strong> Generating a new API key will invalidate your
                    current key. Make sure to update any applications using the old key.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Learn how to integrate with SEO Pro API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">Base URL</h4>
                    <code className="px-2 py-1 rounded bg-muted">
                      https://api.seopro.com/v1
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Authentication</h4>
                    <p className="text-muted-foreground">
                      Include your API key in the Authorization header:
                    </p>
                    <code className="block px-3 py-2 rounded bg-muted mt-2">
                      Authorization: Bearer YOUR_API_KEY
                    </code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Rate Limits</h4>
                    <p className="text-muted-foreground">
                      Free: 100 requests/day • Pro: 10,000 requests/day
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Documentation
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Usage</CardTitle>
                <CardDescription>Monitor your API consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Requests this month</span>
                      <span className="font-medium">23 / 100</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '23%' }} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upgrade to Pro for higher rate limits and more API features
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
