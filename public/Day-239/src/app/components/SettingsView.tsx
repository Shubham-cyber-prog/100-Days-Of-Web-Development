import { User, Bell, Shield, Palette, Database } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-white text-2xl mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-blue-400" />
            <h2 className="text-white text-lg">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Display Name</label>
              <input
                type="text"
                defaultValue="Developer"
                className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                defaultValue="dev@example.com"
                className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-purple-400" />
            <h2 className="text-white text-lg">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Dark Mode</p>
                <p className="text-sm text-gray-400">Use dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Code Font Size</label>
              <select defaultValue="Medium (14px)" className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg border border-[#3d3d3d] focus:border-blue-500 focus:outline-none">
                <option>Small (12px)</option>
                <option>Medium (14px)</option>
                <option>Large (16px)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-yellow-400" />
            <h2 className="text-white text-lg">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive email updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Data & Storage */}
        <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-green-400" />
            <h2 className="text-white text-lg">Data & Storage</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg hover:bg-[#3d3d3d] transition-colors text-left">
              Export All Snippets
            </button>
            <button className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg hover:bg-[#3d3d3d] transition-colors text-left">
              Import Snippets
            </button>
            <button className="w-full bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors text-left border border-red-500/30">
              Clear All Data
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h2 className="text-white text-lg">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg hover:bg-[#3d3d3d] transition-colors text-left">
              Change Password
            </button>
            <button className="w-full bg-[#2d2d2d] text-white px-4 py-2 rounded-lg hover:bg-[#3d3d3d] transition-colors text-left">
              Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}