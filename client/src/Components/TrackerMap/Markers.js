import { Fragment, memo } from "react";
import { Marker } from "react-map-gl";
import Pin from "./Pin";
import * as Utils from "../../utils/utils";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
const Markers = ({ markersObj, openPopup }) => {
    console.log("Markers rendered");

    const markerElems = markersObj.markers.map((marker, idx) => (
        <Fragment key={`f${idx}`}>
            <Marker
                key={`${marker.animalId}_${idx}_marker`}
                longitude={marker.long}
                latitude={marker.lat}
                onClick={(e) => {
                    // If we let the click event propagates to the map, it will immediately close the popup
                    // with `closeOnClick: true`
                    e.originalEvent.stopPropagation();
                    openPopup(marker.lat, marker.long, markersObj.desc);
                }}
            >
                <Pin color={Utils.buildHSLString(markersObj.color)} />
            </Marker>
        </Fragment>
    ));

    return <>{markerElems}</>;
};

// Simple props comparison.
// Checks if the animal associated with the markers changed.
// Also checks if function changed (although shouldn't ever change).
const propsAreEqual = (prevProps, nextProps) =>
    prevProps.openPopup === nextProps.openPopup &&
    prevProps.markersObj.desc.commonName ===
        nextProps.markersObj.desc.commonName;

Markers.propTypes = {
    markersObj: PropTypes.object.isRequired,
    openPopup: PropTypes.func.isRequired,
};

export default memo(Markers, propsAreEqual);
