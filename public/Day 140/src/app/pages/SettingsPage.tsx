import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { User, Key, Mail, CreditCard, Bell, Shield, Save } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("sk-••••••••••••••••••••••••");
  const [smtpHost, setSmtpHost] = useState("smtp.example.com");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("user@example.com");
  
  const [notifications, setNotifications] = useState({
    campaignSent: true,
    weeklyReport: true,
    aiSuggestions: true,
    securityAlerts: true,
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleSaveApiKeys = () => {
    toast.success("API keys updated successfully");
  };

  const handleSaveSmtp = () => {
    toast.success("SMTP settings updated successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and application preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="w-4 h-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="smtp" className="gap-2">
            <Mail className="w-4 h-4" />
            SMTP
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="John"
                    className="bg-background border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    className="bg-background border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="bg-background border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  defaultValue="Acme Inc."
                  className="bg-background border"
                />
              </div>

              <Button onClick={handleSaveProfile} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API keys for integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg border-2 border-accent bg-accent/10 flex items-start gap-3">
                <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium mb-1 text-accent-foreground">Important: Add Your OpenAI API Key</h4>
                  <p className="text-accent-foreground/80">
                    To use the AI email generation feature, you need to add your OpenAI API key. 
                    This key is stored securely in your Supabase environment and never exposed to the frontend.
                    Get your key from{" "}
                    <a href="https://platform.openai.com/api-keys" className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                      OpenAI Platform
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-background border font-mono"
                  placeholder="sk-..."
                />
                <p className="text-sm text-muted-foreground">
                  Your API key should start with "sk-". Required for AI-powered email generation.
                </p>
              </div>

              <Separator />

              <div className="p-4 rounded-lg border bg-muted/30 flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-medium mb-1">Security Note</h4>
                  <p className="text-muted-foreground">
                    Your API keys are encrypted and stored securely in Supabase environment variables. 
                    Never share your keys with anyone. The keys are only accessible by the server and never exposed to the browser.
                  </p>
                </div>
              </div>

              <Button onClick={handleSaveApiKeys} className="gap-2">
                <Save className="w-4 h-4" />
                Save API Keys
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SMTP Settings */}
        <TabsContent value="smtp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMTP Integration</CardTitle>
              <CardDescription>
                Configure your email sending service
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input
                  id="smtp-host"
                  value={smtpHost}
                  onChange={(e) => setSmtpHost(e.target.value)}
                  className="bg-background border"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input
                    id="smtp-port"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    className="bg-background border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-encryption">Encryption</Label>
                  <Input
                    id="smtp-encryption"
                    defaultValue="TLS"
                    disabled
                    className="bg-background border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-user">Username</Label>
                <Input
                  id="smtp-user"
                  value={smtpUser}
                  onChange={(e) => setSmtpUser(e.target.value)}
                  className="bg-background border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-password">Password</Label>
                <Input
                  id="smtp-password"
                  type="password"
                  defaultValue="••••••••"
                  className="bg-background border"
                />
              </div>

              <Button onClick={handleSaveSmtp} className="gap-2">
                <Save className="w-4 h-4" />
                Save SMTP Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-6 rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold">Pro Plan</h3>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    50,000 emails per month • Unlimited templates • AI features
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">$49</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Usage This Month</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Emails Sent</span>
                    <span className="font-medium">12,431 / 50,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: "24.86%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Payment Method</h4>
                <div className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">•••• •••• •••• 4242</div>
                    <div className="text-sm text-muted-foreground">Expires 12/26</div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline" className="text-destructive">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-campaign" className="cursor-pointer">
                      Campaign Sent
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a campaign is successfully sent
                    </p>
                  </div>
                  <Switch
                    id="notif-campaign"
                    checked={notifications.campaignSent}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, campaignSent: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-report" className="cursor-pointer">
                      Weekly Report
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly performance reports via email
                    </p>
                  </div>
                  <Switch
                    id="notif-report"
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, weeklyReport: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-ai" className="cursor-pointer">
                      AI Suggestions
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get AI-powered optimization suggestions
                    </p>
                  </div>
                  <Switch
                    id="notif-ai"
                    checked={notifications.aiSuggestions}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, aiSuggestions: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notif-security" className="cursor-pointer">
                      Security Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Important security and account updates
                    </p>
                  </div>
                  <Switch
                    id="notif-security"
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, securityAlerts: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="gap-2">
                <Save className="w-4 h-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}