// state/api.js

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
    createUser: build.mutation({
      query: (newUser) => ({
        url: "/register/",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Team"],
    }),
    createClient: build.mutation({
      query: (newClient) => ({
        url: "/register-client/",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useCreateClientMutation,
} = api;

export default api;
