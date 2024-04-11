import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ApiResponse {
  total_count: number,
  results: CityRecord[],
}

interface Coordinates {
  lat: number;
  lon: number
}

export interface CityRecord {
  geoname_id: string;
  name: string;
  label_en: string; 
  population: number; 
  timezone: string;
  coordinates: Coordinates
}

export interface QueryParams {
  page: number;
  limit?: number;
  select?: string;
  where?: string;
  order_by?: string;
}

type queryParamType = "page" | "limit" | "select" | "where" | "order_by"
const trackParams: queryParamType[] = ['page', 'limit', 'select', 'where', 'order_by'];


export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://documentation-resources.opendatasoft.com/api/explore/v2.1/" }),
  tagTypes: ["Cities"],
  endpoints: (builder) => ({
    fetchCities: builder.query({
      query: (params: QueryParams) => {
        const { page, limit=8, select, where, order_by } = params
        let endpoint = `catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&offset=${page*limit}`
        if (select) endpoint += `&select=${select}`
        if (where) endpoint += `&where=${where}`
        if (order_by) endpoint += `&order_by=${order_by}`
        return endpoint

      },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: (params) => {
        const{ endpointName, queryArgs } = params
        const { page, limit, ...rest } = queryArgs
        return `${endpointName}?${JSON.stringify(rest)}`;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache: ApiResponse, newItems: ApiResponse) => {
        console.log(currentCache, '---currentCache', newItems, '---newItems')
        currentCache.results.push(...newItems.results);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }: { currentArg: QueryParams | undefined, previousArg: QueryParams | undefined }) {
        return trackParams.some((p: queryParamType) => currentArg?.[p] !== previousArg?.[p])
      },

      // providesTags: (response: ApiResponse | undefined) =>
      //   (response && response.results)
      //     ? response.results.map(({ geoname_id }) => ({ type: "Cities", geoname_id }))
      //     : ["Cities"],
    })
  }),
});

export const {
  useFetchCitiesQuery,
} = cityApi;
