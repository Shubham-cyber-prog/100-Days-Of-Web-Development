import prisma from "@/infra/database/database.config";

export class ReviewRepository {
  async createReview(data: {
    userId: string;
    productId: string;
    rating: number;
    comment?: string;
  }) {
    return prisma.review.create({ data });
  }

  async findReviewsByProductId(
    productId: string,
    params: {
      skip?: number;
      take?: number;
    }
  ) {
    const { skip = 0, take = 10 } = params;
    return prisma.review.findMany({
      where: { productId },
      include: { user: { select: { name: true, avatar: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    });
  }

  async findReviewById(id: string) {
    return prisma.review.findUnique({
      where: { id },
      include: { user: { select: { name: true } } },
    });
  }

  async findReviewByUserAndProduct(userId: string, productId: string) {
    return prisma.review.findFirst({
      where: { userId, productId },
    });
  }

  async deleteReview(id: string) {
    return prisma.review.delete({
      where: { id },
    });
  }

  async updateProductRating(productId: string) {
    const reviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });
    const reviewCount = reviews.length;
    const averageRating =
      reviewCount > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : 0;

    return prisma.product.update({
      where: { id: productId },
      data: { averageRating, reviewCount },
    });
  }
}
