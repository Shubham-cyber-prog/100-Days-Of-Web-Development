import { getDateRange } from "@/shared/utils/analytics";
import { Context } from "../resolver";

const interactionAnalytics = {
  Query: {
    interactionAnalytics: async (
      _: any,
      { params }: any,
      { prisma }: Context
    ) => {
      const { timePeriod, year, startDate, endDate } = params;
      const { currentStartDate, yearStart, yearEnd } = getDateRange({
        timePeriod,
        year,
        startDate,
        endDate,
      });

      const interactions = await prisma.interaction.findMany({
        where: {
          createdAt: {
            ...(currentStartDate && { gte: currentStartDate }),
            ...(endDate && { lte: new Date(endDate) }),
            ...(yearStart && { gte: yearStart }),
            ...(yearEnd && { lte: yearEnd }),
          },
        },
        include: { product: true },
      });

      const totalInteractions = interactions.length;
      const byType = {
        views: interactions.filter((i) => i.type.toLowerCase() === "view").length,
        clicks: interactions.filter((i) => i.type.toLowerCase() === "click").length,
        others: interactions.filter(
          (i) => !["view", "click"].includes(i.type.toLowerCase())
        ).length,
      };

      const productViews: {
        [productId: string]: { name: string; count: number };
      } = {};
      for (const interaction of interactions) {
        if (interaction.type.toLowerCase() === "view" && interaction.productId) {
          if (!productViews[interaction.productId]) {
            productViews[interaction.productId] = {
              name: interaction.product?.name || "Unknown",
              count: 0,
            };
          }
          productViews[interaction.productId].count += 1;
        }
      }

      const mostViewedProducts = Object.entries(productViews)
        .map(([productId, data]) => ({
          productId,
          productName: data.name,
          viewCount: data.count,
        }))
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 5);

      return {
        totalInteractions,
        byType,
        mostViewedProducts,
      };
    },
  },
};

export default interactionAnalytics;