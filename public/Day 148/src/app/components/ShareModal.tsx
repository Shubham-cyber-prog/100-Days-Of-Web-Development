import { X, Users, Mail, Link2, Copy, CheckCircle2, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('view');
  const [linkCopied, setLinkCopied] = useState(false);
  const [sharedUsers, setSharedUsers] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Editor', avatar: 'SJ' },
    { id: 2, name: 'Mike Chen', email: 'mike@company.com', role: 'Viewer', avatar: 'MC' },
  ]);

  const handleCopyLink = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleAddUser = () => {
    if (email) {
      const name = email.split('@')[0];
      const newUser = {
        id: sharedUsers.length + 1,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        role: permission === 'view' ? 'Viewer' : 'Editor',
        avatar: name.slice(0, 2).toUpperCase()
      };
      setSharedUsers([...sharedUsers, newUser]);
      setEmail('');
    }
  };

  const handleRemoveUser = (id: number) => {
    setSharedUsers(sharedUsers.filter(user => user.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-50"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                    background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                  }}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Share Summary</h2>
                    <p className="text-sm text-muted-foreground">Collaborate with your team</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {/* Add People */}
              <div className="mb-6">
                <label className="block mb-3 font-medium">Add People</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
                      placeholder="Enter email address"
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
                    />
                  </div>
                  <select
                    value={permission}
                    onChange={(e) => setPermission(e.target.value)}
                    className="h-11 px-4 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/20"
                  >
                    <option value="view">Can View</option>
                    <option value="edit">Can Edit</option>
                  </select>
                  <button
                    onClick={handleAddUser}
                    disabled={!email}
                    className="h-11 px-6 rounded-xl text-white font-medium transition-all disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                    }}
                  >
                    <UserPlus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Shared With */}
              <div className="mb-6">
                <label className="block mb-3 font-medium">People with Access ({sharedUsers.length})</label>
                <div className="space-y-2">
                  {sharedUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-medium">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-sm">
                          {user.role}
                        </span>
                        <button
                          onClick={() => handleRemoveUser(user.id)}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Share Link */}
              <div className="mb-6">
                <label className="block mb-3 font-medium">Share Link</label>
                <div className="p-4 rounded-xl border border-border bg-gray-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Link2 className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium mb-1">Anyone with the link</p>
                      <p className="text-sm text-muted-foreground">Anyone can view this summary</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="https://summarizeai.com/share/q4-report-2025"
                      readOnly
                      className="flex-1 h-10 px-3 rounded-lg bg-white border border-border text-sm"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-white transition-colors flex items-center gap-2"
                    >
                      {linkCopied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Permissions Info */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  Collaboration Features
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Viewers</strong> can read and download the summary</li>
                  <li>• <strong>Editors</strong> can regenerate and modify the summary</li>
                  <li>• Track who accessed your shared summaries</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-border hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-white font-medium"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                }}
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
