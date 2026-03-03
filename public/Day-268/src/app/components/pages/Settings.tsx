import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function Settings() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Settings</h2>
        <p className="mt-1 text-sm text-slate-600">Configure sync preferences and behavior</p>
      </div>

      <div className="space-y-6">
        {/* Sync Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Sync Settings</CardTitle>
            <CardDescription>Control how files are synced across devices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Sync</Label>
                <div className="text-sm text-slate-500">Automatically sync files when changes are detected</div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sync on Metered Connection</Label>
                <div className="text-sm text-slate-500">Allow syncing over mobile data</div>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <Select defaultValue="realtime">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="5min">Every 5 minutes</SelectItem>
                  <SelectItem value="15min">Every 15 minutes</SelectItem>
                  <SelectItem value="30min">Every 30 minutes</SelectItem>
                  <SelectItem value="1hour">Every hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Conflict Resolution</Label>
              <Select defaultValue="ask">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ask">Ask me every time</SelectItem>
                  <SelectItem value="local">Always keep local version</SelectItem>
                  <SelectItem value="cloud">Always keep cloud version</SelectItem>
                  <SelectItem value="both">Always keep both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Storage Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Settings</CardTitle>
            <CardDescription>Manage storage and cache</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Local Cache Size (MB)</Label>
              <Input type="number" defaultValue="1024" />
              <div className="text-sm text-slate-500">Maximum size for local file cache</div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Keep Files Offline</Label>
                <div className="text-sm text-slate-500">Store files locally for offline access</div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <Button variant="outline" className="w-full">Clear Cache</Button>
          </CardContent>
        </Card>

        {/* Network Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Network Settings</CardTitle>
            <CardDescription>Configure network behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Upload Speed Limit (MB/s)</Label>
              <Select defaultValue="unlimited">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                  <SelectItem value="1">1 MB/s</SelectItem>
                  <SelectItem value="5">5 MB/s</SelectItem>
                  <SelectItem value="10">10 MB/s</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Download Speed Limit (MB/s)</Label>
              <Select defaultValue="unlimited">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                  <SelectItem value="1">1 MB/s</SelectItem>
                  <SelectItem value="5">5 MB/s</SelectItem>
                  <SelectItem value="10">10 MB/s</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sync Complete Notifications</Label>
                <div className="text-sm text-slate-500">Notify when files finish syncing</div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Conflict Notifications</Label>
                <div className="text-sm text-slate-500">Alert when sync conflicts occur</div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Error Notifications</Label>
                <div className="text-sm text-slate-500">Notify when sync errors occur</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
