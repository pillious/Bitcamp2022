import { Fragment, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import Map, { NavigationControl } from "react-map-gl";
import MapContext from "../../store/map-context";
import * as Constants from "../../utils/constants";
import Description from "./Description";
import Vectors from "./Vectors";
import Markers from "./Markers";
import useSearch from "../../hooks/useSearch";

// Map initial viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 24,
    latitude: -20,
    zoom: 0,
};

const TrackerMap = () => {
    const mapRef = useContext(MapContext);
    const markersArr = useSelector((state) => state.map.markers);
    console.log(markersArr);
    useSearch();

    return useMemo(() => {
        console.log("Map component rendered");
        return (
            <Fragment>
                <Map
                    initialViewState={INITIAL_VIEW_STATE}
                    dragRotate={false}
                    touchPitch={false}
                    // Currently no way to disable rotate w/o disabling zoom.
                    // touchZoomRotate={false}
                    style={{ width: "100%", height: "500px" }}
                    mapStyle={Constants.MAP_STYLE}
                    mapboxAccessToken={Constants.MAPBOX_KEY}
                    styleDiffing={false}
                    ref={mapRef}
                >
                    {Array.isArray(markersArr) &&
                        markersArr.length > 0 &&
                        markersArr.map((strObj) => {
                            let obj = JSON.parse(strObj);
                            console.log(obj);
                            return (
                                <Fragment key={Math.random()}>
                                    <Markers markersObj={obj} />
                                    <Vectors markersObj={obj} />
                                </Fragment>
                            );
                        })}

                    <NavigationControl />
                </Map>

                <Description />
            </Fragment>
        );
    }, [markersArr]);
};

export default TrackerMap;
