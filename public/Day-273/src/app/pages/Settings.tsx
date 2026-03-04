import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { toast } from "sonner";

export default function Settings() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Photo</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive email updates about your expenses</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Expense Reminders</p>
                <p className="text-sm text-gray-600">Get reminded about unsettled expenses</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Summary</p>
                <p className="text-sm text-gray-600">Receive a weekly summary of your expenses</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Payment Notifications</p>
                <p className="text-sm text-gray-600">Get notified when payments are settled</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Currency & Locale */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" defaultValue="USD ($)" />
            </div>

            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="Pacific Time (PT)" />
            </div>

            <div>
              <Label htmlFor="language">Language</Label>
              <Input id="language" defaultValue="English" />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave} className="bg-emerald-500 hover:bg-emerald-600">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
