import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import Map, { Marker, NavigationControl } from "react-map-gl";
import * as Constants from "../../utils/constants";
import * as Utils from "../../utils/utils";
import Description from "./Description";
import Pin from "./Pin";
import MapContext from "../../store/map-context";
import Vectors from "./Vectors";

// Map initial viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 24,
    latitude: -20,
    zoom: 0,
};

// Fallback sizing of bounding box when zooming in on marker.
const OFFSET = 0.0025;

const TrackerMap = () => {
    const mapRef = useContext(MapContext);
    const markersArr = useSelector((state) => state.map.markers);

    const zoomInOnMarker = (event, boundingBox) => {
        let bounds;

        if (boundingBox) bounds = boundingBox;
        else {
            const longlat = event.target.getLngLat();
            bounds = [
                [longlat.lng - OFFSET, longlat.lat - OFFSET], // [minlng, minlat]
                [longlat.lng + OFFSET, longlat.lat + OFFSET], // [maxlng, maxlat]
            ];
        }
        mapRef.current.fitBounds(bounds, { padding: 40, duration: 3000 });
    };

    const markerElems = () => {
        let markers = [];
        markersArr.forEach((strObj) => {
            let obj = JSON.parse(strObj);
            markers = markers.concat(
                obj.markers.map((marker, idx) => (
                    <Marker
                        key={`${marker.animalId}-${idx}`}
                        longitude={marker.long}
                        latitude={marker.lat}
                        onClick={(e) => zoomInOnMarker(e, obj.boundingBox)}
                    >
                        <Pin color={Utils.buildHSLString(obj.color)} />
                    </Marker>
                ))
            );
        });

        return markers;
    };

    console.log(markerElems());

    // TEMP
    const clickme = () => {
        console.log(mapRef);
    };

    console.log("Map component rendered");

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
                {markerElems()}

                <Vectors />
                <NavigationControl />
            </Map>

            <Description />
        </Fragment>
    );
};

export default TrackerMap;
