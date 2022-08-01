import { useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import classes from "./LoadingOverlay.module.css";

const LoadingOverlay = () => {
    const isSomeQueryPending = useSelector((state) => {
        return Object.values(state.mapApi.queries).some(
            (query) => query.status === "pending"
        );
    });

    useLayoutEffect(() => {
        if (isSomeQueryPending) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isSomeQueryPending]);

    return createPortal(
        <>
            {isSomeQueryPending && (
                <div className={classes.wrapper}>
                    <div className={classes.overlay} />
                    <CircularProgress size={64} style={{ color: "#4a98d7" }} />
                    <p className={classes.animated_loading_text}>Loading</p>
                </div>
            )}
        </>,
        document.getElementById("overlay")
    );
};

export default LoadingOverlay;
