export interface DateRangeQuery {
  timePeriod: string;
  year?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface SalesReport {
  totalRevenue: number;
  totalOrders: number;
  totalSales: number;
  averageOrderValue: number;
  byCategory: {
    categoryId: string;
    categoryName: string;
    revenue: number;
    sales: number;
  }[];
  topProducts: {
    productId: string;
    productName: string;
    quantity: number;
    revenue: number;
  }[];
}

export interface UserRetentionReport {
  totalUsers: number;
  retentionRate: number;
  repeatPurchaseRate: number;
  lifetimeValue: number;
  topUsers: {
    userId: string;
    name: string;
    email: string;
    orderCount: number;
    totalSpent: number;
  }[];
}

export interface AllReports {
  sales: SalesReport;
  userRetention: UserRetentionReport;
}

export type ReportData = SalesReport | UserRetentionReport | AllReports;
