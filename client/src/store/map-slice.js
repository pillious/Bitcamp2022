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

            console.log(payload);

            if (Array.isArray(payload)) {
                let markerColor = Utils.pastelHSLColor();

                const pts = payload.map((pt) =>
                    JSON.stringify({ ...pt, color: markerColor })
                );

                state.markers = pts;
            }
        },
    },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;
