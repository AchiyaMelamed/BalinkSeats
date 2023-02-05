import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiDataSlice = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Scheduled"],
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => ({
        url: "/data",
        method: "GET",
      }),
    }),
    getScheduled: builder.query({
      providesTags: ["Scheduled"],
      query: () => ({
        url: "/scheduled",
        method: "GET",
      }),
    }),
    scheduleSeat: builder.mutation({
      invalidatesTags: ["Scheduled"],
      query: (data: any) => ({
        url: "/scheduled",
        method: "POST",
        body: data,
      }),
    }),
    getEmployeeById: builder.query({
      query: (id: string) => ({
        url: `/employee/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDataQuery,
  useGetScheduledQuery,
  useScheduleSeatMutation,
  useGetEmployeeByIdQuery,
} = apiDataSlice;
