import { Fragment, useCallback, useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Map, { NavigationControl } from "react-map-gl";
import MapContext from "../../store/map-context";
import * as Constants from "../../utils/constants";
import Vectors from "./Vectors";
import Markers from "./Markers";
import useSearch from "../../hooks/useSearch";
import MarkerPopup from "./MarkerPopup";
import Description from "./Description";
import classes from "./TrackerMap.module.css";


// Map initial viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 24,
    latitude: -20,
    zoom: 0,
};

const TrackerMap = () => {
    useSearch(); // Custom hook - gets marker data by animal name

    const descRef = useRef(null);

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

    const scrollToDesc = () => {
        descRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        descRef.current.focus(); // TODO focus on scoll
    };

    console.log("Map component rendered");
    return (
        <div className={classes.container}>
            <div className={classes.map_wrapper}>
                <Map
                    initialViewState={INITIAL_VIEW_STATE}
                    dragRotate={false}
                    touchPitch={false}
                    // Currently no way to disable rotate w/o disabling zoom.
                    // touchZoomRotate={false}
                    style={{ width: "100%", height: "100%" }}
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
                            onLearnMoreClick={scrollToDesc}
                        />
                    )}

                    <NavigationControl />
                </Map>
            </div>
            {markersObj.length > 0 && (
                <Description animalInfo={markersObj[0].desc} ref={descRef} />
            )}
        </div>
    );
};

export default TrackerMap;
