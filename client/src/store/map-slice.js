import { createSlice } from "@reduxjs/toolkit";
import * as Utils from "../utils/utils";
import * as Constants from "../utils/constants";

const initialState = {
    viewState: Constants.INITIAL_VIEW_STATE,
    animalNames: [],
    markers: [],
    animalSearchTerm: Constants.INITIAL_ANIMAL_ONLOAD,
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setMarkers(state, action) {
            const { payload } = action;

            if (payload) {
                let replacement = [];

                if (payload.markers.length > 0) {
                    let markerColor = Utils.pastelHSLColor();

                    const boundingBox = Utils.buildBoundingBox(payload.markers);
                    const vectors = Utils.buildVectors(payload.markers);

                    const obj = {
                        markers: payload.markers,
                        desc: payload.desc,
                        vectors,
                        boundingBox,
                        color: markerColor,
                    };
                    replacement.push(JSON.stringify(obj));
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
    },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
