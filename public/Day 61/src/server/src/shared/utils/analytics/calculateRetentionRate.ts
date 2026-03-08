export const calculateRetentionRate = (
  currentUsers: any[],
  previousUsers: any[]
): number => {
  if (!previousUsers.length) return 0;
  const previousUserIds = new Set(previousUsers.map((user) => user.id));
  const retainedCustomers = currentUsers.filter(
    (user) => previousUserIds.has(user.id) && user.orders.length > 0
  ).length;
  return (retainedCustomers / previousUsers.length) * 100;
};
