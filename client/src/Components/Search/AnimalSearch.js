import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as Constants from "../../utils/constants";
import * as Utils from "../../utils/utils";
import { useGetAllDistinctNamesQuery } from "../../services/mapApi";
import { mapActions } from "../../store/map-slice";

const AnimalSearch = () => {
    const dispatch = useDispatch();
    let animalNames = useSelector((state) => state.map.animalNames);

    const [value, setValue] = useState(
        Utils.toProperCase(Constants.INITIAL_ANIMAL_ONLOAD)
    );

    useEffect(() => {
        console.log(value);
        if (value) dispatch(mapActions.setAnimalSearchTerm(value));
    }, [value]);

    const { data, isSuccess } = useGetAllDistinctNamesQuery();
    useEffect(() => {
        if (isSuccess && data?.length > 0)
            dispatch(mapActions.setAnimalNames(data));
    }, [isSuccess, dispatch]);

    return (
        <Autocomplete
            disablePortal
            id="animal_autocomplete"
            sx={{ width: 300 }}
            value={value}
            options={animalNames.map((a) => Utils.toProperCase(a))}
            onChange={(event, newVal) => setValue(newVal)}
            renderInput={(params) => <TextField {...params} label="Animals" />}
        />
    );
};

export default AnimalSearch;
