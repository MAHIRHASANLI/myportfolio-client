import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from './baseURL';



export const homeHeroApi = createApi({
    reducerPath: "homeHeroApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL, fetchFn: async (...args) => {
            
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getHeroData: builder.query({
            providesTags: ["heroData"],
            query: () => (
                {
                    url: '/home',
                    method: "GET"
                }
            ),
        }),
        updateHeroData: builder.mutation({
            invalidatesTags: () => (
                [{ type: "heroData" }]
            ),
            query: ({ id, values }) => {
                return {
                    url: `/home/${id}`,
                    method: "PUT",
                    body: values
                }
            }
        })
    })
})

export const { useGetHeroDataQuery, useUpdateHeroDataMutation } = homeHeroApi;
