import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    headers: { Authorization: `token ${localStorage.getItem("token")}` },
  }),
  reducerPath: "authApi",
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "/users/",
      providesTags: ["Team"],
    }),
    getLogout: build.query({
      query: () => "/logout/",
      providesTags: "Logout",
    }),
  }),
});

export const { useGetUsersQuery, useGetLogoutQuery } = api;

export default api;
