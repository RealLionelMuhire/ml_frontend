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
    getClients: build.query({
      query: () => "/list-clients/",
      providesTags: ["Clients"],
    }),
    createClient: build.mutation({
      query: (newClient) => ({
        url: "/register-client/",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Clients"],
    }),
    getClientsByIds: build.query({
      query: (ids) => `/clients-list-by-id/?ids=${ids.join(",")}`,
      providesTags: (result, error, ids) =>
        ids ? [{ type: "Clients", id: "LIST" }] : [],
    }),
    activateClient: build.mutation({
      query: (clientId) => ({
        url: `/activate-client/${clientId}/`,
        method: "PUT",
      }),
      // Invalidate the Clients tag to trigger a refetch after activation
      invalidatesTags: ["Clients"],
    }),
    deactivateClient: build.mutation({
      query: (clientId) => ({
        url: `/deactivate-client/${clientId}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Clients"],
    }),
    getServices: build.query({
      query: () => "/list-services/",
      providesTags: ["Services"],
    }),
    getDummyData: build.query({
      query: () => "/list-clients/",
      providesTags: ["DummyData"],
    }),
    createService: build.mutation({
      query: ({ clientId, serviceData }) => ({
        url: `/initiate-service/${clientId}/`,
        method: "POST",
        body: serviceData,
      }),
      invalidatesTags: ["Services"],
    }),
    closeService: build.mutation({
      query: ({ serviceId, description }) => ({
        url: `/close-service/${serviceId}/`,
        method: "POST",
        body: { description },
      }),
    }),
    getServicesByIds: build.query({
      query: (ids) => `/services-list-by-id/?ids=${ids.join(",")}`,
      providesTags: (result, error, ids) =>
        ids ? [{ type: "Services", id: "LIST" }] : [],
    }),
    invalidatesTags: ["Services"],
    getUserProfile: build.query({
      query: () => "/user-profile/",
      providesTags: ["UserProfile"],
    }),
    getDashboard: build.query({
      query: () => "/dashboard-data/",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetClientsQuery,
  useCreateClientMutation,
  useGetClientsByIdsQuery,
  useActivateClientMutation,
  useDeactivateClientMutation,
  useGetServicesQuery,
  useGetDummyDataQuery,
  useCreateServiceMutation,
  useCloseServiceMutation,
  useGetServicesByIdsQuery,
  useGetUserProfileQuery,
  useGetDashboardQuery,
} = api;

export default api;
