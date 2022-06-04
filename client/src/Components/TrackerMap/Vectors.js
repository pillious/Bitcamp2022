import { Source, Layer } from "react-map-gl";
import * as Utils from "../../utils/utils";
import PropTypes from "prop-types";
import { useContext } from "react";
import MapContext from "../../store/map-context";


const Vectors = ({ markersObj }) => {
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

    const {current: mapRef} = useContext(MapContext);

    console.log(mapRef);    
    // const map = mapRef?.getMap();
    // map?.removeLayer("line_layer");
    // map?.removeLayer("source");

    return (
        <Source
            // id={`${markersObj.markers[0].animalId}_source`}
            id={"source"}
            type="geojson"
            data={featureCollection}
        >
            <Layer
                // id={`$${markersObj.markers[0].animalId}_line_layer`}
                id={"line_layer"}
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

export default Vectors;
