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
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = api;

export default api;
