import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Subscription } from '../types/subscription';

interface AddSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (subscription: Omit<Subscription, 'id'> | Subscription) => void;
  editingSubscription?: Subscription | null;
}

const categories = ['Entertainment', 'Music', 'Productivity', 'Development', 'Design', 'Cloud Storage', 'Other'];
const logos = ['🎬', '🎵', '📝', '💻', '🎨', '☁️', '📱', '🎮', '📚', '🏋️', '🍔', '🚗'];
const colors = ['#E50914', '#1DB954', '#FF0000', '#10A37F', '#181717', '#3B82F6', '#F59E0B', '#8B5CF6'];

export function AddSubscriptionModal({ open, onClose, onSave, editingSubscription }: AddSubscriptionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Entertainment',
    cost: '',
    billingCycle: 'monthly' as 'monthly' | 'yearly',
    nextBillingDate: '',
    status: 'active' as 'active' | 'trial' | 'expired',
    logo: '📱',
    color: '#3B82F6',
    paymentMethod: 'Visa •••• 4242',
    notes: ''
  });

  useEffect(() => {
    if (editingSubscription) {
      setFormData({
        name: editingSubscription.name,
        category: editingSubscription.category,
        cost: editingSubscription.cost.toString(),
        billingCycle: editingSubscription.billingCycle,
        nextBillingDate: editingSubscription.nextBillingDate,
        status: editingSubscription.status,
        logo: editingSubscription.logo,
        color: editingSubscription.color,
        paymentMethod: editingSubscription.paymentMethod,
        notes: editingSubscription.notes || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'Entertainment',
        cost: '',
        billingCycle: 'monthly',
        nextBillingDate: '',
        status: 'active',
        logo: '📱',
        color: '#3B82F6',
        paymentMethod: 'Visa •••• 4242',
        notes: ''
      });
    }
  }, [editingSubscription, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subscription = {
      ...(editingSubscription && { id: editingSubscription.id }),
      name: formData.name,
      category: formData.category,
      cost: parseFloat(formData.cost),
      billingCycle: formData.billingCycle,
      nextBillingDate: formData.nextBillingDate,
      status: formData.status,
      logo: formData.logo,
      color: formData.color,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes
    };

    onSave(subscription);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Netflix, Spotify, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Cost</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                placeholder="9.99"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <Select 
                value={formData.billingCycle} 
                onValueChange={(value: 'monthly' | 'yearly') => setFormData({ ...formData, billingCycle: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nextBillingDate">Next Billing Date</Label>
              <Input
                id="nextBillingDate"
                type="date"
                value={formData.nextBillingDate}
                onChange={(e) => setFormData({ ...formData, nextBillingDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'active' | 'trial' | 'expired') => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="flex gap-2 flex-wrap">
              {logos.map(logo => (
                <button
                  key={logo}
                  type="button"
                  onClick={() => setFormData({ ...formData, logo })}
                  className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center border-2 transition-colors ${
                    formData.logo === logo ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {logo}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    formData.color === color ? 'border-gray-900 scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {editingSubscription ? 'Save Changes' : 'Add Subscription'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
