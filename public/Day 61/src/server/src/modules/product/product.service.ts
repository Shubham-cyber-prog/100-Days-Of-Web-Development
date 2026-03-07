import AppError from "@/shared/errors/AppError";
import ApiFeatures from "@/shared/utils/ApiFeatures";
import { ProductRepository } from "./product.repository";
import slugify from "@/shared/utils/slugify";
import { parse } from "csv-parse/sync";
import * as XLSX from "xlsx";
import prisma from "@/infra/database/database.config";
import { AttributeRepository } from "../attribute/attribute.repository";
import { VariantRepository } from "../variant/variant.repository";

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private attributeRepository: AttributeRepository,
    private variantRepository: VariantRepository
  ) {}

  async getAllProducts(queryString: Record<string, any>) {
    const apiFeatures = new ApiFeatures(queryString)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .build();

    const { where, orderBy, skip, take, select } = apiFeatures;

    const finalWhere = where && Object.keys(where).length > 0 ? where : {};

    const totalResults = await this.productRepository.countProducts({
      where: finalWhere,
    });

    const totalPages = Math.ceil(totalResults / take);
    const currentPage = Math.floor(skip / take) + 1;

    const products = await this.productRepository.findManyProducts({
      where: finalWhere,
      orderBy: orderBy || { createdAt: "desc" },
      skip,
      take,
      select,
    });

    return {
      products,
      totalResults,
      totalPages,
      currentPage,
      resultsPerPage: take,
    };
  }

  async getProductById(productId: string) {
    const product = await this.productRepository.findProductById(productId);
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    return product;
  }

  async getProductBySlug(productSlug: string) {
    const product = await this.productRepository.findProductBySlug(productSlug);
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    return product;
  }

  async createProduct(data: {
    name: string;
    description?: string;
    isNew?: boolean;
    isTrending?: boolean;
    isBestSeller?: boolean;
    isFeatured?: boolean;
    categoryId?: string;
    variants?: {
      sku: string;
      price: number;
      images: string[];
      stock: number;
      lowStockThreshold?: number;
      barcode?: string;
      warehouseLocation?: string;
      attributes: { attributeId: string; valueId: string }[];
    }[];
  }) {
    const { variants, ...productData } = data;

    if (!variants || variants.length === 0) {
      throw new AppError(400, "At least one variant is required");
    }

    // Validate SKU format (alphanumeric with dashes, 3-50 characters)
    const skuRegex = /^[a-zA-Z0-9-]+$/;
    variants.forEach((variant, index) => {
      if (
        !variant.sku ||
        !skuRegex.test(variant.sku) ||
        variant.sku.length < 3 ||
        variant.sku.length > 50
      ) {
        throw new AppError(
          400,
          `Variant at index ${index} has invalid SKU. Use alphanumeric characters and dashes, 3-50 characters.`
        );
      }
      if (variant.price <= 0) {
        throw new AppError(
          400,
          `Variant at index ${index} must have a positive price`
        );
      }
      if (variant.stock < 0) {
        throw new AppError(
          400,
          `Variant at index ${index} must have non-negative stock`
        );
      }
      if (variant.lowStockThreshold && variant.lowStockThreshold < 0) {
        throw new AppError(
          400,
          `Variant at index ${index} must have non-negative lowStockThreshold`
        );
      }
    });

    // Validate category and required attributes
    let requiredAttributeIds: string[] = [];
    if (productData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: productData.categoryId },
        include: {
          attributes: {
            where: { isRequired: true },
            select: { attributeId: true },
          },
        },
      });
      if (!category) {
        throw new AppError(404, "Category not found");
      }
      requiredAttributeIds = category.attributes.map(
        (attr) => attr.attributeId
      );
    }

    // Validate attributes and values in one query
    const allAttributeIds = [
      ...new Set(
        variants.flatMap((v) => v.attributes.map((a) => a.attributeId))
      ),
    ];
    const allValueIds = [
      ...new Set(variants.flatMap((v) => v.attributes.map((a) => a.valueId))),
    ];
    const [existingAttributes, existingValues] = await Promise.all([
      prisma.attribute.findMany({
        where: { id: { in: allAttributeIds } },
        select: { id: true },
      }),
      prisma.attributeValue.findMany({
        where: { id: { in: allValueIds } },
        select: { id: true, attributeId: true },
      }),
    ]);

    if (existingAttributes.length !== allAttributeIds.length) {
      throw new AppError(400, "One or more attribute IDs are invalid");
    }
    if (existingValues.length !== allValueIds.length) {
      throw new AppError(400, "One or more attribute value IDs are invalid");
    }

    // Validate attribute-value pairs
    variants.forEach((variant, index) => {
      variant.attributes.forEach((attr, attrIndex) => {
        const value = existingValues.find((v) => v.id === attr.valueId);
        if (!value || value.attributeId !== attr.attributeId) {
          throw new AppError(
            400,
            `Attribute value at variant index ${index}, attribute index ${attrIndex} does not belong to the specified attribute`
          );
        }
      });
    });

    // Validate unique SKUs
    const existingSkus = await prisma.productVariant.findMany({
      where: { sku: { in: variants.map((v) => v.sku) } },
      select: { sku: true },
    });
    if (existingSkus.length > 0) {
      throw new AppError(
        400,
        `Duplicate SKUs detected: ${existingSkus.map((s) => s.sku).join(", ")}`
      );
    }

    // Validate unique attribute combinations
    const comboKeys = variants.map((variant) =>
      variant.attributes
        .map((attr) => `${attr.attributeId}:${attr.valueId}`)
        .sort()
        .join("|")
    );
    if (new Set(comboKeys).size !== variants.length) {
      throw new AppError(400, "Duplicate attribute combinations detected");
    }

    // Validate required attributes
    variants.forEach((variant, index) => {
      const variantAttributeIds = variant.attributes.map(
        (attr) => attr.attributeId
      );
      const missingAttributes = requiredAttributeIds.filter(
        (id) => !variantAttributeIds.includes(id)
      );
      if (missingAttributes.length > 0) {
        throw new AppError(
          400,
          `Variant at index ${index} is missing required attributes: ${missingAttributes.join(
            ", "
          )}`
        );
      }
    });

    // Create product and variants in a transaction
    return prisma.$transaction(async (tx) => {
      const product = await this.productRepository.createProduct({
        ...productData,
        slug: slugify(productData.name),
      });

      for (const variant of variants) {
        await this.variantRepository.createVariant({
          productId: product.id,
          sku: variant.sku,
          price: variant.price,
          stock: variant.stock,
          lowStockThreshold: variant.lowStockThreshold || 10,
          barcode: variant.barcode,
          warehouseLocation: variant.warehouseLocation,
          attributes: variant.attributes,
          images: variant.images || [],
        });
      }

      return this.productRepository.findProductById(product.id);
    });
  }

  async updateProduct(
    productId: string,
    updatedData: Partial<{
      name: string;
      description?: string;
      basePrice: number;
      discount?: number;
      isNew?: boolean;
      isTrending?: boolean;
      isBestSeller?: boolean;
      isFeatured?: boolean;
      categoryId?: string;
      variants?: {
        sku: string;
        price: number;
        images: string[];
        stock: number;
        lowStockThreshold?: number;
        barcode?: string;
        warehouseLocation?: string;
        attributes: { attributeId: string; valueId: string }[];
      }[];
    }>
  ) {
    const existingProduct = await this.productRepository.findProductById(
      productId
    );
    if (!existingProduct) {
      throw new AppError(404, "Product not found");
    }

    const { variants, ...productData } = updatedData;

    // Validate variants if provided
    if (variants) {
      if (variants.length === 0) {
        throw new AppError(400, "At least one variant is required");
      }

      const skuRegex = /^[a-zA-Z0-9-]+$/;
      variants.forEach((variant, index) => {
        if (
          !variant.sku ||
          !skuRegex.test(variant.sku) ||
          variant.sku.length < 3 ||
          variant.sku.length > 50
        ) {
          throw new AppError(
            400,
            `Variant at index ${index} has an invalid SKU. Use alphanumeric characters and dashes, 3-50 characters.`
          );
        }
        if (variant.price <= 0) {
          throw new AppError(
            400,
            `Variant at index ${index} must have a positive price`
          );
        }
        if (variant.stock < 0) {
          throw new AppError(
            400,
            `Variant at index ${index} must have a non-negative stock`
          );
        }
        if (variant.lowStockThreshold && variant.lowStockThreshold < 0) {
          throw new AppError(
            400,
            `Variant at index ${index} must have a non-negative lowStockThreshold`
          );
        }
      });

      const allAttributeIds = [
        ...new Set(
          variants.flatMap((v) => v.attributes.map((a) => a.attributeId))
        ),
      ];
      const existingAttributes = await prisma.attribute.findMany({
        where: { id: { in: allAttributeIds } },
      });
      if (existingAttributes.length !== allAttributeIds.length) {
        throw new AppError(400, "One or more attributes are invalid");
      }

      const allValueIds = [
        ...new Set(variants.flatMap((v) => v.attributes.map((a) => a.valueId))),
      ];
      const existingValues = await prisma.attributeValue.findMany({
        where: { id: { in: allValueIds } },
      });
      if (existingValues.length !== allValueIds.length) {
        throw new AppError(400, "One or more attribute values are invalid");
      }

      const skuSet = new Set(variants.map((v) => v.sku));
      if (skuSet.size !== variants.length) {
        throw new AppError(400, "Duplicate SKUs detected");
      }

      const comboKeys = variants.map((variant) =>
        variant.attributes
          .map((attr) => `${attr.attributeId}:${attr.valueId}`)
          .sort()
          .join("|")
      );
      if (new Set(comboKeys).size !== variants.length) {
        throw new AppError(400, "Duplicate attribute combinations detected");
      }

      const categoryId = productData.categoryId || existingProduct.categoryId;
      let requiredAttributeIds: string[] = [];
      if (categoryId) {
        const requiredAttributes = await prisma.categoryAttribute.findMany({
          where: { categoryId, isRequired: true },
          select: { attributeId: true },
        });
        requiredAttributeIds = requiredAttributes.map(
          (attr) => attr.attributeId
        );
      }

      variants.forEach((variant, index) => {
        const variantAttributeIds = variant.attributes.map(
          (attr) => attr.attributeId
        );
        const missingAttributes = requiredAttributeIds.filter(
          (id) => !variantAttributeIds.includes(id)
        );
        if (missingAttributes.length > 0) {
          throw new AppError(
            400,
            `Variant at index ${index} is missing required attributes: ${missingAttributes.join(
              ", "
            )}`
          );
        }
      });
    }

    return prisma.$transaction(async (tx) => {
      const updatedProduct = await this.productRepository.updateProduct(
        productId,
        {
          ...productData,
          ...(productData.name && { slug: slugify(productData.name) }),
        }
      );

      if (variants) {
        await prisma.productVariant.deleteMany({ where: { productId } });
        for (const variant of variants) {
          await this.variantRepository.createVariant({
            productId,
            sku: variant.sku,
            price: variant.price,
            stock: variant.stock,
            lowStockThreshold: variant.lowStockThreshold || 10,
            barcode: variant.barcode,
            warehouseLocation: variant.warehouseLocation,
            attributes: variant.attributes,
            images: variant.images || [],
          });
        }
      }

      return this.productRepository.findProductById(productId);
    });
  }

  async bulkCreateProducts(file: Express.Multer.File) {
    if (!file) {
      throw new AppError(400, "No file uploaded");
    }

    let records: any[];
    try {
      if (file.mimetype === "text/csv") {
        records = parse(file.buffer.toString(), {
          columns: true,
          skip_empty_lines: true,
          trim: true,
        });
      } else if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const workbook = XLSX.read(file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        records = XLSX.utils.sheet_to_json(sheet);
      } else {
        throw new AppError(400, "Unsupported file format. Use CSV or XLSX");
      }
    } catch (error) {
      throw new AppError(400, "Failed to parse file");
    }

    if (records.length === 0) {
      throw new AppError(400, "File is empty");
    }

    const products = records.map((record) => {
      if (!record.name || !record.basePrice) {
        throw new AppError(400, `Invalid record: ${JSON.stringify(record)}`);
      }

      return {
        name: String(record.name),
        slug: slugify(record.name),
        description: record.description
          ? String(record.description)
          : undefined,
        basePrice: Number(record.basePrice),
        discount: record.discount ? Number(record.discount) : 0,
        isNew: record.isNew ? Boolean(record.isNew) : false,
        isTrending: record.isTrending ? Boolean(record.isTrending) : false,
        isBestSeller: record.isBestSeller
          ? Boolean(record.isBestSeller)
          : false,
        isFeatured: record.isFeatured ? Boolean(record.isFeatured) : false,
        categoryId: record.categoryId ? String(record.categoryId) : undefined,
      };
    });

    const categoryIds = products
      .filter((p) => p.categoryId)
      .map((p) => p.categoryId!);
    if (categoryIds.length > 0) {
      const existingCategories = await prisma.category.findMany({
        where: { id: { in: categoryIds } },
        select: { id: true },
      });
      const validCategoryIds = new Set(existingCategories.map((c) => c.id));
      for (const product of products) {
        if (product.categoryId && !validCategoryIds.has(product.categoryId)) {
          throw new AppError(400, `Invalid categoryId: ${product.categoryId}`);
        }
      }
    }

    await this.productRepository.createManyProducts(products);

    return { count: products.length };
  }

  async deleteProduct(productId: string) {
    const product = await this.productRepository.findProductById(productId);
    if (!product) {
      throw new AppError(404, "Product not found");
    }

    await this.productRepository.deleteProduct(productId);
  }
}
