import { Fragment, useEffect, useState, useRef } from "react";
import DeckGL from "@deck.gl/react";
import Map, { Marker } from "react-map-gl";
import classes from "./TrackerMap.module.css";
import * as Constants from "../../utils/constants";
import * as Utils from "../../utils/utils";
import Description from "./Description";
import Pin from "./Pin";

const key = Constants.MAPBOX_KEY;

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 23.81669,
    latitude: -19.7853,
    zoom: 1,
};

const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
};

const TrackerMap = () => {
    const mapRef = useRef();
    const deckRef = useRef();
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const createLayer = async () => {
            let allAnimals = await fetch(
                `${Constants.API_BASE_URL}/track/getAllDistinctNames`,
                requestOptions
            );
            allAnimals = await allAnimals.json();

            let pins = [];

            for (const animal of allAnimals) {
                // TODO: reduce number of API calls.
                const resp = await fetch(
                    `${Constants.API_BASE_URL}/track/getAnimalByName/${animal}`,
                    requestOptions
                ).catch((err) => console.error(err));

                if (resp.ok) {
                    let markerColor = Utils.pastelHSLColor();

                    let pts = await resp.json();
                    pts = pts.map((a, idx) => (
                        <Marker
                            key={`${a.animalId}-${idx}`}
                            longitude={a.long}
                            latitude={a.lat}
                        >
                            {/* Marker Icon */}
                            <Pin color={markerColor} />
                        </Marker>
                    ));
                    pins = [...pins, ...pts];

                    console.log(pts);
                } else {
                    console.err(
                        `Something went wrong while fetching data for ${animal}`
                    );
                }
            }

            setMarkers(pins);
        };

        createLayer().catch((err) => console.error(err));
    }, []);

    // TEMP
    const clickHandler = () => {
        console.log(mapRef);
        console.log(deckRef);
    };

    return (
        <Fragment>
            {/* TEMP */}
            <button onClick={clickHandler}>Click me.</button>

            <div className={classes.map_wrapper}>
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={{ touchRotate: false }}
                    width="100%"
                    height="500px"
                    ref={deckRef}
                >
                    <Map
                        mapStyle="mapbox://styles/mapbox/satellite-v9"
                        mapboxAccessToken={key}
                        ref={mapRef}
                    >
                        {markers}
                    </Map>
                </DeckGL>
            </div>

            <Description />
        </Fragment>
    );
};

export default TrackerMap;
