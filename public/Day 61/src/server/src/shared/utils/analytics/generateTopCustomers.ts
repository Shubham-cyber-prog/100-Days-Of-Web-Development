export const generateTopCustomers = (
  users: any[],
  engagementScores: { [userId: string]: number }
): any[] => {
  return users
    .map((user) => ({
      id: user.id,
      name: user.name || "Unknown",
      email: user.email,
      orderCount: user.orders.length,
      totalSpent: user.orders.reduce(
        (sum: number, order: any) => sum + order.amount,
        0
      ),
      engagementScore: engagementScores[user.id] || 0,
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);
};
