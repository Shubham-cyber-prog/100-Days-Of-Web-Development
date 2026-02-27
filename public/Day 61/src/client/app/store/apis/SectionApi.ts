import { apiSlice } from "../slices/ApiSlice";

export const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSections: builder.query({
      query: () => ({
        url: "/sections",
        method: "GET",
        providesTags: ["Section"],
      }),
    }),

    getHero: builder.query({
      query: () => ({
        url: "/sections/hero",
        method: "GET",
        providesTags: ["Section"],
      }),
    }),

    getPromo: builder.query({
      query: () => ({
        url: "/sections/promo",
        method: "GET",
        providesTags: ["Section"],
      }),
    }),

    getArrivals: builder.query({
      query: () => ({
        url: "/sections/arrivals",
        method: "GET",
        providesTags: ["Section"],
      }),
    }),

    getBenefits: builder.query({
      query: () => ({
        url: "/sections/benefits",
        method: "GET",
        providesTags: ["Section"],
      }),
    }),
    getSectionById: builder.query({
      query: (sectionId) => ({
        url: `/sections/${sectionId}`,
        method: "GET",
        providesTags: ["Section"],
      }),
    }),
    createSection: builder.mutation({
      query: (newSection) => ({
        url: "/sections",
        method: "POST",
        body: newSection,
        providesTags: ["Section"],
      }),
    }),
    updateSection: builder.mutation({
      query: ({ sectionType, updatedSection }) => ({
        url: `/sections/${sectionType}`,
        method: "PUT",
        body: updatedSection,
        providesTags: ["Section"],
      }),
    }),
    deleteSection: builder.mutation({
      query: (sectionType) => ({
        url: `/sections/${sectionType}`,
        method: "DELETE",
        providesTags: ["Section"],
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllSectionsQuery,
  useGetHeroQuery,
  useGetPromoQuery,
  useGetArrivalsQuery,
  useGetBenefitsQuery,
  useGetSectionByIdQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionApi;
