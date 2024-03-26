import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Map, { Marker } from 'react-map-gl';

import GeocoderControl from './geocoder-control';
import ControlPanel from './control-panel';
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import 'mapbox-gl/dist/mapbox-gl.css';



const parkLayer = {
    id: 'landuse_park',
    type: 'fill',
    source: 'mapbox',
    'source-layer': 'landuse',
    filter: ['==', 'class', 'park'],
    paint: {
        'fill-color': '#4E3FC8'
    }
};

// eslint-disable-next-line
const TOKEN = import.meta.env.VITE_APP_MAPBOX_API_KEY; // Set your mapbox token here


export default function ModalMap() {
    const [userLocation, setUserLocation] = React.useState();

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((e) => {
            setUserLocation({
                latitude: e.coords.latitude,
                longitude: e.coords.longitude
            })
            console.log(e.coords);
        })
    }, [])

    return (
        <>{userLocation && userLocation.latitude && userLocation.longitude ?
            <Map
                initialViewState={{
                    longitude: userLocation.longitude,
                    latitude: userLocation.latitude,
                    zoom: 12,
                    pitch: 0,
                    bearing: 0
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={TOKEN}
                style={{
                    position: 'relative',
                    width: '100%', height: '100%', overflow: 'hidden'
                }}
            >
                {/* <Layer {...parkLayer} /> */}
                <Marker latitude={userLocation.latitude} longitude={userLocation.longitude} anchor={'center'}
                    // pitchAlignment={'viewport'}
                    offset={[0, 0]}
                // style={{
                //     width: "50px",
                //     height: "50px",
                //     position: "relative",
                //     top: "-50px",
                //     left: "-25px",
                // }}
                // zoom={10}
                >
                    {/* <img sr */}
                    <FontAwesomeIcon icon={faLocationDot} className='text-2xl text-violet-600' />
                </Marker>
                {/* <GeocoderControl showUserLocation={true} mapboxAccessToken={TOKEN} position="top-left" /> */}

            </Map >
            :
            <CircularProgress />
        }

            {/* <ControlPanel /> */}
        </>
    );
}