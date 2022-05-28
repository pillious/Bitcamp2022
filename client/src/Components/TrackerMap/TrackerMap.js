import { Fragment, useRef } from "react";
import { useSelector } from "react-redux";
// import DeckGL from "@deck.gl/react";
// import classes from "./TrackerMap.module.css";
import Description from "./Description";
import Map, { Marker } from "react-map-gl";
import * as Constants from "../../utils/constants";
import * as Utils from "../../utils/utils";
import Pin from "./Pin";

// Viewport settings
// const INITIAL_VIEW_STATE = {
//     longitude: 23.81669,
//     latitude: -19.7853,
//     zoom: 1,
// };

const TrackerMap = () => {
    const mapRef = useRef();

    const markers = useSelector((state) => state.map.markers);

    // const clickHandler = (event) => {
    //     event.originalEvent.stopPropagation();
    //     console.log(event);
    // }

    const markerElems = markers.map((m, idx) => {
        m = JSON.parse(m);
        return (
            <Marker
                key={`${m.animalId}-${idx}`}
                longitude={m.long}
                latitude={m.lat}
                onClick={() => {
                    console.log("clicked");
                }}
            >
                <Pin color={Utils.buildHSLString(m.color)} />
            </Marker>
        );
    });

    // TEMP
    const clickme = () => {
        console.log(mapRef);
    };

    console.log(`${markers.length} markers created.`);

    return (
        <Fragment>
            {/* TEMP */}
            <button onClick={clickme}>Click me.</button>

            {/* <div className={classes.map_wrapper}>
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={{ touchRotate: false }}
                    width="100%"
                    height="500px"
                    ref={deckRef}
                >
                    <Map
                        mapStyle="mapbox://styles/mapbox/satellite-v9"
                        mapboxAccessToken={Constants.MAPBOX_KEY}
                        ref={mapRef}
                    >
                        {markerElems}
                    </Map>
                </DeckGL>
            </div> */}

            <Map
                initialViewState={{
                    latitude: 40,
                    longitude: -100,
                    zoom: 3.5,
                    bearing: 0,
                    pitch: 0,
                }}
                style={{width: "100%", height: "500px"}}
                mapStyle="mapbox://styles/mapbox/satellite-v9"
                mapboxAccessToken={Constants.MAPBOX_KEY}
                ref={mapRef}
            >
                {markerElems}
            </Map>

            <Description />
        </Fragment>
    );
};

export default TrackerMap;
