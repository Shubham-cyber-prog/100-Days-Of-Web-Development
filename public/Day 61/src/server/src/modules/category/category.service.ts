import AppError from "@/shared/errors/AppError";
import slugify from "@/shared/utils/slugify";
import ApiFeatures from "@/shared/utils/ApiFeatures";
import { CategoryRepository } from "./category.repository";
import prisma from "@/infra/database/database.config";

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAllCategories(queryString: Record<string, any>) {
    const apiFeatures = new ApiFeatures(queryString)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .build();

    const { where, orderBy, skip, take } = apiFeatures;

    const categories = await this.categoryRepository.findManyCategories({
      where,
      orderBy,
      skip,
      take,
      includeProducts: true,
    });

    // const categoriesWithCounts = categories.map((category) => ({
    //   ...category,
    //   productCount: category.products?.length || 0,
    //   variantCount: category.products?.reduce((sum, product) => sum + (product.variants?.length || 0), 0) || 0,
    // }));

    return categories;
  }

  async getCategory(categoryId: string) {
    const category = await this.categoryRepository.findCategoryById(categoryId, true);
    if (!category) {
      throw new AppError(404, "Category not found");
    }
    return {
        ...category,
        productCount: category.products?.length || 0,
      
    };
  }

  async createCategory(data: {
    name: string;
    description?: string;
    images?: string[];
    attributes?: { attributeId: string; isRequired: boolean }[];
  }) {
    const slug = slugify(data.name);
    const existingCategory = await prisma.category.findUnique({ where: { slug } });
    if (existingCategory) {
      throw new AppError(400, "Category with this name already exists");
    }

    // Validate attributes
    if (data.attributes) {
      for (const attr of data.attributes) {
        const attribute = await prisma.attribute.findUnique({ where: { id: attr.attributeId } });
        if (!attribute) {
          throw new AppError(404, `Attribute not found: ${attr.attributeId}`);
        }
      }
    }

    const category = await this.categoryRepository.createCategory({
      name: data.name,
      slug,
      description: data.description,
      images: data.images,
      attributes: data.attributes,
    });
    return { category };
  }

  async updateCategory(categoryId: string, data: {
    name?: string;
    description?: string;
    images?: string[];
  }) {
    const category = await this.categoryRepository.findCategoryById(categoryId);
    if (!category) {
      throw new AppError(404, "Category not found");
    }

    const slug = data.name ? slugify(data.name) : undefined;
    if (slug && slug !== category.slug) {
      const existingCategory = await prisma.category.findUnique({ where: { slug } });
      if (existingCategory) {
        throw new AppError(400, "Category with this name already exists");
      }
    }

    const updatedCategory = await this.categoryRepository.updateCategory(categoryId, {
      name: data.name,
      slug,
      description: data.description,
      images: data.images,
    });
    return { category: updatedCategory };
  }

  async deleteCategory(categoryId: string) {
    const category = await this.categoryRepository.findCategoryById(categoryId);
    if (!category) {
      throw new AppError(404, "Category not found");
    }
    await this.categoryRepository.deleteCategory(categoryId);
  }

  async addCategoryAttribute(categoryId: string, attributeId: string, isRequired: boolean) {
    const category = await this.categoryRepository.findCategoryById(categoryId);
    if (!category) {
      throw new AppError(404, "Category not found");
    }
    const attribute = await prisma.attribute.findUnique({ where: { id: attributeId } });
    if (!attribute) {
      throw new AppError(404, "Attribute not found");
    }
    const existing = await prisma.categoryAttribute.findUnique({
      where: { categoryId_attributeId: { categoryId, attributeId } },
    });
    if (existing) {
      throw new AppError(400, "Attribute already assigned to category");
    }
    const categoryAttribute = await this.categoryRepository.addCategoryAttribute(categoryId, attributeId, isRequired);
    return { categoryAttribute };
  }

  async removeCategoryAttribute(categoryId: string, attributeId: string) {
    const category = await this.categoryRepository.findCategoryById(categoryId);
    if (!category) {
      throw new AppError(404, "Category not found");
    }
    const attribute = await prisma.attribute.findUnique({ where: { id: attributeId } });
    if (!attribute) {
      throw new AppError(404, "Attribute not found");
    }
    await this.categoryRepository.removeCategoryAttribute(categoryId, attributeId);
  }
}