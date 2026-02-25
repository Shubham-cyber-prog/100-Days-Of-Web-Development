import { apiSlice } from "../slices/ApiSlice";

// Types for the API responses and requests
interface Variant {
  id: string;
  productId: string;
  sku: string;
  price: number;
  stock: number;
  lowStockThreshold?: number;
  barcode?: string;
  warehouseLocation?: string;
  attributes: Array<{
    attributeId: string;
    valueId: string;
    attribute: { id: string; name: string; slug: string };
    value: { id: string; value: string; slug: string };
  }>;
}

interface Restock {
  id: string;
  variantId: string;
  quantity: number;
  notes?: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

interface GetAllVariantsResponse {
  variants: Variant[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
  resultsPerPage: number;
}

interface GetRestockHistoryResponse {
  restocks: Restock[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
  resultsPerPage: number;
}

interface CreateVariantRequest {
  productId: string;
  sku: string;
  price: number;
  stock: number;
  lowStockThreshold?: number;
  barcode?: string;
  warehouseLocation?: string;
  attributes: Array<{
    attributeId: string;
    valueId: string;
  }>;
}

interface UpdateVariantRequest {
  sku?: string;
  price?: number;
  stock?: number;
  lowStockThreshold?: number;
  barcode?: string;
  warehouseLocation?: string;
  attributes?: Array<{
    attributeId: string;
    valueId: string;
  }>;
}

interface RestockVariantRequest {
  quantity: number;
  notes?: string;
}

interface RestockVariantResponse {
  restock: Restock;
  isLowStock: boolean;
}

export const variantApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   getAllVariants: builder.query<GetAllVariantsResponse, Record<string, any>>({
      query: (params) => ({
        url: '/variants',
        params,
      }),
      providesTags: ['Variant'],
    }),

    getVariantById: builder.query<{ variant: Variant }, string>({
      query: (id) => `/variants/${id}`,
      providesTags: (result, error, id) => [{ type: 'Variant', id }],
    }),

    getVariantBySku: builder.query<{ variant: Variant }, string>({
      query: (sku) => `/variants/sku/${sku}`,
      providesTags: (result, error, sku) => [{ type: 'Variant', id: sku }],
    }),

    getRestockHistory: builder.query<GetRestockHistoryResponse, { variantId: string; page?: number; limit?: number }>({
      query: ({ variantId, page = 1, limit = 10 }) => ({
        url: `/variants/${variantId}/restock-history`,
        params: { page, limit },
      }),
      providesTags: (result, error, { variantId }) => [{ type: 'Variant', id: variantId }],
    }),

    createVariant: builder.mutation<{ variant: Variant }, CreateVariantRequest>({
      query: (body) => ({
        url: '/variants',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Variant'],
    }),

    updateVariant: builder.mutation<{ variant: Variant }, { id: string; data: UpdateVariantRequest }>({
      query: ({ id, data }) => ({
        url: `/variants/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Variant', id },
        'Variant',
      ],
    }),

    restockVariant: builder.mutation<RestockVariantResponse, { id: string; data: RestockVariantRequest }>({
      query: ({ id, data }) => ({
        url: `/variants/${id}/restock`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Variant', id },
        'Variant',
      ],
    }),

    deleteVariant: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/variants/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Variant', id },
        'Variant',
      ],
    }),
  }),
});

export const {
  useGetAllVariantsQuery,
  useGetVariantByIdQuery,
  useGetVariantBySkuQuery,
  useGetRestockHistoryQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useRestockVariantMutation,
  useDeleteVariantMutation,
} = variantApi;