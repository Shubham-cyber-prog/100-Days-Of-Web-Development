import {
  AllAnalytics,
  AnalyticsOverview,
  ExportableData,
  UserAnalytics,
} from "@/modules/analytics/analytics.types";
import flattenObject from "../flattenObject";
import {
  AllReports,
  SalesReport,
  UserRetentionReport,
} from "@/modules/reports/reports.types";

export default function formatAnalyticsData(data: ExportableData): any[] {
  if (Array.isArray(data)) {
    // ProductPerformance[]
    return data.map((item) => flattenObject(item));
  } else if ("overview" in data && "products" in data && "users" in data) {
    // AllAnalytics
    const { overview, products, users } = data as AllAnalytics;
    const overviewData = flattenObject({
      ...overview,
      changes: overview.changes,
      monthlyTrends: {
        labels: JSON.stringify(overview.monthlyTrends.labels),
        revenue: JSON.stringify(overview.monthlyTrends.revenue),
        orders: JSON.stringify(overview.monthlyTrends.orders),
        sales: JSON.stringify(overview.monthlyTrends.sales),
        users: JSON.stringify(overview.monthlyTrends.users),
      },
    });
    const productsData = products.map((item, index) => ({
      productRank: index + 1,
      ...flattenObject(item),
    }));
    const usersData = [
      flattenObject({
        ...users,
        changes: users.changes,
        interactionTrends: {
          labels: JSON.stringify(users.interactionTrends.labels),
          views: JSON.stringify(users.interactionTrends.views),
          clicks: JSON.stringify(users.interactionTrends.clicks),
          others: JSON.stringify(users.interactionTrends.others),
        },
      }),
      ...users.topUsers.map((user, index) => ({
        topUserRank: index + 1,
        ...flattenObject(user),
      })),
    ];
    return [overviewData, ...productsData, ...usersData];
  } else if (
    "totalUsers" in data &&
    "topUsers" in data &&
    "interactionTrends" in data
  ) {
    // UserAnalytics
    const { topUsers, interactionTrends, changes, ...rest } =
      data as UserAnalytics;
    const flattenedRest = flattenObject({
      ...rest,
      changes,
      interactionTrends: {
        labels: JSON.stringify(interactionTrends.labels),
        views: JSON.stringify(interactionTrends.views),
        clicks: JSON.stringify(interactionTrends.clicks),
        others: JSON.stringify(interactionTrends.others),
      },
    });
    return [
      flattenedRest,
      ...topUsers.map((user, index) => ({
        topUserRank: index + 1,
        ...flattenObject(user),
      })),
    ];
  } else if ("totalRevenue" in data && "monthlyTrends" in data) {
    // AnalyticsOverview
    const { monthlyTrends, changes, ...rest } = data as AnalyticsOverview;
    const flattenedRest = flattenObject({
      ...rest,
      changes,
      monthlyTrends: {
        labels: JSON.stringify(monthlyTrends.labels),
        revenue: JSON.stringify(monthlyTrends.revenue),
        orders: JSON.stringify(monthlyTrends.orders),
        sales: JSON.stringify(monthlyTrends.sales),
        users: JSON.stringify(monthlyTrends.users),
      },
    });
    return [flattenedRest];
  } else if ("sales" in data && "userRetention" in data) {
    // AllReports
    const { sales, userRetention } = data as AllReports;
    const salesData = flattenObject({
      ...sales,
      byCategory: JSON.stringify(sales.byCategory),
      topProducts: JSON.stringify(sales.topProducts),
    });
    const userRetentionData = flattenObject({
      ...userRetention,
      topUsers: JSON.stringify(userRetention.topUsers),
    });
    return [salesData, userRetentionData];
  } else if ("totalUsers" in data && "topUsers" in data) {
    // UserRetentionReport
    const { topUsers, ...rest } = data as UserRetentionReport;
    const flattenedRest = flattenObject(rest);
    return [
      flattenedRest,
      ...topUsers.map((user, index) => ({
        topUserRank: index + 1,
        ...flattenObject(user),
      })),
    ];
  } else if ("totalRevenue" in data && "byCategory" in data) {
    // SalesReport
    const { byCategory, topProducts, ...rest } = data as SalesReport;
    const flattenedRest = flattenObject({
      ...rest,
      byCategory: JSON.stringify(byCategory),
      topProducts: JSON.stringify(topProducts),
    });
    return [flattenedRest];
  } else {
    throw new Error("Unsupported data format for export");
  }
}
