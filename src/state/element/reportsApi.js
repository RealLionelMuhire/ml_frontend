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

export const reportsApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'reportsApi',
  endpoints: (build) => ({
    getReports: build.query({
      query: () => '/list-reports/',
      providesTags: ['Reports'],
    }),
    createReport: build.mutation({
      query: (newReport) => ({
        url: '/create-report/',
        method: 'POST',
        body: newReport,
      }),
      invalidatesTags: ['Reports'],
    }),
    updateReport: build.mutation({
      query: ({ reportId, updatedReport }) => ({
        url: `/update-report/${reportId}/`,
        method: 'PUT',
        body: updatedReport,
      }),
      invalidatesTags: ['Reports'],
    }),
    deleteReport: build.mutation({
      query: (reportId) => ({
        url: `/delete-report/${reportId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reports'],
    }),
  }),
});

export const {
  useGetReportsQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
} = reportsApi;
