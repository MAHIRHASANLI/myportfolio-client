import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "./baseURL";

const pouse = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (...args) => {
            await pouse(2000);
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