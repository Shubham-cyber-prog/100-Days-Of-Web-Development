import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AddThreadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddThread: (thread: { burstTime: number; priority?: number; arrivalTime: number }) => void;
  nextId: number;
  currentTime: number;
}

export function AddThreadDialog({
  open,
  onOpenChange,
  onAddThread,
  nextId,
  currentTime,
}: AddThreadDialogProps) {
  const [burstTime, setBurstTime] = useState("10");
  const [priority, setPriority] = useState("1");
  const [arrivalTime, setArrivalTime] = useState(currentTime.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddThread({
      burstTime: parseInt(burstTime),
      priority: parseInt(priority),
      arrivalTime: parseInt(arrivalTime),
    });
    setBurstTime("10");
    setPriority("1");
    setArrivalTime(currentTime.toString());
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle>Add New Thread</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="thread-id" className="text-gray-400">Thread ID</Label>
            <Input
              id="thread-id"
              value={`T${nextId}`}
              disabled
              className="bg-gray-800 border-gray-700 font-mono"
            />
          </div>
          
          <div>
            <Label htmlFor="arrival-time" className="text-gray-400">Arrival Time (ms)</Label>
            <Input
              id="arrival-time"
              type="number"
              min="0"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="bg-gray-800 border-gray-700 font-mono"
            />
          </div>
          
          <div>
            <Label htmlFor="burst-time" className="text-gray-400">Burst Time (ms)</Label>
            <Input
              id="burst-time"
              type="number"
              min="1"
              max="100"
              value={burstTime}
              onChange={(e) => setBurstTime(e.target.value)}
              className="bg-gray-800 border-gray-700 font-mono"
            />
          </div>
          
          <div>
            <Label htmlFor="priority" className="text-gray-400">Priority (1-10, lower = higher priority)</Label>
            <Input
              id="priority"
              type="number"
              min="1"
              max="10"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-gray-800 border-gray-700 font-mono"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Thread
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
