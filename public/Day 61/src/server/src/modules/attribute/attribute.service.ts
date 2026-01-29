import AppError from "@/shared/errors/AppError";
import slugify from "@/shared/utils/slugify";
import { AttributeRepository } from "./attribute.repository";
import ApiFeatures from "@/shared/utils/ApiFeatures";

export class AttributeService {
  constructor(private attributeRepository: AttributeRepository) {}

  async createAttribute(data: { name: string }) {
    const slug = slugify(data.name);
    return await this.attributeRepository.createAttribute({ ...data, slug });
  }

  async createAttributeValue(data: { attributeId: string; value: string }) {
    const slug = slugify(data.value);
    return await this.attributeRepository.createAttributeValue({
      ...data,
      slug,
    });
  }

  async assignAttributeToCategory(data: {
    categoryId: string;
    attributeId: string;
    isRequired: boolean;
  }) {
    return await this.attributeRepository.assignAttributeToCategory(data);
  }

  // async assignAttributeToProduct(data: {
  //   productId: string;
  //   attributeId: string;
  //   valueId?: string;
  //   customValue?: string;
  // }) {
  //   return await this.attributeRepository.assignAttributeToProduct(data);
  // }

  async getAllAttributes(queryString: Record<string, any>) {
    const apiFeatures = new ApiFeatures(queryString)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .build();

    return await this.attributeRepository.findManyAttributes(apiFeatures);
  }

  async getAttribute(id: string) {
    const attribute = await this.attributeRepository.findAttributeById(id);
    if (!attribute) {
      throw new AppError(404, "Attribute not found");
    }
    return attribute;
  }

  async deleteAttribute(id: string) {
    const attribute = await this.attributeRepository.findAttributeById(id);
    if (!attribute) {
      throw new AppError(404, "Attribute not found");
    }
    await this.attributeRepository.deleteAttribute(id);
  }

  async deleteAttributeValue(id: string) {
    const attributeValue =
      await this.attributeRepository.findAttributeValueById(id);
    if (!attributeValue) {
      throw new AppError(404, "Attribute value not found");
    }
    await this.attributeRepository.deleteAttributeValue(id);
  }
}
