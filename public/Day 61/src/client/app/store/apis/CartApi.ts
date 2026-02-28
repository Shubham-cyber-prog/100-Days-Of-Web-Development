import { apiSlice } from "../slices/ApiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/cart",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Cart"],
    }),

    getCartCount: builder.query({
      query: () => ({
        url: "/cart/count",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (productData) => ({
        url: "/cart",
        method: "POST",
        body: productData,
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation({
      query: ({ id, quantity }: { id: string; quantity: number }) => ({
        url: `/cart/item/${id}`,
        method: "PUT",
        body: { quantity },
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/item/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useGetCartCountQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = cartApi;
