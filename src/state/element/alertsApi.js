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

export const alertsApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'alertsApi',
  endpoints: (build) => ({
    getAlerts: build.query({
      query: () => '/list-alerts/',
      providesTags: ['Alerts'],
    }),
    createAlert: build.mutation({
      query: (newAlert) => ({
        url: '/create-alert/',
        method: 'POST',
        body: newAlert,
      }),
      invalidatesTags: ['Alerts'],
    }),
    updateAlert: build.mutation({
      query: ({ alertId, updatedAlert }) => ({
        url: `/update-alert/${alertId}/`,
        method: 'PUT',
        body: updatedAlert,
      }),
      invalidatesTags: ['Alerts'],
    }),
    deleteAlert: build.mutation({
      query: (alertId) => ({
        url: `/delete-alert/${alertId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Alerts'],
    }),
  }),
});

export const {
  useGetAlertsQuery,
  useCreateAlertMutation,
  useUpdateAlertMutation,
  useDeleteAlertMutation,
} = alertsApi;
