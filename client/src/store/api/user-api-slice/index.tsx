import { apiSlice } from "../api-slice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersNotFollowed: builder.query({
      query: () => "/usersNotFollowed",
      keepUnusedDataFor: 10,
      providesTags: ["Users"] as any,
    }),
    followUser: builder.mutation({
      query: (credentials) => ({
        url: "/follow",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Users"] as any,
    }),
    unfollowUser: builder.mutation({
      query: (credentials) => ({
        url: "/unfollow",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Users"] as any,
    }),
    getUserProfile: builder.query({
      query: ({ userId }) => ({
        url: `/profile?id=${userId}`,
        method: "GET",
      }),
      providesTags: ["Users"] as any,
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/update",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    searchUsers: builder.query({
      query: (username) => `/search?username=${username}`,
    }),
  }),
});

export const {
  useGetUsersNotFollowedQuery,
  useFollowUserMutation,
  useGetUserProfileQuery,
  useUnfollowUserMutation,
  useUpdateProfileMutation,
  useSearchUsersQuery
} = userApiSlice;
