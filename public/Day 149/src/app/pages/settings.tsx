import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Zap,
  Save,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground text-[14px]">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Zap className="w-4 h-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-[18px] font-semibold mb-6">Profile Information</h3>
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="mb-2">
                    Change Avatar
                  </Button>
                  <p className="text-[12px] text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="h-24"
                  defaultValue="Passionate developer and technical writer"
                />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-[18px] font-semibold mb-6">Email Notifications</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-[14px]">New Comments</p>
                  <p className="text-[13px] text-muted-foreground">
                    Get notified when someone comments on your article
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-[14px]">Article Published</p>
                  <p className="text-[13px] text-muted-foreground">
                    Receive notifications when your article is published
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-[14px]">Weekly Digest</p>
                  <p className="text-[13px] text-muted-foreground">
                    Get a weekly summary of your knowledge base activity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-[14px]">Team Mentions</p>
                  <p className="text-[13px] text-muted-foreground">
                    Get notified when someone mentions you
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-[14px]">Marketing Updates</p>
                  <p className="text-[13px] text-muted-foreground">
                    Receive updates about new features and tips
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-[18px] font-semibold mb-6">Change Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="flex justify-end pt-2">
                <Button>Update Password</Button>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-[18px] font-semibold mb-6">
              Two-Factor Authentication
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-[14px] mb-1">Enable 2FA</p>
                <p className="text-[13px] text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-[18px] font-semibold mb-6">API Keys</h3>
            <p className="text-[13px] text-muted-foreground mb-4">
              Generate API keys to access your knowledge base programmatically
            </p>
            <Button variant="outline" className="gap-2">
              <Key className="w-4 h-4" />
              Generate API Key
            </Button>
          </div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-[18px] font-semibold mb-6">Theme</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-[14px]">Dark Mode</p>
                  <p className="text-[13px] text-muted-foreground">
                    Toggle between light and dark theme
                  </p>
                </div>
                <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                    <SelectItem value="gmt">GMT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-[18px] font-semibold mb-6">
              Connected Services
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#1DA1F2]" />
                  </div>
                  <div>
                    <p className="font-medium text-[14px]">Slack</p>
                    <p className="text-[12px] text-muted-foreground">
                      Post updates to your Slack workspace
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#171515]/10 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-[14px]">GitHub</p>
                    <p className="text-[12px] text-muted-foreground">
                      Sync documentation with GitHub repos
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EA4335]/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#EA4335]" />
                  </div>
                  <div>
                    <p className="font-medium text-[14px]">Google Analytics</p>
                    <p className="text-[12px] text-muted-foreground">
                      Track page views and user behavior
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}