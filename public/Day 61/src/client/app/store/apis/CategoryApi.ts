import { apiSlice } from "../slices/ApiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, categoryData }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

getCategoryAttributes: builder.query({
  query: (categoryId: string) => `/categories/${categoryId}`,
  transformResponse: (response: any) => ({
    attributes: response.category.attributes.map((atr: any) => ({
      id: atr.attribute.id,
      name: atr.attribute.name,
      isRequired: atr.isRequired,
      values: atr.attribute.values.map((v: any) => ({
        id: v.id,
        value: v.value,
        slug: v.slug,
      })),
    })),
  }),
}),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoryAttributesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
