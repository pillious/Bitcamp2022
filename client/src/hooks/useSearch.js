import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAnimalMarkersByNameQuery } from "../services/mapApi";
import { mapActions } from "../store/map-slice";

// https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usequery
const useSearch = () => {
    const animalSearchTerm = useSelector((state) => state.map.animalSearchTerm);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const {
        data,
        isSuccess,
        isLoading: loadingState,
        error: fetchError,
    } = useGetAnimalMarkersByNameQuery(animalSearchTerm);

    useEffect(() => {
        if (isSuccess && data?.length > 0) {
            dispatch(mapActions.setMarkers(data));
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        if (error) setError(fetchError);
    }, [fetchError]);

    useEffect(() => {
        if (typeof loadingState == "boolean") setIsLoading(loadingState);
    }, [loadingState]);

    return { isLoading, error };
};

export default useSearch;
