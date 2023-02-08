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
      invalidatesTags: (result, error, arg) =>
        result.ERROR || error ? [] : ["Scheduled"],
      query: (data: any) => ({
        url: "/scheduled",
        method: "POST",
        body: data,
      }),
    }),
    deleteSchedule: builder.mutation({
      invalidatesTags: (result, error, arg) =>
        result.ERROR || error ? [] : ["Scheduled"],
      query: (id: string) => ({
        url: `/scheduled/${id}`,
        method: "DELETE",
      }),
    }),
    getAllEmployees: builder.query({
      query: () => ({
        url: "/employee",
        method: "GET",
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
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useDeleteScheduleMutation,
} = apiDataSlice;
