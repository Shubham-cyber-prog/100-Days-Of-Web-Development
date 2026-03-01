export interface Subscription {
  id: string;
  name: string;
  category: string;
  cost: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  status: 'active' | 'trial' | 'expired';
  logo: string;
  color: string;
  paymentMethod: string;
  notes?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'paypal' | 'bank';
  last4: string;
  brand: string;
  isDefault: boolean;
}
