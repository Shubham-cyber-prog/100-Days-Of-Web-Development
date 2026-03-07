import { Settings as SettingsIcon, Sliders, Bell, Shield, Palette } from 'lucide-react';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

export function SettingsPanel() {
  return (
    <div className="space-y-6">
      {/* Detection Settings */}
      <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
            <Sliders className="w-6 h-6 text-cyan-400" />
          </div>
          Detection Settings
        </h2>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white font-medium">Confidence Threshold</label>
              <span className="text-cyan-400 font-bold">75%</span>
            </div>
            <Slider defaultValue={[75]} max={100} step={1} />
            <p className="text-gray-400 text-sm mt-2">
              Minimum confidence level for object detection
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white font-medium">Max Detections</label>
              <span className="text-cyan-400 font-bold">10</span>
            </div>
            <Slider defaultValue={[10]} max={20} step={1} />
            <p className="text-gray-400 text-sm mt-2">
              Maximum number of objects to detect per image
            </p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
            <Bell className="w-6 h-6 text-cyan-400" />
          </div>
          Notifications
        </h2>

        <div className="space-y-4">
          {[
            { label: 'Detection Complete', description: 'Get notified when analysis finishes' },
            { label: 'Low Confidence', description: 'Alert for detections below threshold' },
            { label: 'Model Updates', description: 'Notify when new models are available' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/10 rounded-xl"
            >
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
              <Switch defaultChecked={index === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          Privacy & Security
        </h2>

        <div className="space-y-4">
          {[
            { label: 'Save History', description: 'Store analysis results locally' },
            { label: 'Auto-delete', description: 'Remove history after 30 days' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/10 rounded-xl"
            >
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
            <Palette className="w-6 h-6 text-cyan-400" />
          </div>
          Theme
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Cyber', colors: 'from-cyan-500 to-purple-500' },
            { name: 'Matrix', colors: 'from-green-500 to-emerald-500' },
            { name: 'Sunset', colors: 'from-orange-500 to-pink-500' },
          ].map((theme) => (
            <button
              key={theme.name}
              className="p-4 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/20 rounded-xl hover:border-cyan-500/40 transition-colors"
            >
              <div className={`h-12 bg-gradient-to-r ${theme.colors} rounded-lg mb-2`} />
              <p className="text-white text-sm font-medium">{theme.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
