import { Fragment, useContext, useState } from "react";
import { useSelector } from "react-redux";
import Map, { NavigationControl, Popup } from "react-map-gl";
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

    const [popupInfo, setPopupInfo] = useState(null);

    const openPopup = (lat, lng, descObj) =>
        setPopupInfo({ lat, lng, desc: descObj });

    useSearch();

    // return useMemo(() => {
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
                    markersArr.map((strObj, idx) => {
                        let obj = JSON.parse(strObj);
                        return (
                            // The key must stay constant between rerenders to
                            // prevent children elements from being forced to rerender,
                            // even if props didn't change.
                            <Fragment key={idx}>
                                <Markers
                                    markersObj={obj}
                                    openPopup={openPopup}
                                />
                                <Vectors markersObj={obj} />
                            </Fragment>
                        );
                    })}

                {popupInfo && (
                    <Popup
                        longitude={Number(popupInfo.lng)}
                        latitude={Number(popupInfo.lat)}
                        anchor="top"
                        onClose={() => setPopupInfo(null)}
                        closeOnClick={false}
                    >
                        You are here
                    </Popup>
                )}

                <NavigationControl />
            </Map>

            <Description />
        </Fragment>
    );
    // }, [markersArr]);
};

export default TrackerMap;
