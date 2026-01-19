import AppError from "@/shared/errors/AppError";
import { ReviewRepository } from "./review.repository";
import prisma from "@/infra/database/database.config";

export class ReviewService {
  constructor(private reviewRepository: ReviewRepository) {}

  async createReview(
    userId: string,
    data: { productId: string; rating: number; comment?: string }
  ) {
    if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
      throw new AppError(400, "Rating must be an integer between 1 and 5");
    }

    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!product) {
      throw new AppError(404, "Product not found");
    }

    const existingReview =
      await this.reviewRepository.findReviewByUserAndProduct(
        userId,
        data.productId
      );
    if (existingReview) {
      throw new AppError(400, "You have already reviewed this product");
    }

    const review = await this.reviewRepository.createReview({
      userId,
      productId: data.productId,
      rating: data.rating,
      comment: data.comment,
    });

    await this.reviewRepository.updateProductRating(data.productId);
    return review;
  }

  async getReviewsByProductId(
    productId: string,
    query: { page?: number; limit?: number }
  ) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await this.reviewRepository.findReviewsByProductId(
      productId,
      {
        skip,
        take: limit,
      }
    );

    const total = await prisma.review.count({ where: { productId } });
    const totalPages = Math.ceil(total / limit);

    return {
      reviews,
      total,
      totalPages,
      currentPage: page,
      resultsPerPage: limit,
    };
  }

  async deleteReview(id: string, userId: string) {
    const review = await this.reviewRepository.findReviewById(id);
    if (!review) {
      throw new AppError(404, "Review not found");
    }

    await this.reviewRepository.deleteReview(id);
    await this.reviewRepository.updateProductRating(review.productId);

    return { message: "Review deleted successfully" };
  }
}
