import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Search from "./Components/Search/Search";
import TrackerMap from "./Components/TrackerMap/TrackerMap";
import { useGetAnimalMarkersByNameQuery } from "./services/mapApi";
import { mapActions } from "./store/map-slice";

let isInitialDataLoaded = false;

const App = () => {
    const dispatch = useDispatch();

    // Load Initial Markers
    // https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequery
    const { data, isSuccess, error } =
        useGetAnimalMarkersByNameQuery("PLAINS ZEBRA");
    useEffect(() => {
        if (!isInitialDataLoaded && isSuccess && data?.length > 0) {
            dispatch(mapActions.replaceMarkers(data));
            isInitialDataLoaded = true;
        }
    }, [isSuccess, dispatch]); // Will fire even if query was skipped.

    // TEMP ERROR LOGGING
    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    return (
        <>
            <Search />
            <TrackerMap />
        </>
    );
};

export default App;
