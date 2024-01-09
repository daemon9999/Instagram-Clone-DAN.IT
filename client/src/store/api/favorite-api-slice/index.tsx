import { apiSlice } from "../api-slice";

export const favoriteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    favoritePost: builder.mutation<PostLikeItem, Partial<PostLikeItem>>({
      query: (credentials) => ({
        url: "/favorite",
        method: "POST",
        body: { ...credentials },

      }),
      invalidatesTags: ['FavoritePosts'] as any
    }),

    unfavoritePost: builder.mutation<PostLikeItem, Partial<PostLikeItem>>({
        query: (credentials) => ({
          url: "/unfavorite",
          method: "POST",
          body: { ...credentials },
  
        }),
        invalidatesTags: ['FavoritePosts'] as any
      }),

    getFavoritePosts: builder.query({
        query: () => "/favorites",
        keepUnusedDataFor: 10,
        providesTags: [{type: 'FavoritePosts'}] as any
    })
    
  }),
});

export const { useFavoritePostMutation, useUnfavoritePostMutation, useGetFavoritePostsQuery } =
favoriteApiSlice;
