export interface ProductFormData {
  id?: string;
  name: string;
  description?: string;
  categoryId: string;
  isNew: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  variants: {
    id: string;
    sku: string;
    price: number;
    images: File[];
    stock: number;
    lowStockThreshold?: number;
    barcode?: string;
    warehouseLocation?: string;
    attributes: { attributeId: string; valueId: string }[];
  }[];
}
