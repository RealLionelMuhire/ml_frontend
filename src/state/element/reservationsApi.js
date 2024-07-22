import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import TokenRetrieval from '../../utils/TokenRetrieval';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = TokenRetrieval.getToken();
    if (token) {
      headers.set('Authorization', `token ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result && result.error && result.error.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return result;
};

export const reservationsApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'reservationsApi',
  endpoints: (build) => ({
    getReservations: build.query({
      query: () => '/list-reservations/',
      providesTags: ['Reservations'],
    }),
    createReservation: build.mutation({
      query: (newReservation) => ({
        url: '/create-reservation/',
        method: 'POST',
        body: newReservation,
      }),
      invalidatesTags: ['Reservations'],
    }),
    updateReservation: build.mutation({
      query: ({ reservationId, updatedReservation }) => ({
        url: `/update-reservation/${reservationId}/`,
        method: 'PUT',
        body: updatedReservation,
      }),
      invalidatesTags: ['Reservations'],
    }),
    deleteReservation: build.mutation({
      query: (reservationId) => ({
        url: `/delete-reservation/${reservationId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reservations'],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useCreateReservationMutation,
  useUpdateReservationMutation,
  useDeleteReservationMutation,
} = reservationsApi;
