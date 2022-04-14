import DeckGL from "@deck.gl/react";
import Map from "react-map-gl";
import classes from "./TrackerMap.module.css";
import { IconLayer } from "@deck.gl/layers";
import React, { Fragment, useEffect, useState } from "react";

const key =
    "pk.eyJ1IjoicGlsbGlvdXMiLCJhIjoiY2wxczBncmhuMXgyMDNldGNzNWYwODNscSJ9.s0SUe4XQt47TqXluA4O5kQ";

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 23.81669,
    latitude: -19.7853,
    zoom: 7,
    pitch: 0,
    bearing: 0,
};

const c = [
    { coordinate: [23.52362, -19.3915] },
    { coordinate: [23.5235, -19.3917] },
    { coordinate: [23.52346, -19.3917] },
    { coordinate: [23.52343, -19.3916] },
    { coordinate: [23.52343, -19.3915] },
    { coordinate: [23.52338, -19.3917] },
    { coordinate: [23.54001, -19.3926] },
    { coordinate: [23.56088, -19.4167] },
    { coordinate: [23.56769, -19.4209] },
];

const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 64, height: 96, mask: true },
};

// const layer2 = new IconLayer({
//     id: "IconLayer",
//     data: c,

//     /* props from IconLayer class */

//     // alphaCutoff: 0.05,
//     // billboard: true,
//     // getAngle: 0,
//     getColor: (d) => [Math.sqrt(d.exits), 140, 0],
//     getIcon: (d) => "marker",
//     // getPixelOffset: [0, 0],
//     getPosition: (d) => d.coordinate,
//     getSize: (d) => 5,
//     iconAtlas:
//         "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
//     iconMapping: {
//         marker: {
//             x: 0,
//             y: 0,
//             width: 128,
//             height: 128,
//             anchorY: 128,
//             mask: true,
//         },
//     },
//     // onIconError: null,
//     // sizeMaxPixels: Number.MAX_SAFE_INTEGER,
//     // sizeMinPixels: 0,
//     sizeScale: 8,
//     // sizeUnits: 'pixels',

//     /* props inherited from Layer class */

//     // autoHighlight: false,
//     // coordinateOrigin: [0, 0, 0],
//     // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
//     // highlightColor: [0, 0, 128, 128],
//     // modelMatrix: null,
//     // opacity: 1,
//     pickable: true,
//     // visible: true,
//     // wrapLongitude: false,
// });

const parse = (data) => {
    console.log(data); // Temp: for debugging.

    let transformedData = [];
    data.forEach((point) => {
        transformedData.push({ coordinate: [point.long, point.lat] });
    });

    return transformedData;
};

const TrackerMap = () => {
    const [layer, setLayer] = useState(null);

    useEffect(() => {
        const createLayer = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            };
            const resp = await fetch(
                "http://localhost:8000/getAnimalByName/Plains Zebra",
                requestOptions
            ).catch((err) => console.error(err));

            if (resp.ok) {
                const data = parse(await resp.json());
                console.log(data);

                setLayer(
                    new IconLayer({
                        id: "IconLayer",
                        data: data,
                        getColor: (d) => [Math.sqrt(d.exits), 140, 0],
                        getIcon: (d) => "marker",
                        getPosition: (d) => d.coordinate,
                        getSize: (d) => 5,
                        iconAtlas:
                            "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
                        iconMapping: {
                            marker: {
                                x: 0,
                                y: 0,
                                width: 128,
                                height: 128,
                                anchorY: 128,
                                mask: true,
                            },
                        },
                        sizeScale: 8,
                        pickable: true,
                    })
                );
            }
            else {
                console.err("Something went wrong while fetching data.");
            }
        };

        createLayer().catch((err) => console.error(err));
    }, []);

    return (
        <Fragment>
            <div className={classes.map_wrapper}>
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={true}
                    layers={[layer]}
                    width="100vw"
                    height="80vh"
                >
                    <Map
                        initialViewState={{
                            latitude: 37.8,
                            longitude: -122.4,
                            zoom: 1,
                        }}
                        mapStyle="mapbox://styles/mapbox/satellite-v9"
                        mapboxAccessToken={key}
                        renderWorldCopies={false}
                    ></Map>
                </DeckGL>
            </div>
            <p className={classes.something}>
                Burchell's zebra (Equus burchellii): <br />
                Plains zebra range in height from 1-1.5 m (3.5-5 ft.) and can
                weigh almost 450 kg (1000 lbs.). Plains zebras have broad
                stripes that run horizontally towards the back and vertically
                towards the front, meeting in a triangle in the middle of their
                bodies. They prefer open grasslands, open woodlands, and open
                scrub environments. Plains zebras are herbivores and are known
                to travel great distances to find food and water when the dry
                season arrives.
                https://animaldiversity.org/accounts/Equus_burchellii/
            </p>
        </Fragment>
    );
};

export default TrackerMap;
