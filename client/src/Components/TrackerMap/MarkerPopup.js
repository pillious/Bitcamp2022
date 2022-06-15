import { Popup } from "react-map-gl";
import * as Utils from "../../utils/utils";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import classes from "./MarkerPopup.module.css";

const MarkerPopup = ({ popupInfo, closePopup, zoomIn }) => {
    return (
        <Popup
            longitude={Number(popupInfo.lng)}
            latitude={Number(popupInfo.lat)}
            anchor="bottom"
            offset={12}
            closeButton={false} // Popup doesn't work properly with the built-in close btn.
            closeOnClick={false} // Popup doesn't work properly with this true.
        >
            <div className={classes.popup_wrapper}>
                <CloseIcon onClick={closePopup} className={classes.CloseIcon} />
                <h1 className={classes.name}>{`${Utils.toProperCase(
                    popupInfo.desc.commonName
                )}`}</h1>

                <Link component="button" className={classes.desc_link}>
                    Learn more
                </Link>
                <p className={classes.latlng}>{`(${Number(
                    popupInfo.lat
                ).toFixed(2)}, ${Number(popupInfo.lng).toFixed(2)})`}</p>
                <Link
                    component="button"
                    className={classes.zoom_link}
                    onClick={zoomIn}
                >
                    Take a closer look!
                </Link>
            </div>
        </Popup>
    );
};

MarkerPopup.propTypes = {
    popupInfo: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        desc: PropTypes.shape({
            commonName: PropTypes.string.isRequired,
            scientificName: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            citations: PropTypes.arrayOf(PropTypes.string).isRequired,
        }),
    }).isRequired,
    closePopup: PropTypes.func.isRequired,
    zoomIn: PropTypes.func.isRequired,
};

export default MarkerPopup;
