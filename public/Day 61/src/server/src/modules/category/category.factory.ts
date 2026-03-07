import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

export const makeCategoryController = () => {
  const repository = new CategoryRepository();
  const service = new CategoryService(repository);
  return new CategoryController(service);
};