import { mapActions } from "./map-slice";
import * as Constants from "../utils/constants";
import * as Utils from "../utils/utils";

/**
 * Action Creators
 */

export const fetchMarkers = () => {
    return async (dispatch) => {
        let allAnimals = await fetch(
            `${Constants.API_BASE_URL}/track/getAllDistinctNames`,
            Constants.REQUEST_OPTIONS
        );
        allAnimals = await allAnimals.json();

        let pins = [];

        for (const animal of allAnimals) {
            // TODO: reduce number of API calls.
            const resp = await fetch(
                `${Constants.API_BASE_URL}/track/getAnimalByName/${animal}`,
                Constants.REQUEST_OPTIONS
            ).catch((err) => console.error(err));

            if (resp.ok) {
                let markerColor = Utils.pastelHSLColor();

                let pts = await resp.json();

                pts = pts.map((pt) => {
                    pt.color = markerColor;
                    return JSON.stringify(pt);
                });

                pins = [...pins, ...pts];
            } else {
                console.err(
                    `Something went wrong while fetching data for ${animal}`
                );
            }
        }

        if (pins && pins.length > 0) {
            dispatch(mapActions.replaceMarkers(pins));
        }
    };
};
