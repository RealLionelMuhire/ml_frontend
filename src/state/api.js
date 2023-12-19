import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  reducerPath: "authApi",
  endpoints: (build) => ({
    getCustomers: build.query({
      query: () => "/users/",
      providesTags: ["Team"],
    }),
  }),
});

export const { useGetCustomersQuery } = api;

export default api;
