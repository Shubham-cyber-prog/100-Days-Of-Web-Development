import prisma from "@/infra/database/database.config";

export class CategoryRepository {
  async findManyCategories(params: {
    where?: Record<string, any>;
    orderBy?: Record<string, any> | Record<string, any>[];
    skip?: number;
    take?: number;
    includeProducts?: boolean;
  }) {
    const { where, orderBy, skip, take, includeProducts } = params;
    return prisma.category.findMany({
      where,
      orderBy: orderBy || { createdAt: "desc" },
      skip,
      take,
      include: {
        attributes: { include: { attribute: { include: { values: true } } } },
        products: includeProducts
          ? { include: { variants: { select: { id: true, sku: true, price: true, stock: true } } } }
          : false,
      },
    });
  }

  async findCategoryById(id: string, includeProducts: boolean = false) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        attributes: { include: { attribute: { include: { values: true } } } },
        products: includeProducts
          ? { include: { variants: { select: { id: true, sku: true, price: true, stock: true } } } }
          : false,
      },
    });
  }

  async createCategory(data: {
    name: string;
    slug: string;
    description?: string;
    images?: string[];
    attributes?: { attributeId: string; isRequired: boolean }[];
  }) {
    return prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        images: data.images,
        attributes: data.attributes
          ? {
              create: data.attributes.map((attr) => ({
                attributeId: attr.attributeId,
                isRequired: attr.isRequired,
              })),
            }
          : undefined,
      },
    });
  }

  async updateCategory(id: string, data: {
    name?: string;
    slug?: string;
    description?: string;
    images?: string[];
  }) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }

  async addCategoryAttribute(categoryId: string, attributeId: string, isRequired: boolean) {
    return prisma.categoryAttribute.create({
      data: {
        categoryId,
        attributeId,
        isRequired,
      },
    });
  }

  async removeCategoryAttribute(categoryId: string, attributeId: string) {
    return prisma.categoryAttribute.delete({
      where: { categoryId_attributeId: { categoryId, attributeId } },
    });
  }
}