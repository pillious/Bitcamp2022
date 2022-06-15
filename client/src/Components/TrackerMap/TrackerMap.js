import { Fragment, useCallback, useContext, useState } from "react";
import { useSelector } from "react-redux";
import Map, { NavigationControl } from "react-map-gl";
import MapContext from "../../store/map-context";
import * as Constants from "../../utils/constants";
import Vectors from "./Vectors";
import Markers from "./Markers";
import useSearch from "../../hooks/useSearch";
import MarkerPopup from "./MarkerPopup";
import Description from "./Description";

// Map initial viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 24,
    latitude: -20,
    zoom: 0,
};

const TrackerMap = () => {
    useSearch(); // Custom hook - gets marker data by animal name

    const mapRef = useContext(MapContext);
    const markersObj = useSelector((state) => {
        if (state.map.markers.length === 0) return [];
        return state.map.markers.map((o) => JSON.parse(o));
    });

    const [popupInfo, setPopupInfo] = useState(null);
    const openPopup = useCallback(
        (lat, lng, descObj) => setPopupInfo({ lat, lng, desc: descObj }),
        [setPopupInfo]
    );
    const closePopup = useCallback(() => setPopupInfo(null), [setPopupInfo]);

    const onZoom = () => {
        if (markersObj[0].boundingBox) {
            mapRef.current.fitBounds(markersObj[0].boundingBox, {
                padding: 40,
                duration: 3000,
            });
            closePopup();
        }
    };

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
                ref={mapRef}
            >
                {Array.isArray(markersObj) &&
                    markersObj.length > 0 &&
                    markersObj.map((obj, idx) => {
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
                    <MarkerPopup
                        popupInfo={popupInfo}
                        closePopup={closePopup}
                        zoomIn={onZoom}
                    />
                )}

                <NavigationControl />
            </Map>

            {markersObj.length > 0 && (
                <Description animalInfo={markersObj[0].desc} />
            )}
        </Fragment>
    );
};

export default TrackerMap;
