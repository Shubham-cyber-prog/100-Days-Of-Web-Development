import { getDateRange } from "@/shared/utils/analytics";
import { Context } from "../resolver";

const productPerformance = {
  Query: {
    productPerformance: async (
      _: any,
      { params }: any,
      { prisma }: Context
    ) => {
      const { timePeriod, year, startDate, endDate, category } = params;
      const { currentStartDate, yearStart, yearEnd } = getDateRange({
        timePeriod,
        year,
        startDate,
        endDate,
      });

      const orderItems = await prisma.orderItem.findMany({
        where: {
          createdAt: {
            ...(currentStartDate && { gte: currentStartDate }),
            ...(endDate && { lte: new Date(endDate) }),
            ...(yearStart && { gte: yearStart }),
            ...(yearEnd && { lte: yearEnd }),
          },
          // category filter commented out; adjust if needed
        },
        include: { variant: true },
      });

      const productSales: {
        [key: string]: {
          id: string;
          name: string;
          quantity: number;
          revenue: number;
        };
      } = {};

      for (const item of orderItems) {
        const productId = item.variantId;
        if (!productSales[productId]) {
          productSales[productId] = {
            id: productId,
            name: item.variant.sku || "Unknown",
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[productId].quantity += item.quantity;
        productSales[productId].revenue +=
          item.quantity * (item.variant.price || 0);
      }

      return Object.values(productSales).sort((a, b) => b.quantity - a.quantity);
    },
  },
};

export default productPerformance;