import { User, Bell, Shield, Palette, Globe, HardDrive } from 'lucide-react';
import { useState } from 'react';

export function SettingsScreen() {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
    { id: 'language', icon: Globe, label: 'Language & Region' },
    { id: 'storage', icon: HardDrive, label: 'Storage' },
  ];

  return (
    <div className="h-full flex bg-[#1a1a1a]">
      <div className="w-64 bg-[#1e1e1e] border-r border-[#2d2d2d] p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Settings</h2>
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#2d2d2d]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {activeSection === 'profile' && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-6">Profile Settings</h1>
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                  Change Avatar
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  defaultValue="johndoe"
                  className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Developer and cloud computing enthusiast"
                  className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                  Save Changes
                </button>
                <button className="px-4 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white rounded-md transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-6">Appearance</h1>
            <div className="max-w-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-4 bg-[#2d2d2d] border-2 border-blue-500 rounded-lg">
                    <div className="w-full h-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded mb-2"></div>
                    <div className="text-sm text-white">Dark</div>
                  </button>
                  <button className="p-4 bg-[#2d2d2d] border-2 border-transparent hover:border-[#4d4d4d] rounded-lg">
                    <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-300 rounded mb-2"></div>
                    <div className="text-sm text-white">Light</div>
                  </button>
                  <button className="p-4 bg-[#2d2d2d] border-2 border-transparent hover:border-[#4d4d4d] rounded-lg">
                    <div className="w-full h-20 bg-gradient-to-br from-gray-900 via-gray-300 to-gray-800 rounded mb-2"></div>
                    <div className="text-sm text-white">Auto</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Accent Color</label>
                <div className="flex gap-2">
                  {['bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-red-600', 'bg-yellow-600', 'bg-pink-600'].map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 ${color} rounded-full ${color === 'bg-blue-600' ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1a1a1a]' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-6">Notifications</h1>
            <div className="max-w-2xl space-y-4">
              {[
                { label: 'VM Status Changes', desc: 'Get notified when a VM starts or stops' },
                { label: 'System Alerts', desc: 'Receive alerts about system issues' },
                { label: 'Performance Warnings', desc: 'Notify when resources are running low' },
                { label: 'Security Updates', desc: 'Important security notifications' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-[#2d2d2d] rounded-lg">
                  <div>
                    <div className="text-white">{item.label}</div>
                    <div className="text-sm text-gray-400">{item.desc}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-6">Security</h1>
            <div className="max-w-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                Update Password
              </button>

              <div className="border-t border-[#2d2d2d] pt-6 mt-6">
                <h3 className="font-medium text-white mb-3">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'storage' && (
          <div>
            <h1 className="text-2xl font-semibold text-white mb-6">Storage</h1>
            <div className="max-w-2xl space-y-6">
              <div className="p-6 bg-[#2d2d2d] rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white">Total Storage Used</div>
                  <div className="text-2xl font-semibold text-white">128 GB / 500 GB</div>
                </div>
                <div className="h-3 bg-[#1e1e1e] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 w-[25.6%]"></div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-white mb-3">Storage by Category</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Virtual Machines', size: '98 GB', color: 'bg-blue-500' },
                    { label: 'ISO Files', size: '24 GB', color: 'bg-purple-500' },
                    { label: 'Snapshots', size: '6 GB', color: 'bg-green-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 bg-[#2d2d2d] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                        <span className="text-white">{item.label}</span>
                      </div>
                      <span className="text-gray-400">{item.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
