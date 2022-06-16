import PropTypes from "prop-types";
import classes from "./SplashScreen.module.css";

const SplashScreen = (props) => {
    return (
        <div className={`${classes.wrapper} ${!props.show ? classes.hidden : classes.show}`}>
            <h1 className={classes.title}>WilderTrace</h1>
            <p className={classes.subtitle}>View the migration paths of animals.</p>
            <button onClick={props.onClose} className={classes.button}>
                EXPLORE!
            </button>
        </div>
    );
};

SplashScreen.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

export default SplashScreen;
