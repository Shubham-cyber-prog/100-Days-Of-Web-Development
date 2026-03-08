import { Prisma } from "@prisma/client";
import prisma from "@/infra/database/database.config";

export class AttributeRepository {
  async createAttribute(data: { name: string; slug: string }) {
    return prisma.attribute.create({ data });
  }

  async createAttributeValue(data: {
    attributeId: string;
    value: string;
    slug: string;
  }) {
    return prisma.attributeValue.create({ data });
  }

  async assignAttributeToCategory(data: {
    categoryId: string;
    attributeId: string;
    isRequired: boolean;
  }) {
    return prisma.categoryAttribute.create({ data });
  }

  // async assignAttributeToProduct(data: {
  //   productId: string;
  //   attributeId: string;
  //   valueId?: string;
  //   customValue?: string;
  // }) {
  //   return prisma.productAttribute.create({ data });
  // }

  async findManyAttributes(params: {
    where?: Prisma.AttributeWhereInput;
    orderBy?: Prisma.AttributeOrderByWithRelationInput;
    skip?: number;
    take?: number;
  }) {
    const {
      where,
      orderBy = { createdAt: "desc" },
      skip = 0,
      take = 10,
    } = params;
    return prisma.attribute.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { values: true, categories: { include: { category: true } } },
    });
  }

  async findAttributeById(id: string) {
    return prisma.attribute.findUnique({
      where: { id },
      include: { values: true },
    });
  }

  async findAttributeValueById(id: string) {
    return prisma.attributeValue.findUnique({
      where: { id },
      include: { attribute: true },
    });
  }

  async deleteAttribute(id: string) {
    return prisma.attribute.delete({ where: { id } });
  }

  async deleteAttributeValue(id: string) {
    return prisma.attributeValue.delete({ where: { id } });
  }
}
