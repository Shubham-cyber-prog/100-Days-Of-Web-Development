import { useState } from "react";
import { Save, Key, Users as UsersIcon, Settings as SettingsIcon, Plug } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const tabs = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "roles", label: "Roles & Permissions", icon: UsersIcon },
  { id: "api", label: "API Keys", icon: Key },
  { id: "integrations", label: "Integrations", icon: Plug },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your CMS configuration.</p>
        </div>
        <Button size="md">
          <Save className="size-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="size-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "general" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Site Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm text-foreground mb-2">Site Name</label>
                    <Input type="text" defaultValue="Custom CMS" />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-2">Site Description</label>
                    <textarea
                      defaultValue="A modern content management system"
                      className="w-full h-20 px-3 py-2 rounded-lg border border-border bg-input-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-2">Site URL</label>
                    <Input type="url" defaultValue="https://example.com" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm text-foreground mb-2">Theme</label>
                    <select className="w-full h-10 px-3 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-foreground mb-2">Language</label>
                    <select className="w-full h-10 px-3 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "roles" && (
            <Card>
              <CardHeader>
                <CardTitle>User Roles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {["Administrator", "Editor", "Author", "Contributor", "Viewer"].map((role) => (
                    <div key={role} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="text-foreground">{role}</p>
                        <p className="text-sm text-muted-foreground">Manage {role.toLowerCase()} permissions</p>
                      </div>
                      <Button variant="secondary" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "api" && (
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-foreground">Production Key</p>
                      <Button variant="ghost" size="sm">Regenerate</Button>
                    </div>
                    <code className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      pk_live_xxxxxxxxxxxxxxxxxxxx
                    </code>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-foreground">Development Key</p>
                      <Button variant="ghost" size="sm">Regenerate</Button>
                    </div>
                    <code className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      pk_test_xxxxxxxxxxxxxxxxxxxx
                    </code>
                  </div>
                </div>
                <Button variant="secondary" size="md">
                  <Key className="size-4" />
                  Generate New Key
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "integrations" && (
            <Card>
              <CardHeader>
                <CardTitle>Available Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { name: "Google Analytics", connected: true },
                    { name: "Stripe", connected: false },
                    { name: "Mailchimp", connected: true },
                    { name: "Slack", connected: false },
                  ].map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-accent rounded-lg" />
                        <div>
                          <p className="text-foreground">{integration.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {integration.connected ? "Connected" : "Not connected"}
                          </p>
                        </div>
                      </div>
                      <Button variant={integration.connected ? "secondary" : "primary"} size="sm">
                        {integration.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
