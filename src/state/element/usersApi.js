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

export const usersApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'usersApi',
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => '/users/',
      providesTags: ['Team'],
    }),
    createUser: build.mutation({
      query: (newUser) => ({
        url: '/register/',
        method: 'POST',
        body: newUser,
      }),
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      invalidatesTags: ['Team'],
    }),
    activateUser: build.mutation({
      query: (userId) => ({
        url: `/activate-user/${userId}/`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),
    deactivateUser: build.mutation({
      query: (userId) => ({
        url: `/update_user/${userId}/`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),
    getUserSelfData: build.query({
      query: () => '/user-self-data/',
      providesTags: ['UserProfile'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useGetUserSelfDataQuery,
} = usersApi;
