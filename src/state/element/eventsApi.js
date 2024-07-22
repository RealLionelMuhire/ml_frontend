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

export const eventsApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'eventsApi',
  endpoints: (build) => ({
    getEvents: build.query({
      query: () => '/list-events/',
      providesTags: ['Events'],
    }),
    createEvent: build.mutation({
      query: (newEvent) => ({
        url: '/create-event/',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['Events'],
    }),
    updateEvent: build.mutation({
      query: ({ eventId, updatedEvent }) => ({
        url: `/update-event/${eventId}/`,
        method: 'PUT',
        body: updatedEvent,
      }),
      invalidatesTags: ['Events'],
    }),
    deleteEvent: build.mutation({
      query: (eventId) => ({
        url: `/delete-event/${eventId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
