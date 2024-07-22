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

export const clientsApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'clientsApi',
  endpoints: (build) => ({
    getClients: build.query({
      query: () => '/list-clients/',
      providesTags: ['Clients'],
    }),
    createClient: build.mutation({
      query: (newClient) => ({
        url: '/register-client/',
        method: 'POST',
        body: newClient,
      }),
      invalidatesTags: ['Clients'],
    }),
    getClientsByIds: build.query({
      query: (ids) => `/clients-list-by-id/?ids=${ids.join(',')}`,
      providesTags: (result, error, ids) =>
        ids ? [{ type: 'Clients', id: 'LIST' }] : [],
    }),
    activateClient: build.mutation({
      query: (clientId) => ({
        url: `/activate-client/${clientId}/`,
        method: 'PUT',
      }),
      invalidatesTags: ['Clients'],
    }),
    deactivateClient: build.mutation({
      query: (clientId) => ({
        url: `/deactivate-client/${clientId}/`,
        method: 'PUT',
      }),
      invalidatesTags: ['Clients'],
    }),
    deleteClient: build.mutation({
      query: (clientId) => ({
        url: `/register-client/${clientId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Clients'],
    }),
    createUncompleteClient: build.mutation({
      query: (newClient) => ({
        url: '/incompleted-client/',
        method: 'POST',
        body: newClient,
      }),
      invalidatesTags: ['Clients'],
    }),
    updateClient: build.mutation({
      query: ({ clientId, updatedClient }) => ({
        url: `/update-client/${clientId}/`,
        method: 'PUT',
        body: updatedClient,
      }),
      invalidatesTags: ['Clients'],
    }),
    getClientByIdDisplay: build.query({
      query: (clientId) => ({
        url: `/clients-list-by-id/${clientId}`,
        method: 'GET',
      }),
      providesTags: ['Clients'],
    }),
    getUncompleteClients: build.query({
      query: () => '/all-incomplete-clients/',
      method: 'GET',
      providesTags: ['Clients'],
    }),
    deleteUncompleteClient: build.mutation({
      query: (clientId) => ({
        url: `/delete-incomplete-client/${clientId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Clients'],
    }),
    getUncompleteClientById: build.query({
      query: (clientId) => ({
        url: `/incomplete-clients-list-by-id/${clientId}`,
        method: 'GET',
      }),
      providesTags: ['Clients'],
    }),
    updateUncompletedClient: build.mutation({
      query: ({ clientId, updatedClient }) => ({
        url: `/update-incompleted-client/${clientId}/`,
        method: 'PUT',
        body: updatedClient,
      }),
      invalidatesTags: ['Clients'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useCreateClientMutation,
  useGetClientsByIdsQuery,
  useActivateClientMutation,
  useDeactivateClientMutation,
  useDeleteClientMutation,
  useCreateUncompleteClientMutation,
  useUpdateClientMutation,
  useGetClientByIdDisplayQuery,
  useGetUncompleteClientsQuery,
  useDeleteUncompleteClientMutation,
  useGetUncompleteClientByIdQuery,
  useUpdateUncompletedClientMutation,
} = clientsApi;
