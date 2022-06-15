import { useState } from "react";
import { useDispatch } from "react-redux";
import { mapActions } from "../../store/map-slice";
import AnimalSearch from "./AnimalSearch";
import * as Constants from "../../utils/constants";
import * as Utils from "../../utils/utils";
import classes from "./Search.module.css";
import Button from "@mui/material/Button";

const Search = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState(
        Utils.toProperCase(Constants.INITIAL_ANIMAL_ONLOAD)
    );

    const submitHandler = () => {
        if (value) dispatch(mapActions.setAnimalSearchTerm(value));
    };

    const updateSearch = (animal) => setValue(animal);

    return (
        <div className={classes.search_row}>
            <div className={classes.search_boxes}>
                <div className={classes.animal_search_wrapper}>
                    <AnimalSearch value={value} updateSearch={updateSearch} />
                </div>
            </div>
            <Button
                variant="contained"
                className={classes.submit_button}
                onClick={submitHandler}
            >
                Submit
            </Button>
        </div>
    );
};

export default Search;
