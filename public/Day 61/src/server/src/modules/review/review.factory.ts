import { ReviewRepository } from "./review.repository";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";

export const makeReviewController = () => {
  const repository = new ReviewRepository();
  const service = new ReviewService(repository);
  return new ReviewController(service);
};
