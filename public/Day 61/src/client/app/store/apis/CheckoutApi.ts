import { apiSlice } from "../slices/ApiSlice";

export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initiateCheckout: builder.mutation({
      query: () => ({
        url: "/checkout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useInitiateCheckoutMutation } = checkoutApi;
