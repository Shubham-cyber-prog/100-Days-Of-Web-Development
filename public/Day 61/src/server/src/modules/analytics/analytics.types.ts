export interface ProductPerformance {
  id: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface TopUser {
  id: string;
  name: string;
  email: string;
  orderCount: number;
  totalSpent: number;
  engagementScore: number;
}

export interface InteractionTrend {
  labels: string[];
  views: number[];
  clicks: number[];
  others: number[];
}

export interface UserAnalytics {
  totalUsers: number;
  totalRevenue: number;
  retentionRate: number;
  lifetimeValue: number;
  repeatPurchaseRate: number;
  engagementScore: number;
  changes: { users: number | null };
  topUsers: TopUser[];
  interactionTrends: InteractionTrend;
}

export interface AnalyticsOverview {
  totalRevenue: number;
  totalOrders: number;
  totalSales: number;
  totalUsers: number;
  averageOrderValue: number;
  changes: {
    revenue: number | null;
    orders: number | null;
    sales: number | null;
    users: number | null;
    averageOrderValue: number | null;
  };
  monthlyTrends: {
    labels: string[];
    revenue: number[];
    orders: number[];
    sales: number[];
    users: number[];
  };
}

export interface AllAnalytics {
  overview: AnalyticsOverview;
  products: ProductPerformance[];
  users: UserAnalytics;
}

export type ExportableData =
  | AnalyticsOverview
  | ProductPerformance[]
  | UserAnalytics
  | AllAnalytics;

export interface DateRangeQuery {
  timePeriod: string;
  year?: number;
  startDate?: Date;
  endDate?: Date;
  category?: string;
}
