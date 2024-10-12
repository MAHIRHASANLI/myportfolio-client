import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "./baseURL";

const pouse = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

export const messageApi = createApi({
    reducerPath: "messageApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (...args) => {
            await pouse(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getMessageData: builder.query({
            providesTags: ["messageApi"],
            query: () => ({
                url: "/message",
                method: "GET"
            })
        }),
        postMessageData: builder.mutation({
            invalidatesTags: () => ([{ type: "messageApi" }]),
            query: (payload) => ({
                url: "/message",
                method: "POST",
                body: payload
            })
        }),
        deleteMessageData: builder.mutation({
            invalidatesTags: () => ([{ type: "messageApi" }]),
            query: (id) => {
                return{
                    url: `/message/${id}`,
                    method: "DELETE"
                }
            }
        })
    })
});

export const { useGetMessageDataQuery, usePostMessageDataMutation, useDeleteMessageDataMutation } = messageApi;