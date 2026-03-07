import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface AddServerModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddServerModal({ open, onClose, onAdd }: AddServerModalProps) {
  const [serverName, setServerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (serverName.trim()) {
      onAdd(serverName.trim());
      setServerName('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Add New Server</DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure a new server to add to the load balancer pool.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="serverName" className="text-gray-300">
              Server Name
            </Label>
            <Input
              id="serverName"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="e.g., Server 1"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!serverName.trim()}
            >
              Add Server
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
