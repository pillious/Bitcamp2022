import { memo } from "react";
import { Source, Layer } from "react-map-gl";
import * as Utils from "../../utils/utils";
import PropTypes from "prop-types";

const Vectors = ({ markersObj }) => {
    console.log("Vectors rendered.");

    // https://docs.mapbox.com/mapbox-gl-js/example/multiple-geometries/
    let featureCollection = {
        type: "FeatureCollection",
        features: [],
    };

    featureCollection.features = markersObj.vectors.map((vector) => {
        return {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: vector,
            },
        };
    });

    const color = Utils.buildHSLString([markersObj.color[0], 100, 50]);

    return (
        <Source id="source" type="geojson" data={featureCollection}>
            <Layer
                id="line_layer"
                type="line"
                layout={{ "line-join": "round", "line-cap": "round" }}
                paint={{ "line-color": color, "line-width": 1 }}
            />
        </Source>
    );
};

Vectors.propTypes = {
    markersObj: PropTypes.object.isRequired,
};

// Simple props comparison.
// Checks if the animal associated with the vectors changed.
const propsAreEqual = (prevProps, nextProps) =>
    prevProps.markersObj.desc.commonName ===
    nextProps.markersObj.desc.commonName;

export default memo(Vectors, propsAreEqual);
