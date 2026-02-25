export interface FlaggedContent {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  flagType: string;
  confidence: number;
  status: "pending" | "approved" | "rejected" | "escalated";
  timestamp: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
}

export const mockFlaggedContent: FlaggedContent[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    content: "This is absolutely terrible and I hate everyone involved...",
    flagType: "Toxic Language",
    confidence: 94,
    status: "pending",
    timestamp: "2026-02-23T10:30:00Z",
    category: "toxicity",
    severity: "high",
  },
  {
    id: "2",
    user: {
      name: "Sarah Miller",
      email: "sarah.m@example.com",
    },
    content: "Click here to win $10000!!! Free money now!!! Limited time...",
    flagType: "Spam",
    confidence: 98,
    status: "pending",
    timestamp: "2026-02-23T10:25:00Z",
    category: "spam",
    severity: "medium",
  },
  {
    id: "3",
    user: {
      name: "Alex Chen",
      email: "alex.chen@example.com",
    },
    content: "I think we should discuss this more carefully and consider...",
    flagType: "False Positive",
    confidence: 23,
    status: "approved",
    timestamp: "2026-02-23T10:15:00Z",
    category: "toxicity",
    severity: "low",
  },
  {
    id: "4",
    user: {
      name: "Emma Wilson",
      email: "emma.w@example.com",
    },
    content: "You're a complete idiot and should be ashamed of yourself...",
    flagType: "Harassment",
    confidence: 91,
    status: "rejected",
    timestamp: "2026-02-23T09:45:00Z",
    category: "harassment",
    severity: "critical",
  },
  {
    id: "5",
    user: {
      name: "Michael Brown",
      email: "m.brown@example.com",
    },
    content: "Buy now! Exclusive offer! Don't miss out! Act fast!...",
    flagType: "Spam",
    confidence: 87,
    status: "pending",
    timestamp: "2026-02-23T09:30:00Z",
    category: "spam",
    severity: "medium",
  },
  {
    id: "6",
    user: {
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
    },
    content: "This violates our community guidelines regarding explicit...",
    flagType: "Policy Violation",
    confidence: 96,
    status: "escalated",
    timestamp: "2026-02-23T09:00:00Z",
    category: "policy",
    severity: "critical",
  },
  {
    id: "7",
    user: {
      name: "David Kim",
      email: "d.kim@example.com",
    },
    content: "I disagree with this approach, but I understand your point...",
    flagType: "False Positive",
    confidence: 18,
    status: "approved",
    timestamp: "2026-02-23T08:45:00Z",
    category: "toxicity",
    severity: "low",
  },
  {
    id: "8",
    user: {
      name: "Rachel Green",
      email: "rachel.g@example.com",
    },
    content: "Everyone in this group is so stupid and worthless...",
    flagType: "Hate Speech",
    confidence: 89,
    status: "pending",
    timestamp: "2026-02-23T08:30:00Z",
    category: "hate_speech",
    severity: "critical",
  },
];

export interface DashboardStats {
  totalFlagged: number;
  pendingReviews: number;
  approvedToday: number;
  rejectedToday: number;
  accuracyRate: number;
  avgResponseTime: string;
}

export const mockDashboardStats: DashboardStats = {
  totalFlagged: 1247,
  pendingReviews: 43,
  approvedToday: 89,
  rejectedToday: 156,
  accuracyRate: 94.2,
  avgResponseTime: "2.3 min",
};

export const mockTrendData = [
  { date: "Feb 17", flagged: 145, approved: 89, rejected: 42 },
  { date: "Feb 18", flagged: 167, approved: 95, rejected: 58 },
  { date: "Feb 19", flagged: 134, approved: 78, rejected: 45 },
  { date: "Feb 20", flagged: 189, approved: 112, rejected: 67 },
  { date: "Feb 21", flagged: 156, approved: 98, rejected: 52 },
  { date: "Feb 22", flagged: 198, approved: 121, rejected: 71 },
  { date: "Feb 23", flagged: 178, approved: 103, rejected: 62 },
];

export const mockConfidenceData = [
  { range: "90-100%", count: 423 },
  { range: "80-90%", count: 287 },
  { range: "70-80%", count: 156 },
  { range: "60-70%", count: 89 },
  { range: "<60%", count: 45 },
];

export const mockCategoryData = [
  { category: "Toxicity", count: 456, percentage: 36.5 },
  { category: "Spam", count: 324, percentage: 26.0 },
  { category: "Harassment", count: 234, percentage: 18.8 },
  { category: "Hate Speech", count: 145, percentage: 11.6 },
  { category: "Policy Violation", count: 88, percentage: 7.1 },
];

export const mockActivityData = Array.from({ length: 24 }, (_, hour) => ({
  hour: `${hour}:00`,
  flags: Math.floor(Math.random() * 50) + 10,
}));
