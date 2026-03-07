import { Moon, Sun, Type, MousePointer2, Palette } from 'lucide-react';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function SettingsScreen() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-2">Settings</h1>
        <p className="text-zinc-400 text-sm mb-8">
          Customize your terminal experience
        </p>

        {/* Appearance Section */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-medium text-white">Appearance</h2>
          </div>

          <div className="space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-4 h-4 text-zinc-400" />
                <div>
                  <Label className="text-sm text-white">Dark Mode</Label>
                  <p className="text-xs text-zinc-500">Use dark theme for the interface</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Font Size */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Type className="w-4 h-4 text-zinc-400" />
                <div>
                  <Label className="text-sm text-white">Terminal Font Size</Label>
                  <p className="text-xs text-zinc-500">Adjust the terminal text size</p>
                </div>
              </div>
              <Select defaultValue="14">
                <SelectTrigger className="w-32 bg-zinc-950 border-zinc-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                  <SelectItem value="12">12px</SelectItem>
                  <SelectItem value="14">14px</SelectItem>
                  <SelectItem value="16">16px</SelectItem>
                  <SelectItem value="18">18px</SelectItem>
                  <SelectItem value="20">20px</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Cursor Style */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MousePointer2 className="w-4 h-4 text-zinc-400" />
                <div>
                  <Label className="text-sm text-white">Cursor Style</Label>
                  <p className="text-xs text-zinc-500">Choose your cursor appearance</p>
                </div>
              </div>
              <Select defaultValue="block">
                <SelectTrigger className="w-32 bg-zinc-950 border-zinc-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                  <SelectItem value="block">Block</SelectItem>
                  <SelectItem value="underline">Underline</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Terminal Preferences */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Type className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-medium text-white">Terminal Preferences</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm text-white">Enable Sound</Label>
                <p className="text-xs text-zinc-500">Play sounds for terminal bell</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm text-white">Auto Save Sessions</Label>
                <p className="text-xs text-zinc-500">Automatically save terminal sessions</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm text-white">Show Line Numbers</Label>
                <p className="text-xs text-zinc-500">Display line numbers in output</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm text-white">Scrollback Limit</Label>
                <p className="text-xs text-zinc-500">Number of lines to keep in history</p>
              </div>
              <Select defaultValue="1000">
                <SelectTrigger className="w-32 bg-zinc-950 border-zinc-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                  <SelectItem value="500">500</SelectItem>
                  <SelectItem value="1000">1000</SelectItem>
                  <SelectItem value="5000">5000</SelectItem>
                  <SelectItem value="10000">10000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
          <h2 className="text-lg font-medium text-white mb-4">Keyboard Shortcuts</h2>
          <div className="space-y-3">
            {[
              { action: 'New Terminal', shortcut: 'Ctrl + T' },
              { action: 'Close Terminal', shortcut: 'Ctrl + W' },
              { action: 'Split Vertical', shortcut: 'Ctrl + Shift + V' },
              { action: 'Split Horizontal', shortcut: 'Ctrl + Shift + H' },
              { action: 'Next Tab', shortcut: 'Ctrl + Tab' },
              { action: 'Previous Tab', shortcut: 'Ctrl + Shift + Tab' },
            ].map((shortcut) => (
              <div key={shortcut.action} className="flex justify-between items-center py-2 border-b border-zinc-800 last:border-0">
                <span className="text-sm text-zinc-400">{shortcut.action}</span>
                <kbd className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded text-xs font-mono text-zinc-300">
                  {shortcut.shortcut}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
