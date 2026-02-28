import { apiSlice } from "../slices/ApiSlice";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => "/transactions",
      providesTags: ["Transactions"], // 👈 Tag for all transactions
    }),
    getTransaction: builder.query({
      query: (id) => `/transactions/${id}`,
      providesTags: (result, error, id) => [{ type: "Transactions", id }], // 👈 Tag for single transaction
    }),


    updateTransactionStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/transactions/status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Transactions", id }, // 👈 Invalidate single
        "Transactions", // 👈 Invalidate list if needed
      ],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Transactions", id }, // 👈 Invalidate single
        "Transactions", // 👈 Invalidate list
      ],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetTransactionQuery,
  useUpdateTransactionStatusMutation,
  useDeleteTransactionMutation,
} = transactionApi;
