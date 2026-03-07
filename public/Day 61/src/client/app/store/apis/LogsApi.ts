import { apiSlice } from "../slices/ApiSlice";

export const logsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLogs: builder.query({
      query: () => "/logs",
    }),

    getLogByLevel: builder.query({
      query: (level) => `/logs/level/${level}`,
    }),

    getLogById: builder.query({
      query: (id) => `/logs/${id}`,
    }),

    deleteLog: builder.mutation({
      query: (id) => ({
        url: `/logs/${id}`,
        method: "DELETE",
      }),
    }),

    clearLogs: builder.mutation({
      query: () => ({
        url: "/logs",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllLogsQuery,
  useGetLogByIdQuery,
  useGetLogByLevelQuery,
  useDeleteLogMutation,
  useClearLogsMutation,
} = logsApi;
