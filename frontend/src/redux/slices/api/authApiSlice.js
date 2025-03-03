import { apiSlice } from "../apiSlice"

const AUTH_URL = "/auth"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }]
        }),

        logout: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/logout`,
                method: "POST",
                credentials: "include",
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation }=authApiSlice;