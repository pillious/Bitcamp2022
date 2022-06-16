import { Fragment, memo } from "react";
import { Marker } from "react-map-gl";
import Pin from "./Pin";
import * as Utils from "../../utils/utils";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
const Markers = ({ markersObj, openPopup }) => {
    // console.log("Markers rendered");

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
                    openPopup(marker.lat, marker.long, markersObj.desc, marker);
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
    markersObj: PropTypes.shape({
        boundingBox: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
            .isRequired,
        color: PropTypes.arrayOf(PropTypes.number).isRequired,
        desc: PropTypes.shape({
            commonName: PropTypes.string.isRequired,
            scientificName: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            citations: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        markers: PropTypes.arrayOf(
            PropTypes.shape({
                animalId: PropTypes.string.isRequired,
                animalName: PropTypes.string.isRequired,
                datetime: PropTypes.string.isRequired,
                lat: PropTypes.number.isRequired,
                long: PropTypes.number.isRequired,
            })
        ).isRequired,
        vectors: PropTypes.arrayOf(
            PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        ),
    }).isRequired,
    openPopup: PropTypes.func.isRequired,
};

export default memo(Markers, propsAreEqual);
