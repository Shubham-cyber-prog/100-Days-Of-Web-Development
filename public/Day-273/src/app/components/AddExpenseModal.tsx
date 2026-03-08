import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddExpenseModal({ open, onOpenChange }: AddExpenseModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Expense added successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="e.g., Dinner at restaurant" required />
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" step="0.01" placeholder="0.00" required />
          </div>

          <div>
            <Label htmlFor="paidBy">Paid by</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select who paid" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="you">You</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
                <SelectItem value="emma">Emma Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="split">Split with</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select group or friend" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House Roommates</SelectItem>
                <SelectItem value="trip">Weekend Trip</SelectItem>
                <SelectItem value="office">Office Lunches</SelectItem>
                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                <SelectItem value="mike">Mike Chen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="splitType">Split type</Label>
            <Select defaultValue="equal">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equal">Split equally</SelectItem>
                <SelectItem value="exact">Exact amounts</SelectItem>
                <SelectItem value="percentage">By percentage</SelectItem>
                <SelectItem value="shares">By shares</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food & Drink</SelectItem>
                <SelectItem value="groceries">Groceries</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" placeholder="Add notes..." rows={3} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600">
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
