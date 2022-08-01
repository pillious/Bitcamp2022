import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./SplashScreen.module.css";

const SplashScreen = () => {
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const closeSplashScreen = () => setShowSplashScreen(false);

    useLayoutEffect(() => {
        if (showSplashScreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showSplashScreen]);

    return createPortal(
        <div
            className={`${classes.wrapper} ${
                !showSplashScreen ? classes.hidden : classes.show
            }`}
        >
            <h1 className={classes.title}>WilderTrace</h1>
            <p className={classes.subtitle}>
                View the migration paths of animals.
            </p>
            <button onClick={closeSplashScreen} className={classes.button}>
                EXPLORE!
            </button>
        </div>, document.getElementById("splashscreen")
    );
};

export default SplashScreen;
