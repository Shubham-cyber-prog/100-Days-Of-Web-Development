import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Link2, Mail, Copy, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  boardName: string;
}

export function ShareModal({ isOpen, onClose, boardName }: ShareModalProps) {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const shareLink = `https://brainstorm.app/board/${Math.random().toString(36).substr(2, 9)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInvite = () => {
    // Mock invite functionality
    setEmail('');
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Share "{boardName}"
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Share this board with others via email or link
          </Dialog.Description>

          <div className="space-y-6">
            {/* Invite by email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Invite by email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleInvite}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Invite
                </button>
              </div>
            </div>

            {/* Share link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Link2 className="w-4 h-4 inline mr-2" />
                Share link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Access settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Who has access</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Anyone with the link</p>
                    <p className="text-xs text-gray-500">Can view and edit</p>
                  </div>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>Can edit</option>
                    <option>Can view</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}