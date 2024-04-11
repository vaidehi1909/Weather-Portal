import { createSlice } from "@reduxjs/toolkit";
import { cityApi, CityRecord } from "../services/cityService";

interface cityState {
  list: CityRecord[];
  error: boolean;
  loading: boolean;
  total_count: number;
}

const initialState: cityState = {
  list: [],
  loading: false,
  error: false,
  total_count: 0
}

const slice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cityApi.endpoints.fetchCities.matchPending, (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        cityApi.endpoints.fetchCities.matchFulfilled,
        (state, { payload }) => {
          state.list = payload.results;
          state.total_count = payload.total_count;
          state.loading = false;
        }
      )
      .addMatcher(cityApi.endpoints.fetchCities.matchRejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default slice.reducer;

