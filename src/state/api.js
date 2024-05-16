// state/api.js
import TokenRetrieval from "../utils/TokenRetrieval";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    headers: { Authorization: `token ${TokenRetrieval.getToken()}` },
  }),
  reducerPath: "authApi",
  endpoints: (build) => ({
    // Users
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
      headers: {
        "Content-Type": "multipart/form-data",
      },
      invalidatesTags: ["Team"],
    }),

    activateUser: build.mutation({
      query: (userId) => ({
        url: `/activate-user/${userId}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),
    deactivateUser: build.mutation({
      query: (userId) => ({
        url: `/update_user/${userId}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),

    // Clients
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
    createUncompleteClient: build.mutation({
      query: (newClient) => ({
        url: "/incompleted-client/",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Clients"],
    }),
    getUncompleteClients: build.query({
      query: () => "/all-incomplete-clients/",
      method: "GET",
      providesTags: ["Clients"],
    }),

    getUncompleteClientById: build.query({
      query: (clientId) => ({
        url: `/incompleted-client-data/${clientId}`,
        method: "GET",
        providesTags: ["Clients"],
      }),
    }),
    updateUncompletedClient: build.mutation({
      query: ({ clientId, updatedClient }) => ({
        url: `/uncompleted-client/${clientId}/`,
        method: "PUT",
        body: updatedClient,
      }),
      invalidatesTags: ["Clients"],
    }),

    // Services
    getServices: build.query({
      query: () => "/list-services/",
      providesTags: ["Services"],
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
      invalidatesTags: ["Services"],
    }),
    getServicesByIds: build.query({
      query: (ids) => `/services-list-by-id/?ids=${ids.join(",")}`,
      providesTags: (result, error, ids) =>
        ids ? [{ type: "Services", id: "LIST" }] : [],
    }),

    // User Profile
    getUserProfile: build.query({
      query: () => "/user-profile/",
      providesTags: ["UserProfile"],
    }),
    updateUserProfile: build.mutation({
      query: (updatedProfile) => ({
        url: "/update-user-profile/",
        method: "PUT",
        body: updatedProfile,
      }),
      invalidatesTags: ["UserProfile"],
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    getUserSelfData: build.query({
      query: () => "/user-self-data/",
      method: "GET",
      providesTags: ["UserProfile"],
      // forceRefetch: true,
    }),

    // Dashboard
    getDashboard: build.query({
      query: () => "/dashboard-data/",
      providesTags: ["Dashboard"],
    }),

    // Events
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

    // Alerts
    getAlert: build.query({
      query: () => "/list-alerts/",
      providesTags: ["Alerts"],
    }),
    createAlert: build.mutation({
      query: ({ clientId, alertData }) => ({
        url: `/alert-initiate/${clientId}/`,
        method: "POST",
        body: alertData,
      }),
      invalidatesTags: ["Alerts"],
    }),
    closeAlert: build.mutation({
      query: ({ alertId }) => ({
        url: `/alert-action/${alertId}/`,
        method: "POST",
      }),
      invalidatesTags: ["Alerts"],
    }),
    getAlertById: build.query({
      query: (alertId) => `/alert-detail/?ids=${alertId}`,
      providesTags: (result, error, alertId) =>
        alertId ? [{ type: "Alerts", id: alertId }] : [],
    }),
    // Reports
    getReports: build.query({
      query: () => "/list-reports/",
      providesTags: ["Reports"],
    }),
    createReport: build.mutation({
      query: ({ formData }) => {
        // console.log("Report Data api.js:", formData); // Log the reportData
        return {
          url: `/create-report/`,
          method: "POST",
          body: formData,
        };
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
      invalidatesTags: ["Reports"],
    }),
    getReportById: build.query({
      query: (reportId) => `/report-detail/?ids=${reportId}`,
      providesTags: (result, error, reportId) =>
        reportId ? [{ type: "Reports", id: reportId }] : [],
    }),

    // Reservations
    getFutureReservations: build.query({
      query: () => "/reservations-future/",
      providesTags: ["Reservations"],
    }),

    getPastReservations: build.query({
      query: () => "/reservations-past/",
      providesTags: ["Reservations"],
    }),

    getReservations: build.query({
      query: () => "/list-reservations/",
      providesTags: ["Reservations"],
    }),
    createReservation: build.mutation({
      query: (newReservation) => ({
        url: "/user-register-reservation/",
        method: "POST",
        body: newReservation,
      }),
      invalidatesTags: ["Reservations"],
    }),
    getReservationById: build.query({
      query: (reservationId) => `/reservations/${reservationId}/`,
      providesTags: (result, error, reservationId) =>
        reservationId ? [{ type: "Reservations", id: reservationId }] : [],
    }),
    updateReservation: build.mutation({
      query: ({ reservationId, updatedReservation }) => ({
        url: `/reservations/${reservationId}/`,
        method: "PUT",
        body: updatedReservation,
      }),
      invalidatesTags: ["Reservations"],
    }),
    deleteReservation: build.mutation({
      query: (reservationId) => ({
        url: `/reservations/${reservationId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reservations"],
    }),
  }),
});

export const {
  // Users
  useGetUsersQuery,
  useCreateUserMutation,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useGetUserSelfDataQuery,

  // Clients
  useGetClientsQuery,
  useCreateClientMutation,
  useGetClientsByIdsQuery,
  useActivateClientMutation,
  useDeactivateClientMutation,
  useCreateUncompleteClientMutation,
  useGetUncompleteClientsQuery,
  useUpdateUncompletedClientMutation,
  useGetUncompleteClientByIdQuery,

  // Services
  useGetServicesQuery,
  useCreateServiceMutation,
  useCloseServiceMutation,
  useGetServicesByIdsQuery,

  // User Profile
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,

  // Dashboard
  useGetDashboardQuery,

  // Events
  useGetEventsQuery,
  useGetAllEventsQuery,
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,

  // Alerts
  useGetAlertQuery,
  useCreateAlertMutation,
  useCloseAlertMutation,
  useGetAlertByIdQuery,

  // Reports
  useCreateReportMutation,
  useGetReportsQuery,
  useGetReportByIdQuery,

  // Reservations
  useGetFutureReservationsQuery,
  useGetPastReservationsQuery,
  useGetReservationsQuery,
  useCreateReservationMutation,
  useGetReservationByIdQuery,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
} = api;

export default api;
