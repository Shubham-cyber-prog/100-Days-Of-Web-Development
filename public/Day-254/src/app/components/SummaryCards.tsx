import { DollarSign, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Subscription } from '../types/subscription';

interface SummaryCardsProps {
  subscriptions: Subscription[];
}

export function SummaryCards({ subscriptions }: SummaryCardsProps) {
  const monthlyTotal = subscriptions.reduce((sum, sub) => {
    return sum + (sub.billingCycle === 'monthly' ? sub.cost : sub.cost / 12);
  }, 0);

  const yearlyTotal = monthlyTotal * 12;

  const activeCount = subscriptions.filter(sub => sub.status === 'active').length;

  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const upcomingPayments = subscriptions
    .filter(sub => {
      const billingDate = new Date(sub.nextBillingDate);
      return billingDate <= nextMonth;
    })
    .reduce((sum, sub) => sum + sub.cost, 0);

  const cards = [
    {
      title: 'Monthly Cost',
      value: `$${monthlyTotal.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-blue-500',
      change: '+2.5%',
      changePositive: false
    },
    {
      title: 'Yearly Cost',
      value: `$${yearlyTotal.toFixed(2)}`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: 'Est. yearly',
      changePositive: true
    },
    {
      title: 'Active Subscriptions',
      value: activeCount.toString(),
      icon: CreditCard,
      color: 'bg-green-500',
      change: `${subscriptions.length} total`,
      changePositive: true
    },
    {
      title: 'Upcoming Payments',
      value: `$${upcomingPayments.toFixed(2)}`,
      icon: Calendar,
      color: 'bg-orange-500',
      change: 'Next 30 days',
      changePositive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <h3 className="text-2xl font-semibold text-gray-900">{card.value}</h3>
                <p className={`text-xs mt-2 ${card.changePositive ? 'text-green-600' : 'text-orange-600'}`}>
                  {card.change}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-xl`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
