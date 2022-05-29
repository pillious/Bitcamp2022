import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import Map, { Marker, NavigationControl } from "react-map-gl";
import * as Constants from "../../utils/constants";
import * as Utils from "../../utils/utils";
import Description from "./Description";
import Pin from "./Pin";
import MapContext from "../../store/map-context";

// Map initial viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 24,
    latitude: -20,
    zoom: 0,
};

// What to resize the map to when a amarker is clicked.
const OFFSET = 0.0025;

const TrackerMap = () => {
    const mapRef = useContext(MapContext);

    const markers = useSelector((state) => state.map.markers);

    const clickHandler = (event) => {
        const longlat = event.target.getLngLat();

        const bounds = [
            [longlat.lng - OFFSET, longlat.lat - OFFSET], // [minlng, minlat]
            [longlat.lng + OFFSET, longlat.lat + OFFSET], // [maxlng, maxlat]
        ];

        mapRef.current.fitBounds(bounds, { padding: 40, duration: 3000 });
    };

    const markerElems = markers.map((m, idx) => {
        m = JSON.parse(m);
        return (
            <Marker
                key={`${m.animalId}-${idx}`}
                longitude={m.long}
                latitude={m.lat}
                onClick={clickHandler}
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

            <Map
                initialViewState={INITIAL_VIEW_STATE}
                dragRotate={false}
                touchPitch={false}
                // Currently no way to only disable rotate.
                // touchZoomRotate={false}
                style={{ width: "100%", height: "500px" }}
                mapStyle={Constants.MAP_STYLE}
                mapboxAccessToken={Constants.MAPBOX_KEY}
                ref={mapRef}
            >
                {markerElems}

                <NavigationControl />
            </Map>

            <Description />
        </Fragment>
    );
};

export default TrackerMap;
