import { Moon, Sun, Key, Bell, Globe, User, Shield, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [summaryNotifications, setSummaryNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              {darkMode ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-purple-600" />}
            </div>
            <div>
              <h2 className="font-semibold">Appearance</h2>
              <p className="text-sm text-muted-foreground">Customize how the app looks</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium mb-1">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
            </div>
            <Switch.Root
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="w-11 h-6 rounded-full relative transition-colors data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500 bg-gray-300"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold">Account</h2>
              <p className="text-sm text-muted-foreground">Manage your account settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full h-11 px-4 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full h-11 px-4 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Language</label>
              <select className="w-full h-11 px-4 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* API Key */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <Key className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold">API Integration</h2>
              <p className="text-sm text-muted-foreground">Connect external services</p>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">API Key</label>
            <div className="flex gap-2">
              <input
                type="password"
                defaultValue="sk_live_xxxxxxxxxxxxxxxxxxxx"
                className="flex-1 h-11 px-4 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all font-mono text-sm"
              />
              <button className="px-4 py-2 rounded-xl border border-border hover:bg-accent transition-colors">
                Regenerate
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Keep your API key secure. Do not share it publicly.
            </p>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground">Configure notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium mb-1">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch.Root
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                className="w-11 h-6 rounded-full relative transition-colors data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500 bg-gray-300"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="font-medium mb-1">Summary Complete</p>
                <p className="text-sm text-muted-foreground">Get notified when summaries are ready</p>
              </div>
              <Switch.Root
                checked={summaryNotifications}
                onCheckedChange={setSummaryNotifications}
                className="w-11 h-6 rounded-full relative transition-colors data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500 bg-gray-300"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="font-medium mb-1">Weekly Report</p>
                <p className="text-sm text-muted-foreground">Receive weekly activity summary</p>
              </div>
              <Switch.Root
                checked={weeklyReport}
                onCheckedChange={setWeeklyReport}
                className="w-11 h-6 rounded-full relative transition-colors data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500 bg-gray-300"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
              </Switch.Root>
            </div>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="font-semibold">Security</h2>
              <p className="text-sm text-muted-foreground">Manage security settings</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl border border-border hover:bg-accent transition-colors">
              <p className="font-medium mb-1">Change Password</p>
              <p className="text-sm text-muted-foreground">Update your password regularly</p>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl border border-border hover:bg-accent transition-colors">
              <p className="font-medium mb-1">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl border border-border hover:bg-accent transition-colors">
              <p className="font-medium mb-1">Active Sessions</p>
              <p className="text-sm text-muted-foreground">Manage devices and sessions</p>
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-red-50 rounded-2xl p-6 border border-red-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="font-semibold text-red-900">Danger Zone</h2>
              <p className="text-sm text-red-700">Irreversible actions</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-white border border-red-200 hover:bg-red-50 transition-colors">
              <p className="font-medium text-red-900 mb-1">Delete All Documents</p>
              <p className="text-sm text-red-700">Permanently remove all your documents</p>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-white border border-red-200 hover:bg-red-50 transition-colors">
              <p className="font-medium text-red-900 mb-1">Delete Account</p>
              <p className="text-sm text-red-700">Permanently delete your account and all data</p>
            </button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-end gap-3"
        >
          <button className="px-6 py-3 rounded-xl border border-border hover:bg-accent transition-colors">
            Cancel
          </button>
          <button
            className="px-6 py-3 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all"
            style={{
              background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
            }}
          >
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
}
