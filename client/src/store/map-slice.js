import { createSlice } from "@reduxjs/toolkit";
import * as Utils from "../utils/utils";
import * as Constants from "../utils/constants";

const initialState = {
    viewState: Constants.INITIAL_VIEW_STATE,
    animalNames: [],
    markers: [],
    animalSearchTerm: Constants.INITIAL_ANIMAL_ONLOAD,
    isLoading: false,
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setMarkers(state, action) {
            const { payload } = action;

            if (payload) {
                const { markers, desc, doZoom, mapRef } = payload;

                let replacement = [];

                if (markers.length > 0) {
                    let markerColor = Utils.pastelHSLColor();

                    const boundingBox = Utils.buildBoundingBox(markers);
                    const vectors = Utils.buildVectors(markers);

                    const obj = {
                        markers: markers,
                        desc: desc,
                        vectors,
                        boundingBox,
                        color: markerColor,
                    };
                    replacement.push(JSON.stringify(obj));

                    if (doZoom) {
                        mapSlice.caseReducers.zoomToBoundingBox(state, {
                            payload: {
                                mapRef: mapRef,
                                boundingBox,
                            },
                        });
                    }
                }

                state.markers = replacement;
            } else {
                console.log(payload);
                console.error("setMarkers() -> payload is invalid.");
            }
        },
        setAnimalNames(state, action) {
            const { payload } = action;
            if (payload && Array.isArray(payload)) state.animalNames = payload;
            else {
                console.log("setAnimalNames() -> payload not an array");
            }
        },
        setAnimalSearchTerm(state, action) {
            const { payload } = action;
            if (payload) state.animalSearchTerm = payload;
        },
        setMapViewState(state, action) {
            state.viewState = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        zoomToBoundingBox(state, action) {
            const {
                mapRef,
                boundingBox,
                padding = 40,
                duration = 3000,
            } = action.payload;

            mapRef.current.fitBounds(boundingBox, {
                padding,
                duration,
            });
        },
    },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
