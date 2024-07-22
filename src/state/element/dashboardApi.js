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

export const dashboardApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'dashboardApi',
  endpoints: (build) => ({
    getDashboardData: build.query({
      query: () => '/dashboard-data/',
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
} = dashboardApi;
