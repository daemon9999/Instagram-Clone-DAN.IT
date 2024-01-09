import { apiSlice } from "../api-slice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/signIn",
                method: "POST",
                body: {...credentials}
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: "/signUp",
                method: "POST",
                body: {...credentials}
            })
        }),
        getProfile: builder.query({
            query: () => '/profile',
            keepUnusedDataFor: 10
        }),
       
    })
})

export const {useLoginMutation, useRegisterMutation, useGetProfileQuery} = authApiSlice