export interface Friend {
  id: string;
  name: string;
  avatar: string;
  balance: number;
}

export interface Group {
  id: string;
  name: string;
  members: number;
  balance: number;
  avatar: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitType: string;
  group?: string;
  friend?: string;
  date: string;
  participants: string[];
  description?: string;
  category?: string;
}

export interface Activity {
  id: string;
  type: "expense_added" | "payment_settled" | "group_created" | "expense_edited";
  description: string;
  timestamp: string;
  user: string;
}

export const mockFriends: Friend[] = [
  { id: "1", name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", balance: 45.50 },
  { id: "2", name: "Mike Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", balance: -32.00 },
  { id: "3", name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", balance: 18.75 },
  { id: "4", name: "David Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", balance: -25.50 },
  { id: "5", name: "Lisa Anderson", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", balance: 67.25 },
];

export const mockGroups: Group[] = [
  { id: "1", name: "House Roommates", members: 4, balance: 125.50, avatar: "🏠" },
  { id: "2", name: "Weekend Trip", members: 6, balance: -78.30, avatar: "🏖️" },
  { id: "3", name: "Office Lunches", members: 8, balance: 42.00, avatar: "🍔" },
  { id: "4", name: "Ski Trip 2026", members: 5, balance: 0, avatar: "⛷️" },
];

export const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: 125.50,
    paidBy: "You",
    splitType: "Equal",
    group: "House Roommates",
    date: "2026-03-03",
    participants: ["You", "Sarah Johnson", "Mike Chen", "Emma Wilson"],
    description: "Weekly groceries from Whole Foods",
    category: "Groceries"
  },
  {
    id: "2",
    title: "Dinner at Olive Garden",
    amount: 89.75,
    paidBy: "Sarah Johnson",
    splitType: "Equal",
    friend: "Sarah Johnson",
    date: "2026-03-02",
    participants: ["You", "Sarah Johnson"],
    description: "Birthday dinner",
    category: "Food & Drink"
  },
  {
    id: "3",
    title: "Uber to Airport",
    amount: 45.00,
    paidBy: "You",
    splitType: "Equal",
    group: "Weekend Trip",
    date: "2026-03-01",
    participants: ["You", "Mike Chen", "David Brown"],
    category: "Transportation"
  },
  {
    id: "4",
    title: "Netflix Subscription",
    amount: 15.99,
    paidBy: "Emma Wilson",
    splitType: "Equal",
    group: "House Roommates",
    date: "2026-02-28",
    participants: ["You", "Sarah Johnson", "Mike Chen", "Emma Wilson"],
    category: "Entertainment"
  },
  {
    id: "5",
    title: "Coffee Meeting",
    amount: 12.50,
    paidBy: "You",
    splitType: "Equal",
    friend: "Lisa Anderson",
    date: "2026-02-27",
    participants: ["You", "Lisa Anderson"],
    category: "Food & Drink"
  },
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "expense_added",
    description: "You added 'Grocery Shopping' in House Roommates",
    timestamp: "2026-03-03T14:30:00",
    user: "You"
  },
  {
    id: "2",
    type: "expense_added",
    description: "Sarah Johnson added 'Dinner at Olive Garden'",
    timestamp: "2026-03-02T19:45:00",
    user: "Sarah Johnson"
  },
  {
    id: "3",
    type: "payment_settled",
    description: "Mike Chen settled up $32.00 with you",
    timestamp: "2026-03-01T16:20:00",
    user: "Mike Chen"
  },
  {
    id: "4",
    type: "expense_added",
    description: "You added 'Uber to Airport' in Weekend Trip",
    timestamp: "2026-03-01T10:15:00",
    user: "You"
  },
  {
    id: "5",
    type: "group_created",
    description: "You created group 'Ski Trip 2026'",
    timestamp: "2026-02-29T09:00:00",
    user: "You"
  },
  {
    id: "6",
    type: "expense_edited",
    description: "Emma Wilson updated 'Netflix Subscription'",
    timestamp: "2026-02-28T12:30:00",
    user: "Emma Wilson"
  },
];

export const monthlySpending = [
  { month: "Sep", amount: 245 },
  { month: "Oct", amount: 382 },
  { month: "Nov", amount: 456 },
  { month: "Dec", amount: 521 },
  { month: "Jan", amount: 389 },
  { month: "Feb", amount: 467 },
  { month: "Mar", amount: 289 },
];

export const categoryBreakdown = [
  { name: "Food & Drink", value: 1245, color: "#10b981" },
  { name: "Groceries", value: 890, color: "#3b82f6" },
  { name: "Transportation", value: 456, color: "#8b5cf6" },
  { name: "Entertainment", value: 342, color: "#f59e0b" },
  { name: "Utilities", value: 567, color: "#ef4444" },
  { name: "Other", value: 234, color: "#6b7280" },
];
