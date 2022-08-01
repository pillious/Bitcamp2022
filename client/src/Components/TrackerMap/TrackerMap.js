import {
    Fragment,
    useCallback,
    useContext,
    // useEffect,
    useRef,
    useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import Map, { NavigationControl } from "react-map-gl";
import MapContext from "../../store/map-context";
import * as Constants from "../../utils/constants";
import Vectors from "./Vectors";
import Markers from "./Markers";
import useSearch from "../../hooks/useSearch";
import MarkerPopup from "./MarkerPopup";
import Description from "./Description";
import { mapActions } from "../../store/map-slice";
import classes from "./TrackerMap.module.css";

const TrackerMap = () => {
    const mapViewState = useSelector((state) => state.map.viewState);
    const dispatch = useDispatch();

    useSearch(); // Custom hook - gets marker data by animal name

    const descRef = useRef(null);

    const mapRef = useContext(MapContext);
    const markersObj = useSelector((state) => {
        if (state.map.markers.length === 0) return [];
        return state.map.markers.map((o) => JSON.parse(o));
    });

    const onMove = useCallback((evt) => {
        dispatch(mapActions.setMapViewState(evt.viewState));
    }, []);

    const [popupInfo, setPopupInfo] = useState(null);
    const openPopup = useCallback(
        (lat, lng, descObj, markerObj) =>
            setPopupInfo({ lat, lng, desc: descObj, marker: markerObj }),
        [setPopupInfo]
    );
    const closePopup = useCallback(() => setPopupInfo(null), [setPopupInfo]);

    const scrollToDesc = useCallback(() => {
        descRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }, [descRef]);

    // console.log("Map component rendered");

    return (
        <div className={classes.container}>
            <div className={classes.map_wrapper}>
                <Map
                    {...mapViewState}
                    onMove={onMove}
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
                            zoomIn={() =>
                                dispatch(
                                    mapActions.zoomToBoundingBox({
                                        mapRef,
                                        boundingBox: markersObj[0].boundingBox,
                                    })
                                )
                            }
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
