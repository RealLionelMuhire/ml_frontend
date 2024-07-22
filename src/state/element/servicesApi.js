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

export const servicesApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'servicesApi',
  endpoints: (build) => ({
    getServices: build.query({
      query: () => '/list-services/',
      providesTags: ['Services'],
    }),
    createService: build.mutation({
      query: ({ clientId, serviceData }) => ({
        url: `/initiate-service/${clientId}/`,
        method: 'POST',
        body: serviceData,
      }),
      invalidatesTags: ['Services'],
    }),
    closeService: build.mutation({
      query: ({ serviceId, description }) => ({
        url: `/close-service/${serviceId}/`,
        method: 'POST',
        body: { description },
      }),
      invalidatesTags: ['Services'],
    }),
    getServicesByIds: build.query({
      query: (ids) => `/services-list-by-id/?ids=${ids.join(',')}`,
      providesTags: (result, error, ids) =>
        ids ? [{ type: 'Services', id: 'LIST' }] : [],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useCreateServiceMutation,
  useCloseServiceMutation,
  useGetServicesByIdsQuery,
} = servicesApi;
