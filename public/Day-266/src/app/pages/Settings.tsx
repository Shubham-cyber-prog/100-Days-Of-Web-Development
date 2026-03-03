import { Settings as SettingsIcon, Bell, Palette, Shield, Database } from "lucide-react";

export function Settings() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Settings</h2>
        <p className="text-sm text-slate-400">Configure dashboard preferences and cluster settings</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold">General</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 block mb-2">Auto-refresh interval</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>5 seconds</option>
                <option>10 seconds</option>
                <option>30 seconds</option>
                <option>1 minute</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-2">Time zone</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>UTC</option>
                <option>Local time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">Pod failures</span>
              <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-slate-700" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Node status changes</span>
              <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-slate-700" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">High resource usage</span>
              <input type="checkbox" className="rounded bg-slate-800 border-slate-700" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm">Deployment updates</span>
              <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-slate-700" />
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 block mb-2">Theme</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Dark</option>
                <option>Light</option>
                <option>Auto</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-400 block mb-2">Density</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Comfortable</option>
                <option>Compact</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="font-semibold">Security</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 block mb-2">Session timeout</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>Never</option>
              </select>
            </div>
            <button className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-4 py-2 text-sm transition-colors">
              Reset API Token
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="font-semibold">Data Management</h3>
          </div>
          <div className="flex gap-4">
            <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-4 py-2 text-sm transition-colors">
              Export Configuration
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg px-4 py-2 text-sm transition-colors">
              Import Configuration
            </button>
            <button className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg px-4 py-2 text-sm transition-colors">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
