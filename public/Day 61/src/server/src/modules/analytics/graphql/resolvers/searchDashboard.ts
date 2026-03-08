import { Context } from "@/modules/product/graphql/resolver";
import searchModel from "@/shared/utils/searchModel";

export const searchDashboardResolver = {
  Query: {
    searchDashboard: async (
      _: any,
      { params }: { params: { searchQuery: string } },
      { prisma }: Context
    ) => {
      const { searchQuery } = params;

      const transactions = await searchModel(
        "transaction",
        [{ name: "status", isString: false }],
        searchQuery,
        prisma
      );

      const products = await searchModel(
        "product",
        [
          { name: "name", isString: true },
          { name: "description", isString: true },
        ],
        searchQuery,
        prisma
      );

      const categories = await searchModel(
        "category",
        [
          { name: "name", isString: true },
          { name: "description", isString: true },
        ],
        searchQuery,
        prisma
      );

      const users = await searchModel(
        "user",
        [
          { name: "name", isString: true },
          { name: "email", isString: true },
        ],
        searchQuery,
        prisma
      );

      const results = [
        ...transactions.map((t: any) => ({
          type: "transaction",
          id: t.id,
          title: `Transaction #${t.id}`,
          description: `$${t.amount || 0} - ${t.status || "Pending"}`,
        })),
        ...products.map((p: any) => ({
          type: "product",
          id: p.id,
          title: p.name,
          description: p.description || `$${p.variants?.[0]?.price || 0}`, // Updated to use variants
        })),
        ...categories.map((c: any) => ({
          type: "category",
          id: c.id,
          title: c.name,
          description: c.description,
        })),
        ...users.map((u: any) => ({
          type: "user",
          id: u.id,
          title: u.name,
          description: u.email,
        })),
      ];

      return results;
    },
  },
};