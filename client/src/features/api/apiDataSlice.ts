import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiDataSlice = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => ({
        url: "/data",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDataQuery } = apiDataSlice;
