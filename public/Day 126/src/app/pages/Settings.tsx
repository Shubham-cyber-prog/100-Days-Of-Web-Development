import { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Bell, Shield, Code, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

export function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoReview, setAutoReview] = useState(false);
  const [strictness, setStrictness] = useState([70]);
  const [securityScan, setSecurityScan] = useState(true);
  const [performanceCheck, setPerformanceCheck] = useState(true);
  const [styleCheck, setStyleCheck] = useState(false);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Customize your code review experience
        </p>
      </div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable dark theme for better code viewing
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="syntax-highlight">Syntax Highlighting</Label>
                <p className="text-sm text-muted-foreground">
                  Color-coded syntax for better readability
                </p>
              </div>
              <Switch id="syntax-highlight" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Analysis Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI Analysis
            </CardTitle>
            <CardDescription>
              Configure AI-powered code review settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="strictness">Analysis Strictness</Label>
                  <span className="text-sm text-muted-foreground">{strictness[0]}%</span>
                </div>
                <Slider
                  id="strictness"
                  value={strictness}
                  onValueChange={setStrictness}
                  max={100}
                  step={10}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Higher values mean more thorough analysis and more suggestions
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-review">Automatic Review</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically analyze code on upload
                </p>
              </div>
              <Switch
                id="auto-review"
                checked={autoReview}
                onCheckedChange={setAutoReview}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rule Customization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Review Rules
            </CardTitle>
            <CardDescription>
              Enable or disable specific types of checks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-destructive" />
                  Security Scanning
                </Label>
                <p className="text-sm text-muted-foreground">
                  Detect vulnerabilities and security issues
                </p>
              </div>
              <Switch
                id="security"
                checked={securityScan}
                onCheckedChange={setSecurityScan}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="performance" className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#10b981]" />
                  Performance Check
                </Label>
                <p className="text-sm text-muted-foreground">
                  Identify optimization opportunities
                </p>
              </div>
              <Switch
                id="performance"
                checked={performanceCheck}
                onCheckedChange={setPerformanceCheck}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="style">Code Style Check</Label>
                <p className="text-sm text-muted-foreground">
                  Enforce coding standards and best practices
                </p>
              </div>
              <Switch
                id="style"
                checked={styleCheck}
                onCheckedChange={setStyleCheck}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="bugs">Bug Detection</Label>
                <p className="text-sm text-muted-foreground">
                  Find potential bugs and logical errors
                </p>
              </div>
              <Switch id="bugs" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="readability">Readability Analysis</Label>
                <p className="text-sm text-muted-foreground">
                  Suggest improvements for code clarity
                </p>
              </div>
              <Switch id="readability" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for completed reviews
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get review summaries via email
                </p>
              </div>
              <Switch id="email" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="security-alerts">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Immediate notifications for security issues
                </p>
              </div>
              <Switch id="security-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end gap-3"
      >
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </motion.div>
    </div>
  );
}