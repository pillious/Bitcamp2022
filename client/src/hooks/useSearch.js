import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAnimalMarkersByNameQuery } from "../services/mapApi";
import { mapActions } from "../store/map-slice";

// https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequery
const useSearch = () => {
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
        console.log(data);
        if (Array.isArray(data)) dispatch(mapActions.setMarkers(data));
    }, [data]);

    // useEffect(() => {
    //     setIsLoading(isFetching)
    // }, [isFetching])

    // useEffect(() => {
    //     if (error) setError(fetchError);
    // }, [fetchError]);

    // return { isLoading, error };
};

export default useSearch;
