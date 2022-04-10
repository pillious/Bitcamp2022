import DeckGL from "@deck.gl/react";
// import { LineLayer } from "@deck.gl/layers";
import Map from "react-map-gl";
import classes from "./TrackerMap.module.css";
import {IconLayer} from '@deck.gl/layers';
// import { useEffect } from "react";


const key =
    "pk.eyJ1IjoicGlsbGlvdXMiLCJhIjoiY2wxczBncmhuMXgyMDNldGNzNWYwODNscSJ9.s0SUe4XQt47TqXluA4O5kQ";

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 3,
    pitch: 0,
    bearing: 0,
};


// Data to be used by the LineLayer
// const data = [
//     {
//         sourcePosition: [122.41669, 37.7853],
//         targetPosition: [-50.41669, 100.7853],
//     },
// ];

// var arr = [{"name":"Lafayette (LAFY)","code":"LF","address":"3601 Deer Hill Road, Lafayette CA 94549","entries":"3481","exits":"3616","coordinates":[-122.123801,37.893394]},
// {"name":"12th St. Oakland City Center (12TH)","code":"12","address":"1245 Broadway, Oakland CA 94612","entries":"13418","exits":"13547","coordinates":[-122.271604,37.803664]},
// {"name":"16th St. Mission (16TH)","code":"16","address":"2000 Mission Street, San Francisco CA 94110","entries":"12409","exits":"12351","coordinates":[-122.419694,37.765062]}];

// var arr = [{"lat":-122.123801, "long": 37.893394}, {"lat":-122.123801, "long": 37.896694}];

// var coordinates = [];

const c = [{"coordinate": [57.54213799, 13.30893268]},
            {"coordinate": [56.11266833, 16.20262671]},
            {"coordinate": [56.10188734, 56.10188734]},
            {"coordinate": [57.61831498, 12.86700346]},
            {"coordinate": [57.96765143, 13.88688749]},
            {"coordinate": [57.41641624, 15.03234133]},
            {"coordinate": [57.02594031, 14.30318525]},
            {"coordinate": [57.05723857, 14.07452987]},
            {"coordinate": [57.10753979, 14.34598399]}];

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

  const layer2 = new IconLayer({
    id: 'IconLayer',
    data: c,
    
    /* props from IconLayer class */
    
    // alphaCutoff: 0.05,
    // billboard: true,
    // getAngle: 0,
    getColor: d => [Math.sqrt(d.exits), 140, 0],
    getIcon: d => 'marker',
    // getPixelOffset: [0, 0],
    getPosition: d => d.coordinates,
    getSize: d => 5,
    iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: {
      marker: {
        x: 0,
        y: 0,
        width: 128,
        height: 128,
        anchorY: 128,
        mask: true
      }
    },
    // onIconError: null,
    // sizeMaxPixels: Number.MAX_SAFE_INTEGER,
    // sizeMinPixels: 0,
    sizeScale: 8,
    // sizeUnits: 'pixels',
    
    /* props inherited from Layer class */
    
    // autoHighlight: false,
    // coordinateOrigin: [0, 0, 0],
    // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    // highlightColor: [0, 0, 128, 128],
    // modelMatrix: null,
    // opacity: 1,
    pickable: true,
    // visible: true,
    // wrapLongitude: false,
  });

// const layer = new IconLayer({
//     id: 'icon-layer',
//     data,
//     pickable: true,
//     // iconAtlas and iconMapping are required
//     // getIcon: return a string
//     iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
//     iconMapping: ICON_MAPPING,
//     getIcon: data => 'marker',

//     sizeScale: 15,
//     getPosition: data => data.sourcePosition,
//     getSize: data => 5,
//     getColor: data => [100, 140, 0]
//   });

// const layer = new LineLayer({
//     id: 'line-layer',
//     data,
//     pickable: true,
//     getWidth: 10,
//     getSourcePosition: data => data.sourcePosition,
//     getTargetPosition: data => data.targetPosition,
//     getColor: [255, 100, 100],
//   });

var arr = [{"lat":-122.123801, "long": 37.893394}, {"lat":-122.123801, "long": 37.896694}, {"lat":-121.123801, "long": 37.896694}];

// var coordinates = [];

const TrackerMap = () => {

    // const coords = [

    // ];

    //let layer2;

    // useEffect(() => {
    //     const url = "http://localhost:8000/getAnimalByName/Red-backed Shrikes";
    
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch(url);
    //         const json = await response.json();
    //         for (let i = 0; i < 20; i++) {
    //             let obj = json[i];
    //             // let x = {};
    //             // x[obj.lat] = obj.long;

    //             coords.push({"coordinates": [obj.lat, obj.long]});
    //             // console.log(x + "is x");
    //         }

           
    //         console.log(coords);
    //       } catch (error) {
    //         console.log("error", error);
    //       }
    //     };
    
    //     fetchData();
    //     lineLoop();
    // }, []);

    // const lineLoop = () => {
        
       
    
    // };

    // const layers = [new LineLayer({ id: "line-layer", data })];
    

    return (

        <div className={classes.map_wrapper}>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[layer2]}
                width="100vw"   
                height="90vh"
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
    );
};

export default TrackerMap;
