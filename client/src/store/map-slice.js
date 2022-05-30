import { createSlice } from "@reduxjs/toolkit";
import * as Utils from "../utils/utils";

const initialState = {
    markers: [],
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        replaceMarkers(state, action) {
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
                console.error("replaceMarkers() -> payload not an array.");
            }
        },
    },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
