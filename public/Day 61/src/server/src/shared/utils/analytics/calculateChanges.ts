import { calculatePercentageChange } from ".";

export const calculateChanges = (
  current: Record<string, number>,
  previous: Record<string, number>,
  shouldCalculate: boolean
) =>
  shouldCalculate
    ? {
        revenue: calculatePercentageChange(
          current.totalRevenue,
          previous.totalRevenue
        ),

        orders: calculatePercentageChange(
          current.totalOrders,
          previous.totalOrders
        ),

        sales: calculatePercentageChange(
          current.totalSales,
          previous.totalSales
        ),

        users: calculatePercentageChange(
          current.totalUsers,
          previous.totalUsers
        ),

        averageOrderValue: calculatePercentageChange(
          current.averageOrderValue,
          previous.averageOrderValue
        ),
      }
    : {
        revenue: null,
        orders: null,
        sales: null,
        users: null,
        averageOrderValue: null,
      };
