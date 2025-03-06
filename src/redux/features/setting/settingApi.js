import { baseApi } from "../../baseApi/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsCondition: builder.query({
      query: () => ({
        url: "/info/terms-condition",
        method: "GET",
      }),
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/info/privacy-policy",
        method: "GET",
        providesTags: ["Privacy-Policy"],
      }),
    }),
    updatePrivacyPolicy: builder.query({
      query: (data) => ({
        url: "/general-info/update/privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Privacy-Policy"],
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: "/info/about-us",
        method: "GET",
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/get-settings-data",
        method: "GET",
        providesTags: ["Profile"],
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetTermsConditionQuery,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyQuery,
  useGetAboutUsQuery,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} = settingApi;
