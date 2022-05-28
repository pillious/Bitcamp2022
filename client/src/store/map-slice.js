import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mapInstance: null,
    markers: [],
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        replaceMarkers(state, action) {
            state.markers = action.payload;
        }
    },
});

export const mapActions = mapSlice.actions;
export default mapSlice.reducer;