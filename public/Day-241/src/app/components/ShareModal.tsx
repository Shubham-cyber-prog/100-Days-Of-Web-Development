import { useState } from 'react';
import { Copy, Check, Mail, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentTitle: string;
}

interface SharedUser {
  name: string;
  email: string;
  permission: 'viewer' | 'commenter' | 'editor';
  initials: string;
}

export function ShareModal({ open, onOpenChange, documentTitle }: ShareModalProps) {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'viewer' | 'commenter' | 'editor'>('editor');
  const [copied, setCopied] = useState(false);
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      permission: 'editor',
      initials: 'JS',
    },
    {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      permission: 'commenter',
      initials: 'MJ',
    },
  ]);

  const handleCopyLink = () => {
    try {
      // Fallback method for environments where clipboard API is blocked
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleInvite = () => {
    if (email.trim()) {
      const name = email.split('@')[0];
      const initials = name.substring(0, 2).toUpperCase();
      setSharedUsers([
        ...sharedUsers,
        {
          name: name,
          email: email,
          permission: permission,
          initials: initials,
        },
      ]);
      setEmail('');
    }
  };

  const handleRemoveUser = (emailToRemove: string) => {
    setSharedUsers(sharedUsers.filter(user => user.email !== emailToRemove));
  };

  const handleChangePermission = (email: string, newPermission: 'viewer' | 'commenter' | 'editor') => {
    setSharedUsers(sharedUsers.map(user => 
      user.email === email ? { ...user, permission: newPermission } : user
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle>Share "{documentTitle}"</DialogTitle>
          <DialogDescription>
            Invite people to collaborate on this document
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Email Input Section */}
          <div className="space-y-3">
            <Label htmlFor="email">Add people</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                />
              </div>
              <Select value={permission} onValueChange={(v: any) => setPermission(v)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="commenter">Commenter</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleInvite} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!email.trim()}
            >
              Send Invite
            </Button>
          </div>

          {/* Shared Users List */}
          {sharedUsers.length > 0 && (
            <div className="space-y-3">
              <Label>People with access</Label>
              <div className="space-y-2 max-h-[240px] overflow-y-auto">
                {sharedUsers.map((user) => (
                  <div key={user.email} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Select 
                      value={user.permission} 
                      onValueChange={(v: any) => handleChangePermission(user.email, v)}
                    >
                      <SelectTrigger className="w-[120px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="commenter">Commenter</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveUser(user.email)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Copy Link Section */}
          <div className="border-t pt-4 space-y-3">
            <Label>Share link</Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={window.location.href}
                className="flex-1 bg-gray-50"
              />
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="gap-2"
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
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Anyone with the link can view this document
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}