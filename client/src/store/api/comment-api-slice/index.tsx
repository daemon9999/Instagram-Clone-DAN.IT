import { apiSlice } from "../api-slice";


export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (credentials) => ({
                url: '/comment',
                method: 'POST',
                body: {...credentials}
            }),
            invalidatesTags: ['PostComments'] as any
        }),
        getPostComments: builder.query({
            query: ({postId}) => ({
                url: `/comments?postId=${postId}`,
                method: "GET",
              
            }),
            providesTags: [{type: 'PostComments'}] as any
        })
    })
})

export const {useAddCommentMutation, useGetPostCommentsQuery} = commentApiSlice