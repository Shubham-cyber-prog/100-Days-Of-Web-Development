import { Settings as SettingsIcon, Save, RotateCcw } from "lucide-react";
import { useState } from "react";

export function Settings() {
  const [settings, setSettings] = useState({
    defaultAction: "deny",
    enableLogging: true,
    maxLogEntries: 100,
    animationSpeed: 5,
    autoCleanupPackets: true,
    showNotifications: true,
  });

  const handleSave = () => {
    // In a real app, this would save to localStorage or backend
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    setSettings({
      defaultAction: "deny",
      enableLogging: true,
      maxLogEntries: 100,
      animationSpeed: 5,
      autoCleanupPackets: true,
      showNotifications: true,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-6 h-6 text-slate-400" />
          <h1 className="text-2xl font-semibold text-slate-200">Settings</h1>
        </div>
        <p className="text-sm text-slate-400">
          Configure simulator preferences and firewall behavior.
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Firewall Settings */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <h2 className="font-semibold text-slate-200 mb-4">Firewall Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Default Action</label>
              <select
                value={settings.defaultAction}
                onChange={(e) => setSettings({ ...settings, defaultAction: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200"
              >
                <option value="allow">Allow (Permissive)</option>
                <option value="deny">Deny (Restrictive)</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">
                Action taken when no rules match a packet
              </p>
            </div>
          </div>
        </div>

        {/* Logging Settings */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <h2 className="font-semibold text-slate-200 mb-4">Logging Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm text-slate-300">Enable Logging</label>
                <p className="text-xs text-slate-500 mt-1">
                  Record all firewall events
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableLogging}
                onChange={(e) => setSettings({ ...settings, enableLogging: e.target.checked })}
                className="w-4 h-4"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Maximum Log Entries</label>
              <input
                type="number"
                min="10"
                max="1000"
                value={settings.maxLogEntries}
                onChange={(e) => setSettings({ ...settings, maxLogEntries: parseInt(e.target.value) })}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200"
              />
              <p className="text-xs text-slate-500 mt-1">
                Older logs are automatically deleted when this limit is reached
              </p>
            </div>
          </div>
        </div>

        {/* Simulation Settings */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <h2 className="font-semibold text-slate-200 mb-4">Simulation Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Default Animation Speed</label>
              <input
                type="range"
                min="1"
                max="10"
                value={settings.animationSpeed}
                onChange={(e) => setSettings({ ...settings, animationSpeed: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                <span>Slow</span>
                <span className="font-mono">{settings.animationSpeed}</span>
                <span>Fast</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm text-slate-300">Auto-cleanup Packets</label>
                <p className="text-xs text-slate-500 mt-1">
                  Automatically remove completed packets from visualization
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoCleanupPackets}
                onChange={(e) => setSettings({ ...settings, autoCleanupPackets: e.target.checked })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <h2 className="font-semibold text-slate-200 mb-4">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm text-slate-300">Show Notifications</label>
                <p className="text-xs text-slate-500 mt-1">
                  Display alerts for important events
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.showNotifications}
                onChange={(e) => setSettings({ ...settings, showNotifications: e.target.checked })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors flex items-center gap-2 font-medium"
          >
            <Save className="w-4 h-4" /> Save Settings
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-2 font-medium"
          >
            <RotateCcw className="w-4 h-4" /> Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
