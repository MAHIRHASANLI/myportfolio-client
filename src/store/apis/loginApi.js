import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "./baseURL";



export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (...args) => {
         
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            providesTags: ["loginApi"],
            query: () => ({
                url: "/login",
                method: "GET"
            })
        }),
        signIN: builder.mutation({
            invalidatesTags: () => ([{ type: "loginApi" }]),
            query: (payload) => ({
                url: "/adminlogin",
                method: "POST",
                body: payload
            })
        }),
    })
});

export const {useGetUsersQuery,useSignINMutation } = loginApi;
