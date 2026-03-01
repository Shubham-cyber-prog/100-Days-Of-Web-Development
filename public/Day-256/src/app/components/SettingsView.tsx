import { Card, CardContent } from "./ui/card";
import { Settings as SettingsIcon, Moon, Bell, Shield, Database } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export function SettingsView() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your Docker UI preferences and configurations</p>
        </div>

        {/* Appearance */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Moon className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Use dark theme across the interface</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-700" />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Compact View</Label>
                  <p className="text-sm text-gray-500">Show more items in tables</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Container Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified when containers stop</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-700" />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Resource Warnings</Label>
                  <p className="text-sm text-gray-500">Alert on high CPU/memory usage</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-700" />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">System Updates</Label>
                  <p className="text-sm text-gray-500">Notify about Docker updates</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Docker Connection */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-semibold text-white">Docker Connection</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Docker Host</Label>
                <Input
                  defaultValue="unix:///var/run/docker.sock"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">API Version</Label>
                <Input
                  defaultValue="1.43"
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Require Confirmation</Label>
                  <p className="text-sm text-gray-500">Confirm before deleting containers</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gray-700" />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Auto-lock</Label>
                  <p className="text-sm text-gray-500">Lock UI after inactivity</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
