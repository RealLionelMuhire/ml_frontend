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

export const userProfileApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'userProfileApi',
  endpoints: (build) => ({
    getUserProfile: build.query({
      query: () => '/user-profile/',
      providesTags: ['UserProfile'],
    }),
    updateUserProfile: build.mutation({
      query: (updatedProfile) => ({
        url: '/update-user-profile/',
        method: 'PUT',
        body: updatedProfile,
      }),
      invalidatesTags: ['UserProfile'],
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = userProfileApi;
