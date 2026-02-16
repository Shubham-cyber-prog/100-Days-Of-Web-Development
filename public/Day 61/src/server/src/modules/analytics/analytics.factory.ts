import { AnalyticsController } from "./analytics.controller";
import { AnalyticsRepository } from "./analytics.repository";
import { AnalyticsService } from "./analytics.service";

export const makeAnalyticsController = () => {
  const repo = new AnalyticsRepository();
  const service = new AnalyticsService(repo);
  const controller = new AnalyticsController(service);
  return controller;
};
