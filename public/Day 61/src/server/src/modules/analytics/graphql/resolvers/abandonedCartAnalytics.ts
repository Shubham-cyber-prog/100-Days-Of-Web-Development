import { getDateRange } from "@/shared/utils/analytics";
import { Context } from "../resolver";

const abandonedCartAnalytics = {
  Query: {
    abandonedCartAnalytics: async (
      _: any,
      { params }: { params: { timePeriod?: string; year?: number; startDate?: string; endDate?: string; category?: string } },
      { prisma }: Context
    ) => {
      const { timePeriod, year, startDate, endDate } = params;

      // Compute date range using the utility function
      const {
        currentStartDate,
        previousStartDate,
        previousEndDate,
        yearStart,
        yearEnd,
      } = getDateRange({ timePeriod, year, startDate, endDate });

      if (!currentStartDate || !previousStartDate) {
        throw new Error("Invalid or missing date range. Please provide valid startDate and endDate or timePeriod.");
      }

      // Fetch cart events
      const cartEvents = await prisma.cartEvent.findMany({
        where: {
          timestamp: {
            gte: currentStartDate,
            lte: previousEndDate,
          },
        },
        include: {
          cart: {
            include: { cartItems: true },
          },
          user: true,
        },
      });

      // Group events by cartId
      const cartEventsByCartId = cartEvents.reduce((acc: { [key: string]: any[] }, event) => {
        if (!acc[event.cartId]) acc[event.cartId] = [];
        acc[event.cartId].push(event);
        return acc;
      }, {});

      let totalCarts = 0;
      let totalAbandonedCarts = 0;
      let potentialRevenueLost = 0;

      for (const cartId in cartEventsByCartId) {
        const events = cartEventsByCartId[cartId];
        const hasAddToCart = events.some((e: any) => e.eventType === "ADD");
        const hasCheckoutCompleted = events.some(
          (e: any) => e.eventType === "CHECKOUT_COMPLETED"
        );

        const cart = events[0].cart;
        if (!cart || !cart.cartItems || cart.cartItems.length === 0) continue;

        totalCarts++;

        if (hasAddToCart && !hasCheckoutCompleted) {
          const addToCartEvent = events.find((e: any) => e.eventType === "ADD");
          const oneHourLater = new Date(addToCartEvent.timestamp.getTime() + 60 * 60 * 1000); // 1 hour
          const now = new Date();

          if (now > oneHourLater) {
            totalAbandonedCarts++;
            potentialRevenueLost += cart.cartItems.reduce(
              (sum: number, item: any) => sum + item.quantity * (item.variant?.price || 0), // Updated to use variant.price
              0
            );
          }
        }
      }

      const abandonmentRate = totalCarts > 0 ? (totalAbandonedCarts / totalCarts) * 100 : 0;

      return {
        totalAbandonedCarts,
        abandonmentRate: Number(abandonmentRate.toFixed(2)),
        potentialRevenueLost: Number(potentialRevenueLost.toFixed(2)),
      };
    },
  },
};

export default abandonedCartAnalytics;