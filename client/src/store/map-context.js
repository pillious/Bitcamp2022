/**
 * Uses the React Context API to store a ref to the map.
 */

import { createContext, useRef } from "react";
import PropTypes from "prop-types";

const MapContext = createContext();

export const MapContextProvider = (props) => {
    const ref = useRef();
    return (
        <MapContext.Provider value={ref}>{props.children}</MapContext.Provider>
    );
};

MapContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MapContext;
