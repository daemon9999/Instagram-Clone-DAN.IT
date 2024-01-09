import { apiSlice } from "../api-slice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (credentials) => ({
        url: "/post",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    deletePost: builder.mutation({
      query: (credentials) => ({
        url: "/deletePost",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getFollowedUserPosts: builder.query({
      query: () => "/posts",
      keepUnusedDataFor: 10,
      providesTags:  [{type: 'LikePosts'}, {type: 'Users'}, {type: 'FavoritePosts'}] as any
    }),
    getPostById: builder.query({
      query: ({id}) => `/post?id=${id}`,
      keepUnusedDataFor: 10,
      providesTags:  [{type: 'LikePosts'}, {type: 'Users'}, {type: 'FavoritePosts'}] as any
    }),
  }),
});

export const { useCreatePostMutation, useGetFollowedUserPostsQuery, useGetPostByIdQuery, useDeletePostMutation } =
  postApiSlice;
