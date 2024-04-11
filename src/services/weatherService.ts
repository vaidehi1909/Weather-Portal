import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../helpers/constants";

export type Units  = "metric" | "imperial" | "standard";

export interface QueryParams {
  lat: number;
  lon: number;
  units: Units;
  exclude?: string;
}

export interface HourlyForcast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  weather: { main: string; description: string; icon: string }[];
  clouds: { all: number };
  wind: { speed: number; deg: number, gust: number };
  visibility: number;
  pop: number;
  dt_txt: string;
}

export interface ApiResponse {
  city: {
    name: string;
    country: string;
    sunset: number;
    sunrise: number;
  };
  list: HourlyForcast[];
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.openweathermap.org/data/2.5/` }),
  tagTypes: ["weather"],
  endpoints: (builder) => ({
    fetchForecast: builder.query<ApiResponse, QueryParams>({
      query: (params: QueryParams) => {
        const { lat, lon, units, exclude  } = params
        let endpoint = `forecast?appid=${API_KEY}&lat=${lat}&lon=${lon}&units=${units}`
        if (exclude) endpoint += `&exclude=${exclude}`
        return endpoint
      },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: (params) => {
        const{ endpointName, queryArgs } = params
        return `${endpointName}?${JSON.stringify(queryArgs)}`;
      },
      // providesTags: (response: ApiResponse | undefined) =>
      //   (response && response.results)
      //     ? response.results.map(({ geoname_id }) => ({ type: "weather", geoname_id }))
      //     : ["weather"],
    })
  }),
});

export const {
  useFetchForecastQuery,
} = weatherApi;
