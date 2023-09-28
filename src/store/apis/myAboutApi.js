import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "./baseURL";

const pouse = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

export const myAboutApi = createApi({
    reducerPath: "myAboutApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: async (...args) => {
            await pouse(1000);
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getMyAboutData: builder.query({
            providesTags: ["myAboutApi"],
            query: () => ({
                url: "/about",
                method: "GET"
            })
        }),
        updateMyAboutData: builder.mutation({
            invalidatesTags:()=>(
                [{type:"myAboutApi"}]
            ),
            query: ({ id, values }) => ({
                url: `/about/${id}`,
                method:"PUT",
                body:values
            })
        })
    })
});

export const { useGetMyAboutDataQuery, useUpdateMyAboutDataMutation } = myAboutApi;