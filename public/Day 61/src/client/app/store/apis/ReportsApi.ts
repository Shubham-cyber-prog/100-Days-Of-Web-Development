import { apiSlice } from "../slices/ApiSlice";

export const reportsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateReport: builder.query<Blob, any>({
      query: ({ type, format, timePeriod, year, startDate, endDate }: any) => ({
        url: "/reports/generate",
        method: "GET",
        credentials: "include",
        responseHandler: (response) => response.blob(),
        params: {
          type,
          format,
          timePeriod,
          year,
          startDate,
          endDate,
        },
      }),
    }),
  }),
});

export const { useGenerateReportQuery, useLazyGenerateReportQuery } =
  reportsApi;
