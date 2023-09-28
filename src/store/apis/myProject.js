import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "./baseURL";

const pouse = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}


export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (...args) => {
            await pouse(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getProjectData: builder.query({
            providesTags: ["projectApi"],
            query: () => ({
                url: "/project",
                method: "GET"
            })
        }),
        postProjectData: builder.mutation({
            invalidatesTags: () => ([{ type: "projectApi" }]),
            query: (payload) => ({
                url: "/project",
                method: "POST",
                body: payload
            })
        }),
        updateProjectData: builder.mutation({
            invalidatesTags: () => ([{ type: "projectApi" }]),
            query: ({ id, values }) => ({
                url: `/project/${id}`,
                method: "PUT",
                body: values
            })
        }),
        deleteProjectData: builder.mutation({
            invalidatesTags: () => ([{ type: "projectApi" }]),
            query: (id) => ({
                url: `/project/${id}`,
                method: "DELETE"
            })
        }),
    })
});

export const { useGetProjectDataQuery, usePostProjectDataMutation, useUpdateProjectDataMutation, useDeleteProjectDataMutation } = projectApi;