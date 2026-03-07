import { CreditCard, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function PaymentMethodsView() {
  const paymentMethods = [
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mastercard',
      last4: '5555',
      expiry: '08/26',
      isDefault: false
    },
    {
      id: '3',
      type: 'PayPal',
      email: 'john@example.com',
      isDefault: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Payment Methods</h2>
          <p className="text-gray-500 mt-1">Manage your payment methods and billing information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map(method => (
          <Card key={method.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              {method.isDefault && (
                <Badge variant="secondary">Default</Badge>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="font-semibold text-gray-900 text-lg">{method.type}</div>
              {'last4' in method ? (
                <>
                  <div className="text-gray-500">•••• •••• •••• {method.last4}</div>
                  <div className="text-sm text-gray-400">Expires {method.expiry}</div>
                </>
              ) : (
                <div className="text-gray-500">{method.email}</div>
              )}
            </div>

            <div className="flex gap-2 mt-6 pt-6 border-t">
              <Button variant="outline" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: '2026-02-15', description: 'Netflix - Monthly subscription', amount: 15.99, status: 'Paid' },
            { date: '2026-02-10', description: 'Spotify - Monthly subscription', amount: 9.99, status: 'Paid' },
            { date: '2026-02-05', description: 'Adobe Creative Cloud - Monthly subscription', amount: 54.99, status: 'Paid' },
            { date: '2026-01-20', description: 'ChatGPT Plus - Monthly subscription', amount: 20.00, status: 'Paid' }
          ].map((transaction, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{transaction.description}</div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">${transaction.amount}</div>
                <Badge variant="secondary" className="text-xs">{transaction.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
