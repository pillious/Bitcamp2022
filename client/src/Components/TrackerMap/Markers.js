import { memo, useContext } from "react";
import { Marker } from "react-map-gl";
import Pin from "./Pin";
import MapContext from "../../store/map-context";
import * as Utils from "../../utils/utils";
import PropTypes from "prop-types";

// Fallback sizing of bounding box when zooming in on marker.
const OFFSET = 0.0025;

const Markers = ({ markersObj, openPopup }) => {
    console.log("Markers rendered");

    const mapRef = useContext(MapContext);

    // eslint-disable-next-line no-unused-vars
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

    const markerElems = markersObj.markers.map((marker, idx) => (
        <Marker
            key={`${marker.animalId}_${idx}_marker`}
            longitude={marker.long}
            latitude={marker.lat}
            // onClick={(e) => zoomInOnMarker(e, markersObj.boundingBox)}
            onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                openPopup(marker.lat, marker.long, markersObj.desc);
            }}
        >
            <Pin color={Utils.buildHSLString(markersObj.color)} />
        </Marker>
    ));

    return <>{markerElems}</>;
};

Markers.propTypes = {
    markersObj: PropTypes.object.isRequired,
    openPopup: PropTypes.func.isRequired,
};

export default memo(Markers);
