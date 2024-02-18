// external_api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const external_api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  reducerPath: "authApi",
  endpoints: (build) => ({
    // ... other endpoints

    // Reservations
    getReservations: build.query({
      query: () => "/list-reserved-periods/",
      transformResponse: (response) => response.reserved_periods,
      providesTags: ["Reservations"],
    }),
    createReservation: build.mutation({
      query: (newReservation) => ({
        url: "/register-reservation/",
        method: "POST",
        body: newReservation,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
        invalidatesTags: ["Reservations"],
    }),
    deleteReservation: build.mutation({
      query: (id) => ({
        url: `/reservations/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useCreateReservationMutation,
  useDeleteReservationMutation
} = external_api;

export default external_api;
