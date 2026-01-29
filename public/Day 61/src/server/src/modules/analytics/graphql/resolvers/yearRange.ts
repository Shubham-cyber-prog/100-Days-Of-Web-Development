import { Context } from "../resolver";

const yearRange = {
  Query: {
    yearRange: async (_: any, __: any, { prisma }: Context) => {
      const orders = await prisma.order.aggregate({
        _min: { orderDate: true },
        _max: { orderDate: true },
      });

      const minYear =
        orders._min.orderDate?.getFullYear() || new Date().getFullYear();
      const maxYear =
        orders._max.orderDate?.getFullYear() || new Date().getFullYear();

      return { minYear, maxYear };
    },
  },
};

export default yearRange;
