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
    getAllEvents: build.query({
      query: () => "/events/",
      providesTags: ["Events"],
    }),
    getEvents: build.query({
      query: () => "/all-events/",
      providesTags: ["Events"],
    }),
    createEvent: build.mutation({
      query: (newEvent) => ({
        url: "/events/",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Events"],
    }),

    getEventById: build.query({
      query: (eventId) => `/events/${eventId}/`,
      providesTags: (result, error, eventId) =>
        eventId ? [{ type: "Events", id: eventId }] : [],
    }),

    updateEvent: build.mutation({
      query: ({ eventId, updatedEvent }) => ({
        url: `/events/${eventId}/`,
        method: "PUT",
        body: updatedEvent,
      }),
      invalidatesTags: ["Events"],
    }),

    deleteEvent: build.mutation({
      query: (eventId) => ({
        url: `/events/${eventId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
    updateUserProfile: build.mutation({
      query: (updatedProfile) => ({
        url: "/update-user-profile/",
        method: "PUT",
        body: updatedProfile,
      }),
      invalidatesTags: ["UserProfile"],
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
  useGetEventsQuery,
  useGetAllEventsQuery,
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useUpdateUserProfileMutation,
} = api;

export default api;
