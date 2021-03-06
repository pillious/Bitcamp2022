import { forwardRef } from "react";
import PropTypes from "prop-types";
import * as Utils from "../../utils/utils";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import classes from "./Description.module.css";

const Description = forwardRef((props, ref) => {
    const { animalInfo } = props;
    const { commonName, scientificName, body, citations } = animalInfo;

    return (
        <div className={classes.wrapper} ref={ref}>
            <Paper className={classes.Paper} elevation={2}>
                <h1 className={classes.name}>{`${Utils.toProperCase(
                    commonName
                )} (${Utils.toProperCase(scientificName)})`}:</h1>
                <p></p>
                <p className={classes.body}>{body}</p>
                <div className={classes.citations_wrapper}>
                    <p>Citations:</p>
                    {citations.length > 0 &&
                        citations.map((c, i) => (
                            <Link key={`cite-${i}`} href={c}>
                                {i + 1}
                            </Link>
                        ))}
                </div>
            </Paper>
        </div>
    );
});

Description.displayName = "Description";

Description.propTypes = {
    animalInfo: PropTypes.shape({
        commonName: PropTypes.string.isRequired,
        scientificName: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        citations: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default Description;
