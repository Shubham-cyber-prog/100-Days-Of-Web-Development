import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import {
  Settings as SettingsIcon,
  Key,
  Users,
  Code,
  Save,
  Plus,
  Trash2,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [keywords, setKeywords] = useState([
    "spam",
    "scam",
    "click here",
    "free money",
  ]);
  const [newKeyword, setNewKeyword] = useState("");

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const addKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
      toast.success("Keyword added");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
    toast.success("Keyword removed");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl mb-1">Settings</h1>
        <p className="text-muted-foreground">
          Configure AI rules, filters, and integrations
        </p>
      </div>

      <Tabs defaultValue="ai-rules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="ai-rules" className="gap-2">
            <SettingsIcon className="w-4 h-4" />
            <span className="hidden sm:inline">AI Rules</span>
          </TabsTrigger>
          <TabsTrigger value="keywords" className="gap-2">
            <Key className="w-4 h-4" />
            <span className="hidden sm:inline">Keywords</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Rules Tab */}
        <TabsContent value="ai-rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detection Thresholds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-flag Confidence Threshold</Label>
                    <p className="text-sm text-muted-foreground">
                      Content with confidence above this value will be
                      automatically flagged
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      value={confidenceThreshold}
                      onChange={(e) =>
                        setConfidenceThreshold(Number(e.target.value))
                      }
                      className="w-20 text-center"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-reject Threshold</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically reject content above 95% confidence
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Review Queue Priority</Label>
                    <p className="text-sm text-muted-foreground">
                      Prioritize high severity items in the queue
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Toxicity Detection", enabled: true },
                { name: "Spam Detection", enabled: true },
                { name: "Harassment Detection", enabled: true },
                { name: "Hate Speech Detection", enabled: true },
                { name: "Policy Violation Detection", enabled: false },
              ].map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between"
                >
                  <Label>{category.name}</Label>
                  <Switch defaultChecked={category.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Add New Keyword</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter keyword or phrase"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                  />
                  <Button onClick={addKeyword} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Active Keywords ({keywords.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="secondary"
                      className="gap-2 pl-3 pr-2 py-1.5"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blocked Phrases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Phrase List</Label>
                <Textarea
                  placeholder="Enter phrases to block (one per line)"
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Filters
            </Button>
          </div>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Invite Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Admin User",
                    email: "admin@company.com",
                    role: "Admin",
                    status: "Active",
                  },
                  {
                    name: "Sarah Johnson",
                    email: "sarah@company.com",
                    role: "Moderator",
                    status: "Active",
                  },
                  {
                    name: "Mike Chen",
                    email: "mike@company.com",
                    role: "Moderator",
                    status: "Active",
                  },
                  {
                    name: "Emily Davis",
                    email: "emily@company.com",
                    role: "Viewer",
                    status: "Invited",
                  },
                ].map((member) => (
                  <div
                    key={member.email}
                    className="flex items-center justify-between p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          member.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {member.status}
                      </Badge>
                      <Select defaultValue={member.role.toLowerCase()}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground pb-2 border-b">
                  <div>Permission</div>
                  <div className="text-center">Admin</div>
                  <div className="text-center">Moderator</div>
                  <div className="text-center">Viewer</div>
                </div>
                {[
                  { name: "View Dashboard", admin: true, mod: true, viewer: true },
                  { name: "Review Content", admin: true, mod: true, viewer: false },
                  { name: "Approve/Reject", admin: true, mod: true, viewer: false },
                  { name: "Manage Settings", admin: true, mod: false, viewer: false },
                  { name: "Manage Users", admin: true, mod: false, viewer: false },
                ].map((perm) => (
                  <div key={perm.name} className="grid grid-cols-4 gap-4 py-2">
                    <div className="text-sm">{perm.name}</div>
                    <div className="flex justify-center">
                      <Switch checked={perm.admin} disabled />
                    </div>
                    <div className="flex justify-center">
                      <Switch checked={perm.mod} disabled />
                    </div>
                    <div className="flex justify-center">
                      <Switch checked={perm.viewer} disabled />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    name: "Production API Key",
                    key: "cg_prod_••••••••••••••1a2b",
                    created: "Feb 1, 2026",
                    lastUsed: "2 hours ago",
                  },
                  {
                    name: "Development API Key",
                    key: "cg_dev_••••••••••••••3c4d",
                    created: "Jan 15, 2026",
                    lastUsed: "1 day ago",
                  },
                ].map((apiKey) => (
                  <div
                    key={apiKey.name}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-medium mb-1">{apiKey.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Created {apiKey.created} • Last used {apiKey.lastUsed}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
                        {apiKey.key}
                      </code>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          toast.success("API key copied to clipboard");
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Generate New API Key
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input
                  placeholder="https://your-domain.com/webhook"
                  defaultValue="https://api.company.com/moderation-webhook"
                />
              </div>

              <div className="space-y-2">
                <Label>Events to Subscribe</Label>
                <div className="space-y-2">
                  {[
                    "content.flagged",
                    "content.approved",
                    "content.rejected",
                    "content.escalated",
                  ].map((event) => (
                    <div key={event} className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Label className="font-mono text-sm">{event}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>API Documentation</Label>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm mb-2">
                    For detailed API documentation and integration guides,
                    visit:
                  </p>
                  <code className="text-sm text-primary">
                    https://docs.contentguard.ai/api
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Configuration
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
