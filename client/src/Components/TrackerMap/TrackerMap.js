import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import Map, { NavigationControl } from "react-map-gl";
import MapContext from "../../store/map-context";
import * as Constants from "../../utils/constants";
import Description from "./Description";
import Vectors from "./Vectors";
import Markers from "./Markers";

// Map initial viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 24,
    latitude: -20,
    zoom: 0,
};

const TrackerMap = () => {
    const mapRef = useContext(MapContext);

    const markersArr = useSelector((state) => state.map.markers);

    console.log("Map component rendered");

    return (
        <Fragment>
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
                {Array.isArray(markersArr) &&
                    markersArr.map((strObj) => {
                        let obj = JSON.parse(strObj);
                        return (
                            <Fragment key={Math.random()}>
                                <Markers
                                    markersObj={obj}
                                    key={`${obj.markers[0].animalId}_markers`}
                                />
                                <Vectors
                                    markersObj={obj}
                                    key={`${obj.markers[0].animalId}_vectors`}
                                />
                            </Fragment>
                        );
                    })}

                <NavigationControl />
            </Map>

            <Description />
        </Fragment>
    );
};

export default TrackerMap;
