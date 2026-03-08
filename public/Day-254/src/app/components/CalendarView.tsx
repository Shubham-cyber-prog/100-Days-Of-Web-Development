import { Card } from './ui/card';
import { Calendar } from './ui/calendar';
import { Subscription } from '../types/subscription';
import { format, parseISO, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useState } from 'react';

interface CalendarViewProps {
  subscriptions: Subscription[];
}

export function CalendarView({ subscriptions }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getSubscriptionsForDate = (date: Date) => {
    return subscriptions.filter(sub => 
      isSameDay(parseISO(sub.nextBillingDate), date)
    );
  };

  const selectedDaySubs = selectedDate ? getSubscriptionsForDate(selectedDate) : [];
  const totalForDay = selectedDaySubs.reduce((sum, sub) => sum + sub.cost, 0);

  // Get all upcoming payments for the current month
  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const upcomingPayments = daysInMonth
    .map(day => ({
      date: day,
      subscriptions: getSubscriptionsForDate(day)
    }))
    .filter(item => item.subscriptions.length > 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Calendar</h2>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              payment: (date) => getSubscriptionsForDate(date).length > 0
            }}
            modifiersStyles={{
              payment: { 
                backgroundColor: '#DBEAFE', 
                fontWeight: 'bold',
                color: '#1E40AF'
              }
            }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Select a date'}
          </h3>
          
          {selectedDaySubs.length > 0 ? (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-1">Total Due</p>
                <p className="text-2xl font-semibold text-blue-900">${totalForDay.toFixed(2)}</p>
              </div>
              
              <div className="space-y-2">
                {selectedDaySubs.map(sub => (
                  <div 
                    key={sub.id} 
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                      style={{ backgroundColor: sub.color + '20' }}
                    >
                      {sub.logo}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{sub.name}</p>
                      <p className="text-sm text-gray-500">{sub.category}</p>
                    </div>
                    <p className="font-semibold text-gray-900">${sub.cost}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No payments due on this date</p>
          )}
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Payments</h3>
        <div className="space-y-3">
          {upcomingPayments.map(({ date, subscriptions }) => (
            <div key={date.toISOString()} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center min-w-[60px]">
                <div className="text-2xl font-semibold text-gray-900">{format(date, 'd')}</div>
                <div className="text-xs text-gray-500 uppercase">{format(date, 'EEE')}</div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {subscriptions.map(sub => (
                    <div key={sub.id} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                      <span>{sub.logo}</span>
                      <span className="text-sm font-medium">{sub.name}</span>
                      <span className="text-sm text-gray-500">${sub.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${subscriptions.reduce((sum, sub) => sum + sub.cost, 0).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
