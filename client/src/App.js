import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Search from "./Components/Search/Search";
import TrackerMap from "./Components/TrackerMap/TrackerMap";
import { useGetAnimalMarkersByNameQuery } from "./services/mapApi";
import { mapActions } from "./store/map-slice";
import * as Constants from "./utils/constants";

let isInitialDataLoaded = false;

const App = () => {
    const dispatch = useDispatch();

    // Load Initial Markers
    // https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequery
    const { data, isSuccess } = useGetAnimalMarkersByNameQuery(
        Constants.INITIAL_ANIMAL_ONLOAD
    );
    useEffect(() => {
        if (!isInitialDataLoaded && isSuccess && data?.length > 0) {
            dispatch(mapActions.setMarkers(data));
            isInitialDataLoaded = true;
        }
    }, [isSuccess, dispatch]);

    return (
        <>
            <Search />
            <TrackerMap />
        </>
    );
};

export default App;
