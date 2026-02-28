import { Settings as SettingsIcon, User, Bell, Lock, Database, Palette } from "lucide-react";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl text-foreground mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure your hypervisor preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <SettingsIcon className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg text-foreground">General</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">Host Name</label>
              <input
                type="text"
                defaultValue="Local Host"
                className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Default VM OS</label>
              <select className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500">
                <option>Ubuntu 22.04 LTS</option>
                <option>Windows Server 2022</option>
                <option>CentOS 8</option>
                <option>Debian 11</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Auto-start VMs on boot</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* User Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <User className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-lg text-foreground">User Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">Username</label>
              <input
                type="text"
                defaultValue="admin"
                className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Email</label>
              <input
                type="email"
                defaultValue="admin@hypervisor.local"
                className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500"
              />
            </div>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
              Update Profile
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Bell className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-lg text-foreground">Notifications</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">VM status changes</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Resource warnings</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">System errors</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Lock className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-lg text-foreground">Security</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500"
              />
            </div>
            <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
              Change Password
            </button>
          </div>
        </div>

        {/* Backup & Storage */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Database className="w-5 h-5 text-yellow-500" />
            </div>
            <h3 className="text-lg text-foreground">Backup & Storage</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">Backup Location</label>
              <input
                type="text"
                defaultValue="/var/backups/hypervisor"
                className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500 font-mono text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Automatic backups</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <button className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors">
              Create Backup Now
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Palette className="w-5 h-5 text-cyan-500" />
            </div>
            <h3 className="text-lg text-foreground">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">Theme</label>
              <select className="w-full px-4 py-2 bg-input rounded-md border border-border text-foreground outline-none focus:border-blue-500">
                <option>Dark (Default)</option>
                <option>Light</option>
                <option>Auto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Accent Color</label>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-md cursor-pointer border-2 border-white"></div>
                <div className="w-10 h-10 bg-purple-600 rounded-md cursor-pointer"></div>
                <div className="w-10 h-10 bg-green-600 rounded-md cursor-pointer"></div>
                <div className="w-10 h-10 bg-cyan-600 rounded-md cursor-pointer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
