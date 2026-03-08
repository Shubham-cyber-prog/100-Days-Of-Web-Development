import { gql } from "@apollo/client";

export const GET_ANALYTICS_OVERVIEW = gql`
  query GetAnalyticsOverview($params: DateRangeQueryInput!) {
    revenueAnalytics(params: $params) {
      totalRevenue
      changes {
        revenue
      }
      monthlyTrends {
        labels
        revenue
      }
    }
    orderAnalytics(params: $params) {
      totalOrders
      totalSales
      changes {
        sales
        orders
      }
    }
    userAnalytics(params: $params) {
      totalUsers
      changes {
        users
      }
    }
    yearRange {
      minYear
      maxYear
    }

    interactionAnalytics(params: $params) {
      totalInteractions
      byType {
        views
        clicks
        others
      }
    }

    productPerformance(params: $params) {
      id
      name
      quantity
      revenue
    }
  }
`;

export const GET_ALL_ANALYTICS = gql`
  query GetAllAnalytics($params: DateRangeQueryInput!) {
    yearRange {
      minYear
      maxYear
    }
    revenueAnalytics(params: $params) {
      totalRevenue
      changes {
        revenue
      }
      monthlyTrends {
        labels
        revenue
        orders
        sales
        users
      }
    }
    orderAnalytics(params: $params) {
      totalOrders
      totalSales
      averageOrderValue
      changes {
        orders
        sales
        averageOrderValue
      }
    }
    userAnalytics(params: $params) {
      totalUsers
      totalRevenue
      retentionRate
      lifetimeValue
      repeatPurchaseRate
      engagementScore
      changes {
        users
      }
      topUsers {
        id
        name
        email
        orderCount
        totalSpent
        engagementScore
      }
      interactionTrends {
        labels
        views
        clicks
        others
      }
    }
    productPerformance(params: $params) {
      id
      name
      quantity
      revenue
    }
    interactionAnalytics(params: $params) {
      totalInteractions
      byType {
        views
        clicks
        others
      }
      mostViewedProducts {
        productId
        productName
        viewCount
      }
    }

    # abandonedCartAnalytics(params: $params) {
    #   totalAbandonedCarts
    #   abandonmentRate
    #   potentialRevenueLost
    # }
  }
`;

export const SEARCH_DASHBOARD = gql`
  query SearchDashboard($params: SearchInput!) {
    searchDashboard(params: $params) {
      type
      id
      title
      description
    }
  }
`;
