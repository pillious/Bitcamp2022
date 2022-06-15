import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as Utils from "../../utils/utils";
import { useGetAllDistinctNamesQuery } from "../../services/mapApi";
import { mapActions } from "../../store/map-slice";
import PropTypes from "prop-types";
import classes from "./AnimalSearch.module.css";

const AnimalSearch = (props) => {
    const dispatch = useDispatch();
    let animalNames = useSelector((state) => state.map.animalNames);

    const { data, isSuccess } = useGetAllDistinctNamesQuery();
    useEffect(() => {
        if (isSuccess && data?.data?.length > 0)
            dispatch(mapActions.setAnimalNames(data.data));
    }, [isSuccess, dispatch]);

    return (
        <Autocomplete
            disablePortal
            id="animal_autocomplete"
            className={classes.Autocomplete}
            value={props.value}
            options={animalNames.map((a) => Utils.toProperCase(a))}
            onChange={(event, newVal) => props.updateSearch(newVal)}
            renderInput={(params) => <TextField {...params} label="Animals" />}
        />
    );
};

AnimalSearch.propTypes = {
    value: PropTypes.string.isRequired,
    updateSearch: PropTypes.func.isRequired,
};

export default AnimalSearch;
