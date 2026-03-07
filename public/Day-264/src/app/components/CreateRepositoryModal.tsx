import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';

interface CreateRepositoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateRepositoryModal({
  open,
  onOpenChange,
}: CreateRepositoryModalProps) {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [initReadme, setInitReadme] = useState(false);

  const handleCreate = () => {
    // Mock creation logic
    console.log('Creating repository:', {
      repoName,
      description,
      isPrivate,
      initReadme,
    });
    onOpenChange(false);
    // Reset form
    setRepoName('');
    setDescription('');
    setIsPrivate(false);
    setInitReadme(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a new repository</DialogTitle>
          <DialogDescription>
            A repository contains all project files, including the revision history.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="repo-name">Repository name *</Label>
            <Input
              id="repo-name"
              placeholder="my-awesome-project"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="A short description of your repository"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="private">Private</Label>
              <p className="text-sm text-gray-500">
                Only you can see this repository
              </p>
            </div>
            <Switch
              id="private"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="readme"
              checked={initReadme}
              onCheckedChange={(checked) => setInitReadme(checked as boolean)}
            />
            <Label htmlFor="readme" className="text-sm cursor-pointer">
              Add a README file
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!repoName}>
            Create repository
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
