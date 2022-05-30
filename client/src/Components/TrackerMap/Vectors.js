import { useSelector } from "react-redux";
import { Source, Layer } from "react-map-gl";
import * as Utils from "../../utils/utils";

const Vectors = () => {
    const markersArr = useSelector((state) => state.map.markers);

    // https://docs.mapbox.com/mapbox-gl-js/example/multiple-geometries/
    let featureCollection = {
        type: "FeatureCollection",
        features: [],
    };
    let color = "white";

    if (markersArr?.length > 0) {
        let vectors = markersArr
            .map((strObj) => JSON.parse(strObj).vectors)
            .flat();
        featureCollection.features = vectors.map((vector) => {
            return {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: vector,
                },
            };
        });

        let temp = JSON.parse(markersArr[0]).color;
        color = Utils.buildHSLString([temp[0], 100, 50]);
    }

    console.log(featureCollection);

    return (
        <Source id="vectors" type="geojson" data={featureCollection}>
            {/* <Layer {...LINELAYER_STYLES} /> */}
            <Layer
                id="vectors"
                type="line"
                layout={{ "line-join": "round", "line-cap": "round" }}
                paint={{ "line-color": color, "line-width": 1 }}
            />
        </Source>
    );
};

export default Vectors;
