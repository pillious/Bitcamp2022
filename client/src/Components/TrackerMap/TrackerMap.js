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
    zoom: 1,
};

const ICON_MAPPING = {
    marker: {
        x: 0,
        y: 0,
        width: 128,
        height: 128,
        mask: true,
    },
};

// Hash string to value between 0 and 255.
const hashString = (s) =>
    Math.abs(
        s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0) %
            256
    );

const parse = (data) => {
    let transformedData = [];

    data.forEach((point) => {
        transformedData.push({
            name: point.animalName,
            id: point.animalId,
            datetime: point.datetime,
            coordinate: [point.long, point.lat],
        });
    });

    return transformedData;
};

const TrackerMap = () => {
    const [layers, setLayers] = useState([]);

    useEffect(() => {
        const createLayer = async () => {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            };

            let allAnimals = await fetch(
                "http://localhost:8000/track/getAllDistinctNames",
                requestOptions
            );
            allAnimals = await allAnimals.json();

            let allData = [];
            let allLayers = [];

            for (const animal of allAnimals) {
                const resp = await fetch(
                    `http://localhost:8000/track/getAnimalByName/${animal}`,
                    requestOptions
                ).catch((err) => console.error(err));

                if (resp.ok) {
                    const data = parse(await resp.json());
                    allData = [...allData, ...data];

                    allLayers.push(new IconLayer({
                        id: Math.random().toString(),
                        data: allData,
                        getColor: (d) => [hashString(d.name), 140, 0],
                        getIcon: (d) => "marker",
                        getPosition: (d) => d.coordinate,
                        getSize: (d) => 5,
                        iconAtlas:
                            "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
                        iconMapping: ICON_MAPPING,
                        sizeScale: 8,
                        pickable: true,
                    }));
                } else {
                    console.err(
                        `Something went wrong while fetching data for ${animal}`
                    );
                }
            }

            setLayers(allLayers);
        };

        createLayer().catch((err) => console.error(err));
    }, []);

    return (
        <Fragment>
            <div className={classes.map_wrapper}>
                <DeckGL
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={{touchRotate: false}}
                    layers={layers}
                    width="60vw"
                    height="500px"
                >
                    <Map
                        mapStyle="mapbox://styles/mapbox/satellite-v9"
                        mapboxAccessToken={key}
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
