export const calculateCustomerMetrics = (
  users: any[]
): {
  totalCustomers: number;
  totalRevenue: number;
  lifetimeValue: number;
  repeatCustomers: number;
  repeatPurchaseRate: number;
} => {
  const totalCustomers = users.length;
  const getUserRevenue = (user: any) =>
    user.orders.reduce(
      (orderSum: number, order: any) => orderSum + order.amount,
      0
    );

  const totalRevenue = users.reduce(
    (sum, user) => sum + getUserRevenue(user),
    0
  );

  const lifetimeValue = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;
  const repeatCustomers = users.filter((user) => user.orders.length > 1).length;
  const repeatPurchaseRate =
    totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0;
  return {
    totalCustomers,
    totalRevenue,
    lifetimeValue,
    repeatCustomers,
    repeatPurchaseRate,
  };
};
