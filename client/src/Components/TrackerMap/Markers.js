import { useContext } from "react";
import { Marker } from "react-map-gl";
import Pin from "./Pin";
import MapContext from "../../store/map-context";
import * as Utils from "../../utils/utils";
import PropTypes from "prop-types";

// Fallback sizing of bounding box when zooming in on marker.
const OFFSET = 0.0025;

const Markers = ({ markersObj }) => {
    const mapRef = useContext(MapContext);

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
            onClick={(e) => zoomInOnMarker(e, markersObj.boundingBox)}
        >
            <Pin
                color={Utils.buildHSLString(markersObj.color)}
            />
        </Marker>
    ));

    return <>{markerElems}</>;
};

Markers.propTypes = {
    markersObj: PropTypes.object.isRequired,
};

export default Markers;
