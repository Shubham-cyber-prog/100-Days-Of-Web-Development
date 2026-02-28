import { Settings, Server, Bell, Shield, Palette } from 'lucide-react';

export function SettingsView() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
              <Server size={20} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Simulation Settings</h2>
              <p className="text-sm text-slate-400">Configure simulation behavior</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
              <div>
                <div className="font-medium">Auto-start Simulation</div>
                <div className="text-sm text-slate-400">Start simulation automatically on load</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
              <div>
                <div className="font-medium">Show Message IDs</div>
                <div className="text-sm text-slate-400">Display message IDs on message blocks</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Bell size={20} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-slate-400">Manage notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
              <div>
                <div className="font-medium">Queue Overload Alerts</div>
                <div className="text-sm text-slate-400">Get notified when queues are overloaded</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
              <div>
                <div className="font-medium">Processing Errors</div>
                <div className="text-sm text-slate-400">Alert on message processing failures</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Palette size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Appearance</h2>
              <p className="text-sm text-slate-400">Customize visual appearance</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <div className="font-medium mb-3">Theme</div>
              <div className="grid grid-cols-3 gap-3">
                <button className="p-3 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm">Dark</button>
                <button className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-sm hover:border-slate-500">Light</button>
                <button className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-sm hover:border-slate-500">Auto</button>
              </div>
            </div>

            <div className="p-4 bg-slate-800 rounded-lg">
              <div className="font-medium mb-3">Animation Speed</div>
              <div className="grid grid-cols-3 gap-3">
                <button className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-sm hover:border-slate-500">Slow</button>
                <button className="p-3 bg-slate-950 border-2 border-cyan-500 rounded-lg text-sm">Normal</button>
                <button className="p-3 bg-slate-700 border border-slate-600 rounded-lg text-sm hover:border-slate-500">Fast</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Shield size={20} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Advanced</h2>
              <p className="text-sm text-slate-400">Advanced configuration options</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors">
              <div className="font-medium">Export Configuration</div>
              <div className="text-sm text-slate-400">Download current setup as JSON</div>
            </button>

            <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors">
              <div className="font-medium">Import Configuration</div>
              <div className="text-sm text-slate-400">Load setup from JSON file</div>
            </button>

            <button className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-left transition-colors">
              <div className="font-medium text-red-400">Reset All Data</div>
              <div className="text-sm text-red-400/70">Clear all queues, producers, and consumers</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
