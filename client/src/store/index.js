import { configureStore } from "@reduxjs/toolkit";
import { mapApi } from "../services/mapApi";
import mapReducer from "./map-slice";

const store = configureStore({
    reducer: { map: mapReducer, [mapApi.reducerPath]: mapApi.reducer },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mapApi.middleware),
});

export default store;
