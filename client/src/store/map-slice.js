import { createSlice } from "@reduxjs/toolkit";
import * as Utils from "../utils/utils";
import * as Constants from "../utils/constants";

const initialState = {
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

            if (payload && Array.isArray(payload)) {
                let replacement = [];

                if (payload.length > 0) {
                    let markerColor = Utils.pastelHSLColor();

                    const boundingBox = Utils.buildBoundingBox(payload);
                    const vectors = Utils.buildVectors(payload);

                    const obj = {
                        markers: payload,
                        vectors,
                        boundingBox,
                        color: markerColor,
                    };
                    replacement.push(JSON.stringify(obj));
                }

                state.markers = replacement;
            } else {
                console.error("setMarkers() -> payload not an array.");
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
    },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
