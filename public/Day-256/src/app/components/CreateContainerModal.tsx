import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface CreateContainerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateContainerModal({ open, onOpenChange }: CreateContainerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    tag: "latest",
    ports: "",
    volumes: "",
    environment: "",
  });

  const handleCreate = () => {
    console.log("Creating container:", formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      name: "",
      image: "",
      tag: "latest",
      ports: "",
      volumes: "",
      environment: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Container</DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure and deploy a new Docker container
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Container Name</Label>
              <Input
                id="name"
                placeholder="my-container"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-gray-300">Image</Label>
              <Select
                value={formData.image}
                onValueChange={(value) => setFormData({ ...formData, image: value })}
              >
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue placeholder="Select image" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="nginx" className="text-white">nginx</SelectItem>
                  <SelectItem value="postgres" className="text-white">postgres</SelectItem>
                  <SelectItem value="redis" className="text-white">redis</SelectItem>
                  <SelectItem value="mongo" className="text-white">mongo</SelectItem>
                  <SelectItem value="node" className="text-white">node</SelectItem>
                  <SelectItem value="mysql" className="text-white">mysql</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tag" className="text-gray-300">Tag</Label>
              <Input
                id="tag"
                placeholder="latest"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ports" className="text-gray-300">Port Mapping</Label>
              <Input
                id="ports"
                placeholder="8080:80"
                value={formData.ports}
                onChange={(e) => setFormData({ ...formData, ports: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="volumes" className="text-gray-300">Volume Mapping</Label>
            <Input
              id="volumes"
              placeholder="/host/path:/container/path"
              value={formData.volumes}
              onChange={(e) => setFormData({ ...formData, volumes: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="environment" className="text-gray-300">Environment Variables</Label>
            <Textarea
              id="environment"
              placeholder="KEY1=value1&#10;KEY2=value2"
              value={formData.environment}
              onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-24"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Container
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
