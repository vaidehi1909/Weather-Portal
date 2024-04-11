import { configureStore } from "@reduxjs/toolkit";
import { cityApi } from "./services/cityService";
import { weatherApi } from "./services/weatherService";
import citySlice from "./reducers/citySlice";

export const createStore = (options: {}) =>
  configureStore({
    reducer: {
      [cityApi.reducerPath]: cityApi.reducer,
      [weatherApi.reducerPath]: weatherApi.reducer,
      city: citySlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(cityApi.middleware, weatherApi.middleware),
    ...options,
  });

export const store = createStore({});
