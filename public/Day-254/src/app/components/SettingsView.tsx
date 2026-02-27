import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

export function SettingsView() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
        <div className="space-y-4">
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
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Payment Reminders</div>
              <div className="text-sm text-gray-500">Get notified 3 days before a payment is due</div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Weekly Summary</div>
              <div className="text-sm text-gray-500">Receive a weekly summary of your subscriptions</div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Price Changes</div>
              <div className="text-sm text-gray-500">Get alerted when a subscription price changes</div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Trial Expiration</div>
              <div className="text-sm text-gray-500">Reminder when trial subscriptions are about to end</div>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" defaultValue="USD ($)" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateFormat">Date Format</Label>
            <Input id="dateFormat" defaultValue="MM/DD/YYYY" />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-red-200 bg-red-50">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
        <p className="text-sm text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="destructive">Delete Account</Button>
      </Card>
    </div>
  );
}
