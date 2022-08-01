/**
 * API Request Constants
 */
export const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8000/api"
        : "https://bitcamp2022-api.vercel.app/api";


export const REQUEST_OPTIONS = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
};

/**
 * Map Constants
 */
export const MAPBOX_KEY =
    "pk.eyJ1IjoicGlsbGlvdXMiLCJhIjoiY2wxczBncmhuMXgyMDNldGNzNWYwODNscSJ9.s0SUe4XQt47TqXluA4O5kQ";
export const MAP_STYLE = "mapbox://styles/mapbox/satellite-v9";
export const MARKER_IMG =
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png";
export const INITIAL_ANIMAL_ONLOAD = "PLAINS ZEBRA";
// Map initial viewport settings
export const INITIAL_VIEW_STATE = {
    longitude: 24,
    latitude: -20,
    zoom: 0,
};
