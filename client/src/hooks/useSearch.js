import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAnimalMarkersByNameQuery } from "../services/mapApi";
import { mapActions } from "../store/map-slice";
import MapContext from "../store/map-context";
import * as Constants from "../utils/constants";

// https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequery
const useSearch = () => {
    const mapRef = useContext(MapContext);

    const animalSearchTerm = useSelector((state) => state.map.animalSearchTerm);
    const dispatch = useDispatch();

    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);

    const {
        data,
        // isSuccess,
        // isFetching,
        // error: fetchError,
    } = useGetAnimalMarkersByNameQuery(animalSearchTerm);

    // useEffect(() => {
    //     console.log(`success: ${isSuccess}, fetching: ${isFetching}`);
    //     // console.log(data);

    //     if (isSuccess && !isFetching) {
    //         console.log(data);
    //         dispatch(mapActions.setMarkers(data));
    //     }
    //     setIsLoading(isFetching);
    // }, [isSuccess, isFetching, dispatch]);

    useEffect(() => {
        if (data && Array.isArray(data.data.markers)) {
            // Sort markers in ascending order according to datetime.
            // This is done since the vector implementation simply connects adjacent array elements.
            let copy = Object.assign({}, JSON.parse(JSON.stringify(data.data)));
            copy.doZoom = true;
            copy.mapRef = mapRef;
            copy.markers = sortByAscTime(copy.markers);
            dispatch(mapActions.setMarkers(copy));
            dispatch(mapActions.setMapViewState(Constants.INITIAL_VIEW_STATE));
        }
    }, [data]);

    const sortByAscTime = (markersArr) =>
        markersArr.sort(
            (a, b) =>
                Number(new Date(a.datetime)) - Number(new Date(b.datetime))
        );

    // useEffect(() => {
    //     setIsLoading(isFetching)
    // }, [isFetching])

    // useEffect(() => {
    //     if (error) setError(fetchError);
    // }, [fetchError]);

    // return { isLoading, error };
};

export default useSearch;
