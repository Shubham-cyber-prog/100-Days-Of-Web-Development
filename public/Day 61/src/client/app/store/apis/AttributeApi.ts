import { apiSlice } from "../slices/ApiSlice";

export const attributeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAttributes: builder.query({
      query: () => "/attributes",
      providesTags: ["Attribute"],
    }),

    getAttribute: builder.query({
      query: (id) => `/attributes/${id}`,
      providesTags: (result, error, id) => [{ type: "Attribute", id }],
    }),

    createAttribute: builder.mutation({
      query: (data) => ({
        url: "/attributes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Attribute"],
    }),

    createAttributeValue: builder.mutation({
      query: (data) => ({
        url: "/attributes/value",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Attribute"],
    }),

    assignAttributeToCategory: builder.mutation({
      query: (data) => ({
        url: "/attributes/assign-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Attribute"],
    }),

    assignAttributeToProduct: builder.mutation({
      query: (data) => ({
        url: "/attributes/assign-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Attribute"],
    }),

    deleteAttribute: builder.mutation({
      query: (id) => ({
        url: `/attributes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attribute"],
    }),

    deleteAttributeValue: builder.mutation({
      query: (id) => ({
        url: `/attributes/value/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attribute"],
    }),
  }),
});

export const {
  useGetAllAttributesQuery,
  useGetAttributeQuery,
  useCreateAttributeMutation,
  useCreateAttributeValueMutation,
  useAssignAttributeToCategoryMutation,
  useAssignAttributeToProductMutation,
  useDeleteAttributeMutation,
  useDeleteAttributeValueMutation,
} = attributeApi;
