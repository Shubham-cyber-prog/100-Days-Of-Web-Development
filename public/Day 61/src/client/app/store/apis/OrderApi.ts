import { apiSlice } from "../slices/ApiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),

    getUserOrders: builder.query({
      query: () => ({
        url: "/orders/user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),

    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrder: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}`,
        method: "PUT",
        body: { status },
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),

    getOrder: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetUserOrdersQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useGetOrderQuery,
} = orderApi;
