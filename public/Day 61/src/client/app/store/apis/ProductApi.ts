import { apiSlice } from "../slices/ApiSlice";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams();

        if (params) {
          const {
            searchQuery,
            sort,
            limit,
            category,
            page,
            featured,
            bestselling,
          } = params;

          if (searchQuery) queryString.set("searchQuery", searchQuery);
          if (sort) queryString.set("sort", sort);
          if (limit) queryString.set("limit", limit);
          if (category) queryString.set("category", category);
          if (page) queryString.set("page", page);
          if (featured) queryString.set("featured", "true");
          if (bestselling) queryString.set("bestselling", "true");
        }

        return {
          url: `/products?${queryString.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),

    bulkProducts: builder.mutation({
      query: (data) => ({
        url: "/products/bulk",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getProductBySlug: builder.query({
      query: (slug) => `/products/slug/${slug}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useBulkProductsMutation,
  useGetAllProductsQuery,
  useGetProductBySlugQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
