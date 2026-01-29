import { Request, Response } from "express";
import asyncHandler from "@/shared/utils/asyncHandler";
import sendResponse from "@/shared/utils/sendResponse";
import { ReviewService } from "./review.service";
import { makeLogsService } from "../logs/logs.factory";

export class ReviewController {
  private logsService = makeLogsService();
  constructor(private reviewService: ReviewService) {}

  createReview = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { productId, rating, comment } = req.body;

    const review = await this.reviewService.createReview(userId, {
      productId,
      rating,
      comment,
    });

    sendResponse(res, 201, {
      data: review,
      message: "Review created successfully",
    });

    const start = Date.now();
    const end = Date.now();

    this.logsService.info("Review created", {
      userId: req.user?.id,
      sessionId: req.session.id,
      timePeriod: end - start,
    });
  });

  getReviewsByProductId = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const { page, limit } = req.query;

    const result = await this.reviewService.getReviewsByProductId(productId, {
      page: Number(page),
      limit: Number(limit),
    });
    console.log("reviews result => ", result);

    sendResponse(res, 200, {
      data: result,
      message: "Reviews fetched successfully",
    });
  });

  deleteReview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const result = await this.reviewService.deleteReview(id, userId);

    sendResponse(res, 200, result);
    const start = Date.now();
    const end = Date.now();

    this.logsService.info("Review deleted", {
      userId: req.user?.id,
      sessionId: req.session.id,
      timePeriod: end - start,
    });
  });
}
