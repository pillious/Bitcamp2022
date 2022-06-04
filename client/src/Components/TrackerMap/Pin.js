/**
 * The actual SVG icon used by the markers.
 */

import { memo } from "react";
import PropTypes from "prop-types";

const Pin = ({ size = 16, color }) => {
    return (
        <svg
            height={size}
            fill={color}
            viewBox="0 0 384 512"
            style={{ cursor: "pointer", zIndex: 10000 }}
        >
            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
        </svg>
    );
};

Pin.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string.isRequired,
};

export default memo(Pin);
