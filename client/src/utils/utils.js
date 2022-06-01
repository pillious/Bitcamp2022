// Generate a pastel color using HSL values.
export const pastelHSLColor = () => [360 * Math.random(), 100, 70];

// Generate the HSL CSS string.
export const buildHSLString = (vals) =>
    `hsl(${vals[0]}, ${vals[1]}%, ${vals[2]}%)`;

// Each word in string is capitalized.
export const toProperCase = (str) =>
    str.replace(
        /\w\S*/g,
        (str) => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase()
    );

// Finds the max & min coordinates in the set of markers.
export const buildBoundingBox = (markers) => {
    let boundingBox = [];

    if (markers && Array.isArray(markers) && markers.length > 0) {
        let lats = [],
            lngs = [];

        markers.forEach((m) => {
            lats.push(m.lat);
            lngs.push(m.long);
        });

        boundingBox = [
            [Math.min(...lngs), Math.min(...lats)], // [minLng, minLat]
            [Math.max(...lngs), Math.max(...lats)], // [maxLng, maxLat]
        ];
    }

    return boundingBox;
};

// Define vectors given array of coordinates.
export const buildVectors = (markers) => {
    let vectors = null;

    if (markers && Array.isArray(markers) && markers.length > 1) {
        vectors = [];

        for (let i = 0; i < markers.length - 1; i++) {
            let start = markers[i],
                end = markers[i + 1];
            vectors.push([
                [start.long, start.lat],
                [end.long, end.lat],
            ]);
        }
    }

    return vectors;
};
