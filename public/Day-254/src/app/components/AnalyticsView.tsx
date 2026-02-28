import { Card } from './ui/card';
import { AnalyticsCharts } from './AnalyticsCharts';
import { Subscription } from '../types/subscription';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface AnalyticsViewProps {
  subscriptions: Subscription[];
}

export function AnalyticsView({ subscriptions }: AnalyticsViewProps) {
  const monthlyTotal = subscriptions.reduce((sum, sub) => {
    return sum + (sub.billingCycle === 'monthly' ? sub.cost : sub.cost / 12);
  }, 0);

  const avgPerSubscription = subscriptions.length > 0 ? monthlyTotal / subscriptions.length : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Analytics</h2>
        <p className="text-gray-500 mt-1">Detailed insights into your subscription spending</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. per Subscription</p>
              <p className="text-2xl font-semibold text-gray-900">${avgPerSubscription.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <TrendingDown className="w-4 h-4" />
            <span>2.3% vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Most Expensive</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${Math.max(...subscriptions.map(s => s.cost)).toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {subscriptions.reduce((max, sub) => sub.cost > max.cost ? sub : max, subscriptions[0])?.name}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Least Expensive</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${Math.min(...subscriptions.map(s => s.cost)).toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            {subscriptions.reduce((min, sub) => sub.cost < min.cost ? sub : min, subscriptions[0])?.name}
          </p>
        </Card>
      </div>

      <AnalyticsCharts subscriptions={subscriptions} />

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Breakdown</h3>
        <div className="space-y-3">
          {subscriptions
            .sort((a, b) => b.cost - a.cost)
            .map(sub => {
              const monthlyAmount = sub.billingCycle === 'monthly' ? sub.cost : sub.cost / 12;
              const percentage = (monthlyAmount / monthlyTotal) * 100;
              
              return (
                <div key={sub.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{sub.logo}</span>
                      <span className="font-medium text-gray-900">{sub.name}</span>
                    </div>
                    <span className="text-gray-600">${monthlyAmount.toFixed(2)}/mo</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: sub.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
}
