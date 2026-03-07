import { useState } from "react";
import { motion } from "motion/react";
import { User, Bot, Bell, Shield, Save, Sparkles, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Slider } from "../../components/ui/slider";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    chat: false,
    tasks: true,
  });
  const [aiSettings, setAiSettings] = useState({
    autoRespond: true,
    learningMode: true,
    contextual: true,
    creativity: 50,
  });

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-white/60 backdrop-blur-sm p-1">
          <TabsTrigger value="profile" className="rounded-xl">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-xl">
            <Bot className="w-4 h-4 mr-2" />
            AI Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white text-2xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="rounded-2xl mb-2">
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      defaultValue="John"
                      className="rounded-2xl bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      defaultValue="Doe"
                      className="rounded-2xl bg-white/50"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      defaultValue="john@example.com"
                      className="rounded-2xl bg-white/50"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      placeholder="Tell us about yourself"
                      defaultValue="AI enthusiast and productivity expert"
                      className="rounded-2xl bg-white/50"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:opacity-90 shadow-lg shadow-indigo-500/30">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* AI Preferences Tab */}
        <TabsContent value="ai" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
              <CardHeader>
                <CardTitle>AI Assistant Preferences</CardTitle>
                <CardDescription>Customize how your AI assistant behaves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Response Style */}
                <div className="space-y-2">
                  <Label htmlFor="responseStyle">Response Style</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger className="rounded-2xl bg-white/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Creativity Level */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="creativity">Creativity Level</Label>
                    <span className="text-sm text-gray-500">{aiSettings.creativity}%</span>
                  </div>
                  <Slider
                    id="creativity"
                    value={[aiSettings.creativity]}
                    onValueChange={(value) =>
                      setAiSettings({ ...aiSettings, creativity: value[0] })
                    }
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Conservative</span>
                    <span>Creative</span>
                  </div>
                </div>

                <Separator />

                {/* Toggle Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <Label htmlFor="autoRespond" className="cursor-pointer">
                          Auto-Respond
                        </Label>
                        <p className="text-sm text-gray-500">
                          Automatically suggest responses
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="autoRespond"
                      checked={aiSettings.autoRespond}
                      onCheckedChange={(checked) =>
                        setAiSettings({ ...aiSettings, autoRespond: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <Label htmlFor="learningMode" className="cursor-pointer">
                          Learning Mode
                        </Label>
                        <p className="text-sm text-gray-500">
                          Learn from your interactions
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="learningMode"
                      checked={aiSettings.learningMode}
                      onCheckedChange={(checked) =>
                        setAiSettings({ ...aiSettings, learningMode: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <Label htmlFor="contextual" className="cursor-pointer">
                          Contextual Awareness
                        </Label>
                        <p className="text-sm text-gray-500">
                          Remember conversation context
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="contextual"
                      checked={aiSettings.contextual}
                      onCheckedChange={(checked) =>
                        setAiSettings({ ...aiSettings, contextual: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:opacity-90 shadow-lg shadow-indigo-500/30">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotif" className="cursor-pointer">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch
                      id="emailNotif"
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotif" className="cursor-pointer">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Get instant push notifications
                      </p>
                    </div>
                    <Switch
                      id="pushNotif"
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="chatNotif" className="cursor-pointer">
                        Chat Messages
                      </Label>
                      <p className="text-sm text-gray-500">
                        Notify on new chat messages
                      </p>
                    </div>
                    <Switch
                      id="chatNotif"
                      checked={notifications.chat}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, chat: checked })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="taskNotif" className="cursor-pointer">
                        Task Updates
                      </Label>
                      <p className="text-sm text-gray-500">
                        Notify on task completions
                      </p>
                    </div>
                    <Switch
                      id="taskNotif"
                      checked={notifications.tasks}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, tasks: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:opacity-90 shadow-lg shadow-indigo-500/30">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="rounded-2xl bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      className="rounded-2xl bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="rounded-2xl bg-white/50"
                    />
                  </div>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="cursor-pointer">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-2xl">
                    Enable
                  </Button>
                </div>

                <Separator />

                {/* Active Sessions */}
                <div>
                  <h3 className="font-semibold mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50">
                      <div>
                        <p className="font-medium">Current Device</p>
                        <p className="text-sm text-gray-500">Chrome on macOS • Active now</p>
                      </div>
                      <Button variant="ghost" className="rounded-xl" disabled>
                        Current
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50">
                      <div>
                        <p className="font-medium">Mobile Device</p>
                        <p className="text-sm text-gray-500">Safari on iOS • 2 days ago</p>
                      </div>
                      <Button variant="ghost" className="rounded-xl text-red-600">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:opacity-90 shadow-lg shadow-indigo-500/30">
                    <Save className="w-4 h-4 mr-2" />
                    Update Security
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
