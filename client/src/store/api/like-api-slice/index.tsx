import { apiSlice } from "../api-slice";

export const likeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<PostLikeItem, Partial<PostLikeItem>>({
      query: (credentials) => ({
        url: "/like",
        method: "POST",
        body: { ...credentials },

      }),
      invalidatesTags: ['LikePosts'] as any
    }),

    unlikePost: builder.mutation<PostLikeItem, Partial<PostLikeItem>>({
        query: (credentials) => ({
          url: "/unlike",
          method: "POST",
          body: { ...credentials },
  
        }),
        invalidatesTags: ['LikePosts'] as any
      }),
    
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } =
  likeApiSlice;
