import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as Constants from "../utils/constants";

export const mapApi = createApi({
    reducerPath: "mapApi",
    keepUnusedDataFor: 300,
    baseQuery: fetchBaseQuery({ baseUrl: Constants.API_BASE_URL }),
    endpoints: (builder) => ({
        getAllDistinctNames: builder.query({
            query: () => {
                return {
                    url: "track/getAllDistinctNames",
                    method: "POST",
                };
            },
        }),
        getAnimalMarkersByName: builder.query({
            query: (name) => {
                return {
                    url: `track/getAnimalByName/${name}`,
                    method: "POST",
                };
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

// Endpoints must be exported as "use____Query" for hooks to be generated.
export const { useGetAllDistinctNamesQuery, useGetAnimalMarkersByNameQuery } =
    mapApi;
