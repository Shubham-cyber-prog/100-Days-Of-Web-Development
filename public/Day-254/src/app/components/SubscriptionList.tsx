import { useState } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Subscription } from '../types/subscription';
import { format, parseISO } from 'date-fns';

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
}

export function SubscriptionList({ subscriptions, onEdit, onDelete, searchQuery }: SubscriptionListProps) {
  const [filterCycle, setFilterCycle] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(subscriptions.map(sub => sub.category)))];

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCycle = filterCycle === 'all' || sub.billingCycle === filterCycle;
    const matchesCategory = filterCategory === 'all' || sub.category === filterCategory;
    return matchesSearch && matchesCycle && matchesCategory;
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Subscriptions</h2>
        <div className="flex gap-3">
          <Select value={filterCycle} onValueChange={setFilterCycle}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cycles</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredSubscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: subscription.color + '20' }}
            >
              {subscription.logo}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900">{subscription.name}</h3>
                <Badge 
                  variant={subscription.status === 'active' ? 'default' : subscription.status === 'trial' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {subscription.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{subscription.category}</p>
            </div>

            <div className="text-right">
              <div className="font-semibold text-gray-900">
                ${subscription.cost.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 capitalize">{subscription.billingCycle}</p>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-900">
                {format(parseISO(subscription.nextBillingDate), 'MMM dd, yyyy')}
              </div>
              <p className="text-xs text-gray-500">Next billing</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(subscription)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(subscription.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No subscriptions found</p>
          </div>
        )}
      </div>
    </Card>
  );
}
