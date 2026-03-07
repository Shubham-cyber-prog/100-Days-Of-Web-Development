import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import productPerformance from "./resolvers/productPerformance";
import yearRange from "./resolvers/yearRange";
import customerAnalytics from "./resolvers/userAnalytics";
import interactionAnalytics from "./resolvers/interactionAnalytics";
import { searchDashboardResolver } from "./resolvers/searchDashboard";
import orderAnalytics from "./resolvers/orderAnalytics";
import revenueAnalytics from "./resolvers/revenueAnalytics";
import userAnalytics from "./resolvers/userAnalytics";
import abandonedCartAnalytics from "./resolvers/abandonedCartAnalytics";

export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}

export const analyticsResolvers = {
  Query: {
    ...orderAnalytics.Query,
    ...revenueAnalytics.Query,
    ...userAnalytics.Query,
    ...yearRange.Query,
    ...customerAnalytics.Query,
    ...interactionAnalytics.Query,
    ...productPerformance.Query,
    ...searchDashboardResolver.Query,
    ...abandonedCartAnalytics.Query,
  },
};