import { SummaryCards } from './SummaryCards';
import { SubscriptionList } from './SubscriptionList';
import { AnalyticsCharts } from './AnalyticsCharts';
import { Subscription } from '../types/subscription';

interface DashboardViewProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: string) => void;
  searchQuery: string;
}

export function DashboardView({ subscriptions, onEdit, onDelete, searchQuery }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Overview of your subscription management</p>
      </div>

      <SummaryCards subscriptions={subscriptions} />
      
      <AnalyticsCharts subscriptions={subscriptions} />
      
      <SubscriptionList 
        subscriptions={subscriptions}
        onEdit={onEdit}
        onDelete={onDelete}
        searchQuery={searchQuery}
      />
    </div>
  );
}
