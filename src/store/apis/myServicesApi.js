import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "./baseURL";

export const servicesApi = createApi({
    reducerPath: "servicesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (...args) => {
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getServicesData: builder.query({
            providesTags: ["servicesApis"],
            query: () => (
                {
                    url: "/services",
                    method: "GET"
                }
            )
        }),
        postServicesData: builder.mutation({
            invalidatesTags: () => (
                [{ type: "servicesApis" }]
            ),
            query: (upload) => (
                {
                    url: "/services",
                    method: "POST",
                    body: upload
                }
            )
        }),
        updateServicesData: builder.mutation({
            invalidatesTags: () => (
                [{ type: "servicesApis" }]
            ),
            query: ({ id, values }) => ({
                url: `/services/${id}`,
                method: "PUT",
                body: values
            })
        }),
        deleteServicesData: builder.mutation({
            invalidatesTags: () => (
                [{ type: "servicesApis" }]
            ),
            query: (id) => ({
                url: `/services/${id}`,
                method: "DELETE"
            })
        })
    })
});



export const { useGetServicesDataQuery, usePostServicesDataMutation, useUpdateServicesDataMutation, useDeleteServicesDataMutation } = servicesApi;
