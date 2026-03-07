import { Subscription, PaymentMethod } from '../types/subscription';

export const initialSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'Entertainment',
    cost: 15.99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-15',
    status: 'active',
    logo: '🎬',
    color: '#E50914',
    paymentMethod: 'Visa •••• 4242',
    notes: 'Premium plan - 4 screens'
  },
  {
    id: '2',
    name: 'Spotify',
    category: 'Music',
    cost: 9.99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-10',
    status: 'active',
    logo: '🎵',
    color: '#1DB954',
    paymentMethod: 'Visa •••• 4242',
    notes: 'Premium individual'
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    category: 'Productivity',
    cost: 54.99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-05',
    status: 'active',
    logo: '🎨',
    color: '#FF0000',
    paymentMethod: 'Mastercard •••• 5555',
    notes: 'All apps plan'
  },
  {
    id: '4',
    name: 'ChatGPT Plus',
    category: 'Productivity',
    cost: 20.00,
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-20',
    status: 'active',
    logo: '🤖',
    color: '#10A37F',
    paymentMethod: 'Visa •••• 4242',
    notes: 'GPT-4 access'
  },
  {
    id: '5',
    name: 'GitHub Pro',
    category: 'Development',
    cost: 4.00,
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-01',
    status: 'active',
    logo: '💻',
    color: '#181717',
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: '6',
    name: 'Notion',
    category: 'Productivity',
    cost: 10.00,
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-08',
    status: 'trial',
    logo: '📝',
    color: '#000000',
    paymentMethod: 'Visa •••• 4242',
    notes: 'Trial ends March 8'
  },
  {
    id: '7',
    name: 'Disney+',
    category: 'Entertainment',
    cost: 7.99,
    billingCycle: 'monthly',
    nextBillingDate: '2026-03-12',
    status: 'active',
    logo: '🏰',
    color: '#113CCF',
    paymentMethod: 'Mastercard •••• 5555'
  },
  {
    id: '8',
    name: 'Figma Professional',
    category: 'Design',
    cost: 144.00,
    billingCycle: 'yearly',
    nextBillingDate: '2026-08-15',
    status: 'active',
    logo: '🎨',
    color: '#F24E1E',
    paymentMethod: 'Mastercard •••• 5555',
    notes: 'Professional plan - annual billing'
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit',
    last4: '4242',
    brand: 'Visa',
    isDefault: true
  },
  {
    id: '2',
    type: 'credit',
    last4: '5555',
    brand: 'Mastercard',
    isDefault: false
  },
  {
    id: '3',
    type: 'paypal',
    last4: '',
    brand: 'PayPal',
    isDefault: false
  }
];
