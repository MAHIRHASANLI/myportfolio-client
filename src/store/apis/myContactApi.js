import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "./baseURL";

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (...args) => {
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getContactDAta: builder.query({
            providesTags: ["contactApi"],
            query: () => ({
                url: "/mycontact",
                method: "GET"
            })
        }),
        postContactData: builder.mutation({
            invalidatesTags: () => ([{ type: "contactApi" }]),
            query: (payload) => ({
                url: "/mycontact",
                method: "POST",
                body: payload
            })
        }),
        putContactData: builder.mutation({
            invalidatesTags: () => ([{ type: "contactApi" }]),
            query: ({ id, values }) => ({
                url: `/mycontact/${id}`,
                method: "PUT",
                body: values
            })
        }),
        deleteContactData: builder.query({
            invalidatesTags: () => ([{ type: "contactApi" }]),
            query: (id) => ({
                url: `/mycontact/${id}`,
                method: "DELETE",
            })
        })
    })
});

export const { useGetContactDAtaQuery, usePostContactDataMutation, usePutContactDataMutation, useDeleteContactDataQuery } = contactApi;
