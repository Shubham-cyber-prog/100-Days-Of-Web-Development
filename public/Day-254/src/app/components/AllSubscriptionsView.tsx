import { SubscriptionList } from './SubscriptionList';
import { Subscription } from '../types/subscription';

interface AllSubscriptionsViewProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
}

export function AllSubscriptionsView({ subscriptions, onEdit, onDelete, searchQuery }: AllSubscriptionsViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">All Subscriptions</h2>
        <p className="text-gray-500 mt-1">Manage all your active and inactive subscriptions</p>
      </div>

      <SubscriptionList 
        subscriptions={subscriptions}
        onEdit={onEdit}
        onDelete={onDelete}
        searchQuery={searchQuery}
      />
    </div>
  );
}
