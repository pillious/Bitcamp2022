// Generate a pastel color using HSL values.
export const pastelHSLColor = () => [360 * Math.random(), 70, 70];
export const buildHSLString = (vals) =>
    `hsl(${vals[0]}, ${vals[1]}%, ${vals[2]}%)`;
